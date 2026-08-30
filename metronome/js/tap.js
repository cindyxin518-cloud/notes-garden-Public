/**
 * Tap Tempo 步频测量算法
 * 采用智能滑动时间窗口 + 异常值过滤 (Outlier Rejection) + 稳定性分析
 */

class TapCadenceTracker {
  constructor(options = {}) {
    this.maxIntervalMs = options.maxIntervalMs || 2500; // 超过 2.5 秒重置会话
    this.minIntervalMs = options.minIntervalMs || 200;  // 低于 200ms (300 SPM) 视为抖动误触
    this.windowSize = options.windowSize || 8;          // 滑动窗口保留最近 8 次有效间隔

    this.tapTimes = [];
    this.intervals = [];
    this.currentSpm = null;
    this.consistency = null; // 稳定性百分比 0~100%
  }

  reset() {
    this.tapTimes = [];
    this.intervals = [];
    this.currentSpm = null;
    this.consistency = null;
  }

  recordTap() {
    const now = performance.now();

    if (this.tapTimes.length > 0) {
      const lastTap = this.tapTimes[this.tapTimes.length - 1];
      const diff = now - lastTap;

      // 如果两次点击间隔过长，说明已停止一段，自动开始新一轮测量
      if (diff > this.maxIntervalMs) {
        this.reset();
      } else if (diff >= this.minIntervalMs) {
        this.intervals.push(diff);
        if (this.intervals.length > this.windowSize) {
          this.intervals.shift();
        }
      }
    }

    this.tapTimes.push(now);
    if (this.tapTimes.length > this.windowSize + 2) {
      this.tapTimes.shift();
    }

    this.calculate();
    return {
      spm: this.currentSpm,
      count: this.tapTimes.length,
      consistency: this.consistency,
      isReliable: this.intervals.length >= 3
    };
  }

  calculate() {
    if (this.intervals.length < 1) {
      this.currentSpm = null;
      this.consistency = null;
      return;
    }

    // 复制间隔数组
    let validIntervals = [...this.intervals];

    // 如果样本数 >= 4，剔除偏离中位数过大的极端异常点（例如漏踩或连击）
    if (validIntervals.length >= 4) {
      const sorted = [...validIntervals].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      validIntervals = validIntervals.filter(interval => {
        return Math.abs(interval - median) / median < 0.35;
      });
      if (validIntervals.length === 0) validIntervals = [...this.intervals];
    }

    // 计算加权平均（越近的点击权重略高）
    let totalWeight = 0;
    let weightedSum = 0;
    validIntervals.forEach((interval, index) => {
      const weight = 1 + (index / validIntervals.length) * 0.5;
      weightedSum += interval * weight;
      totalWeight += weight;
    });

    const avgIntervalMs = weightedSum / totalWeight;
    const rawSpm = 60000 / avgIntervalMs;
    this.currentSpm = Math.round(rawSpm);

    // 计算标准差与节奏稳定性 (Consistency %)
    if (validIntervals.length >= 3) {
      const variance = validIntervals.reduce((acc, val) => acc + Math.pow(val - avgIntervalMs, 2), 0) / validIntervals.length;
      const stdDev = Math.sqrt(variance);
      const cv = stdDev / avgIntervalMs; // 变异系数
      // cv 为 0 时为 100%，cv 为 0.15 (15% 波动) 时约为 70%
      const consistencyScore = Math.max(0, Math.min(100, Math.round((1 - cv * 2) * 100)));
      this.consistency = consistencyScore;
    } else {
      this.consistency = null;
    }
  }
}

window.TapCadenceTracker = TapCadenceTracker;
