import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  BookOpen,
  X,
  Film,
  Layers,
  LayoutGrid,
  ArrowRightLeft,
  MoreVertical,
  Flag
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { apiService } from '../services/api';
import { ViewScreen, Duo, Protagonist } from '../types';
import { ProtagonistTeaserModal } from './ProtagonistTeaserModal';
import { ReportModal } from './ReportModal';

interface DuoFeedScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  initialDocId?: string;
  initialDuoId?: string;
  initialDuoIndex?: number;
  allowedSeriesIds?: string[];
}

export const DuoFeedScreen: React.FC<DuoFeedScreenProps> = ({
  onNavigate,
  initialDocId,
  initialDuoId,
  initialDuoIndex = 0,
  allowedSeriesIds
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(initialDocId || null);
  const [DUOS, setDuos] = useState<Duo[]>([]);
  const [DOCUMENTARIES, setDocumentaries] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [teaserProtagonist, setTeaserProtagonist] = useState<Protagonist | null>(null);

  // Compute starting duo index if initialDuoId is provided
  const startingIndex = initialDuoId
    ? 0 // will update in useEffect
    : initialDuoIndex;

  const [currentIndex, setCurrentIndex] = useState(startingIndex);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'duo' | 'deck'>('duo');
  const [deckActiveSide, setDeckActiveSide] = useState<'A' | 'B'>('A');
  const [reportDuoId, setReportDuoId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [fetchedDuos, fetchedDocs] = await Promise.all([
        apiService.getDuos(),
        apiService.getSeries()
      ]);
      setDuos(fetchedDuos);
      setDocumentaries(fetchedDocs);
      if (initialDuoId) {
        const idx = fetchedDuos.findIndex((d: any) => d.id === initialDuoId);
        if (idx !== -1) setCurrentIndex(idx);
      }
      setLoadingData(false);
    };
    loadData();
  }, [initialDuoId]);

  // Inline video playback states: videos stay vertical side-by-side
  const [isPlayingA, setIsPlayingA] = useState(false);
  const [isPlayingB, setIsPlayingB] = useState(false);
  const [isMutedA, setIsMutedA] = useState(false);
  const [isMutedB, setIsMutedB] = useState(false);

  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);

  // Motion values for swipe physics
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-300, 0, 300], [-8, 0, 8]);
  const dragScale = useTransform(dragX, [-300, 0, 300], [0.97, 1, 0.97]);
  const isDraggingRef = useRef(false);

  // Dynamic feedback stamps
  const stampPrevOpacity = useTransform(dragX, [20, 90], [0, 1]);
  const stampNextOpacity = useTransform(dragX, [-20, -90], [0, 1]);

  // Filter duos based on user's profile series filter AND active series selector
  const baseFilteredDuos = allowedSeriesIds && allowedSeriesIds.length > 0
    ? DUOS.filter(d => allowedSeriesIds.includes(d.documentaryId))
    : DUOS;

  const filteredDuos = selectedDocId
    ? baseFilteredDuos.filter(d => d.documentaryId === selectedDocId)
    : baseFilteredDuos;

  if (loadingData) {
    return <div className="min-h-screen bg-[#0E0D0B] text-white flex items-center justify-center">Chargement...</div>;
  }

  const safeIndex = filteredDuos.length > 0 ? (currentIndex % filteredDuos.length) : 0;
  const currentDuo: Duo | undefined = filteredDuos[safeIndex];

  const activeDoc = selectedDocId 
    ? DOCUMENTARIES.find(d => d.id === selectedDocId) 
    : (currentDuo ? DOCUMENTARIES.find(d => d.id === currentDuo.documentaryId) : undefined);

  // Reset playback on duo change or series switch
  useEffect(() => {
    setIsPlayingA(false);
    setIsPlayingB(false);
  }, [currentIndex, selectedDocId]);

  // Synchronize muted states on video elements
  useEffect(() => {
    if (videoRefA.current) videoRefA.current.muted = isMutedA;
  }, [isMutedA]);

  useEffect(() => {
    if (videoRefB.current) videoRefB.current.muted = isMutedB;
  }, [isMutedB]);

  const togglePlayA = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingA(prev => {
      const next = !prev;
      if (next) setIsPlayingB(false);
      return next;
    });
  };

  const togglePlayB = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingB(prev => {
      const next = !prev;
      if (next) setIsPlayingA(false);
      return next;
    });
  };

  // Handlers for next / prev with direction tracking
  const handleNext = () => {
    dragX.set(0);
    setIsPlayingA(false);
    setIsPlayingB(false);
    setCurrentIndex(prev => (prev + 1) % filteredDuos.length);
  };

  const handlePrev = () => {
    dragX.set(0);
    setIsPlayingA(false);
    setIsPlayingB(false);
    setCurrentIndex(prev => (prev - 1 + filteredDuos.length) % filteredDuos.length);
  };

  // Keyboard navigation for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredDuos.length]);

  if (!currentDuo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white text-[#1C1917] space-y-3">
        <Film className="w-10 h-10 text-stone-300" />
        <h3 className="font-editorial text-xl font-bold">Aucun duo dans cette sélection</h3>
        <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
          Personnalisez votre expérience dans votre profil pour choisir les séries documentaires que vous souhaitez explorer.
        </p>
        <button 
          onClick={() => onNavigate({ type: 'profile' })}
          className="mt-2 px-5 py-2.5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white font-semibold text-xs shadow-md transition-colors cursor-pointer"
        >
          Choisir mes séries dans mon Profil
        </button>
      </div>
    );
  }

  const pA = currentDuo.protagonistA;
  const pB = currentDuo.protagonistB;

  // Format title part
  const formatTitlePart = (raw?: string) => {
    if (!raw) return '';
    const trimmed = raw.trim();
    if (!trimmed) return '';
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const themeA = formatTitlePart(pA.universeTag || (activeDoc ? activeDoc.universes[0]?.name : 'Pôle A'));
  const themeB = formatTitlePart(pB.universeTag || (activeDoc ? activeDoc.universes[1]?.name : 'Pôle B'));

  // Clean quotes helper
  const cleanQuotes = (str?: string) => {
    if (!str) return '';
    return str
      .replace(/^[«"'\s]+|[»"'\s]+$/g, '')
      .trim();
  };

  // Video URLs for inline playback
  const videoUrlA = pA.videoAvatarUrl 
    || DOCUMENTARIES.find(d => d.id === currentDuo.documentaryId)?.teaserVideoUrl 
    || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const videoUrlB = pB.videoAvatarUrl 
    || DOCUMENTARIES.find(d => d.id === currentDuo.documentaryId)?.teaserVideoUrl 
    || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 pt-2 sm:pt-4 pb-20 sm:pb-24 pt-safe pb-safe h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between text-[#1C1917] select-none">
      
      {/* ========================================================================= */}
      {/* 1. BARRE SUPÉRIEURE AVEC TITRE ET DECK SUR LA MÊME LIGNE HORIZONTALE        */}
      {/* ========================================================================= */}
      <div className="relative flex items-center justify-between pt-2 sm:pt-4 pb-1 shrink-0 min-h-[44px] sm:min-h-[48px] px-1 sm:px-2">
        <div className="w-16 sm:w-20" /> {/* Spacer pour centrage parfait */}
        
        {(() => {
          const title = currentDuo.documentaryTitle || '';
          const parts = title.includes('< >') ? title.split('< >') : title.includes('<>') ? title.split('<>') : null;
          return parts ? (
            <div 
              key={`duo-series-${currentDuo.id}-${title}`}
              className="inline-flex items-center gap-1.5 sm:gap-2 h-7.5 sm:h-8.5 px-4 sm:px-4.5 rounded-full bg-[#A2482B] border border-[#8A3B22] shadow-sm text-[11px] sm:text-xs animate-in fade-in duration-200 text-white truncate"
            >
              <span className="font-sans font-bold text-white tracking-tight truncate max-w-[95px] sm:max-w-[180px]">{parts[0].trim()}</span>
              <span 
                className="font-mono text-[9px] sm:text-[10.5px] font-black text-white/90 px-1 sm:px-1.5 select-none shrink-0 tracking-widest flex items-center gap-1.5 sm:gap-2"
                title="Face à face"
              >
                <span>&lt;</span>
                <span>&gt;</span>
              </span>
              <span className="font-sans font-bold text-white tracking-tight truncate max-w-[95px] sm:max-w-[180px]">{parts[1].trim()}</span>
            </div>
          ) : (
            <div className="inline-flex items-center h-7.5 sm:h-8.5 px-4 sm:px-4.5 rounded-full bg-[#A2482B] border border-[#8A3B22] shadow-sm text-[11px] sm:text-xs text-white font-bold">
              {title}
            </div>
          );
        })()}

        {/* Bouton bascule Vue Duo / Vue Deck - STRICTEMENT SUR LA MÊME LIGNE MÉDIANE HORIZONTALE */}
        <div className="flex items-center justify-end w-16 sm:w-20 gap-1.5">
          <button
            onClick={() => currentDuo && setReportDuoId(currentDuo.id)}
            className="flex items-center justify-center h-7.5 sm:h-8.5 w-7.5 sm:w-8.5 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all cursor-pointer active:scale-95"
            title="Signaler ce contenu"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode(prev => prev === 'duo' ? 'deck' : 'duo')}
            className="flex items-center gap-1 h-7.5 sm:h-8.5 px-2.5 sm:px-3 rounded-full bg-white hover:bg-[#A2482B] border border-stone-200 hover:border-[#A2482B] text-[#1C1917] hover:text-white text-[11px] sm:text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95 group/modetoggle"
            title={viewMode === 'duo' ? 'Passer en vue Deck (1 vidéo à la fois)' : 'Passer en vue Duo (2 vidéos côte à côte)'}
          >
            {viewMode === 'duo' ? (
              <>
                <Layers className="w-3.5 h-3.5 text-[#A2482B] group-hover/modetoggle:text-white transition-colors" />
                <span className="hidden sm:inline">Deck</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-[#A2482B] group-hover/modetoggle:text-white transition-colors" />
                <span className="hidden sm:inline">Duo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ZONE PRINCIPALE : LE DUO EN FACE-À-FACE (DIPTYQUE PARFAIT)              */}
      {/* ========================================================================= */}
      <div className="relative flex-1 flex flex-col items-center justify-center min-h-0 py-1 sm:py-2">
        
        {/* Flèche Gauche Desktop / Tablette (Click pour revenir en arrière) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-2 lg:left-6 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/90 hover:bg-[#1C1917] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95 group"
          title="Duo précédent (Glisser à droite)"
          id="prev-duo-arrow-btn"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Flèche Droite Desktop / Tablette (Click pour avancer) */}
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-2 lg:right-6 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/90 hover:bg-[#1C1917] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95 group"
          title="Duo suivant (Glisser à gauche)"
          id="next-duo-arrow-btn"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Conteneur Draggable avec Motion (Permanent Swipe) */}
        <div className="w-full flex justify-center items-center relative overflow-visible my-auto">
          
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`duo-${currentDuo.id}-${safeIndex}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              style={{ x: dragX, rotate: dragRotate, scale: dragScale }}
              onDragStart={() => {
                isDraggingRef.current = true;
              }}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50;
                const velocityThreshold = 350;

                // Glisser à droite (x positif) -> Revenir au précédent
                if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                  handlePrev();
                } 
                // Glisser à gauche (x négatif) -> Avancer au suivant
                else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                  handleNext();
                }
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 80);
              }}
              initial={{ 
                opacity: 0,
              }}
              animate={{ 
                opacity: 1,
              }}
              exit={{ 
                opacity: 0,
              }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="cursor-grab active:cursor-grabbing w-full max-w-4xl relative flex flex-col items-center justify-center my-auto"
            >
              
              {/* Dynamic Swipe Stamps */}
              {/* Tampon Gauche : glissé vers la droite -> REVENIR */}
              <motion.div
                style={{ opacity: stampPrevOpacity }}
                className="absolute top-2 left-4 z-40 pointer-events-none transform -rotate-12 bg-emerald-600/90 text-white font-sans font-black text-xs sm:text-sm px-3.5 py-1 rounded-xl border-2 border-white shadow-2xl tracking-wider uppercase backdrop-blur-md"
              >
                ← Revenir
              </motion.div>

              {/* Tampon Droit : glissé vers la gauche -> SUIVANT */}
              <motion.div
                style={{ opacity: stampNextOpacity }}
                className="absolute top-2 right-4 z-40 pointer-events-none transform rotate-12 bg-[#A2482B] text-white font-sans font-black text-xs sm:text-sm px-3.5 py-1 rounded-xl border-2 border-white shadow-2xl tracking-wider uppercase backdrop-blur-md"
              >
                Suivant →
              </motion.div>

              {/* ========================================================================= */}
              {/* MODE 1 : VUE DUO (DIPTYQUE FACE-À-FACE CÔTE À CÔTE)                       */}
              {/* ========================================================================= */}
              {viewMode === 'duo' && (
                <div className="flex items-center justify-center gap-2 sm:gap-5 md:gap-8 relative w-full px-1">
                  
                  {/* CARTE PROTAGONISTE A */}
                  <div 
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                      if (isDraggingRef.current) return;
                      togglePlayA();
                    }}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-[calc((100vw-28px)/2)] max-w-[195px] sm:max-w-none sm:w-[min(340px,calc((100dvh-200px)*9/16))] sm:h-[min(604px,calc(100dvh-200px))] shrink-0 transition-all duration-300 cursor-pointer select-none"
                  >
                    {/* Background Media: Video when isPlayingA, otherwise Poster Photo */}
                    {isPlayingA ? (
                      <video
                        ref={videoRefA}
                        key={`desktop-video-a-${currentDuo.id}`}
                        src={videoUrlA}
                        autoPlay
                        loop
                        playsInline
                        muted={isMutedA}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={pA.photoUrl} 
                        alt={pA.name} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

                    {/* Top Header: Pole Tag on left & Mute toggle on right */}
                    <div className="relative z-10 p-2 sm:p-4 flex items-center justify-between gap-1">
                      <span className="w-fit max-w-[85px] sm:max-w-[140px] truncate px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-white shadow-md shrink-0">
                        {themeA}
                      </span>

                      <div className="flex items-center gap-1 sm:gap-2">
                        {isPlayingA && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMutedA(prev => !prev);
                            }}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                            title={isMutedA ? "Activer le son" : "Couper le son"}
                          >
                            {isMutedA ? (
                              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Centre : Bouton Play / Pause central */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/25 flex items-center justify-center text-white shadow-xl transition-all duration-200 ${
                        isPlayingA ? 'opacity-0 group-hover:opacity-100 hover:scale-105' : 'opacity-100 scale-100'
                      }`}>
                        {isPlayingA ? (
                          <Pause className="w-4 h-4 sm:w-6 sm:h-6 fill-white text-white" />
                        ) : (
                          <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-white text-white translate-x-0.5 opacity-95" />
                        )}
                      </div>
                    </div>

                    {/* Centre libéré */}
                    <div className="my-auto" />

                    {/* Bottom Info */}
                    <div className="relative z-10 p-2.5 sm:p-4.5 flex items-end justify-between gap-1">
                      <div className="text-left font-sans min-w-0 pr-1">
                        <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-tight truncate">
                          {pA.name.split(' ')[0]}
                        </h3>
                        {pA.age && (
                          <p className="text-[10px] sm:text-xs text-stone-300 mt-0.5">
                            {pA.age} ans
                          </p>
                        )}
                      </div>

                      {/* Vignettes d'action : Question au-dessus du profil bonhomme */}
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsQuestionModalOpen(true);
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95 shrink-0"
                          title="Voir la question"
                          id={`open-question-a-${currentDuo.id}`}
                        >
                          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate({
                              type: 'protagonist_profile',
                              protagonistId: pA.id,
                              returnToDuoId: currentDuo.id,
                              returnToDuoIndex: safeIndex,
                              returnToDocId: selectedDocId || currentDuo.documentaryId
                            });
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95 shrink-0"
                          title={`Consulter le profil de ${pA.name}`}
                          id={`open-universe-${pA.id}`}
                        >
                          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARTE PROTAGONISTE B */}
                  <div 
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                      if (isDraggingRef.current) return;
                      togglePlayB();
                    }}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-[calc((100vw-28px)/2)] max-w-[195px] sm:max-w-none sm:w-[min(340px,calc((100dvh-200px)*9/16))] sm:h-[min(604px,calc(100dvh-200px))] shrink-0 transition-all duration-300 cursor-pointer select-none"
                  >
                    {/* Background Media: Video when isPlayingB, otherwise Poster Photo */}
                    {isPlayingB ? (
                      <video
                        ref={videoRefB}
                        key={`desktop-video-b-${currentDuo.id}`}
                        src={videoUrlB}
                        autoPlay
                        loop
                        playsInline
                        muted={isMutedB}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={pB.photoUrl} 
                        alt={pB.name} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

                    {/* Top Header: Pole Tag on left & Mute toggle on right */}
                    <div className="relative z-10 p-2 sm:p-4 flex items-center justify-between gap-1">
                      <span className="w-fit max-w-[85px] sm:max-w-[140px] truncate px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-white shadow-md shrink-0">
                        {themeB}
                      </span>

                      <div className="flex items-center gap-1 sm:gap-2">
                        {isPlayingB && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMutedB(prev => !prev);
                            }}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                            title={isMutedB ? "Activer le son" : "Couper le son"}
                          >
                            {isMutedB ? (
                              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Centre : Bouton Play / Pause central */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/25 flex items-center justify-center text-white shadow-xl transition-all duration-200 ${
                        isPlayingB ? 'opacity-0 group-hover:opacity-100 hover:scale-105' : 'opacity-100 scale-100'
                      }`}>
                        {isPlayingB ? (
                          <Pause className="w-4 h-4 sm:w-6 sm:h-6 fill-white text-white" />
                        ) : (
                          <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-white text-white translate-x-0.5 opacity-95" />
                        )}
                      </div>
                    </div>

                    {/* Centre libéré */}
                    <div className="my-auto" />

                    {/* Bottom Info */}
                    <div className="relative z-10 p-2.5 sm:p-4.5 flex items-end justify-between gap-1">
                      <div className="text-left font-sans min-w-0 pr-1">
                        <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-tight truncate">
                          {pB.name.split(' ')[0]}
                        </h3>
                        {pB.age && (
                          <p className="text-[10px] sm:text-xs text-stone-300 mt-0.5">
                            {pB.age} ans
                          </p>
                        )}
                      </div>

                      {/* Vignettes d'action : Question au-dessus du profil bonhomme */}
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsQuestionModalOpen(true);
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95 shrink-0"
                          title="Voir la question"
                          id={`open-question-b-${currentDuo.id}`}
                        >
                          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate({
                              type: 'protagonist_profile',
                              protagonistId: pB.id,
                              returnToDuoId: currentDuo.id,
                              returnToDuoIndex: safeIndex,
                              returnToDocId: selectedDocId || currentDuo.documentaryId
                            });
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95 shrink-0"
                          title={`Consulter le profil de ${pB.name}`}
                          id={`open-universe-${pB.id}`}
                        >
                          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================================= */}
              {/* MODE 2 : VUE DECK (1 VIDÉO PLEINE TAILLE AVEC BASCULE VERS LE PENDANT)    */}
              {/* ========================================================================= */}
              {viewMode === 'deck' && (
                <div className="relative flex items-center justify-center w-full px-2">
                  {deckActiveSide === 'A' ? (
                    /* CARTE PLEINE TAILLE PROTAGONISTE A */
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        if (isDraggingRef.current) return;
                        togglePlayA();
                      }}
                      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-32px)] shrink-0 transition-all duration-300 cursor-pointer select-none"
                    >
                      {isPlayingA ? (
                        <video
                          ref={videoRefA}
                          key={`deck-video-a-${currentDuo.id}`}
                          src={videoUrlA}
                          autoPlay
                          loop
                          playsInline
                          muted={isMutedA}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={pA.photoUrl} 
                          alt={pA.name} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

                      {/* Header Deck : Tag pôle + switch vers l'autre pendant */}
                      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-1.5">
                        <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md truncate">
                          {themeA}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isPlayingA && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMutedA(prev => !prev);
                              }}
                              className="w-8 h-8 rounded-full bg-black/55 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                              title={isMutedA ? "Activer le son" : "Couper le son"}
                            >
                              {isMutedA ? (
                                <VolumeX className="w-4 h-4 text-white" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-white" />
                              )}
                            </button>
                          )}

                          {/* Bouton de bascule vers la vidéo proposée en vis-à-vis (B) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlayingA(false);
                              setDeckActiveSide('B');
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/25 hover:bg-[#A2482B] text-white text-xs font-bold backdrop-blur-md border border-white/30 shadow-md transition-all cursor-pointer active:scale-95"
                            title={`Voir le vis-à-vis : ${pB.name}`}
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                            <span>Voir {pB.name.split(' ')[0]}</span>
                          </button>
                        </div>
                      </div>

                      {/* Centre : Bouton Play/Pause */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/45 backdrop-blur-xs border border-white/25 flex items-center justify-center text-white shadow-2xl transition-all duration-200 ${
                          isPlayingA ? 'opacity-0 group-hover:opacity-100 hover:scale-105' : 'opacity-100 scale-100'
                        }`}>
                          {isPlayingA ? (
                            <Pause className="w-6 h-6 fill-white text-white" />
                          ) : (
                            <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-95" />
                          )}
                        </div>
                      </div>

                      <div className="my-auto" />

                      {/* Bottom Info Deck */}
                      <div className="relative z-10 p-3 sm:p-5 flex items-end justify-between gap-2">
                        <div className="text-left font-sans min-w-0 pr-1">
                          <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-tight truncate">
                            {pA.name}
                          </h3>
                          <p className="text-xs text-stone-300 mt-0.5">
                            {pA.age ? `${pA.age} ans • ` : ''}{pA.role || 'Protagoniste'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsQuestionModalOpen(true);
                            }}
                            className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95"
                            title="Voir la question"
                          >
                            <BookOpen className="w-4 h-4 text-white" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate({
                                type: 'protagonist_profile',
                                protagonistId: pA.id,
                                returnToDuoId: currentDuo.id,
                                returnToDuoIndex: safeIndex,
                                returnToDocId: selectedDocId || currentDuo.documentaryId
                              });
                            }}
                            className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95"
                            title={`Consulter le profil de ${pA.name}`}
                          >
                            <User className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* CARTE PLEINE TAILLE PROTAGONISTE B */
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        if (isDraggingRef.current) return;
                        togglePlayB();
                      }}
                      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-32px)] shrink-0 transition-all duration-300 cursor-pointer select-none"
                    >
                      {isPlayingB ? (
                        <video
                          ref={videoRefB}
                          key={`deck-video-b-${currentDuo.id}`}
                          src={videoUrlB}
                          autoPlay
                          loop
                          playsInline
                          muted={isMutedB}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={pB.photoUrl} 
                          alt={pB.name} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

                      {/* Header Deck : Tag pôle + switch vers l'autre pendant */}
                      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-1.5">
                        <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md truncate">
                          {themeB}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isPlayingB && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMutedB(prev => !prev);
                              }}
                              className="w-8 h-8 rounded-full bg-black/55 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                              title={isMutedB ? "Activer le son" : "Couper le son"}
                            >
                              {isMutedB ? (
                                <VolumeX className="w-4 h-4 text-white" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-white" />
                              )}
                            </button>
                          )}

                          {/* Bouton de bascule vers la première vidéo proposée (A) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlayingB(false);
                              setDeckActiveSide('A');
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/25 hover:bg-[#A2482B] text-white text-xs font-bold backdrop-blur-md border border-white/30 shadow-md transition-all cursor-pointer active:scale-95"
                            title={`Voir le vis-à-vis : ${pA.name}`}
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                            <span>Voir {pA.name.split(' ')[0]}</span>
                          </button>
                        </div>
                      </div>

                      {/* Centre : Bouton Play/Pause */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/45 backdrop-blur-xs border border-white/25 flex items-center justify-center text-white shadow-2xl transition-all duration-200 ${
                          isPlayingB ? 'opacity-0 group-hover:opacity-100 hover:scale-105' : 'opacity-100 scale-100'
                        }`}>
                          {isPlayingB ? (
                            <Pause className="w-6 h-6 fill-white text-white" />
                          ) : (
                            <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-95" />
                          )}
                        </div>
                      </div>

                      <div className="my-auto" />

                      {/* Bottom Info Deck */}
                      <div className="relative z-10 p-3 sm:p-5 flex items-end justify-between gap-2">
                        <div className="text-left font-sans min-w-0 pr-1">
                          <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-tight truncate">
                            {pB.name}
                          </h3>
                          <p className="text-xs text-stone-300 mt-0.5">
                            {pB.age ? `${pB.age} ans • ` : ''}{pB.role || 'Protagoniste'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsQuestionModalOpen(true);
                            }}
                            className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95"
                            title="Voir la question"
                          >
                            <BookOpen className="w-4 h-4 text-white" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate({
                                type: 'protagonist_profile',
                                protagonistId: pB.id,
                                returnToDuoId: currentDuo.id,
                                returnToDuoIndex: safeIndex,
                                returnToDocId: selectedDocId || currentDuo.documentaryId
                              });
                            }}
                            className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#A2482B] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:border-[#A2482B] hover:scale-105 active:scale-95"
                            title={`Consulter le profil de ${pB.name}`}
                          >
                            <User className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Modale Question Centrale en Miroir */}
      {isQuestionModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsQuestionModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-200 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQuestionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#A2482B]/15 text-[#A2482B] flex items-center justify-center mx-auto mb-4 border border-[#A2482B]/30">
              <BookOpen className="w-6 h-6" />
            </div>

            <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917] mb-3">
              {currentDuo.documentaryTitle}
            </h3>

            <p className="font-serif-editorial text-base sm:text-lg text-stone-800 leading-relaxed italic px-2">
              « {cleanQuotes(currentDuo.centralQuestion)} »
            </p>
          </div>
        </div>
      )}

      {/* Modale Teaser Présentation Vidéo avant d'entrer dans l'univers */}
      <ProtagonistTeaserModal
        protagonist={teaserProtagonist}
        onClose={() => setTeaserProtagonist(null)}
        onEnterUniverse={(id) => {
          setTeaserProtagonist(null);
          onNavigate({ type: 'protagonist_profile', protagonistId: id });
        }}
      />

      {/* Modal de signalement */}
      {reportDuoId && (
        <ReportModal
          targetId={reportDuoId}
          targetType="duo"
          onClose={() => setReportDuoId(null)}
        />
      )}
    </div>
  );
};
