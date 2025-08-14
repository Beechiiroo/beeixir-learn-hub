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
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header setQrScannerOpen={setQrScannerOpen} />
      <main>
        <HeroSection />
        <CoursesSection />
        <TechnologiesSection />
        <AboutSection />
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
