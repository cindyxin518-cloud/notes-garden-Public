/**
 * 跑步步频节拍器 - iOS / Android 锁屏与后台混音音频引擎
 * 
 * 核心原理：
 * iOS Safari 与 Android 在切后台或熄屏时会冻结常规 JavaScript 定时器。
 * 本引擎采用【动态 PCM WAV 循环流】技术：
 * 1. 根据当前步频 (SPM)、音色、音量，在内存中动态实时合成左右脚 2 拍循环的精确 WAV 音频。
 * 2. 注入 HTML5 原生 <audio loop> 播放器中。
 * 3. 手机操作系统 (iOS CoreAudio / Android Media) 会在系统硬件级音频层无限无缝循环播放该音频。
 * 4. 彻底突破锁屏、切后台休眠限制，不仅 0 毫秒漂移，而且在锁屏、切到播客/音乐软件时绝对不停止，超省电运行！
 */

class MetronomeAudioEngine {
  constructor() {
    this.bpm = 180;
    this.soundType = 'woodblock';
    this.volume = 0.8;
    this.pitchMultiplier = 1.0;
    this.isPlaying = false;

    // 原生 Audio 播放器 (负责后台锁屏持续循环发声)
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.setAttribute('playsinline', '');
    this.audioElement.setAttribute('webkit-playsinline', '');
    this.currentBlobUrl = null;

    // Web Audio API 上下文 (负责前台精确动画与视觉对齐)
    this.audioCtx = null;
    this.visualTimer = null;
    this.beatCount = 0;

    // 回调函数
    this.onBeat = null;
    this.onStateChange = null;

    this.initMediaSession();
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.start());
      navigator.mediaSession.setActionHandler('pause', () => this.stop());
    }
  }

  updateMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `🏃‍♂️ 跑步步频 ${this.bpm} SPM`,
        artist: '节拍器后台打拍中 (可熄屏/搭配播客)',
        album: '跑步步频助手'
      });
      navigator.mediaSession.playbackState = this.isPlaying ? 'playing' : 'paused';
    }
  }

  setBpm(newBpm) {
    this.bpm = Math.max(60, Math.min(300, newBpm));
    if (this.isPlaying) {
      this.refreshAudioTrack(true);
    }
    this.updateMediaSession();
  }

  setSoundType(type) {
    this.soundType = type;
    if (this.isPlaying) {
      this.refreshAudioTrack(true);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.audioElement.volume = this.volume;
  }

  setPitchMultiplier(multiplier) {
    this.pitchMultiplier = Math.max(0.5, Math.min(2.0, multiplier));
    if (this.isPlaying) {
      this.refreshAudioTrack(true);
    }
  }

  /**
   * 动态生成当前步频的精准 WAV 循环音频流
   */
  generateWavBlob() {
    const sampleRate = 44100;
    const beatDuration = 60.0 / this.bpm; // 单步时长 (秒)
    const totalDuration = beatDuration * 2; // 左/右脚 2 步构成一个完整循环周期
    const totalSamples = Math.floor(totalDuration * sampleRate);

    const buffer = new Float32Array(totalSamples);

    // 渲染第 1 拍 (左脚，t = 0)
    this.renderTone(buffer, 0, sampleRate, true);

    // 渲染第 2 拍 (右脚，t = beatDuration)
    const beat2Sample = Math.floor(beatDuration * sampleRate);
    this.renderTone(buffer, beat2Sample, sampleRate, false);

    // 封装为 16-bit PCM WAV 二进制 Blob
    return this.encodeWav(buffer, sampleRate);
  }

  /**
   * 合成不同音色的采样数据
   */
  renderTone(buffer, startSample, sampleRate, isLeftFoot) {
    const pitch = this.pitchMultiplier;
    const maxToneLen = Math.floor(0.12 * sampleRate); // 120ms 瞬态

    for (let i = 0; i < maxToneLen && (startSample + i) < buffer.length; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (this.soundType) {
        case 'woodblock': {
          // 清脆木块声：短瞬态指数衰减 + 频率下潜
          const baseFreq = (isLeftFoot ? 750 : 920) * pitch;
          const decay = Math.exp(-t * 90);
          const freq = baseFreq * (1 + 0.4 * Math.exp(-t * 150));
          sample = Math.sin(2 * Math.PI * freq * t) * decay;
          break;
        }

        case 'dualtone': {
          // 左右脚双音律动：左脚 700Hz，右脚 1100Hz 三角波
          const freq = (isLeftFoot ? 700 : 1100) * pitch;
          const decay = Math.exp(-t * 70);
          const phase = (t * freq) % 1;
          const tri = 4 * Math.abs(phase - 0.5) - 1;
          sample = tri * decay * (isLeftFoot ? 1.0 : 0.8);
          break;
        }

        case 'click': {
          // 机械滴答音：高频方波脉冲
          const freq = (isLeftFoot ? 1800 : 1500) * pitch;
          const decay = Math.exp(-t * 180);
          const square = Math.sin(2 * Math.PI * freq * t) >= 0 ? 1 : -1;
          sample = square * decay * 0.8;
          break;
        }

        case 'beep': {
          // 电子蜂鸣
          const freq = (isLeftFoot ? 1200 : 1000) * pitch;
          const decay = Math.exp(-t * 60);
          sample = Math.sin(2 * Math.PI * freq * t) * decay * 0.9;
          break;
        }

        case 'cowbell': {
          // 运动牛铃 (双频谐波)
          const root = (isLeftFoot ? 800 : 600) * pitch;
          const decay = Math.exp(-t * 50);
          const s1 = Math.sin(2 * Math.PI * root * t);
          const s2 = Math.sin(2 * Math.PI * (root * 1.5) * t);
          sample = (s1 + 0.5 * s2) * decay * 0.7;
          break;
        }

        default:
          break;
      }

      buffer[startSample + i] += sample;
    }
  }

  /**
   * 将 Float32 采样编码为标准 PCM 16-bit WAV 二进制
   */
  encodeWav(samples, sampleRate) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataLength = samples.length * (bitsPerSample / 8);
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // RIFF 标识
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    this.writeString(view, 8, 'WAVE');

    // fmt 子块
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM 格式
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    // data 子块
    this.writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);

    // 写入 PCM 16-bit 采样
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  refreshAudioTrack(keepPlaying = true) {
    const wasPlaying = this.isPlaying;
    const blob = this.generateWavBlob();

    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
    }

    this.currentBlobUrl = URL.createObjectURL(blob);
    this.audioElement.src = this.currentBlobUrl;
    this.audioElement.volume = this.volume;

    if (wasPlaying && keepPlaying) {
      this.audioElement.play().catch(e => console.warn('Audio play failed:', e));
    }
  }

  start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.beatCount = 0;

    // 生成并启动原生音频流
    this.refreshAudioTrack(true);

    // 启动前台视觉定时器
    this.startVisualLoop();

    this.updateMediaSession();
    if (this.onStateChange) this.onStateChange(true);
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    this.audioElement.pause();
    this.stopVisualLoop();

    this.updateMediaSession();
    if (this.onStateChange) this.onStateChange(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  startVisualLoop() {
    this.stopVisualLoop();
    const intervalMs = (60.0 / this.bpm) * 1000;
    
    if (this.onBeat) {
      this.onBeat(this.beatCount);
    }
    this.beatCount++;

    this.visualTimer = setInterval(() => {
      if (this.isPlaying && this.onBeat && document.visibilityState === 'visible') {
        this.onBeat(this.beatCount);
        this.beatCount++;
      }
    }, intervalMs);
  }

  stopVisualLoop() {
    if (this.visualTimer) {
      clearInterval(this.visualTimer);
      this.visualTimer = null;
    }
  }
}

window.MetronomeAudioEngine = MetronomeAudioEngine;
