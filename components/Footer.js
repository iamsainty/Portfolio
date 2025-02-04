import Link from "next/link";
import React from "react";

const footerSections = [
  {
    title: "Navigate",
    items: [
      { label: "Home", url: "/" },
      { label: "About", url: "/page/about" },
      { label: "Projects", url: "/projects" },
      { label: "Blog", url: "/blog" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "E-Mail", url: "mailto:ppriyanshuchaurasia@gmail.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/iamsainty/" },
      { label: "X (Twitter)", url: "https://twitter.com/iam__sainty" },
      { label: "Instagram", url: "https://www.instagram.com/iam__sainty" },
      { label: "GitHub", url: "https://github.com/iamsainty" },
    ],
  },
  {
    title: "Site Information",
    items: [
      { label: "Disclaimer", url: "/page/disclaimer" },
      { label: "Privacy Policy", url: "/page/privacy-policy" },
      { label: "GDPR Compliance", url: "/page/gdpr-compliance" },
      { label: "Sitemap", url: "/sitemap.xml" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="w-full py-16 bg-black opacity-85">
        <div className="w-5/6 lg:w-3/4 mx-auto px-6 lg:px-12 space-y-16">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg lg:text-xl font-bold mb-4 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.url}
                        className="text-white hover:underline transition duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Bottom Section */}
          <div className="text-xs md:text-sm space-y-5">
            <p className="text-white">
              &copy; {new Date().getFullYear()} Priyanshu Chaurasiya. Licensed
              under{" "}
              <Link
                href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
                className="text-white font-medium underline"
              >
                Attribution-NonCommercial-NoDerivatives 4.0 International
              </Link>
            </p>
            <p className="text-white font-medium">
              Designed and Developed with &hearts; by <span className="font-bold text-base">Priyanshu Chaurasiya</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
