import EditPage from "./EditPage";

export const metadata = {
  title: "Edit Page - Hey Sainty",
  description: "Edit a page on Hey Sainty",
};

export default async function page({ params }) {
  const { permalink } = await params;

  return (
    <div>
      <EditPage permalink={permalink} />
    </div>
  );
}
