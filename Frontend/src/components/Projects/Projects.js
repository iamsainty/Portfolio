import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import ProjectHero from "./ProjectHero";
import DisplayProjects from "./DisplayProjects";

function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects - Hey Sainty | Priyanshu Chaurasiya</title>
        <meta
          name="description"
          content="Explore the impressive projects by Priyanshu Chaurasiya, showcasing skills in web development, MERN stack, and more."
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta
          property="og:title"
          content="Projects - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          property="og:description"
          content="Explore the impressive projects by Priyanshu Chaurasiya, showcasing skills in web development, MERN stack, and more."
        />
        <meta
          property="og:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta property="og:url" content="https://hey-sainty.web.app/projects" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projects - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          name="twitter:description"
          content="Explore the impressive projects by Priyanshu Chaurasiya, showcasing skills in web development, MERN stack, and more."
        />
        <meta
          name="twitter:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta
          name="twitter:url"
          content="https://hey-sainty.web.app/projects"
        />
        <meta
          name="keywords"
          content="Projects, Priyanshu Chaurasiya, Hey Sainty, web development, MERN stack, projects"
        />

        <link rel="canonical" href="/projects" />
      </Helmet>

      <div className="container">
        <ProjectHero />
        <DisplayProjects />
      </div>
    </>
  );
}

export default Projects;
