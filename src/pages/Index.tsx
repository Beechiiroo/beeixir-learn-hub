import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/CoursesSection";
import AboutSection from "@/components/AboutSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import Footer from "@/components/Footer";
import RobotVerification from "@/components/RobotVerification";
import QRCodeScanner from "@/components/QRCodeScanner";
import EnhancedCursor from "@/components/EnhancedCursor";
import TaskManager from "@/components/TaskManager";
import ProgressTracker from "@/components/ProgressTracker";
import ParticleBackground from "@/components/ParticleBackground";
import Newsletter from "@/components/Newsletter";
import GamificationSection from "@/components/GamificationSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScrollReveal from "@/components/ScrollReveal";
import StarryBackground from "@/components/StarryBackground";
import ParallaxSection from "@/components/ParallaxSection";
import CourseComparator from "@/components/CourseComparator";
import LiveCodePreview from "@/components/LiveCodePreview";
import ProgressCalculator from "@/components/ProgressCalculator";
import CareerTimeline from "@/components/CareerTimeline";
import EasterEggs from "@/components/EasterEggs";
import { FocusModeProvider } from "@/components/FocusMode";
import ReadingProgress from "@/components/ReadingProgress";
import AchievementPopup from "@/components/AchievementPopup";
import { FavoritesProvider } from "@/components/FavoritesSystem";
import { AccessibilityProvider } from "@/components/AccessibilityMode";
import GestureNavigation from "@/components/GestureNavigation";

