import AboutSection from "./AboutSection";
import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";

async function fetchBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const blogs = await response.json();
  return blogs;
}

export default async function Page() {
  const blogs = await fetchBlogs();

  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <BlogSection blogs={blogs} />
    </div>
  );
}
