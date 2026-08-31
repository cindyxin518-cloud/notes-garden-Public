/**
 * 🏃‍♂️ Cadence Metronome - Controller & Interaction Engine
 */

(function() {
  'use strict';

  // Instantiate Audio Engine
  const audioEngine = new CadenceAudioEngine();

  // --- State ---
  let isEnglish = true;
  let isPlaying = false;
  let spm = 180;
  let currentSound = 'woodblock';
  let volume = 0.8;
  let isVibrate = false;
  let totalSteps = 0;
  let elapsedSeconds = 0;
  let timerInterval = null;

  // --- DOM Elements ---
  const appTitle = document.getElementById('appTitle');
  const appSubtitle = document.getElementById('appSubtitle');
  const langToggleBtn = document.getElementById('langToggleBtn');
  const statusBadge = document.getElementById('statusBadge');
  const leftFoot = document.getElementById('leftFoot');
  const rightFoot = document.getElementById('rightFoot');
  const spmCircle = document.getElementById('spmCircle');
  const spmDisplay = document.getElementById('spmDisplay');
  const spmUnit = document.getElementById('spmUnit');
  const spmSlider = document.getElementById('spmSlider');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  const workoutDuration = document.getElementById('workoutDuration');
  const workoutSteps = document.getElementById('workoutSteps');
  const durationLabel = document.getElementById('durationLabel');
  const stepsLabel = document.getElementById('stepsLabel');
  const soundHeaderTitle = document.getElementById('soundHeaderTitle');
  const volumeLabel = document.getElementById('volumeLabel');
  const volumeSlider = document.getElementById('volumeSlider');
  const vibrateToggle = document.getElementById('vibrateToggle');
  const vibrateLabel = document.getElementById('vibrateLabel');

  const presetBtns = document.querySelectorAll('.preset-btn');
  const adjBtns = document.querySelectorAll('.adj-btn');
  const soundChips = document.querySelectorAll('.sound-chip');

  // --- Multi-Language Dictionary ---
  const i18n = {
    en: {
      appTitle: "Cadence Metronome",
      appSubtitle: "Background Audio Mixer",
      langBtn: "🇨🇳 中文",
      ready: "Ready",
      active: "Active",
      leftFoot: "LEFT (L)",
      rightFoot: "RIGHT (R)",
      spmUnit: "SPM CADENCE",
      start: (val) => `▶ START (${val} SPM)`,
      stop: (val) => `⏸ STOP (${val} SPM)`,
      duration: "Duration",
      steps: "Total Steps",
      soundTitle: "🔊 Sound & Volume",
      woodblock: "🪵 Woodblock",
      dualtone: "👟 Dual-Tone",
      click: "⏱️ Mechanical",
      beep: "⚡ Electronic",
      cowbell: "🔔 Cowbell",
      volume: (val) => `Volume: ${val}%`,
      vibrate: "Haptic Beat Vibration"
    },
    zh: {
      appTitle: "步频节拍器",
      appSubtitle: "原生后台混音版",
      langBtn: "🇺🇸 English",
      ready: "就绪",
      active: "打拍中",
      leftFoot: "左脚 L",
      rightFoot: "右脚 R",
      spmUnit: "SPM 步频",
      start: (val) => `▶ 开始打拍 (${val} SPM)`,
      stop: (val) => `⏸ 正在打拍 (${val} SPM)`,
      duration: "打拍时长",
      steps: "累计步数",
      soundTitle: "🔊 音色与音量",
      woodblock: "🪵 清脆木鱼",
      dualtone: "👟 左右双音",
      click: "⏱️ 机械滴答",
      beep: "⚡ 电子蜂鸣",
      cowbell: "🔔 运动牛铃",
      volume: (val) => `打拍音量: ${val}%`,
      vibrate: "触觉震动打拍"
    }
  };

  function updateSliderFill(slider) {
    const min = slider.min || 0;
    const max = slider.max || 100;
    const val = slider.value;
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percentage}%, #1e293b ${percentage}%, #1e293b 100%)`;
  }

  function updateLanguage() {
    const lang = isEnglish ? i18n.en : i18n.zh;
    appTitle.textContent = lang.appTitle;
    appSubtitle.textContent = lang.appSubtitle;
    langToggleBtn.textContent = lang.langBtn;
    statusBadge.textContent = isPlaying ? lang.active : lang.ready;
    leftFoot.textContent = lang.leftFoot;
    rightFoot.textContent = lang.rightFoot;
    spmUnit.textContent = lang.spmUnit;
    durationLabel.textContent = lang.duration;
    stepsLabel.textContent = lang.steps;
    soundHeaderTitle.textContent = lang.soundTitle;
    volumeLabel.textContent = lang.volume(Math.round(volume * 100));
    vibrateLabel.textContent = lang.vibrate;

    soundChips.forEach(chip => {
      const s = chip.getAttribute('data-sound');
      if (lang[s]) chip.textContent = lang[s];
    });

    if (isPlaying) {
      playText.textContent = isEnglish ? `STOP (${spm} SPM)` : `正在打拍 (${spm} SPM)`;
      playIcon.textContent = '⏸';
    } else {
      playText.textContent = isEnglish ? `START (${spm} SPM)` : `开始打拍 (${spm} SPM)`;
      playIcon.textContent = '▶';
    }
  }

  function setSpm(newSpm) {
    spm = Math.max(120, Math.min(240, newSpm));
    spmDisplay.textContent = spm;
    spmSlider.value = spm;
    updateSliderFill(spmSlider);

    presetBtns.forEach(btn => {
      const p = parseInt(btn.getAttribute('data-spm'), 10);
      btn.classList.toggle('active', p === spm);
    });

    updateLanguage();
    audioEngine.setBpm(spm);
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.classList.toggle('playing', isPlaying);
    statusBadge.classList.toggle('active', isPlaying);

    if (isPlaying) {
      audioEngine.setBpm(spm);
      audioEngine.setSoundType(currentSound);
      audioEngine.setVolume(volume);
      audioEngine.start(onBeat);
      startTimer();
    } else {
      audioEngine.stop();
      stopTimer();
      resetBeatVisuals();
    }
    updateLanguage();
  }

  function onBeat(beatIndex) {
    totalSteps++;
    workoutSteps.textContent = totalSteps;

    // Beating circle glow
    spmCircle.classList.add('beating');
    setTimeout(() => spmCircle.classList.remove('beating'), 90);

    // Left/Right foot alternation
    if (beatIndex % 2 === 0) {
      leftFoot.classList.add('active-left');
      rightFoot.classList.remove('active-right');
    } else {
      rightFoot.classList.add('active-right');
      leftFoot.classList.remove('active-left');
    }

    // Haptic vibration
    if (isVibrate && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch (e) {}
    }
  }

  function resetBeatVisuals() {
    leftFoot.classList.remove('active-left');
    rightFoot.classList.remove('active-right');
    spmCircle.classList.remove('beating');
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      const m = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
      const s = String(elapsedSeconds % 60).padStart(2, '0');
      workoutDuration.textContent = `${m}:${s}`;
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // --- Event Listeners ---
  langToggleBtn.addEventListener('click', () => {
    isEnglish = !isEnglish;
    updateLanguage();
  });

  spmCircle.addEventListener('click', togglePlay);
  playBtn.addEventListener('click', togglePlay);

  adjBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.getAttribute('data-step'), 10);
      setSpm(spm + step);
    });
  });

  spmSlider.addEventListener('input', (e) => {
    setSpm(parseInt(e.target.value, 10));
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.getAttribute('data-spm'), 10);
      setSpm(p);
    });
  });

  soundChips.forEach(chip => {
    chip.addEventListener('click', () => {
      soundChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentSound = chip.getAttribute('data-sound');
      audioEngine.setSoundType(currentSound);
      if (!isPlaying) {
        audioEngine.playPreviewTone();
      }
    });
  });

  volumeSlider.addEventListener('input', (e) => {
    volume = parseFloat(e.target.value);
    updateSliderFill(volumeSlider);
    const lang = isEnglish ? i18n.en : i18n.zh;
    volumeLabel.textContent = lang.volume(Math.round(volume * 100));
    audioEngine.setVolume(volume);
  });

  vibrateToggle.addEventListener('change', (e) => {
    isVibrate = e.target.checked;
    if (isVibrate && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 40, 40]);
      } catch (e) {}
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      togglePlay();
    }
  });

  // Init
  updateSliderFill(spmSlider);
  updateSliderFill(volumeSlider);
  updateLanguage();

})();
