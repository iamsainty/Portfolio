import ProjectHeroSection from "./ProjectHeroSection";
import Projects from "./Projects";

export async function generateMetadata() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/project`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch project data");
    }

    const data = await response.json();
    const projects = data.projects || [];

    // Extract project titles
    const projectTitles = projects.map((project) => project.title);

    // Extract and flatten project technologies
    const projectTags = projects.flatMap((project) => project.technologies);

    // Remove duplicates from keywords
    const uniqueKeywords = [
      "Hey Sainty",
      "Priyanshu Chaurasiya",
      "Tech Projects",
      "Programming Projects",
      "Web Development",
      "Software Development",
      "React Projects",
      "Full Stack Development",
      ...projectTitles,
      ...projectTags,
    ];

    const keywords = [...new Set(uniqueKeywords)]; // Remove duplicates

    return {
      title: "Discover Projects : Innovations, Challenges, and Solutions",
      description:
        "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
      keywords,
      author: "Priyanshu Chaurasiya",
      canonical: "https://hey-sainty.vercel.app/project",
      openGraph: {
        type: "website",
        site_name: "Hey Sainty",
        title: "Projects : Hey Sainty",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        url: "https://hey-sainty.vercel.app/project",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Projects : Hey Sainty",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        creator: "@iam__sainty",
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);

    // Return a fallback metadata object in case of an error
    return {
      title: "Discover Projects : Innovations, Challenges, and Solutions",
      description:
        "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
      keywords: [
        "Hey Sainty",
        "Priyanshu Chaurasiya",
        "Tech Projects",
        "Programming Projects",
        "Web Development",
        "Software Development",
        "React Projects",
        "Full Stack Development",
      ],
      author: "Priyanshu Chaurasiya",
      canonical: "https://hey-sainty.vercel.app/project",
      openGraph: {
        type: "website",
        site_name: "Hey Sainty",
        title: "Projects : Hey Sainty",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        url: "https://hey-sainty.vercel.app/project",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Projects : Hey Sainty",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        creator: "@iam__sainty",
      },
    };
  }
}

export default async function Page() {
  return (
    <div>
      <ProjectHeroSection />
      <Projects />
    </div>
  );
}
