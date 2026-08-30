/**
 * 跑步步频节拍器 - 主逻辑控制器
 */

document.addEventListener('DOMContentLoaded', () => {
  // 实例化各模块
  const audio = new MetronomeAudioEngine();
  const tapTracker = new TapCadenceTracker();

  // DOM 元素引用
  const spmDisplay = document.getElementById('spmDisplay');
  const spmSlider = document.getElementById('spmSlider');
  const pulseRing = document.getElementById('pulseRing');
  const spmCircle = document.getElementById('spmCircle');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');

  const leftFootBadge = document.getElementById('leftFootBadge');
  const rightFootBadge = document.getElementById('rightFootBadge');

  const subFiveBtn = document.getElementById('subFiveBtn');
  const subOneBtn = document.getElementById('subOneBtn');
  const addOneBtn = document.getElementById('addOneBtn');
  const addFiveBtn = document.getElementById('addFiveBtn');

  const presetChips = document.querySelectorAll('.preset-chip');
  const soundTabs = document.querySelectorAll('.sound-tab');
  const volumeSlider = document.getElementById('volumeSlider');
  const pitchSlider = document.getElementById('pitchSlider');
  const vibrateToggle = document.getElementById('vibrateToggle');

  const workoutTimerEl = document.getElementById('workoutTimer');
  const workoutStepsEl = document.getElementById('workoutSteps');

  const tapArea = document.getElementById('tapArea');
  const tapSpmVal = document.getElementById('tapSpmVal');
  const tapConsistencyVal = document.getElementById('tapConsistencyVal');
  const applyTapSpmBtn = document.getElementById('applyTapSpmBtn');
  const resetTapBtn = document.getElementById('resetTapBtn');

  const runnerHeight = document.getElementById('runnerHeight');
  const runnerStride = document.getElementById('runnerStride');
  const calcPace = document.getElementById('calcPace');
  const calcSpeed = document.getElementById('calcSpeed');

  const wakeLockBtn = document.getElementById('wakeLockBtn');
  const wakeLockText = document.getElementById('wakeLockText');

  // 状态变量
  let currentSpm = 180;
  let workoutSeconds = 0;
  let workoutSteps = 0;
  let workoutInterval = null;
  let wakeLockSentinel = null;
  let lastMeasuredSpm = null;

  // 载入本地缓存设置
  loadStoredSettings();

  // 更新 UI 步频显示
  function updateSpm(newSpm, syncSlider = true) {
    currentSpm = Math.max(60, Math.min(260, Math.round(newSpm)));
    spmDisplay.textContent = currentSpm;
    if (syncSlider) {
      spmSlider.value = currentSpm;
    }
    audio.setBpm(currentSpm);
    playText.textContent = audio.isPlaying ? `打拍中 (${currentSpm} SPM)` : `开始打拍 (${currentSpm} SPM)`;

    // 更新预设 chip 选中状态
    presetChips.forEach(chip => {
      const chipSpm = parseInt(chip.dataset.spm, 10);
      chip.classList.toggle('active', chipSpm === currentSpm);
    });

    // 重新计算配速
    updatePaceCalculator();
  }

  // 节拍声音触发时 UI 动效回调
  audio.onBeat = (beatNumber) => {
    // 脉冲波纹 (仅前台渲染)
    if (document.visibilityState === 'visible') {
      pulseRing.classList.remove('pulsing');
      void pulseRing.offsetWidth; // 触发 reflow 重新激活 css 动画
      pulseRing.classList.add('pulsing');

      // 左右脚交替高亮
      const isLeft = (beatNumber % 2 === 0);
      if (isLeft) {
        leftFootBadge.classList.add('active-left');
        rightFootBadge.classList.remove('active-right');
      } else {
        rightFootBadge.classList.add('active-right');
        leftFootBadge.classList.remove('active-left');
      }
    }

    // 累计步数增加
    workoutSteps++;
    workoutStepsEl.textContent = workoutSteps;

    // 触觉振动反馈
    if (vibrateToggle.checked && 'vibrate' in navigator) {
      navigator.vibrate((beatNumber % 2 === 0) ? 20 : 12);
    }
  };

  // 监听播放状态改变（包括来自页面点击、系统锁屏控制或蓝牙耳机按键）
  audio.onStateChange = (isPlaying) => {
    if (isPlaying) {
      playBtn.classList.add('playing');
      playIcon.textContent = '⏸';
      playText.textContent = `打拍中 (${currentSpm} SPM)`;
      startWorkoutTimer();
    } else {
      playBtn.classList.remove('playing');
      playIcon.textContent = '▶';
      playText.textContent = `开始打拍 (${currentSpm} SPM)`;
      leftFootBadge.classList.remove('active-left');
      rightFootBadge.classList.remove('active-right');
      pulseRing.classList.remove('pulsing');
      pauseWorkoutTimer();
    }
  };

  // 开始 / 停止控制
  function togglePlay() {
    audio.toggle();
  }

  function startWorkoutTimer() {
    if (workoutInterval) clearInterval(workoutInterval);
    workoutInterval = setInterval(() => {
      workoutSeconds++;
      workoutTimerEl.textContent = RunningCalculator.formatDuration(workoutSeconds);
    }, 1000);
  }

  function pauseWorkoutTimer() {
    if (workoutInterval) {
      clearInterval(workoutInterval);
      workoutInterval = null;
    }
  }

  // 步频调整事件
  subOneBtn.addEventListener('click', () => updateSpm(currentSpm - 1));
  addOneBtn.addEventListener('click', () => updateSpm(currentSpm + 1));
  subFiveBtn.addEventListener('click', () => updateSpm(currentSpm - 5));
  addFiveBtn.addEventListener('click', () => updateSpm(currentSpm + 5));

  spmSlider.addEventListener('input', (e) => {
    updateSpm(parseInt(e.target.value, 10), false);
  });

  spmCircle.addEventListener('click', togglePlay);
  playBtn.addEventListener('click', togglePlay);

  // 预设点击
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const spm = parseInt(chip.dataset.spm, 10);
      updateSpm(spm);
    });
  });

  // 音色切换
  soundTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      soundTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const sound = tab.dataset.sound;
      audio.setSoundType(sound);
      saveSetting('metronome_sound', sound);
    });
  });

  // 音量与音调
  volumeSlider.addEventListener('input', (e) => {
    const vol = parseFloat(e.target.value);
    audio.setVolume(vol);
    saveSetting('metronome_volume', vol);
  });

  pitchSlider.addEventListener('input', (e) => {
    const pitch = parseFloat(e.target.value);
    audio.setPitchMultiplier(pitch);
    saveSetting('metronome_pitch', pitch);
  });

  // Tap 测步频
  function handleTap() {
    tapArea.classList.add('tapped');
    setTimeout(() => tapArea.classList.remove('tapped'), 100);

    const result = tapTracker.recordTap();

    if (result.spm) {
      lastMeasuredSpm = result.spm;
      tapSpmVal.textContent = result.spm;
      applyTapSpmBtn.disabled = false;

      if (result.consistency !== null) {
        tapConsistencyVal.textContent = `${result.consistency}%`;
      } else {
        tapConsistencyVal.textContent = `测量中(${result.count}次)`;
      }
    } else {
      tapSpmVal.textContent = '--';
      tapConsistencyVal.textContent = `第 ${result.count} 次点击`;
      applyTapSpmBtn.disabled = true;
    }

    if (vibrateToggle.checked && 'vibrate' in navigator) {
      navigator.vibrate(15);
    }
  }

  tapArea.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    handleTap();
  });

  resetTapBtn.addEventListener('click', () => {
    tapTracker.reset();
    tapSpmVal.textContent = '--';
    tapConsistencyVal.textContent = '--';
    applyTapSpmBtn.disabled = true;
    lastMeasuredSpm = null;
  });

  applyTapSpmBtn.addEventListener('click', () => {
    if (lastMeasuredSpm) {
      updateSpm(lastMeasuredSpm);
    }
  });

  // 步频/步幅/配速换算
  function updatePaceCalculator() {
    const stride = parseFloat(runnerStride.value) || 1.0;
    const paceInfo = RunningCalculator.calculatePace(currentSpm, stride);

    calcPace.textContent = paceInfo.paceFormatted;
    calcSpeed.textContent = paceInfo.speedKmh.toFixed(2);
  }

  runnerHeight.addEventListener('input', () => {
    const height = parseFloat(runnerHeight.value);
    if (height && height > 100) {
      const estimatedStride = RunningCalculator.estimateStrideFromHeight(height, 'moderate');
      runnerStride.value = estimatedStride.toFixed(2);
      saveSetting('runner_height', height);
      saveSetting('runner_stride', estimatedStride);
      updatePaceCalculator();
    }
  });

  runnerStride.addEventListener('input', () => {
    saveSetting('runner_stride', parseFloat(runnerStride.value));
    updatePaceCalculator();
  });

  // 屏幕常亮 Wake Lock 控制 (默认关闭以最大化省电，仅在需要看屏幕时开启)
  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        wakeLockSentinel = await navigator.wakeLock.request('screen');
        wakeLockBtn.classList.add('active');
        wakeLockText.textContent = '强制常亮: 开';

        wakeLockSentinel.addEventListener('release', () => {
          wakeLockSentinel = null;
          wakeLockBtn.classList.remove('active');
          wakeLockText.textContent = '锁屏省电模式: 开';
        });
      } catch (err) {
        console.warn('Wake Lock request failed:', err);
      }
    }
  }

  async function releaseWakeLock() {
    if (wakeLockSentinel) {
      await wakeLockSentinel.release();
      wakeLockSentinel = null;
      wakeLockBtn.classList.remove('active');
      wakeLockText.textContent = '锁屏省电模式: 开';
    }
  }

  wakeLockBtn.addEventListener('click', async () => {
    if (wakeLockSentinel) {
      await releaseWakeLock();
    } else {
      await requestWakeLock();
    }
  });

  // 页面可见性改变时恢复常亮（如切回前台）
  document.addEventListener('visibilitychange', async () => {
    if (wakeLockSentinel !== null && document.visibilityState === 'visible') {
      await requestWakeLock();
    }
  });

  // 键盘全局快捷键
  window.addEventListener('keydown', (e) => {
    // 如果焦点在输入框中，不拦截快捷键
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'KeyT') {
      e.preventDefault();
      handleTap();
    } else if (e.code === 'ArrowUp' || e.code === 'Equal') {
      e.preventDefault();
      updateSpm(currentSpm + 1);
    } else if (e.code === 'ArrowDown' || e.code === 'Minus') {
      e.preventDefault();
      updateSpm(currentSpm - 1);
    } else if (e.code === 'Digit1') {
      updateSpm(160);
    } else if (e.code === 'Digit2') {
      updateSpm(170);
    } else if (e.code === 'Digit3') {
      updateSpm(180);
    } else if (e.code === 'Digit4') {
      updateSpm(190);
    }
  });

  // ================= 一体化播客播放器逻辑 =================
  const podcastTabBtns = document.querySelectorAll('.podcast-tab-btn');
  const podcastPresets = document.getElementById('podcastPresets');
  const podcastFileInput = document.getElementById('podcastFileInput');
  const podcastUrlInput = document.getElementById('podcastUrlInput');
  const presetTrackBtns = document.querySelectorAll('.preset-track-btn');
  const localAudioPicker = document.getElementById('localAudioPicker');
  const podcastUrlField = document.getElementById('podcastUrlField');
  const podcastUrlLoadBtn = document.getElementById('podcastUrlLoadBtn');

  const podcastTitle = document.getElementById('podcastTitle');
  const podcastStatus = document.getElementById('podcastStatus');
  const podcastProgressBar = document.getElementById('podcastProgressBar');
  const podcastCurrentTime = document.getElementById('podcastCurrentTime');
  const podcastDuration = document.getElementById('podcastDuration');
  const podcastPlayBtn = document.getElementById('podcastPlayBtn');
  const podcastRewindBtn = document.getElementById('podcastRewindBtn');
  const podcastForwardBtn = document.getElementById('podcastForwardBtn');
  const podcastSpeedBtn = document.getElementById('podcastSpeedBtn');
  const podcastVolSlider = document.getElementById('podcastVolSlider');
  const podcastVolVal = document.getElementById('podcastVolVal');
  const metronomeMixSlider = document.getElementById('metronomeMixSlider');
  const metronomeMixVal = document.getElementById('metronomeMixVal');

  const podcastAudio = new Audio();
  podcastAudio.setAttribute('playsinline', '');
  podcastAudio.setAttribute('webkit-playsinline', '');
  podcastAudio.volume = 0.8;

  const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];
  let currentSpeedIndex = 0;
  let isSeekingPodcast = false;

  // 默认载入第一个示例音频
  let currentPodcastTrack = {
    title: '🏃‍♂️ 经典跑步呼吸与节奏指引 (示例音频)',
    url: 'https://actions.google.com/sounds/v1/sports/runners_rhythm.ogg'
  };
  podcastAudio.src = currentPodcastTrack.url;

  // 切换音频源 Tab
  podcastTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      podcastTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const src = btn.dataset.source;
      podcastPresets.style.display = (src === 'preset') ? 'flex' : 'none';
      podcastFileInput.style.display = (src === 'file') ? 'block' : 'none';
      podcastUrlInput.style.display = (src === 'url') ? 'flex' : 'none';
    });
  });

  // 预设音频点击
  presetTrackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetTrackBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const url = btn.dataset.url;
      const title = btn.dataset.title;
      loadPodcastTrack(url, title);
    });
  });

  // 本地音频文件选择 (iPhone 文件或相册)
  localAudioPicker.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      loadPodcastTrack(fileUrl, `📁 ${file.name}`);
    }
  });

  // URL 链接加载
  podcastUrlLoadBtn.addEventListener('click', () => {
    const url = podcastUrlField.value.trim();
    if (url) {
      loadPodcastTrack(url, '🔗 自定义播客网络音频');
    }
  });

  function loadPodcastTrack(url, title) {
    currentPodcastTrack = { url, title };
    podcastTitle.textContent = title;
    podcastStatus.textContent = '加载中...';
    podcastAudio.src = url;
    podcastAudio.load();
    podcastProgressBar.value = 0;
    podcastCurrentTime.textContent = '00:00';
  }

  // 播客播放控制
  function togglePodcastPlay() {
    if (podcastAudio.paused) {
      podcastAudio.play().then(() => {
        podcastPlayBtn.textContent = '⏸';
        podcastStatus.textContent = `▶ 正在播放 · 步频 ${currentSpm} SPM 伴跑中`;

        // 联动开启节拍器打拍
        if (!audio.isPlaying) {
          audio.start();
        }
      }).catch(err => {
        podcastStatus.textContent = '播放失败，请检查网络或更换音频';
        console.warn('Podcast play error:', err);
      });
    } else {
      podcastAudio.pause();
      podcastPlayBtn.textContent = '▶';
      podcastStatus.textContent = '已暂停';
    }
  }

  podcastPlayBtn.addEventListener('click', togglePodcastPlay);

  // 快退 / 快进 15 秒
  podcastRewindBtn.addEventListener('click', () => {
    podcastAudio.currentTime = Math.max(0, podcastAudio.currentTime - 15);
  });

  podcastForwardBtn.addEventListener('click', () => {
    if (podcastAudio.duration) {
      podcastAudio.currentTime = Math.min(podcastAudio.duration, podcastAudio.currentTime + 15);
    }
  });

  // 倍速切换
  podcastSpeedBtn.addEventListener('click', () => {
    currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
    const speed = speeds[currentSpeedIndex];
    podcastAudio.playbackRate = speed;
    podcastSpeedBtn.textContent = `${speed.toFixed(speed % 1 === 0 ? 1 : 2)}x`;
  });

  // 进度更新与拖动
  podcastAudio.addEventListener('loadedmetadata', () => {
    podcastStatus.textContent = `就绪 (时长: ${formatTime(podcastAudio.duration)})`;
    podcastDuration.textContent = formatTime(podcastAudio.duration);
  });

  podcastAudio.addEventListener('timeupdate', () => {
    if (!isSeekingPodcast && podcastAudio.duration) {
      const progress = (podcastAudio.currentTime / podcastAudio.duration) * 100;
      podcastProgressBar.value = progress;
      podcastCurrentTime.textContent = formatTime(podcastAudio.currentTime);
    }
  });

  podcastProgressBar.addEventListener('input', () => {
    isSeekingPodcast = true;
    if (podcastAudio.duration) {
      const seekTime = (podcastProgressBar.value / 100) * podcastAudio.duration;
      podcastCurrentTime.textContent = formatTime(seekTime);
    }
  });

  podcastProgressBar.addEventListener('change', () => {
    if (podcastAudio.duration) {
      podcastAudio.currentTime = (podcastProgressBar.value / 100) * podcastAudio.duration;
    }
    isSeekingPodcast = false;
  });

  podcastAudio.addEventListener('ended', () => {
    podcastPlayBtn.textContent = '▶';
    podcastStatus.textContent = '播放完毕';
  });

  // 双音量调节
  podcastVolSlider.addEventListener('input', (e) => {
    const vol = parseFloat(e.target.value);
    podcastAudio.volume = vol;
    podcastVolVal.textContent = `${Math.round(vol * 100)}%`;
  });

  metronomeMixSlider.addEventListener('input', (e) => {
    const vol = parseFloat(e.target.value);
    audio.setVolume(vol);
    volumeSlider.value = vol;
    metronomeMixVal.textContent = `${Math.round(vol * 100)}%`;
  });

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // 设置持久化
  function saveSetting(key, value) {
    try {
      localStorage.setItem(`cadence_${key}`, JSON.stringify(value));
    } catch (e) {}
  }

  function loadStoredSettings() {
    try {
      const storedSound = JSON.parse(localStorage.getItem('cadence_metronome_sound'));
      if (storedSound) {
        audio.setSoundType(storedSound);
        soundTabs.forEach(tab => {
          tab.classList.toggle('active', tab.dataset.sound === storedSound);
        });
      }

      const storedVol = JSON.parse(localStorage.getItem('cadence_metronome_volume'));
      if (storedVol !== null) {
        audio.setVolume(storedVol);
        volumeSlider.value = storedVol;
        metronomeMixSlider.value = storedVol;
        metronomeMixVal.textContent = `${Math.round(storedVol * 100)}%`;
      }

      const storedPitch = JSON.parse(localStorage.getItem('cadence_metronome_pitch'));
      if (storedPitch !== null) {
        audio.setPitchMultiplier(storedPitch);
        pitchSlider.value = storedPitch;
      }

      const storedHeight = JSON.parse(localStorage.getItem('cadence_runner_height'));
      if (storedHeight) runnerHeight.value = storedHeight;

      const storedStride = JSON.parse(localStorage.getItem('cadence_runner_stride'));
      if (storedStride) runnerStride.value = storedStride;

    } catch (e) {}
  }

  // 初始化首次计算
  updateSpm(180);
  updatePaceCalculator();
});

