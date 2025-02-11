export const metadata = {
  title: "Sitemap - Hey Sainty",
};

async function getBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const blogs = await response.json();
  return blogs;
}

export default async function sitemap() {
  const blogs = await getBlogs();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const blogsSitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.permalink}`,
    lastModified: blog.lastUpdated,
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
