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
