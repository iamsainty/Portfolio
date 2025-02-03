import AboutSection from "./AboutSection";
import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <BlogSection />
    </div>
  );
}
