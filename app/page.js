import Script from "next/script";
import AboutSection from "./AboutSection";
import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";

export const metadata = {
  title: "Hey Sainty - Explore Tech, Creativity, and Innovation",
  description:
    "Discover my journey as a developer. Read blogs on coding, tech, projects, and tips to boost your skills and stay updated with what's new in the tech world.",
  keywords: [
    "Hey Sainty portfolio",
    "Tech tutorials and blogs",
    "Web developer blog India",
    "Frontend developer projects",
    "Next.js personal website",
    "Full-stack dev insights",
    "Coding resources and blogs",
    "Priyanshu Chaurasiya blog",
    "React and Next.js projects",
    "Tech creativity and personal growth",
  ],
  author: "Priyanshu Chaurasiya",
  canonical: "https://www.heysainty.com",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    site_name: "Hey Sainty",
    title: "Hey Sainty - Explore Tech, Creativity, and Innovation",
    description:
      "A dynamic platform where I share my journey as a tech enthusiast and developer. Explore blogs on programming, tech trends, and personal projects.",
    url: "https://www.heysainty.com",
    images: [
      {
        url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty.png",
        width: 1200,
        height: 630,
        alt: "Hey Sainty Open Graph Image",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hey Sainty - Explore Tech, Creativity, and Innovation",
    description:
      "A dynamic platform where I share my journey as a tech enthusiast and developer. Explore blogs on programming, tech trends, and personal projects.",
    images: [
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty.png",
    ],
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
            url: "https://www.heysainty.com",
            description:
              "A dynamic platform where I share my journey as a tech enthusiast and developer. Explore my blogs on programming, tech trends, and personal projects.",
            author: {
              "@type": "Person",
              name: "Priyanshu Chaurasiya",
              url: "https://www.heysainty.com",
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
