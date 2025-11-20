import ManageComment from "./ManageComment";

export const metadata = {
  title: "All Comments - Hey Sainty",
  description: "View and manage all the comments on your website.",
};

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-10 p-8">
      <ManageComment />
    </div>
  );
}
