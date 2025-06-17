import EditBlog from "./EditBlog";

export const metadata = {
  title: "Edit Blog Post - Hey Sainty",
  description: "Edit a blog post on Hey Sainty",
};

export default async function Page({ params }) {
  const { permalink } = await params;

  return (
    <div>
      <EditBlog permalink={permalink} />
    </div>
  );
}
