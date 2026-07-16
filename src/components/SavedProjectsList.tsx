import React from 'react';
import useGenerator from '../logic/useGeneratorState';
import type { GeneratedGame } from '../generator/generatorEngine';
import { downloadAsJson, downloadAsTxt } from '../logic/exportUtils';
import { cyberAudio } from '../logic/audioSynth';

export const SavedProjectsList: React.FC = () => {
  const { savedProjects, deleteProject, loadProjectOrHistory, currentGame } = useGenerator();

  const handleLoad = (game: GeneratedGame) => {
    loadProjectOrHistory(game);
  };

  const handleDownloadTxt = (e: React.MouseEvent, game: GeneratedGame) => {
    e.stopPropagation();
    cyberAudio.playClick();
    downloadAsTxt(`${game.title}_prompt`, game.finalPrompt);
  };

  const handleDownloadJson = (e: React.MouseEvent, game: GeneratedGame) => {
    e.stopPropagation();
    cyberAudio.playClick();
    downloadAsJson(`${game.title}_data`, game);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteProject(id);
  };

  if (savedProjects.length === 0) {
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
          border: '1px dashed rgba(255, 0, 127, 0.25)'
        }}
      >
        <span style={{ fontSize: '3rem' }}>🗄️</span>
        <h3 className="neon-magenta-text" style={{ fontSize: '1.1rem', letterSpacing: '3px' }}>
          АРХИВ ПРОЕКТОВ ПУСТ
        </h3>
        <p style={{ fontSize: '0.8rem', maxWidth: '380px', lineHeight: '1.5' }}>
          Здесь будут отображаться ваши сохраненные концепты. Для сохранения сгенерируйте идею и нажмите кнопку <span className="neon-magenta-text">СОХРАНИТЬ</span> на панели вывода.
        </p>
      </div>
    );
  }

  return (
    <div className="font-body" style={{ minHeight: '450px' }}>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {savedProjects.map(project => {
          const isActive = currentGame && currentGame.id === project.id;
          return (
            <div 
              key={project.id}
              className="cyber-panel"
              style={{
                background: 'rgba(10, 10, 16, 0.85)',
                border: isActive ? '1.5px solid var(--neon-magenta)' : '1px solid rgba(255, 0, 127, 0.25)',
                boxShadow: isActive ? 'var(--glow-magenta)' : '0 0 4px rgba(255, 0, 127, 0.05)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                borderRadius: 'var(--cyber-radius)',
                cursor: 'pointer'
              }}
              onClick={() => handleLoad(project)}
            >
              <div>
                {/* Mode and Meta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-mono neon-magenta-text" style={{ fontSize: '0.75rem', fontWeight: 900 }}>
                    {project.modeIcon} {project.modeName.toUpperCase()}
                  </span>
                  <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    {new Date(project.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-header" style={{ color: '#fff', fontSize: '1.3rem', marginTop: '4px', letterSpacing: '1px' }}>
                  {project.title}
                </h3>

                {/* Attributes */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span className="font-mono" style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', color: 'var(--neon-cyan)', padding: '1px 6px', fontSize: '0.65rem' }}>
                    {project.genre}
                  </span>
                  <span className="font-mono" style={{ background: 'rgba(255, 0, 127, 0.05)', border: '1px solid rgba(255, 0, 127, 0.2)', color: 'var(--neon-magenta)', padding: '1px 6px', fontSize: '0.65rem' }}>
                    {project.setting}
                  </span>
                  <span className="font-mono" style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid rgba(57, 255, 20, 0.2)', color: 'var(--neon-lime)', padding: '1px 6px', fontSize: '0.65rem' }}>
                    ⚙️ {project.mechanics.length} МЕХ.
                  </span>
                </div>

                {/* Lore snippet */}
                <p 
                  style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-muted)', 
                    marginTop: '12px', 
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {project.worldDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '6px', 
                  marginTop: '15px', 
                  borderTop: '1px solid rgba(255, 0, 127, 0.1)', 
                  paddingTop: '12px' 
                }}
              >
                <button 
                  className="cyber-btn"
                  style={{ flex: 1, padding: '6px 0', fontSize: '0.7rem', borderWidth: '1px' }}
                  onClick={(e) => { e.stopPropagation(); handleLoad(project); }}
                >
                  📡 ЗАГРУЗИТЬ
                </button>
                <button 
                  className="cyber-btn"
                  style={{ padding: '6px 10px', fontSize: '0.7rem', borderWidth: '1px' }}
                  onClick={(e) => handleDownloadTxt(e, project)}
                  title="Скачать TXT"
                >
                  TXT
                </button>
                <button 
                  className="cyber-btn"
                  style={{ padding: '6px 10px', fontSize: '0.7rem', borderWidth: '1px' }}
                  onClick={(e) => handleDownloadJson(e, project)}
                  title="Скачать JSON"
                >
                  JSON
                </button>
                <button 
                  className="cyber-btn cyber-btn-magenta"
                  style={{ padding: '6px 10px', fontSize: '0.7rem', borderWidth: '1px' }}
                  onClick={(e) => handleDelete(e, project.id)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SavedProjectsList;
