import NewPage from "./NewPage";

export const metadata = {
  title: "New Page - Hey Sainty",
  description: "Create a new page on Hey Sainty",
};

export default function Page() {
  return (
    <div className="p-8">
      <NewPage />
    </div>
  );
}
