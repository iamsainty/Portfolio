import Link from "next/link";
import React from "react";

const footerSections = [
  {
    title: "Navigate",
    items: [
      { label: "Home", url: "/" },
      { label: "About", url: "/page/about" },
      { label: "Project", url: "/project" },
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
      { label: "Contact", url: "/page/contact" },
      { label: "Disclaimer", url: "/page/disclaimer" },
      { label: "Privacy Policy", url: "/page/privacy-policy" },
      { label: "Terms and Conditions", url: "/page/terms-and-conditions" },
      { label: "Sitemap", url: "/sitemap.xml" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white" role="contentinfo">
      <div className="w-full py-16 bg-black opacity-85">
        <div className="w-5/6 lg:w-3/4 mx-auto px-6 lg:px-12 space-y-16">
          <nav aria-label="Footer Navigation">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <section
                  key={section.title}
                  aria-labelledby={section.title
                    .toLowerCase()
                    .replace(/\s/g, "-")}
                >
                  <h3
                    id={section.title.toLowerCase().replace(/\s/g, "-")}
                    className="text-lg lg:text-xl font-bold mb-4 text-white"
                  >
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.url}
                          className="text-white hover:underline transition duration-300"
                          target={
                            item.url.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.url.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          title={item.label}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </nav>

          <div className="text-xs md:text-sm space-y-5">
            <p className="text-white">
              &copy; {new Date().getFullYear()} Hey Sainty. Licensed under{" "}
              <Link
                href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
                className="text-white font-medium underline"
                target="_blank"
                rel="noopener noreferrer"
                title="View license details"
              >
                Attribution-NonCommercial-NoDerivatives 4.0 International
              </Link>
            </p>
            <address className="not-italic text-white font-medium">
              Designed and Developed with &hearts; by{" "}
              <span className="font-bold text-base">Priyanshu Chaurasiya</span>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
