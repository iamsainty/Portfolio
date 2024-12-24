import React from "react";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Blog from "./Blog";
import HeroSection from "./HeroSection";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Hey Sainty - Tech, Lifestyle & More</title>
        <meta
          name="description"
          content="Explore Hey Sainty by Priyanshu Chaurasiya, featuring insightful tech blogs, web development tutorials, and lifestyle content focused on technology and innovation."
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta
          property="og:title"
          content="Hey Sainty - Tech, Lifestyle & More"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest tech and lifestyle blogs by Priyanshu Chaurasiya. Learn about web development, technology trends, and more."
        />
        <meta
          property="og:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta property="og:url" content="https://hey-sainty.web.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hey Sainty" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hey Sainty - Tech, Lifestyle & More"
        />
        <meta
          name="twitter:description"
          content="Explore the latest tech and lifestyle blogs on Hey Sainty by Priyanshu Chaurasiya. Learn about web development and technology."
        />
        <meta
          name="twitter:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta name="twitter:url" content="https://hey-sainty.web.app" />

        <link rel="canonical" href="/" />
      </Helmet>
      <div className="container">
        <HeroSection />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Blog />
        <Contact />
      </div>
    </>
  );
}
