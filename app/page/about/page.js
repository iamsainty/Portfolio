export const metadata = {
  title:
    "About Hey Sainty - My Journey as a Developer, Tech Enthusiast & Blogger",
  description:
    "Hey Sainty started as a simple React project and grew into a full-stack platform for sharing tech blogs, personal projects, and insights. Learn more about my journey, vision, and what you can explore on this evolving tech-focused website!",
  keywords: [
    "Hey Sainty",
    "Priyanshu Chaurasiya",
    "Priyanshu Sainty",
    "About Hey Sainty",
    "About Sainty",
  ],
  author: "Priyanshu Chaurasiya",
  canonical: "https://hey-sainty.web.app/page/about",
  openGraph: {
    type: "website",
    site_name: "Hey Sainty",
    title: "About - Hey Sainty",
    description:
      "Hey Sainty is a tech-focused platform where I share blogs, projects, and insights from my journey as a developer. Explore programming topics, tech trends, and more!",
    url: "https://hey-sainty.web.app/page/about",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Hey Sainty",
    description:
      "Hey Sainty is a tech-focused platform where I share blogs, projects, and insights from my journey as a developer. Explore programming topics, tech trends, and more!",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    creator: "@iam__sainty",
  },
};

export default function Page() {
  return (
    <div className="w-full lg:w-3/5 mx-auto p-6">
      <h1 className="text-3xl lg:text-5xl font-extrabold my-10">
        About Hey Sainty!
      </h1>
      <p className="text-lg mb-8 leading-relaxed text-justify">
        Hey Sainty started as a simple hands-on project to learn React, but it
        quickly evolved into something much bigger. What began as an experiment
        has now grown into a full-stack platform where I share my thoughts,
        experiences, and technical insights through blogs. As I continue to
        develop and expand this website, my goal is to create a space where
        developers, tech enthusiasts, and curious minds can explore, learn, and
        engage.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        What is Hey Sainty About?
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        At its core, Hey Sainty is a blog and tech-focused platform. Here, I
        publish technology-related blogs, share insights from my learning
        journey, and showcase my projects. But it&apos;s more than just a
        blog—this website is constantly evolving. Users can sign up, log in, and
        manage their profiles, engage with content by adding comments, and
        interact in meaningful ways. In the future, I plan to introduce even
        more features to enhance engagement and make this platform even more
        valuable.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Who Is This Website For?
      </h2>
      <p className="text-lg">Hey Sainty is designed for:</p>
      <ul className="list-disc pl-8 text-lg space-y-3 mt-4">
        <li className="leading-relaxed text-justify">
          <span className="font-semibold">Developers & Tech Enthusiasts -</span>
          Whether you&apos;re a beginner or an experienced coder, you&apos;ll
          find insights, project showcases, and blogs related to programming and
          technology.
        </li>
        <li className="leading-relaxed text-justify">
          <span className="font-semibold">Knowledge Seekers -</span> If
          you&apos;re passionate about tech trends, general knowledge, or
          exploring new ideas, there&apos;s something here for you.
        </li>
        <li className="leading-relaxed text-justify">
          <span className="font-semibold">Anyone Curious About My Work -</span>{" "}
          If you&apos;re interested in my journey, skills, or personal projects,
          this is where I document and share them.
        </li>
      </ul>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        What Can You Do Here?
      </h2>
      <p className="text-lg">As a visitor or a registered user, you can:</p>
      <ul className="list-disc pl-8 text-lg space-y-3 mt-4">
        <li className="leading-relaxed text-justify">
          <span className="font-semibold">Read tech blogs –</span> Learn from my
          experiences, coding experiments, and insights into various
          technologies.
        </li>
        <li className="leading-relaxed text-justify">
          <span className="font-semibold">Explore my projects –</span> Check out
          the work I&apos;ve done, the tools I&apos;ve used, and how I approach
          building things.
        </li>
        <li className="leading-relaxed text-justify">
          <span className="font-semibold">Engage with content –</span> Comment
          on blogs, interact with posts, and become part of the discussion.
        </li>
        <li className="leading-relaxed text-justify">
          <span className="font-semibold">Stay tuned for more! –</span> I&apos;m
          actively working on adding new features, so expect more ways to
          interact and explore content soon.
        </li>
      </ul>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        The Journey Ahead
      </h2>
      <p className="text-xl mb-8 leading-relaxed text-justify">
        Hey Sainty is a work in progress, and I&apos;m excited about the
        possibilities. I have plans to enhance user experience, introduce more
        interactive features, and expand the content library. My aim is to
        create a space where knowledge, technology, and curiosity meet.
      </p>
    </div>
  );
}
