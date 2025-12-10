import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import Leaderboard from "@/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ParticleBackground />
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        <Leaderboard />
      </main>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
