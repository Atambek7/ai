import React from 'react';
import useGenerator from '../logic/useGeneratorState';

interface TerminalFrameProps {
  children: React.ReactNode;
}

export const TerminalFrame: React.FC<TerminalFrameProps> = ({ children }) => {
  const { isMuted, toggleMute } = useGenerator();

  return (
    <div className="crt-container">
      {/* Visual CRT and Cyberpunk overlays */}
      <div className="crt-scanlines" />
      <div className="crt-flicker" />
      <div className="crt-bar" />
      <div className="cyberpunk-grid-bg" />
      <div className="glow-overlay" />

      {/* Futuristic Header with Mute controls */}
      <header className="cp-header">
        <button 
          className={`mute-toggle ${isMuted ? 'active font-mono' : 'font-mono'}`}
          onClick={toggleMute}
          title={isMuted ? "Включить звук терминала" : "Выключить звук терминала"}
        >
          {isMuted ? '🔈 SOUND: OFF' : '🔊 SOUND: ON'}
        </button>

        <h1 className="glitch-txt" data-text="GAME PROMPT 3000">
          RANDOM GAME PROMPT GENERATOR 3000
        </h1>
        <div className="version-tag font-mono">SYS-v3.0.7-LIVE</div>
        <p className="subtitle font-mono">
          КИБЕРНЕТИЧЕСКИЙ МУЛЬТИПЛЕКСНЫЙ ИНСТРУМЕНТ СИНТЕЗА ИГРОВЫХ ИДЕЙ
        </p>
      </header>

      {/* Screen contents */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </main>
    </div>
  );
};
export default TerminalFrame;
