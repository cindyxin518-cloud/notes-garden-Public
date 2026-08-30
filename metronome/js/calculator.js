/**
 * 步频 - 步幅 - 配速换算与跑步运动学计算器
 */

const RunningCalculator = {
  /**
   * 根据步频 (SPM) 和步幅 (米) 计算配速与时速
   * @param {number} spm 步频 (步/分钟)
   * @param {number} strideMeters 步幅 (米)
   * @returns {Object} { speedKmh, paceSeconds, paceFormatted }
   */
  calculatePace(spm, strideMeters) {
    if (!spm || !strideMeters || spm <= 0 || strideMeters <= 0) {
      return { speedKmh: 0, paceSeconds: 0, paceFormatted: "--'--\"" };
    }

    const metersPerMinute = spm * strideMeters;
    const metersPerSecond = metersPerMinute / 60.0;
    const speedKmh = metersPerSecond * 3.6;

    const secondsPerKm = 1000.0 / metersPerSecond;
    const paceFormatted = this.formatPace(secondsPerKm);

    return {
      speedKmh: Math.round(speedKmh * 100) / 100,
      paceSeconds: Math.round(secondsPerKm),
      paceFormatted
    };
  },

  /**
   * 将配速秒数格式化为 5'30" / km 字符串
   */
  formatPace(secondsPerKm) {
    if (!isFinite(secondsPerKm) || secondsPerKm <= 0 || secondsPerKm > 3600) {
      return "--'--\"";
    }
    const mins = Math.floor(secondsPerKm / 60);
    const secs = Math.floor(secondsPerKm % 60);
    return `${mins}'${secs.toString().padStart(2, '0')}"`;
  },

  /**
   * 根据身高估算日常有氧慢跑步幅 (通常为身高的 0.55 ~ 0.65 倍)
   * @param {number} heightCm 身高 (厘米)
   * @param {string} intensity 强度 'easy' | 'moderate' | 'tempo'
   */
  estimateStrideFromHeight(heightCm, intensity = 'moderate') {
    const ratios = {
      easy: 0.55,
      moderate: 0.62,
      tempo: 0.70
    };
    const ratio = ratios[intensity] || 0.62;
    const strideMeters = (heightCm * ratio) / 100.0;
    return Math.round(strideMeters * 100) / 100;
  },

  /**
   * 格式化时间为 HH:MM:SS 或 MM:SS
   */
  formatDuration(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
};

window.RunningCalculator = RunningCalculator;
