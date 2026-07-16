import React from 'react';
import useGenerator from '../logic/useGeneratorState';
import { genres } from '../data/genres';
import { settings } from '../data/settings';
import { generationModes } from '../data/modes';
import { cyberAudio } from '../logic/audioSynth';

export const ConfigPanel: React.FC = () => {
  const {
    genreId,
    setGenreId,
    settingId,
    setSettingId,
    mechanicsCount,
    setMechanicsCount,
    modeId,
    setModeId,
    isGenerating,
    triggerGenerate
  } = useGenerator();

  // Selected mode metadata
  const currentModeInfo = generationModes.find(m => m.id === modeId) || generationModes[0];

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    cyberAudio.playClick();
    setGenreId(e.target.value);
  };

  const handleSelectSetting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    cyberAudio.playClick();
    setSettingId(e.target.value);
  };

  const handleSelectMode = (id: string) => {
    cyberAudio.playBeep();
    setModeId(id);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    cyberAudio.playClick();
    setMechanicsCount(parseInt(e.target.value, 10));
  };

  return (
    <div className="cyber-panel cyber-panel-cut font-body">
      {/* 1. Genre selection */}
      <div className="cyber-section">
        <h3 className="cyber-section-title font-header">01. ЖАНР ИГРЫ</h3>
        <select 
          className="cyber-select font-mono" 
          value={genreId} 
          onChange={handleSelectGenre}
        >
          <option value="random">🎲 [СЛУЧАЙНЫЙ ВЫБОР ЖАНРА]</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>
              {g.name} — {g.description.slice(0, 50)}...
            </option>
          ))}
        </select>
      </div>

      {/* 2. Setting / Style selection */}
      <div className="cyber-section">
        <h3 className="cyber-section-title font-header">02. СЕТТИНГ И СТИЛИСТИКА</h3>
        <select 
          className="cyber-select font-mono" 
          value={settingId} 
          onChange={handleSelectSetting}
        >
          <option value="random">🌌 [СЛУЧАЙНЫЙ ВЫБОР СТИЛЯ]</option>
          {settings.map(s => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.description.slice(0, 50)}...
            </option>
          ))}
        </select>
      </div>

      {/* 3. Mechanics count slider */}
      <div className="cyber-section">
        <h3 className="cyber-section-title font-header">
          03. КОЛИЧЕСТВО МЕХАНИК: <span className="neon-cyan-text font-mono">{mechanicsCount}</span>
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
          <span className="font-mono" style={{ color: 'var(--text-muted)' }}>1</span>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={mechanicsCount} 
            onChange={handleSliderChange}
            className="cyber-range"
          />
          <span className="font-mono" style={{ color: 'var(--text-muted)' }}>10</span>
        </div>
      </div>

      {/* 4. Generation Mode selection grid */}
      <div className="cyber-section" style={{ borderBottom: 'none', marginBottom: '0', paddingBottom: '0' }}>
        <h3 className="cyber-section-title font-header">04. РЕЖИМ ГЕНЕРАЦИИ</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          marginTop: '10px'
        }}>
          {generationModes.map(m => {
            const isActive = m.id === modeId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMode(m.id)}
                style={{
                  background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'rgba(5, 5, 8, 0.8)',
                  border: isActive ? '1px solid var(--neon-cyan)' : '1px solid rgba(0, 240, 255, 0.1)',
                  color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                  padding: '8px 10px',
                  borderRadius: 'var(--cyber-radius)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
                <span style={{ textShadow: isActive ? 'var(--glow-cyan)' : 'none' }}>{m.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Mode Details Display */}
        <div 
          className="font-mono"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderLeft: '2px solid var(--neon-magenta)',
            padding: '12px',
            marginTop: '15px',
            fontSize: '0.8rem',
            lineHeight: '1.4'
          }}
        >
          <div className="neon-magenta-text" style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '4px' }}>
            // {currentModeInfo.tagline}
          </div>
          <div style={{ color: 'var(--text-cyber)' }}>
            {currentModeInfo.description}
          </div>
          <div style={{ display: 'flex', gap: '15px', marginTop: '6px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <div>Сложность: <span className="neon-cyan-text">{currentModeInfo.complexity.toUpperCase()}</span></div>
            <div>Платформа: <span style={{ color: '#fff' }}>{currentModeInfo.platforms.join('/')}</span></div>
          </div>
        </div>
      </div>

      {/* 5. Big dynamic trigger button */}
      <button 
        className="cyber-btn"
        onClick={triggerGenerate}
        disabled={isGenerating}
        style={{
          width: '100%',
          marginTop: '25px',
          padding: '16px',
          fontSize: '1.1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          borderWidth: '2px',
          borderColor: 'var(--neon-lime)',
          color: 'var(--neon-lime)',
          boxShadow: '0 0 10px rgba(57, 255, 20, 0.1)',
          animation: 'pulse-glow-lime 2s infinite ease-in-out'
        }}
      >
        {isGenerating ? (
          <>
            <span style={{
              display: 'inline-block',
              width: '18px',
              height: '18px',
              border: '2px solid transparent',
              borderTopColor: 'var(--neon-lime)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            СИНТЕЗ ДАННЫХ...
          </>
        ) : (
          <>
            ⚡ ГЕНЕРИРОВАТЬ
          </>
        )}
      </button>

      {/* Embedded CSS animation for button */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow-lime {
          0% { box-shadow: 0 0 5px rgba(57, 255, 20, 0.2); }
          50% { box-shadow: 0 0 18px rgba(57, 255, 20, 0.45); }
          100% { box-shadow: 0 0 5px rgba(57, 255, 20, 0.2); }
        }
      `}</style>
    </div>
  );
};
export default ConfigPanel;
