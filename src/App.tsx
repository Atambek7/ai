import React from 'react';
import { GeneratorStateProvider, useGenerator } from './logic/useGeneratorState';
import TerminalFrame from './components/TerminalFrame';
import ConfigPanel from './components/ConfigPanel';
import PromptDisplay from './components/PromptDisplay';
import SavedProjectsList from './components/SavedProjectsList';
import HistoryList from './components/HistoryList';
import { cyberAudio } from './logic/audioSynth';

const DashboardContent: React.FC = () => {
  const { activeTab, setActiveTab, savedProjects, history } = useGenerator();

  const handleTabChange = (tab: 'generator' | 'saved' | 'history') => {
    cyberAudio.playBeep();
    setActiveTab(tab);
  };

  return (
    <div className="cp-dashboard font-body">
      {/* Left Column: Input Parameter configuration HUD */}
      <ConfigPanel />

      {/* Right Column: Display Screens HUD */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Neon Navigation Tabs */}
        <div className="cp-tabs">
          <button
            onClick={() => handleTabChange('generator')}
            className={`cp-tab-btn ${activeTab === 'generator' ? 'active' : ''}`}
          >
            📟 КОНСОЛЬ
          </button>
          <button
            onClick={() => handleTabChange('saved')}
            className={`cp-tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
          >
            💾 АРХИВ ПРОЕКТОВ ({savedProjects.length})
          </button>
          <button
            onClick={() => handleTabChange('history')}
            className={`cp-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          >
            📜 ЖУРНАЛ ЛОГОВ ({history.length})
          </button>
        </div>

        {/* Dynamic Display Panel depending on active tab */}
        {activeTab === 'generator' && <PromptDisplay />}
        {activeTab === 'saved' && <SavedProjectsList />}
        {activeTab === 'history' && <HistoryList />}
      </div>
    </div>
  );
};

function App() {
  return (
    <GeneratorStateProvider>
      <TerminalFrame>
        <DashboardContent />
      </TerminalFrame>
    </GeneratorStateProvider>
  );
}

export default App;
