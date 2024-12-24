import React from "react";
import Introduction from "../Introduction";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const headings = [
  "Purpose of Data Processing",
  "Categories of Personal Data",
  "Legal Basis for Processing",
  "Data Retention Period",
  "Data Subject Rights",
  "Third-Party Data Processors",
  "Updates to this GDPR",
];

export default function GDPRCompliance(props) {

  return (
    <div className="container">
      <Helmet>
        <title>GDPR Compliance - Hey Sainty | Priyanshu Chaurasiya</title>
        <meta
          name="description"
          content="This is the GDPR compliance page for Hey Sainty. It contains the GDPR compliance for the website."
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta
          property="og:title"
          content="GDPR Compliance - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          property="og:description"
          content="This is the GDPR compliance page for Hey Sainty. It contains the GDPR compliance for the website."
        />
        <meta
          property="og:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta property="og:url" content="https://hey-sainty.web.app/gdpr-compliance" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hey Sainty" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="GDPR Compliance - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          name="twitter:description"
          content="This is the GDPR compliance page for Hey Sainty. It contains the GDPR compliance for the website."
        />
        <meta
          name="twitter:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta name="twitter:url" content="https://hey-sainty.web.app/gdpr-compliance" />

        <link rel="canonical" href="/gdpr-compliance" />
      </Helmet>
      <Introduction array={headings} heading={"GDPR Compliance"} /> <br />
      <br />
      <br />
      <div style={{ padding: "2vh", textAlign: "justify" }}>
        <p style={{ fontSize: "2vh" }}>
          Welcome to my personal portfolio website, This page outlines the GDPR
          compliance details to ensure transparency and protect your privacy.
          Please read the following information carefully.
        </p>
        <br />

        <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
          Purpose of Data Processing
        </h2>
        <p style={{ fontSize: "2vh" }}>
          I, Priyanshu Chaurasiya, do not collect any personal data directly
          from visitors to my website. The primary purpose of data processing on
          this site is to analyze website traffic and performance through
          third-party services, specifically Google Analytics and Google Search
          Console. These services help me understand user interactions and
          improve the overall user experience.
        </p>
        <br />

        <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
          Categories of Personal Data
        </h2>
        <p style={{ fontSize: "2vh" }}>
          I do not request or process any personal data from visitors on this
          website. The only data processed is anonymized and aggregated
          information provided by Google Analytics, which includes general
          details such as location, device type, and browsing behavior.
        </p>
        <br />

        <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
          Legal Basis for Processing
        </h2>
        <p style={{ fontSize: "2vh" }}>
          The legal basis for processing data on this website is the legitimate
          interest in understanding how visitors interact with the content and
          improving the site's performance. No personal data is collected
          without the explicit consent of the user.
        </p>
        <br />

        <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
          Data Retention Period
        </h2>
        <p style={{ fontSize: "2vh" }}>
          The data collected through Google Analytics is retained for a period
          defined by Google's policies. For details on Google's data retention,
          please refer to Google's Privacy Policy.
        </p>
        <br />

        <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
          Data Subject Rights
        </h2>
        <p style={{ fontSize: "2vh" }}>
          As a user, you have the right to access, rectify, or delete any
          personal data processed on this website. However, since no personal
          data is directly collected, these rights are applicable to data
          collected by third-party services. You can exercise these rights
          directly through Google's services.
        </p>
        <br />

        <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
          Third-Party Data Processors
        </h2>
        <p style={{ fontSize: "2vh" }}>
          This website uses third-party services, namely Google Analytics and
          Google Search Console, as data processors. These services may collect
          and process information in accordance with their privacy policies.
          Please refer to Google's Privacy Policy for more details.
        </p>
        <br />

        <h2 style={{ fontSize: "3.5vh", fontWeight: "bold" }}>
          Updates to this GDPR Compliance Statement
        </h2>
        <p style={{ fontSize: "2vh" }}>
          This GDPR Compliance Statement may be updated periodically to reflect
          any changes in data processing practices or legal requirements. Please
          check this page for the latest information.
        </p>
        <br />

        <p style={{ fontSize: "2vh" }}>
          If you have any questions or concerns regarding the GDPR compliance of
          this website, please contact me at{" "}
          <Link to="mailto:ppriyanshuchaurasiya@gmail.com">
            ppriyanshuchaurasiya@gmail.com
          </Link>
        </p>
        <br />
      </div>
    </div>
  );
}
