import { cookies } from "next/headers";
import UserNavigation from "./UserNavigation";
import { redirect } from "next/navigation";

export default async function UserRootLayout({ children }) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value;
  if (!userToken) {
    redirect("/");
  }

  return (
    <div lang="en">
      <div className="flex flex-col lg:flex-row w-full">
        <UserNavigation />
        <main className="max-w-full lg:w-4/5">{children}</main>
      </div>
    </div>
  );
}
