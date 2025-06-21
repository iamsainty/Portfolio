import { Suspense } from "react";
import PageContent from "./PageContent";
import Loading from "./Loading";
import { notFound } from "next/navigation";

async function getPage(permalink) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${permalink}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.page;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const page = await getPage(params.permalink);

  if (!page) {
    return notFound();
  }

  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/page/${page.permalink}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl,
    headline: page.title,
    description: page.description,
    image: [
      {
        url: page.coverimage,
        width: 1200,
        height: 630,
        alt: page.title + " - Hey Sainty",
      },
    ],
    datePublished: page.dateCreated,
    dateModified: page.lastUpdated,
  };

  return {
    title: page.title + " - Hey Sainty",
    description: page.description,
    openGraph: {
      title: page.title + " - Hey Sainty",
      description: page.description,
      url: pageUrl,
      images: [
        {
          url: page.coverimage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      locale: "en_US",
      type: "website",
      siteName: "Hey Sainty",
      url: pageUrl,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title + " - Hey Sainty",
      description: page.description,
      images: [
        {
          url: page.coverimage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      creator: "@iam__sainty",
    },
    jsonLd: JSON.stringify(jsonLd),
    category: "website",
  };
}

export default async function Page({ params }) {
  const page = await getPage(params.permalink);

  if (!page) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      <Suspense fallback={<Loading />}>
        <PageContent page={page} />
      </Suspense>
    </div>
  );
}
