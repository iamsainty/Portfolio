import NewBlog from "./NewBlog";

export const metadata = {
  title: "New Blog Post - Hey Sainty",
  description: "Create a new blog post on Hey Sainty",
};

export default function Page() {
  return (
    <div>
      <NewBlog />
    </div>
  );
}
