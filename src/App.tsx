import React, { useState, useEffect } from 'react';
import { ViewScreen } from './types';
import { DOCUMENTARIES } from './data/mockData';
import { HomeScreen } from './components/HomeScreen';
import { MatrixExplorer } from './components/MatrixExplorer';
import { DocumentariesListScreen } from './components/DocumentariesListScreen';
import { DocumentaryDetailScreen } from './components/DocumentaryDetailScreen';
import { DuoFeedScreen } from './components/DuoFeedScreen';
import { DuoScreen } from './components/DuoScreen';
import { VideoPlayerScreen } from './components/VideoPlayerScreen';
import { ProtagonistProfileScreen } from './components/ProtagonistProfileScreen';
import { TransmissionScreen } from './components/TransmissionScreen';
import { MyForestScreen } from './components/MyForestScreen';
import { ProfileSettingsScreen } from './components/ProfileSettingsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { MessagingScreen } from './components/MessagingScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { SubmitStoryScreen } from './components/SubmitStoryScreen';
import { RequestVideographerScreen } from './components/RequestVideographerScreen';
import { ReviewSystemScreen } from './components/ReviewSystemScreen';
import { EditorialBackOfficeScreen } from './components/EditorialBackOfficeScreen';
import { NavigationScreen } from './components/NavigationScreen';
import { BottomMenu } from './components/BottomMenu';
import { AdminDashboard } from './components/AdminDashboard';
import { io } from 'socket.io-client';

export default function App() {
  // Arrive directly on the Explorer Astrolabe screen
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>({ type: 'home' });

  // User preferences & series filter state with localStorage persistence
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yonywood_selected_series');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DOCUMENTARIES.map(d => d.id);
  });
  const [language, setLanguage] = useState<string>('fr');
  const [hideQuestionByDefault, setHideQuestionByDefault] = useState<boolean>(true);

  const handleUpdateDocFilter = (docIds: string[]) => {
    setSelectedSeriesFilter(docIds);
    try {
      localStorage.setItem('yonywood_selected_series', JSON.stringify(docIds));
    } catch {
      // ignore
    }
  };

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  // Initialize Socket.IO
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', {
      auth: { token: localStorage.getItem('yonywood_auth_token') }
    });
    socket.on('connect', () => console.log('Socket.IO connected'));
    socket.on('message', (msg) => console.log('New message:', msg));
    return () => {
      socket.disconnect();
    };
  }, []);

  const isVideoPlayer = currentScreen.type === 'video_player';
  const isDarkScreen = currentScreen.type === 'video_player';

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased selection:bg-[#C89B3C]/20 selection:text-[#1C1917] relative ${
      isDarkScreen ? 'bg-[#0E0D0B] text-white' : 'bg-white text-[#1C1917]'
    }`}>
      
      {/* Main Content Area - Direct immersion */}
      <main className="flex-1">
        {currentScreen.type === 'home' && (
          <MatrixExplorer onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'duo_feed' && (
          <DuoFeedScreen 
            onNavigate={setCurrentScreen} 
            initialDocId={currentScreen.selectedDocId} 
            allowedSeriesIds={selectedSeriesFilter}
          />
        )}

        {currentScreen.type === 'marketplace' && (
          <MarketplaceScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'profile' && (
          <ProfileSettingsScreen 
            onNavigate={setCurrentScreen}
            selectedDocFilter={selectedSeriesFilter}
            onUpdateDocFilter={handleUpdateDocFilter}
            language={language}
            onUpdateLanguage={setLanguage}
            hideQuestionByDefault={hideQuestionByDefault}
            onToggleHideQuestion={setHideQuestionByDefault}
            returnToDuoId={currentScreen.returnToDuoId}
            returnToDuoIndex={currentScreen.returnToDuoIndex}
            returnToDocId={currentScreen.returnToDocId}
          />
        )}

        {currentScreen.type === 'settings' && (
          <SettingsScreen 
            onNavigate={setCurrentScreen}
            returnTo={currentScreen.returnTo}
            selectedDocFilter={selectedSeriesFilter}
            onUpdateDocFilter={handleUpdateDocFilter}
            language={language}
            onUpdateLanguage={setLanguage}
          />
        )}

        {currentScreen.type === 'portfolio' && (
          <PortfolioScreen 
            onNavigate={setCurrentScreen}
            returnToDuoId={currentScreen.returnToDuoId}
            returnToDuoIndex={currentScreen.returnToDuoIndex}
            returnToDocId={currentScreen.returnToDocId}
          />
        )}

        {currentScreen.type === 'messaging' && (
          <MessagingScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'documentaries' && (
          <DocumentariesListScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'documentary_detail' && (
          <DocumentaryDetailScreen 
            documentaryId={currentScreen.documentaryId} 
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'duo_detail' && (
          <DuoFeedScreen 
            initialDuoId={currentScreen.duoId} 
            allowedSeriesIds={selectedSeriesFilter}
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'video_player' && (
          <VideoPlayerScreen
            story={currentScreen.story}
            protagonist={currentScreen.protagonist}
            duoId={currentScreen.duoId}
            documentaryTitle={currentScreen.documentaryTitle}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen.type === 'protagonist_profile' && (
          <ProfileSettingsScreen 
            key={currentScreen.protagonistId || 'default-protagonist'}
            protagonistId={currentScreen.protagonistId} 
            onNavigate={setCurrentScreen} 
            selectedDocFilter={selectedSeriesFilter}
            onUpdateDocFilter={handleUpdateDocFilter}
            language={language}
            onUpdateLanguage={setLanguage}
            hideQuestionByDefault={hideQuestionByDefault}
            onToggleHideQuestion={setHideQuestionByDefault}
            returnToDuoId={currentScreen.returnToDuoId}
            returnToDuoIndex={currentScreen.returnToDuoIndex}
            returnToDocId={currentScreen.returnToDocId}
          />
        )}

        {currentScreen.type === 'transmission_detail' && (
          <TransmissionScreen 
            protagonistId={currentScreen.protagonistId} 
            transmissionId={currentScreen.transmissionId} 
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'my_forest' && (
          <MyForestScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'submit_story' && (
          <SubmitStoryScreen 
            preselectedDocumentaryId={currentScreen.preselectedDocumentaryId} 
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'request_videographer' && (
          <RequestVideographerScreen onNavigate={setCurrentScreen} />
        )}

        {(currentScreen.type === 'review_system' || currentScreen.type === 'forest_reviews') && (
          <ReviewSystemScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'editorial_backoffice' && (
          <EditorialBackOfficeScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'admin_dashboard' && (
          <AdminDashboard />
        )}

        {currentScreen.type === 'site_map' && (
          <NavigationScreen onNavigate={setCurrentScreen} />
        )}
      </main>

      {/* Menu de navigation 5 onglets : Studio, Casting, Duocumentaires, Coproduction, Profil */}
      {!isVideoPlayer && (
        <BottomMenu 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      )}

    </div>
  );
}
