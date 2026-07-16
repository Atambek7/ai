import React, { useEffect, useState, useRef } from 'react';
import useGenerator from '../logic/useGeneratorState';
import { cyberAudio } from '../logic/audioSynth';

export const PromptDisplay: React.FC = () => {
  const {
    currentGame,
    isGenerating,
    saveCurrentProject,
    savedProjects,
    isCopied,
    copyCurrentPrompt,
    downloadCurrentTxt,
    downloadCurrentJson
  } = useGenerator();

  const [typedPrompt, setTypedPrompt] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(true);
  const typingTimerRef = useRef<any>(null);

  // Check if current game is already saved
  const isAlreadySaved = currentGame 
    ? savedProjects.some(p => p.id === currentGame.id || p.title === currentGame.title)
    : false;

  // Typewriter effect for the final prompt output block
  useEffect(() => {
    if (!currentGame) {
      setTypedPrompt('');
      setIsTypingComplete(true);
      return;
    }

    // Reset typewriter
    setTypedPrompt('');
    setIsTypingComplete(false);
    
    let currentIdx = 0;
    const fullText = currentGame.finalPrompt;
    const step = Math.ceil(fullText.length / 100); // Complete typing in about 1.5 seconds

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      currentIdx += step;
      if (currentIdx >= fullText.length) {
        setTypedPrompt(fullText);
        setIsTypingComplete(true);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      } else {
        setTypedPrompt(fullText.slice(0, currentIdx));
        // Synthesize minor typing clicks occasionally
        if (Math.random() > 0.85) {
          cyberAudio.playClick();
        }
      }
    }, 15);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [currentGame]);

  const handleSkipTyping = () => {
    if (!currentGame) return;
    cyberAudio.playBeep();
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setTypedPrompt(currentGame.finalPrompt);
    setIsTypingComplete(true);
  };

  // 1. Rendering Generating/Loading screen
  if (isGenerating) {
    return (
      <div 
        className="cyber-panel cyber-panel-cut"
        style={{
          minHeight: '550px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          position: 'relative'
        }}
      >
        <div className="scanner-line" />
        <div 
          style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(0, 240, 255, 0.1)',
            borderTopColor: 'var(--neon-cyan)',
            borderBottomColor: 'var(--neon-magenta)',
            borderRadius: '50%',
            animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
          }} 
        />
        <div className="font-mono text-center neon-cyan-text" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>
          <div className="neon-pulse-cyan">// ИНИЦИАЛИЗАЦИЯ НЕЙРОННОГО СИНТЕЗА //</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '10px' }}>
            Загрузка модулей... OK<br />
            Генерация игрового лора... OK<br />
            Компиляция геймплейного цикла... OK<br />
            Синтезирование промпта... ИДЕТ СБОРКА
          </div>
        </div>
      </div>
    );
  }

  // 2. Rendering Placeholder screen when no game generated yet
  if (!currentGame) {
    return (
      <div 
        className="cyber-panel cyber-panel-cut font-mono"
        style={{
          minHeight: '550px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          border: '1px dashed rgba(0, 240, 255, 0.25)'
        }}
      >
        <div style={{ fontSize: '3rem', animation: 'pulse-slow 2.5s infinite' }}>🤖</div>
        <h3 className="neon-cyan-text" style={{ fontSize: '1.2rem', letterSpacing: '3px' }}>
          ОЖИДАНИЕ КОМАНДЫ ГЕНЕРАЦИИ
        </h3>
        <p style={{ fontSize: '0.8rem', maxWidth: '380px', lineHeight: '1.5' }}>
          Задайте жанр, стилистику и режим генерации в левой панели управления, затем нажмите кнопку <span className="neon-lime-text">ГЕНЕРИРОВАТЬ</span> для создания полноценного концепта.
        </p>

        <style>{`
          @keyframes pulse-slow {
            0% { opacity: 0.3; transform: scale(0.95); }
            50% { opacity: 0.8; transform: scale(1.05); }
            100% { opacity: 0.3; transform: scale(0.95); }
          }
        `}</style>
      </div>
    );
  }

  // 3. Rendering Successfully Generated Game concept
  return (
    <div className="cyber-panel cyber-panel-cut font-body" style={{ minHeight: '550px' }}>
      
      {/* HUD Header Bar */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '2px solid rgba(0, 240, 255, 0.2)',
          paddingBottom: '15px',
          marginBottom: '20px'
        }}
      >
        <div>
          <span className="font-mono neon-magenta-text" style={{ fontSize: '0.8rem', fontWeight: 900 }}>
            {currentGame.modeIcon} {currentGame.modeName.toUpperCase()}
          </span>
          <h2 className="font-header text-shadow" style={{ fontSize: '1.8rem', color: '#fff', letterSpacing: '1px', marginTop: '2px' }}>
            {currentGame.title}
          </h2>
        </div>

        {/* Status badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <div className="font-mono" style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)', padding: '2px 8px', fontSize: '0.75rem' }}>
            ЖАНР: {currentGame.genre.toUpperCase()}
          </div>
          <div className="font-mono" style={{ background: 'rgba(255, 0, 127, 0.1)', border: '1px solid var(--neon-magenta)', color: 'var(--neon-magenta)', padding: '2px 8px', fontSize: '0.75rem' }}>
            СТИЛЬ: {currentGame.setting.toUpperCase()}
          </div>
          <div className="font-mono" style={{ background: 'rgba(57, 255, 20, 0.1)', border: '1px solid var(--neon-lime)', color: 'var(--neon-lime)', padding: '2px 8px', fontSize: '0.75rem' }}>
            БЮДЖЕТ: {currentGame.complexity.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main concept cards grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '15px',
          marginBottom: '25px'
        }}
      >
        {/* World and Lore card */}
        <div className="font-body" style={{ background: 'rgba(10, 10, 16, 0.6)', border: '1px solid rgba(0, 240, 255, 0.15)', padding: '15px' }}>
          <h4 className="font-header neon-cyan-text" style={{ fontSize: '0.9rem', marginBottom: '8px', letterSpacing: '1px' }}>
            // ЛОР И ОПИСАНИЕ МИРА
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-cyber)', marginBottom: '8px', lineHeight: '1.5' }}>
            {currentGame.worldDescription}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.5' }}>
            {currentGame.lore}
          </p>
        </div>

        {/* Hero & Objective card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr md:1fr', gap: '15px' }}>
          <div style={{ background: 'rgba(10, 10, 16, 0.6)', border: '1px solid rgba(0, 240, 255, 0.15)', padding: '15px' }}>
            <h4 className="font-header neon-magenta-text" style={{ fontSize: '0.9rem', marginBottom: '8px', letterSpacing: '1px' }}>
              // ПРОТАГОНИСТ И ЦЕЛЬ
            </h4>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Класс:</strong> {currentGame.hero.title}<br />
              <span style={{ color: 'var(--text-cyber)' }}>{currentGame.hero.description}</span><br />
              <strong style={{ color: 'var(--neon-magenta)', display: 'inline-block', marginTop: '6px' }}>Имплант:</strong> {currentGame.hero.augment}
            </div>
            <div 
              className="font-mono neon-cyan-text" 
              style={{ 
                borderTop: '1px dashed rgba(0, 240, 255, 0.2)', 
                marginTop: '10px', 
                paddingTop: '8px',
                fontSize: '0.8rem'
              }}
            >
              🎯 {currentGame.objective}
            </div>
          </div>
        </div>

        {/* Specifications card */}
        <div 
          style={{ 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(0, 240, 255, 0.1)', 
            padding: '12px 15px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            fontSize: '0.8rem'
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Камера:</span><br />
            <strong style={{ color: '#fff' }}>🎥 {currentGame.camera}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Платформа:</span><br />
            <strong style={{ color: '#fff' }}>📱 {currentGame.platform}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Монетизация:</span><br />
            <strong style={{ color: '#fff' }}>💵 {currentGame.monetization}</strong>
          </div>
        </div>

        {/* Selected Mechanics List card */}
        <div style={{ background: 'rgba(10, 10, 16, 0.6)', border: '1px solid rgba(0, 240, 255, 0.15)', padding: '15px' }}>
          <h4 className="font-header neon-lime-text" style={{ fontSize: '0.9rem', marginBottom: '8px', letterSpacing: '1px' }}>
            // ИНТЕГРИРОВАННЫЕ ИГРОВЫЕ МЕХАНИКИ ({currentGame.mechanics.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {currentGame.mechanics.map((m, idx) => (
              <span 
                key={idx} 
                className="font-mono"
                style={{ 
                  background: 'rgba(57, 255, 20, 0.08)', 
                  border: '1px solid var(--neon-lime)', 
                  color: 'var(--neon-lime)', 
                  padding: '4px 10px', 
                  fontSize: '0.8rem',
                  textTransform: 'uppercase'
                }}
              >
                ⚙️ {m}
              </span>
            ))}
          </div>
        </div>

        {/* Gameplay loop and key features */}
        <div style={{ background: 'rgba(10, 10, 16, 0.6)', border: '1px solid rgba(0, 240, 255, 0.15)', padding: '15px' }}>
          <h4 className="font-header neon-cyan-text" style={{ fontSize: '0.9rem', marginBottom: '8px', letterSpacing: '1px' }}>
            // ИГРОВОЙ ЦИКЛ И ОСОБЕННОСТИ
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-cyber)', marginBottom: '12px', lineHeight: '1.5' }}>
            <strong>Core Loop:</strong> {currentGame.gameplayLoop}
          </p>
          <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            {currentGame.keyFeatures.map((f, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FINAL PROMPT OUTPUT TERMINAL CONTAINER */}
      <div className="cyber-section" style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 className="font-header neon-cyan-text" style={{ fontSize: '1rem', letterSpacing: '2px' }}>
            💻 ГОТОВЫЙ ИИ-ПРОМПТ (КОНСОЛЬ)
          </h4>
          {!isTypingComplete && (
            <button 
              type="button" 
              onClick={handleSkipTyping}
              className="font-mono"
              style={{
                background: 'transparent',
                border: '1px dashed var(--neon-magenta)',
                color: 'var(--neon-magenta)',
                padding: '1px 8px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              ⏩ Пропустить печать
            </button>
          )}
        </div>

        {/* Terminal display block */}
        <div 
          className="font-mono crt-screen"
          style={{
            background: 'var(--bg-terminal-solid)',
            border: '1px solid var(--neon-cyan)',
            padding: '16px',
            fontSize: '0.85rem',
            lineHeight: '1.5',
            color: 'var(--neon-cyan)',
            maxHeight: '320px',
            overflowY: 'auto',
            position: 'relative',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.15) inset'
          }}
        >
          {typedPrompt}
          {!isTypingComplete && (
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              background: 'var(--neon-cyan)',
              marginLeft: '4px',
              animation: 'blink 0.8s steps(2, start) infinite'
            }} />
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          marginTop: '10px'
        }}
      >
        <button 
          onClick={copyCurrentPrompt}
          className="cyber-btn"
          style={{
            borderColor: isCopied ? 'var(--neon-lime)' : 'var(--neon-cyan)',
            color: isCopied ? 'var(--neon-lime)' : 'var(--neon-cyan)',
            fontSize: '0.8rem',
            padding: '10px'
          }}
        >
          {isCopied ? '✓ СКОПИРОВАНО' : '📋 КОПИРОВАТЬ'}
        </button>

        <button 
          onClick={downloadCurrentTxt}
          className="cyber-btn"
          style={{ fontSize: '0.8rem', padding: '10px' }}
        >
          🗎 СКАЧАТЬ TXT
        </button>

        <button 
          onClick={downloadCurrentJson}
          className="cyber-btn"
          style={{ fontSize: '0.8rem', padding: '10px' }}
        >
          ⚙️ СКАЧАТЬ JSON
        </button>

        <button 
          onClick={saveCurrentProject}
          disabled={isAlreadySaved}
          className="cyber-btn cyber-btn-magenta"
          style={{ 
            fontSize: '0.8rem', 
            padding: '10px',
            opacity: isAlreadySaved ? 0.5 : 1,
            cursor: isAlreadySaved ? 'not-allowed' : 'pointer'
          }}
        >
          {isAlreadySaved ? '💾 СОХРАНЕНО' : '💾 СОХРАНИТЬ'}
        </button>
      </div>

      <style>{`
        @keyframes blink {
          to { visibility: hidden; }
        }
        .text-shadow {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(0, 240, 255, 0.2);
        }
      `}</style>
    </div>
  );
};
export default PromptDisplay;
