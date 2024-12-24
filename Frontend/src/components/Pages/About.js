import React from "react";
import Introduction from "../Introduction";
import { Helmet } from "react-helmet-async";

const aboutheading = [
  "Educational Journey",
  "Passion for Development",
  "Technical Skills",
  "Freelance Aspirations",
  "Future Endeavors",
];

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About - Hey Sainty | Priyanshu Chaurasiya</title>
        <meta
          name="description"
          content="Hey Sainty is a blog website created by Priyanshu Chaurasiya. It is a platform for him to share his thoughts, ideas, and experiences with the world."
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta
          property="og:title"
          content="About - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          property="og:description"
          content="Hey Sainty is a blog website created by Priyanshu Chaurasiya. It is a platform for him to share his thoughts, ideas, and experiences with the world."
        />
        <meta
          property="og:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta property="og:url" content="https://hey-sainty.web.app/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hey Sainty" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          name="twitter:description"
          content="Hey Sainty is a blog website created by Priyanshu Chaurasiya. It is a platform for him to share his thoughts, ideas, and experiences with the world."
        />
        <meta
          name="twitter:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta name="twitter:url" content="https://hey-sainty.web.app/about" />

        <link rel="canonical" href="/about" />
      </Helmet>
      <Introduction array={aboutheading} heading={"About me"} />
      <div style={{ width: "100%", height: "15vh" }}></div>
      <div style={{ color: "black" }}>
        <div
          className="container"
          style={{ padding: "2vh", textAlign: "justify" }}
        >
          <p style={{ fontSize: "2vh" }}>
            Hello, I'm Priyanshu Chaurasiya, originally from Azamgarh, Uttar
            Pradesh, India. I spent my formative years at KVN Public School in
            Varanasi. While I was an average student, my curiosity and passion
            for design started to blossom. After completing high school in 2018
            and intermediate studies in 2020, I decided to take a gap year
            before embarking on my journey in the world of technology.
          </p>
          <br />

          <p style={{ fontSize: "2vh" }}>
            Currently, I am pursuing a Bachelor's in Computer Science from Babu
            Banarasi Das Institute of Technology and Management in Lucknow.
            Despite my initial academic standing, I discovered a keen interest
            in designing, particularly in planning layouts and creating diverse
            and engaging structures. Although not adept at drawing or sketching,
            the conceptualization of visually appealing designs has always been
            a source of joy for me.
          </p>
          <br />

          <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
            Educational Journey
          </h2>

          <p style={{ fontSize: "2vh" }}>
            After a productive gap year, I enrolled in the field of Computer
            Science in pursuit of my passion for technology. As a student in the
            second year, I found a new passion for building an online presence,
            especially during the challenging days of lockdown. This led me to
            venture into blogging, hoping to establish a digital footprint.
          </p>
          <br />

          <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
            Passion for Development
          </h2>

          <p style={{ fontSize: "2vh" }}>
            My journey into the realms of web development and design began with
            a blend of interests – a love for crafting online presence, a
            fascination with layouts, and my chosen field of study in B.Tech
            CSE. Over time, I delved into mastering tools like Canva and Figma,
            honing my skills in graphic design and layout creation.
            Simultaneously, I embarked on the path of web development,
            continuously learning and practicing the art.
          </p>
          <br />

          <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
            Technical Skills
          </h2>

          <p style={{ fontSize: "2vh" }}>
            As a Computer Science student, I am committed to mastering Data
            Structures and Algorithms (DSA). Currently proficient in C++ and
            Java, I am evolving into a proficient programmer. My goal is to
            become a versatile and skilled developer capable of delivering
            advanced websites.
          </p>
          <br />

          <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
            Freelance Aspirations
          </h2>

          <p style={{ fontSize: "2vh" }}>
            Driven by the desire to contribute my skills to the community, I aim
            to become a freelance developer. The projects showcased in the
            'Projects' section reflect my dedication to creating innovative and
            functional solutions. I take pride in developing websites that not
            only meet but exceed the expectations of my clients.
          </p>
          <br />

          <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
            Future Endeavors
          </h2>

          <p style={{ fontSize: "2vh" }}>
            Looking ahead, I aspire to continue expanding my skills in both
            design and development. I am enthusiastic about embracing new
            challenges, acquiring further expertise in DSA, and exploring the
            ever-evolving world of technology.
          </p>
          <br />

          <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>Contact Me</h2>

          <p style={{ fontSize: "2vh" }}>
            If you would like to learn more about me or discuss potential
            collaborations, please feel free to contact me.
          </p>
          <br />

          <p style={{ fontSize: "2vh" }}>
            Thank you for taking the time to get to know me. I look forward to
            new opportunities and challenges in the dynamic field of technology.
          </p>
        </div>
      </div>
    </div>
  );
}
