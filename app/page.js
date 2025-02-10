import Script from "next/script";
import AboutSection from "./AboutSection";
import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";

export const metadata = {
  title: "Hey Sainty - Explore Tech, Creativity, and Innovation",
  description:
    "A dynamic platform where I share my journey as a tech enthusiast and developer. Explore my blogs on programming, tech trends, personal projects, and insights. Stay updated with my latest work and discover tips and resources to fuel your own tech passion!",
  keywords: [
    "Hey Sainty",
    "Priyanshu Chaurasiya",
    "Priyanshu Sainty",
    "Tech Blog",
    "Programming",
    "Development",
    "Software",
    "Projects",
  ],
  author: "Priyanshu Chaurasiya",
  canonical: "https://hey-sainty.web.app",
  openGraph: {
    type: "website",
    site_name: "Hey Sainty",
    title: "Hey Sainty - Explore Tech, Creativity, and Innovation",
    description:
      "A dynamic platform where I share my journey as a tech enthusiast and developer. Explore blogs on programming, tech trends, and personal projects.",
    url: "https://hey-sainty.web.app",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hey Sainty - Explore Tech, Creativity, and Innovation",
    description:
      "A dynamic platform where I share my journey as a tech enthusiast and developer. Explore blogs on programming, tech trends, and personal projects.",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    creator: "@iam__sainty",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <Script
        id="json-ld-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Website",
            name: "Hey Sainty",
            url: "https://hey-sainty.web.app",
            description:
              "A dynamic platform where I share my journey as a tech enthusiast and developer. Explore my blogs on programming, tech trends, and personal projects.",
            author: {
              "@type": "Person",
              name: "Priyanshu Chaurasiya",
              url: "https://hey-sainty.web.app",
            },
            sameAs: [
              "https://github.com/iamsainty",
              "https://twitter.com/iam__sainty",
              "https://linkedin.com/in/iamsainty",
              "https://instagram.com/iam__sainty",
            ],
          }),
        }}
      />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <BlogSection />
    </div>
  );
}
