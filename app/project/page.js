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

    const projectTitles = projects.map((project) => project.title);

    const projectTags = projects.flatMap((project) => project.technologies);

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

    const keywords = [...new Set(uniqueKeywords)];

    return {
      title: "Hey Sainty Projects - Web apps, Tech Stack and more",
      description:
        "Explore the projects I've worked on, from personal to collaborations. Learn about the technologies, tools, and processes that powered these projects.",
      keywords: keywords || [],
      author: "Priyanshu Chaurasiya",
      canonical: "https://hey-sainty.vercel.app/project",
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        type: "website",
        site_name: "Hey Sainty",
        title: "Hey Sainty Projects - Web apps, Tech Stack and more",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        url: "https://hey-sainty.vercel.app/project",
        images: [
          {
            url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-project.png",
            width: 1200,
            height: 630,
            alt: "Hey Sainty Projects - Web apps, Tech Stack and more",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Hey Sainty Projects - Web apps, Tech Stack and more",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        images: [
          {
            url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-project.png",
            width: 1200,
            height: 630,
            alt: "Hey Sainty Projects - Web apps, Tech Stack and more",
          },
        ],
        creator: "@iam__sainty",
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);

    return {
      title: "Hey Sainty Projects - Web apps, Tech Stack and more",
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
        title: "Hey Sainty Projects - Web apps, Tech Stack and more",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        url: "https://hey-sainty.vercel.app/project",
        images: [
          {
            url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-project.png",
            width: 1200,
            height: 630,
            alt: "Hey Sainty Projects - Web apps, Tech Stack and more",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Hey Sainty Projects - Web apps, Tech Stack and more",
        description:
          "Explore the projects I've worked on, from personal endeavors to collaborations. Learn about the technologies, tools, and creative processes that powered these projects.",
        images: [
          {
            url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-project.png",
            width: 1200,
            height: 630,
            alt: "Hey Sainty Projects - Web apps, Tech Stack and more",
          },
        ],
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
