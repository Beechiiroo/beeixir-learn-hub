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
import CustomCursor from "@/components/CustomCursor";
import TaskManager from "@/components/TaskManager";
import ProgressTracker from "@/components/ProgressTracker";
import ParticleBackground from "@/components/ParticleBackground";
import Newsletter from "@/components/Newsletter";
import GamificationSection from "@/components/GamificationSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";

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
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <CustomCursor />
      <Header setQrScannerOpen={setQrScannerOpen} />
      <main className="relative z-10">
        <HeroSection />
        <ProgressTracker />
        <GamificationSection />
        <CoursesSection />
        <TaskManager />
        <TechnologiesSection />
        <TestimonialsSection />
        <BlogSection />
        <AboutSection />
        <Newsletter />
      </main>
      <Footer />
      
      <QRCodeScanner 
        isOpen={qrScannerOpen} 
        onClose={() => setQrScannerOpen(false)} 
      />
      
      <Chatbot 
        isOpen={chatbotOpen} 
        onToggle={() => setChatbotOpen(!chatbotOpen)} 
      />
    </div>
  );
};

export default Index;
