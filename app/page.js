import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