// Import floating tool panels
import FloatingToolbar from "@/components/FloatingToolbar";
import ChatbotPanel from "@/components/panels/ChatbotPanel";
import QuickActionsPanel from "@/components/panels/QuickActionsPanel";
import MusicPlayerPanel from "@/components/panels/MusicPlayerPanel";
import FocusTimerPanel from "@/components/panels/FocusTimerPanel";
import ScreenRecorderPanel from "@/components/panels/ScreenRecorderPanel";
import CodeSnippetsPanel from "@/components/panels/CodeSnippetsPanel";
import RecommendationsPanel from "@/components/panels/RecommendationsPanel";
import VoiceCommandsPanel from "@/components/panels/VoiceCommandsPanel";
import AICoachPanel from "@/components/panels/AICoachPanel";
import ActivityFeedPanel from "@/components/panels/ActivityFeedPanel";
import AdvancedStatusBar from "@/components/AdvancedStatusBar";
import QuickCommandPalette from "@/components/QuickCommandPalette";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);

  // Floating tools state
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [recording, setRecording] = useState(false);
  const [snippetsOpen, setSnippetsOpen] = useState(false);
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [aiCoachOpen, setAiCoachOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [liveCount, setLiveCount] = useState(128);

  // Update live count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check if user has been verified before (using localStorage)
  useEffect(() => {
    const verified = localStorage.getItem('beechir-verified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleVerification = () => {
    setIsVerified(true);
    localStorage.setItem('beechir-verified', 'true');
  };

  if (!isVerified) {
    return <RobotVerification onVerified={handleVerification} />;
  }

  return (
    <AccessibilityProvider>
      <FavoritesProvider>
        <FocusModeProvider>
          <div className="min-h-screen bg-background relative">
            <ParticleBackground />
            <StarryBackground />
            <EnhancedCursor />
            <EasterEggs />
            <ReadingProgress />
            <AchievementPopup />
            <GestureNavigation />
            <Header setQrScannerOpen={setQrScannerOpen} />
            <main className="relative z-10">
              <HeroSection />
              
              <ScrollReveal direction="up" delay={0.1}>
                <ProgressTracker />
              </ScrollReveal>
              
              <ParallaxSection speed={0.3}>
                <ScrollReveal direction="scale" delay={0.1}>
                  <GamificationSection />
                </ScrollReveal>
              </ParallaxSection>
              
              <ScrollReveal direction="left" delay={0.1}>
                <CoursesSection />
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.1}>
                <CourseComparator />
              </ScrollReveal>
              
              <ScrollReveal direction="scale" delay={0.1}>
                <LiveCodePreview />
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.1}>
                <TaskManager />
              </ScrollReveal>
              
              <ParallaxSection speed={0.4}>
                <ScrollReveal direction="up" delay={0.1}>
                  <TechnologiesSection />
                </ScrollReveal>
              </ParallaxSection>
              
              <ScrollReveal direction="left" delay={0.1}>
                <ProgressCalculator />
              </ScrollReveal>
              
              <ScrollReveal direction="scale" delay={0.1}>
                <TestimonialsSection />
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.1}>
                <CareerTimeline />
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.1}>
                <BlogSection />
              </ScrollReveal>
              
              <ParallaxSection speed={0.2}>
                <ScrollReveal direction="right" delay={0.1}>
                  <AboutSection />
                </ScrollReveal>
              </ParallaxSection>
              
              <ScrollReveal direction="up" delay={0.1}>
                <Newsletter />
              </ScrollReveal>
            </main>
            <Footer />
            
            <QRCodeScanner 
              isOpen={qrScannerOpen} 
              onClose={() => setQrScannerOpen(false)} 
            />
            
            {/* Unified Floating Toolbar - 2026 Design */}
            <FloatingToolbar
              onChatbotToggle={() => setChatbotOpen(!chatbotOpen)}
              chatbotOpen={chatbotOpen}
              onQuickActionsToggle={() => setQuickActionsOpen(!quickActionsOpen)}
              quickActionsOpen={quickActionsOpen}
              onMusicToggle={() => setMusicOpen(!musicOpen)}
              musicOpen={musicOpen}
              musicPlaying={musicPlaying}
              onTimerToggle={() => setTimerOpen(!timerOpen)}
              timerOpen={timerOpen}
              timerRunning={timerRunning}
              onRecorderToggle={() => setRecording(!recording)}
              recording={recording}
              onSnippetsToggle={() => setSnippetsOpen(!snippetsOpen)}
              snippetsOpen={snippetsOpen}
              onRecommendationsToggle={() => setRecommendationsOpen(!recommendationsOpen)}
              recommendationsOpen={recommendationsOpen}
              onVoiceToggle={() => setVoiceListening(!voiceListening)}
              voiceListening={voiceListening}
              onAICoachToggle={() => setAiCoachOpen(!aiCoachOpen)}
              aiCoachOpen={aiCoachOpen}
              onActivityToggle={() => setActivityOpen(!activityOpen)}
              activityOpen={activityOpen}
              liveCount={liveCount}
            />

            {/* Tool Panels */}
            <ChatbotPanel 
              isOpen={chatbotOpen} 
              onClose={() => setChatbotOpen(false)} 
            />
            <QuickActionsPanel 
              isOpen={quickActionsOpen} 
              onClose={() => setQuickActionsOpen(false)} 
            />
            <MusicPlayerPanel 
              isOpen={musicOpen} 
              onClose={() => setMusicOpen(false)}
              isPlaying={musicPlaying}
              onPlayingChange={setMusicPlaying}
            />
            <FocusTimerPanel 
              isOpen={timerOpen} 
              onClose={() => setTimerOpen(false)}
              isRunning={timerRunning}
              onRunningChange={setTimerRunning}
            />
            <ScreenRecorderPanel 
              isRecording={recording} 
              onRecordingChange={setRecording}
            />
            <CodeSnippetsPanel 
              isOpen={snippetsOpen} 
              onClose={() => setSnippetsOpen(false)} 
            />
            <RecommendationsPanel 
              isOpen={recommendationsOpen} 
              onClose={() => setRecommendationsOpen(false)} 
            />
            <VoiceCommandsPanel 
              isListening={voiceListening} 
              onListeningChange={setVoiceListening}
            />
            <AICoachPanel 
              isOpen={aiCoachOpen} 
              onClose={() => setAiCoachOpen(false)} 
            />
            <ActivityFeedPanel 
              isOpen={activityOpen} 
              onClose={() => setActivityOpen(false)}
              liveCount={liveCount}
            />
            
            {/* New 2026 Features */}
            <AdvancedStatusBar />
            <QuickCommandPalette />
          </div>
        </FocusModeProvider>
      </FavoritesProvider>
    </AccessibilityProvider>
  );
};

export default Index;
