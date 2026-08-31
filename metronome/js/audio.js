/**
 * 🏃‍♂️ Cadence Metronome - Ultra Reliable Hybrid PCM Loop Engine
 * 
 * Generates exact 2-beat WAV audio loop played via HTML5 <audio loop>.
 * Guarantees loud media playback on iOS (even with Silent switch on) and Android.
 */

class CadenceAudioEngine {
  constructor() {
    this.bpm = 180;
    this.soundType = 'woodblock';
    this.volume = 0.8;
    this.isPlaying = false;
    this.onBeat = null;

    // HTML5 Audio Element for seamless hardware looping
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.setAttribute('playsinline', '');
    this.audioElement.setAttribute('webkit-playsinline', '');
    this.currentBlobUrl = null;

    // Visual synchronization timer
    this.visualTimer = null;
    this.beatCount = 0;

    // Web Audio fallback for instant tap previews
    this.audioCtx = null;
  }

  initWebAudio() {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    } catch (e) {}
  }

  setBpm(newBpm) {
    this.bpm = Math.max(120, Math.min(240, newBpm));
    if (this.isPlaying) {
      this.refreshTrack(true);
      this.restartVisualLoop();
    }
  }

  setSoundType(type) {
    this.soundType = type;
    if (this.isPlaying) {
      this.refreshTrack(true);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  generateWavBlob() {
    const sampleRate = 44100;
    const beatDuration = 60.0 / this.bpm;
    const totalDuration = beatDuration * 2; // 左脚 + 右脚 2 拍循环
    const totalSamples = Math.floor(totalDuration * sampleRate);

    const buffer = new Float32Array(totalSamples);

    // 渲染第 1 拍 (左脚，t = 0)
    this.renderToneToBuffer(buffer, 0, sampleRate, true);

    // 渲染第 2 拍 (右脚，t = beatDuration)
    const beat2Sample = Math.floor(beatDuration * sampleRate);
    this.renderToneToBuffer(buffer, beat2Sample, sampleRate, false);

    return this.encodeWav(buffer, sampleRate);
  }

  renderToneToBuffer(buffer, startSample, sampleRate, isLeftFoot) {
    const maxToneLen = Math.floor(0.12 * sampleRate);

    for (let i = 0; i < maxToneLen && (startSample + i) < buffer.length; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (this.soundType) {
        case 'woodblock': {
          // 清脆木鱼：指数频率下潜与瞬态衰减
          const baseFreq = isLeftFoot ? 820 : 1050;
          const decay = Math.exp(-t * 90);
          const freq = baseFreq * (1 + 0.35 * Math.exp(-t * 160));
          sample = Math.sin(2 * Math.PI * freq * t) * decay * 0.95;
          break;
        }

        case 'dualtone': {
          // 左右双音：左脚 720Hz，右脚 1150Hz
          const freq = isLeftFoot ? 720 : 1150;
          const decay = Math.exp(-t * 70);
          const phase = (t * freq) % 1;
          const tri = 4 * Math.abs(phase - 0.5) - 1;
          sample = tri * decay * 0.9;
          break;
        }

        case 'click': {
          // 机械滴答：方波脉冲
          const freq = isLeftFoot ? 1800 : 1500;
          const decay = Math.exp(-t * 180);
          const sq = Math.sin(2 * Math.PI * freq * t) >= 0 ? 1 : -1;
          sample = sq * decay * 0.85;
          break;
        }

        case 'beep': {
          // 电子蜂鸣
          const freq = isLeftFoot ? 1200 : 950;
          const decay = Math.exp(-t * 60);
          sample = Math.sin(2 * Math.PI * freq * t) * decay * 0.9;
          break;
        }

        case 'cowbell': {
          // 运动牛铃
          const root = isLeftFoot ? 800 : 600;
          const decay = Math.exp(-t * 50);
          const s1 = Math.sin(2 * Math.PI * root * t);
          const s2 = Math.sin(2 * Math.PI * (root * 1.5) * t);
          sample = (s1 + 0.5 * s2) * decay * 0.75;
          break;
        }

        default:
          break;
      }

      buffer[startSample + i] += sample;
    }
  }

  encodeWav(samples, sampleRate) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataLength = samples.length * (bitsPerSample / 8);
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    const writeString = (v, offset, str) => {
      for (let i = 0; i < str.length; i++) v.setUint8(offset + i, str.charCodeAt(i));
    };

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  refreshTrack(keepPlaying = true) {
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

  start(onBeatCallback) {
    if (this.isPlaying) return;
    this.initWebAudio();
    this.isPlaying = true;
    this.onBeat = onBeatCallback;
    this.beatCount = 0;

    this.refreshTrack(true);
    this.restartVisualLoop();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.audioElement.pause();
    this.stopVisualLoop();
  }

  restartVisualLoop() {
    this.stopVisualLoop();
    const intervalMs = (60.0 / this.bpm) * 1000;

    if (this.onBeat) {
      this.onBeat(this.beatCount);
    }
    this.beatCount++;

    this.visualTimer = setInterval(() => {
      if (this.isPlaying && this.onBeat) {
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

  playPreviewTone() {
    try {
      this.initWebAudio();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.09);
    } catch (e) {}
  }
}

window.CadenceAudioEngine = CadenceAudioEngine;
