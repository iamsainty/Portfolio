export const metadata = {
  title: "Disclaimer - Hey Sainty",
  description:
    "The information provided on Hey Sainty is for general informational purposes only. This page includes disclaimers regarding the accuracy of the content, external links, and liability limitations. Please read carefully before using the website.",
  keywords: [
    "Disclaimer",
    "Hey Sainty",
    "Privacy",
    "Content Accuracy",
    "External Links",
    "Liability",
  ],
  author: "Priyanshu Chaurasiya",
  canonical: "https://hey-sainty.vercel.app/page/disclaimer",
  openGraph: {
    type: "website",
    site_name: "Hey Sainty",
    title: "Disclaimer - Hey Sainty",
    description:
      "Read the disclaimer for Hey Sainty regarding content accuracy, liability limitations, and external links. Understand the terms before using the website.",
    url: "https://hey-sainty.vercel.app/page/disclaimer",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer - Hey Sainty",
    description:
      "Read the disclaimer for Hey Sainty regarding content accuracy, liability limitations, and external links. Understand the terms before using the website.",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    creator: "@iam__sainty",
  },
};

export default function Disclaimer() {
  return (
    <div className="w-full lg:w-3/5 mx-auto p-6">
      <h1 className="text-3xl lg:text-5xl font-extrabold my-10">Disclaimer</h1>

      <p className="text-lg mb-6 leading-relaxed text-justify">
        The information provided on <strong>Hey Sainty</strong> is for general
        informational purposes only. While I strive to ensure that all content,
        including blogs, projects, and professional details, is accurate and up
        to date, I make no representations or warranties of any kind regarding
        its completeness, accuracy, reliability, or suitability. Any reliance
        you place on the information found on this Website is strictly at your
        own risk.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Content and Ownership
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        All content on this Website, including blogs, skills, projects,
        education, certifications, and experiences, is personally created and
        owned by me unless otherwise stated. Some information may be sourced
        from third-party references for research purposes.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        External Links
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        This Website may contain links to external websites, including affiliate
        links or other third-party references. These links are provided for
        convenience and informational purposes only. I do not have control over
        the content, privacy policies, or practices of these external sites and
        do not endorse or take responsibility for any information, services, or
        products they provide.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Limitation of Liability
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        Under no circumstances shall I be liable for any loss, damage, fraud, or
        other issues arising from the use of this Website or any external links
        mentioned. Users are advised to verify any information before relying on
        it and exercise caution when engaging with third-party websites.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Changes and Updates
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        I reserve the right to modify, update, or remove any content on this
        Website at any time without prior notice. By using this Website, you
        agree to this Disclaimer and its terms.
      </p>

      <p className="text-lg font-semibold my-8">
        If you have any questions regarding this Disclaimer, feel free to
        contact me.
      </p>
    </div>
  );
}
