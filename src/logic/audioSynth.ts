// Web Audio API Synthesizer for Cyberpunk Sound Effects

class CyberAudioSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Audio Context is initialized lazily on first user interaction due to browser autoplay policies
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    if (!mute) {
      this.initContext();
    }
  }

  getMuted() {
    return this.isMuted;
  }

  // 1. Brief high-pitched synthetic cyber-click
  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, time);
    osc.frequency.exponentialRampToValueAtTime(300, time + 0.08);

    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.08);
  }

  // 2. Neon digital confirmation beep
  playBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(900, time);
    osc.frequency.setValueAtTime(1200, time + 0.05);

    gain.gain.setValueAtTime(0.04, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  // 3. Cyber-synthesizer success chord (Blip-Blop)
  playSuccess() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    
    // Play multiple notes sequentially to sound like a code execution
    const notes = [600, 800, 1000, 1500];
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const noteTime = time + index * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      
      gain.gain.setValueAtTime(0.03, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.25);
    });
  }

  // 4. Computation radar sweep sound
  playProcessing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, time);
    osc.frequency.exponentialRampToValueAtTime(800, time + 0.45);

    // Apply lowpass filter to make it sound muffled and cybernetic
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, time);

    gain.gain.setValueAtTime(0.02, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.45);
  }

  // 5. Retro glitch/static interference sound
  playGlitch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15; // 150ms buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill buffer with random noise for glitch
    for (let i = 0; i < bufferSize; i++) {
      // Crackling white noise
      data[i] = Math.random() * 2 - 1;
      // Make it sound interrupted/stuttery
      if (Math.floor(i / 100) % 3 === 0) {
        data[i] = 0;
      }
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.015, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noiseNode.start(time);
    noiseNode.stop(time + 0.15);
  }
}

export const cyberAudio = new CyberAudioSynth();
export default cyberAudio;
