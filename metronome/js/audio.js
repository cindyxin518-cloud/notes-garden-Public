/**
 * 🏃‍♂️ Cadence Metronome - High Precision Web Audio Synthesizer
 * Supports iOS Safari, Android Chrome, WeChat, and all modern browsers.
 */

class WebAudioMetronome {
  constructor() {
    this.audioCtx = null;
    this.bpm = 180;
    this.soundType = 'woodblock';
    this.volume = 0.8;
    this.isPlaying = false;
    this.onBeat = null;

    // Web Audio Scheduler (Lookahead Pattern)
    this.lookahead = 25.0; // 检查调度的时间间隔 (ms)
    this.scheduleAheadTime = 0.1; // 提前调度的秒数 (s)
    this.currentBeat = 0;
    this.nextBeatTime = 0.0;
    this.timerId = null;

    // Background Audio Loop for Screen-lock playback
    this.bgAudio = new Audio();
    this.bgAudio.loop = true;
    this.bgAudio.setAttribute('playsinline', '');
    this.bgAudio.setAttribute('webkit-playsinline', '');
    this.bgBlobUrl = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setBpm(bpm) {
    this.bpm = Math.max(120, Math.min(240, bpm));
    if (this.isPlaying) {
      this.updateBgAudio();
    }
  }

  setSoundType(type) {
    this.soundType = type;
    if (this.isPlaying) {
      this.updateBgAudio();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
  }

  playTone(time, isLeftFoot) {
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const masterVol = this.volume * 1.2; // 提升音量穿透力

    switch (this.soundType) {
      case 'woodblock': {
        // 清脆木鱼：指数频率下潜与瞬态衰减
        const startFreq = isLeftFoot ? 820 : 1050;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(320, time + 0.06);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(masterVol, time + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.07);

        osc.start(time);
        osc.stop(time + 0.075);
        break;
      }

      case 'dualtone': {
        // 左右双音：左脚 700Hz，右脚 1100Hz
        const freq = isLeftFoot ? 720 : 1150;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(masterVol, time + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);

        osc.start(time);
        osc.stop(time + 0.085);
        break;
      }

      case 'click': {
        // 机械滴答：短脉冲
        const freq = isLeftFoot ? 1800 : 1500;
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(masterVol * 0.8, time + 0.001);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);

        osc.start(time);
        osc.stop(time + 0.04);
        break;
      }

      case 'beep': {
        // 电子蜂鸣
        const freq = isLeftFoot ? 1200 : 950;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(masterVol * 0.9, time + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);

        osc.start(time);
        osc.stop(time + 0.065);
        break;
      }

      case 'cowbell': {
        // 运动牛铃：双频谐波
        const freq = isLeftFoot ? 800 : 600;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(masterVol * 0.7, time + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.09);

        osc.start(time);
        osc.stop(time + 0.095);
        break;
      }
    }
  }

  scheduler() {
    while (this.nextBeatTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
      const isLeft = (this.currentBeat % 2 === 0);
      this.playTone(this.nextBeatTime, isLeft);

      // 计算回调的精确时间
      const delayMs = Math.max(0, (this.nextBeatTime - this.audioCtx.currentTime) * 1000);
      const beatIdx = this.currentBeat;
      setTimeout(() => {
        if (this.isPlaying && this.onBeat) {
          this.onBeat(beatIdx);
        }
      }, delayMs);

      // 推进下一拍
      const secondsPerBeat = 60.0 / this.bpm;
      this.nextBeatTime += secondsPerBeat;
      this.currentBeat++;
    }
  }

  start(onBeatCallback) {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;
    this.onBeat = onBeatCallback;
    this.currentBeat = 0;
    this.nextBeatTime = this.audioCtx.currentTime + 0.05;

    // 启动前台 Web Audio 调度循环
    this.timerId = setInterval(() => this.scheduler(), this.lookahead);

    // 启动后台原生循环 (锁屏防杀)
    this.updateBgAudio();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
  }

  updateBgAudio() {
    try {
      if (this.bgBlobUrl) URL.revokeObjectURL(this.bgBlobUrl);
      const blob = this.generateSilentKeepAliveWav();
      this.bgBlobUrl = URL.createObjectURL(blob);
      this.bgAudio.src = this.bgBlobUrl;
      this.bgAudio.volume = 0.01; // 静音保活
      this.bgAudio.play().catch(() => {});
    } catch (e) {}
  }

  generateSilentKeepAliveWav() {
    const sampleRate = 8000;
    const samples = new Int16Array(sampleRate); // 1秒微底噪
    for (let i = 0; i < samples.length; i++) {
      samples[i] = (Math.random() - 0.5) * 2;
    }
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    const writeString = (v, offset, str) => {
      for (let i = 0; i < str.length; i++) v.setUint8(offset + i, str.charCodeAt(i));
    };
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, samples.length * 2, true);
    for (let i = 0; i < samples.length; i++) {
      view.setInt16(44 + i * 2, samples[i], true);
    }
    return new Blob([buffer], { type: 'audio/wav' });
  }
}

window.WebAudioMetronome = WebAudioMetronome;
