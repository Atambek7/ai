import React from 'react';
import useGenerator from '../logic/useGeneratorState';
import type { GeneratedGame } from '../generator/generatorEngine';

export const HistoryList: React.FC = () => {
  const { history, clearHistory, loadProjectOrHistory, currentGame } = useGenerator();

  const handleLoad = (game: GeneratedGame) => {
    loadProjectOrHistory(game);
  };

  const handleClear = () => {
    clearHistory();
  };

  if (history.length === 0) {
    return (
      <div 
        className="cyber-panel cyber-panel-cut font-mono"
        style={{
          minHeight: '450px',
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
        <span style={{ fontSize: '3rem' }}>📜</span>
        <h3 className="neon-cyan-text" style={{ fontSize: '1.1rem', letterSpacing: '3px' }}>
          ЖУРНАЛ ГЕНЕРАЦИЙ ПУСТ
        </h3>
        <p style={{ fontSize: '0.8rem', maxWidth: '380px', lineHeight: '1.5' }}>
          Здесь будут отображаться логи ваших недавних генераций. Запустите генератор на панели слева, чтобы наполнить историю.
        </p>
      </div>
    );
  }

  return (
    <div className="cyber-panel cyber-panel-cut font-body" style={{ minHeight: '450px' }}>
      
      {/* History Header Controls */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
          paddingBottom: '12px',
          marginBottom: '15px'
        }}
      >
        <div className="font-mono neon-cyan-text" style={{ fontSize: '0.9rem', fontWeight: 900 }}>
          // ЖУРНАЛ СИНТЕЗА: {history.length} ЗАПИСЕЙ
        </div>
        <button
          onClick={handleClear}
          className="cyber-btn cyber-btn-magenta"
          style={{
            padding: '4px 10px',
            fontSize: '0.75rem',
            borderWidth: '1px'
          }}
        >
          🗑️ ОЧИСТИТЬ ЖУРНАЛ
        </button>
      </div>

      {/* History Logs stream */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxHeight: '600px',
          overflowY: 'auto',
          paddingRight: '6px'
        }}
      >
        {history.map((game, idx) => {
          const isActive = currentGame && currentGame.id === game.id;
          return (
            <div 
              key={game.id || idx}
              onClick={() => handleLoad(game)}
              className="font-mono crt-screen"
              style={{
                background: isActive ? 'rgba(0, 240, 255, 0.08)' : 'rgba(5, 5, 8, 0.6)',
                border: isActive ? '1px solid var(--neon-cyan)' : '1px solid rgba(0, 240, 255, 0.12)',
                boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                padding: '12px 16px',
                cursor: 'pointer',
                borderRadius: 'var(--cyber-radius)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Left Data details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="neon-cyan-text" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {game.title}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    [{game.modeIcon} {game.modeName}]
                  </span>
                </div>
                <div style={{ color: 'var(--text-cyber)', fontSize: '0.75rem' }}>
                  Жанр: <span className="neon-lime-text">{game.genre}</span> | Сеттинг: <span className="neon-magenta-text">{game.setting}</span> | Механик: <span style={{ color: '#fff' }}>{game.mechanics.length}</span>
                </div>
              </div>

              {/* Right status action tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  {new Date(game.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span 
                  className="neon-cyan-text"
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.2s'
                  }}
                >
                  ⚡ ACTIVE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HistoryList;
