export const metadata = {
  title: "Sitemap - Hey Sainty",
};

async function fetchBlogs() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?src=sitemap`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.blogs;
    }

    return [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

async function fetchPages() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/page`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.pages;
    }

    return [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [blogs, pages] = await Promise.all([fetchBlogs(), fetchPages()]);

  const blogsSitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.permalink}`,
    lastModified: blog.lastUpdated || new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const pagesSitemap = pages.map((page) => ({
    url: `${baseUrl}/page/${page.permalink}`,
    lastModified: page.lastUpdated || new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/project`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...blogsSitemap,
    ...pagesSitemap,
  ];
}
