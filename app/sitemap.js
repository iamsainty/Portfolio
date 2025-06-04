export const metadata = {
  title: "Sitemap - Hey Sainty",
};

const fetchBlogs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );
    const data = await response.json();
    if (data.success) {
      return data.blogs;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

export default async function sitemap() {
  const blogs = await fetchBlogs();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const blogsSitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.permalink}`,
    lastModified: blog.lastUpdated || new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
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
    {
      url: `${baseUrl}/page/about`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/page/contact`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/page/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/page/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...blogsSitemap,
  ];
}
