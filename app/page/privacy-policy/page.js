export const metadata = {
  title: "Privacy Policy - Hey Sainty",
  description:
    "At Hey Sainty, your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and share your personal data when you use this website.",
  keywords: [
    "Privacy Policy",
    "Hey Sainty Privacy",
    "Data Protection",
    "Personal Data",
    "Privacy Policy Hey Sainty",
  ],
  author: "Priyanshu Chaurasiya",
  canonical: "https://hey-sainty.vercel.app/page/privacy-policy",
  openGraph: {
    type: "website",
    site_name: "Hey Sainty",
    title: "Privacy Policy - Hey Sainty",
    description:
      "Read the privacy policy for Hey Sainty to understand how we collect and manage your personal data to enhance your experience on the website.",
    url: "https://hey-sainty.vercel.app/page/privacy-policy",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Hey Sainty",
    description:
      "Learn how we protect your personal data on Hey Sainty with our detailed privacy policy.",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    creator: "@iam__sainty",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full lg:w-3/5 mx-auto p-6">
      <h1 className="text-3xl lg:text-5xl font-extrabold my-10">
        Privacy Policy
      </h1>

      <p className="text-lg mb-6 leading-relaxed text-justify">
        At <strong>Hey Sainty</strong>, your privacy is important to us. This
        Privacy Policy outlines how we collect, use, protect, and share your
        personal data when you use this website. By using this website, you
        agree to the collection and use of your data in accordance with this
        policy.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Personal Data Collection
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        When you sign up for an account on <strong>Hey Sainty</strong>, we
        collect the following personal information:
        <ul className="list-disc pl-8 text-lg space-y-3 my-4">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your profile picture</li>
          <li>Your notification preferences for this website</li>
          <li>Any additional information you choose to provide</li>
        </ul>
        This data is essential for the functioning of your user profile and to
        improve your experience on the site.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Use of Collected Data
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        We use the information collected from you for the following purposes:
        <ul className="list-disc pl-8 text-lg space-y-3 my-4">
          <li>
            Displaying your profile where necessary (e.g., associating your name
            with comments on blog posts)
          </li>
          <li>Providing content tailored to your preferences</li>
          <li>
            Sending you emails or newsletters related to updates, new content,
            and relevant news
          </li>
        </ul>
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Third-Party Services
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        <strong>Hey Sainty</strong> uses several third-party services for
        various purposes, including:
        <ul className="list-disc pl-8 text-lg space-y-3 my-4">
          <li>
            <strong>Google Analytics:</strong> We use Google Analytics to
            analyze user behavior and improve the website. Google may collect
            data that we do not control.
          </li>
          <li>
            <strong>MongoDB, AWS, and Cloudinary:</strong> We store user data on
            MongoDB, AWS, and Cloudinary to manage your profile data and content
            like your profile picture.
          </li>
        </ul>
        Please note that while we do not share personal data with third parties,
        your behavior and interactions with the site may be monitored by Google
        Analytics for statistical purposes.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Cookies and Tracking Technologies
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        Our website uses cookies and similar tracking technologies to enhance
        your user experience. Cookies are used for:
        <ul className="list-disc pl-8 text-lg space-y-3 my-4">
          <li>Managing your user profile state (e.g., login sessions)</li>
          <li>Analyzing website usage through Google Analytics</li>
          <li>Improving future user experience through personalization</li>
        </ul>
        You may choose to disable cookies through your browser settings, but
        please note that some features of the site may not function properly
        without them.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Data Security
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        We take the security of your personal data seriously and implement
        appropriate technical and organizational measures to protect it.
        However, please note that no method of transmission over the internet is
        completely secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">
        Changes to This Privacy Policy
      </h2>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        We reserve the right to update or change this Privacy Policy at any
        time. Any changes will be reflected on this page with an updated date.
        We encourage you to review this policy periodically for any updates.
      </p>
    </div>
  );
}
