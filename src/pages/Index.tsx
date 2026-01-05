import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/CoursesSection";
import AboutSection from "@/components/AboutSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import Footer from "@/components/Footer";
import RobotVerification from "@/components/RobotVerification";
import QRCodeScanner from "@/components/QRCodeScanner";
import Chatbot from "@/components/Chatbot";
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
import MusicPlayer from "@/components/MusicPlayer";
import ReadingProgress from "@/components/ReadingProgress";
import QuickActions from "@/components/QuickActions";
import AchievementPopup from "@/components/AchievementPopup";
import { FavoritesProvider } from "@/components/FavoritesSystem";
import { AccessibilityProvider } from "@/components/AccessibilityMode";
import VoiceCommands from "@/components/VoiceCommands";
import AIAssistant from "@/components/AIAssistant";
import GestureNavigation from "@/components/GestureNavigation";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import SmartRecommendations from "@/components/SmartRecommendations";
import FocusTimer from "@/components/FocusTimer";
import ScreenRecorder from "@/components/ScreenRecorder";
import CodeSnippetSaver from "@/components/CodeSnippetSaver";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

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
            
            {/* Chatbot - Bottom Right */}
            <Chatbot 
              isOpen={chatbotOpen} 
              onToggle={() => setChatbotOpen(!chatbotOpen)} 
            />
            
            {/* Quick Actions - Offset from Chatbot */}
            <QuickActions />
            
            {/* Left Side Tools */}
            <VoiceCommands />
            <MusicPlayer />
            <FocusTimer />
            
            {/* Right Side Tools */}
            <SmartRecommendations />
            <CodeSnippetSaver />
            <ScreenRecorder />
            
            {/* Side Panels */}
            <AIAssistant />
            <LiveActivityFeed />
          </div>
        </FocusModeProvider>
      </FavoritesProvider>
    </AccessibilityProvider>
  );
};

export default Index;
