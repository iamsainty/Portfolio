import Users from "./Users";

export const metadata = {
  title: "Manage Users - Hey Sainty",
  description: "Manage the users of the website, see quick stats and more",
};

export default async function page() {
  return (
    <div className="container mx-auto flex flex-col gap-10 p-8">
      <Users />
    </div>
  );
}
