import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateGame } from '../generator/generatorEngine';
import type { GeneratedGame } from '../generator/generatorEngine';
import { cyberAudio } from './audioSynth';
import { copyToClipboard, downloadAsJson, downloadAsTxt } from './exportUtils';

export interface GeneratorStateContextProps {
  // Current settings
  genreId: string;
  setGenreId: (id: string) => void;
  settingId: string;
  setSettingId: (id: string) => void;
  mechanicsCount: number;
  setMechanicsCount: (count: number) => void;
  modeId: string;
  setModeId: (id: string) => void;

  // Sound control
  isMuted: boolean;
  toggleMute: () => void;

  // Active terminal screen tab
  activeTab: 'generator' | 'saved' | 'history';
  setActiveTab: (tab: 'generator' | 'saved' | 'history') => void;

  // Main output
  currentGame: GeneratedGame | null;
  setCurrentGame: (game: GeneratedGame | null) => void;
  isGenerating: boolean;

  // History & Projects lists
  history: GeneratedGame[];
  savedProjects: GeneratedGame[];

  // Actions
  triggerGenerate: () => void;
  saveCurrentProject: () => void;
  deleteProject: (id: string) => void;
  clearHistory: () => void;
  loadProjectOrHistory: (game: GeneratedGame) => void;

  // Export statuses
  isCopied: boolean;
  copyCurrentPrompt: () => void;
  downloadCurrentTxt: () => void;
  downloadCurrentJson: () => void;
}

const GeneratorStateContext = createContext<GeneratorStateContextProps | undefined>(undefined);

export const GeneratorStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage
  const [genreId, setGenreId] = useState<string>(() => localStorage.getItem('cp_genreId') || 'random');
  const [settingId, setSettingId] = useState<string>(() => localStorage.getItem('cp_settingId') || 'random');
  const [mechanicsCount, setMechanicsCount] = useState<number>(() => {
    const saved = localStorage.getItem('cp_mechanicsCount');
    return saved ? parseInt(saved, 10) : 3;
  });
  const [modeId, setModeId] = useState<string>(() => localStorage.getItem('cp_modeId') || 'random');
  const [isMuted, setIsMuted] = useState<boolean>(() => localStorage.getItem('cp_isMuted') === 'true');
  
  const [activeTab, setActiveTab] = useState<'generator' | 'saved' | 'history'>('generator');
  const [currentGame, setCurrentGame] = useState<GeneratedGame | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [history, setHistory] = useState<GeneratedGame[]>(() => {
    try {
      const saved = localStorage.getItem('cp_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedProjects, setSavedProjects] = useState<GeneratedGame[]>(() => {
    try {
      const saved = localStorage.getItem('cp_savedProjects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync basic configurations to LocalStorage
  useEffect(() => {
    localStorage.setItem('cp_genreId', genreId);
  }, [genreId]);

  useEffect(() => {
    localStorage.setItem('cp_settingId', settingId);
  }, [settingId]);

  useEffect(() => {
    localStorage.setItem('cp_mechanicsCount', mechanicsCount.toString());
  }, [mechanicsCount]);

  useEffect(() => {
    localStorage.setItem('cp_modeId', modeId);
  }, [modeId]);

  useEffect(() => {
    localStorage.setItem('cp_isMuted', isMuted.toString());
    cyberAudio.setMute(isMuted);
  }, [isMuted]);

  // Sync list elements to LocalStorage
  useEffect(() => {
    localStorage.setItem('cp_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('cp_savedProjects', JSON.stringify(savedProjects));
  }, [savedProjects]);

  // Mute toggle
  const toggleMute = () => {
    setIsMuted(prev => !prev);
    // Play a brief beep if unmuting
    setTimeout(() => {
      if (isMuted) {
        cyberAudio.playClick();
      }
    }, 50);
  };

  // Actions
  const triggerGenerate = () => {
    setIsGenerating(true);
    setIsCopied(false);
    
    // Play charging synthetic sweep
    cyberAudio.playProcessing();

    setTimeout(() => {
      const newGame = generateGame({
        genreId,
        settingId,
        mechanicsCount,
        modeId
      });

      setCurrentGame(newGame);
      setIsGenerating(false);
      
      // Update history (cap at 30 items)
      setHistory(prev => {
        const filtered = prev.filter(h => h.title !== newGame.title);
        return [newGame, ...filtered].slice(0, 30);
      });

      // Play success cyber blip
      cyberAudio.playSuccess();
    }, 600); // Small delay to feel like processing calculation
  };

  const saveCurrentProject = () => {
    if (!currentGame) return;
    cyberAudio.playBeep();
    
    setSavedProjects(prev => {
      // Avoid duplicates
      const exists = prev.some(p => p.id === currentGame.id || p.title === currentGame.title);
      if (exists) return prev;
      return [currentGame, ...prev];
    });
  };

  const deleteProject = (id: string) => {
    cyberAudio.playGlitch();
    setSavedProjects(prev => prev.filter(p => p.id !== id));
  };

  const clearHistory = () => {
    cyberAudio.playGlitch();
    setHistory([]);
  };

  const loadProjectOrHistory = (game: GeneratedGame) => {
    cyberAudio.playBeep();
    setCurrentGame(game);
    // Load its original parameters so the user sees them selected
    // Note: We search for the corresponding id keys in genres and settings
    // Since names are localized, we try to match them or keep as is.
    setActiveTab('generator');
  };

  const copyCurrentPrompt = async () => {
    if (!currentGame) return;
    const success = await copyToClipboard(currentGame.finalPrompt);
    if (success) {
      setIsCopied(true);
      cyberAudio.playBeep();
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const downloadCurrentTxt = () => {
    if (!currentGame) return;
    cyberAudio.playClick();
    const filename = `${currentGame.title}_prompt`;
    downloadAsTxt(filename, currentGame.finalPrompt);
  };

  const downloadCurrentJson = () => {
    if (!currentGame) return;
    cyberAudio.playClick();
    const filename = `${currentGame.title}_data`;
    // Create detailed export packet
    downloadAsJson(filename, currentGame);
  };

  return (
    <GeneratorStateContext.Provider
      value={{
        genreId,
        setGenreId,
        settingId,
        setSettingId,
        mechanicsCount,
        setMechanicsCount,
        modeId,
        setModeId,
        isMuted,
        toggleMute,
        activeTab,
        setActiveTab,
        currentGame,
        setCurrentGame,
        isGenerating,
        history,
        savedProjects,
        triggerGenerate,
        saveCurrentProject,
        deleteProject,
        clearHistory,
        loadProjectOrHistory,
        isCopied,
        copyCurrentPrompt,
        downloadCurrentTxt,
        downloadCurrentJson
      }}
    >
      {children}
    </GeneratorStateContext.Provider>
  );
};

export const useGenerator = () => {
  const context = useContext(GeneratorStateContext);
  if (context === undefined) {
    throw new Error('useGenerator must be used within a GeneratorStateProvider');
  }
  return context;
};
export default useGenerator;
