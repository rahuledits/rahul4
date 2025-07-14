import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';

interface SoundEffectsProps {
  isDarkMode?: boolean;
}

// Sound URLs (you can replace these with actual sound files)
const SOUNDS = {
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  notification: '/sounds/notification.mp3',
  ambient: '/sounds/ambient.mp3'
};

// Fallback sounds using Web Audio API
const createFallbackSound = (type: 'hover' | 'click' | 'success' | 'error' | 'notification') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Different frequencies for different sounds
  const frequencies = {
    hover: 800,
    click: 600,
    success: 1000,
    error: 200,
    notification: 1200
  };
  
  oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isEnabled: boolean = true;
  private volume: number = 0.3;
  private ambientAudio: HTMLAudioElement | null = null;
  private isAmbientPlaying: boolean = false;

  constructor() {
    this.loadSounds();
    this.loadSettings();
  }

  private loadSounds() {
    // Try to load actual sound files, fallback to generated sounds
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = this.volume;
      audio.preload = 'auto';
      
      // Handle load errors by using fallback
      audio.addEventListener('error', () => {
        console.log(`Failed to load ${key} sound, using fallback`);
      });
      
      this.sounds.set(key, audio);
    });
  }

  private loadSettings() {
    const savedEnabled = localStorage.getItem('soundEnabled');
    const savedVolume = localStorage.getItem('soundVolume');
    
    if (savedEnabled !== null) {
      this.isEnabled = savedEnabled === 'true';
    }
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
    }
  }

  private saveSettings() {
    localStorage.setItem('soundEnabled', this.isEnabled.toString());
    localStorage.setItem('soundVolume', this.volume.toString());
  }

  play(soundType: 'hover' | 'click' | 'success' | 'error' | 'notification') {
    if (!this.isEnabled) return;

    try {
      const audio = this.sounds.get(soundType);
      if (audio && audio.readyState >= 2) {
        audio.currentTime = 0;
        audio.volume = this.volume;
        audio.play().catch(() => {
          // Fallback to generated sound
          createFallbackSound(soundType);
        });
      } else {
        // Fallback to generated sound
        createFallbackSound(soundType);
      }
    } catch (error) {
      // Fallback to generated sound
      createFallbackSound(soundType);
    }
  }

  toggleAmbient() {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
  }

  private startAmbient() {
    if (!this.isEnabled) return;

    try {
      const ambient = this.sounds.get('ambient');
      if (ambient) {
        ambient.volume = this.volume * 0.3; // Lower volume for ambient
        ambient.loop = true;
        ambient.play().catch(() => {
          console.log('Ambient sound failed to play');
        });
        this.isAmbientPlaying = true;
      }
    } catch (error) {
      console.log('Ambient sound error:', error);
    }
  }

  private stopAmbient() {
    const ambient = this.sounds.get('ambient');
    if (ambient) {
      ambient.pause();
      ambient.currentTime = 0;
    }
    this.isAmbientPlaying = false;
  }

  toggleEnabled() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stopAmbient();
    }
    this.saveSettings();
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(audio => {
      audio.volume = this.volume;
    });
    if (this.isAmbientPlaying) {
      const ambient = this.sounds.get('ambient');
      if (ambient) {
        ambient.volume = this.volume * 0.3;
      }
    }
    this.saveSettings();
  }

  getEnabled() {
    return this.isEnabled;
  }

  getVolume() {
    return this.volume;
  }

  getAmbientPlaying() {
    return this.isAmbientPlaying;
  }
}

// Global sound manager instance
export const soundManager = new SoundManager();

// Hook for components to use sounds
export const useSoundEffects = () => {
  const [isEnabled, setIsEnabled] = useState(soundManager.getEnabled());
  const [volume, setVolume] = useState(soundManager.getVolume());
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(soundManager.getAmbientPlaying());

  const playHover = () => soundManager.play('hover');
  const playClick = () => soundManager.play('click');
  const playSuccess = () => soundManager.play('success');
  const playError = () => soundManager.play('error');
  const playNotification = () => soundManager.play('notification');

  const toggleEnabled = () => {
    soundManager.toggleEnabled();
    setIsEnabled(soundManager.getEnabled());
  };

  const updateVolume = (newVolume: number) => {
    soundManager.setVolume(newVolume);
    setVolume(soundManager.getVolume());
  };

  const toggleAmbient = () => {
    soundManager.toggleAmbient();
    setIsAmbientPlaying(soundManager.getAmbientPlaying());
  };

  return {
    playHover,
    playClick,
    playSuccess,
    playError,
    playNotification,
    toggleEnabled,
    updateVolume,
    toggleAmbient,
    isEnabled,
    volume,
    isAmbientPlaying
  };
};

// Sound Controls Component
const SoundControls: React.FC<SoundEffectsProps> = ({ isDarkMode = false }) => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    isEnabled,
    volume,
    isAmbientPlaying,
    toggleEnabled,
    updateVolume,
    toggleAmbient
  } = useSoundEffects();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Main Toggle Button */}
        <button
          onClick={() => {
            toggleEnabled();
            soundManager.play('click');
          }}
          className={`p-3 rounded-full shadow-lg transition-all ${
            isEnabled 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          }`}
          onMouseEnter={() => soundManager.play('hover')}
        >
          {isEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => {
            setShowSettings(!showSettings);
            soundManager.play('click');
          }}
          className="absolute -top-2 -left-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all"
          onMouseEnter={() => soundManager.play('hover')}
        >
          <Settings className="w-3 h-3" />
        </button>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute bottom-full right-0 mb-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-64">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Sound Settings
            </h3>
            
            {/* Volume Slider */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => updateVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Ambient Music Toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Ambient Music
              </span>
              <button
                onClick={() => {
                  toggleAmbient();
                  soundManager.play('click');
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isAmbientPlaying
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                }`}
                onMouseEnter={() => soundManager.play('hover')}
              >
                {isAmbientPlaying ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Test Sounds */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">Test Sounds:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => soundManager.play('hover')}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Hover
                </button>
                <button
                  onClick={() => soundManager.play('click')}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Click
                </button>
                <button
                  onClick={() => soundManager.play('success')}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Success
                </button>
                <button
                  onClick={() => soundManager.play('error')}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Error
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoundControls; 