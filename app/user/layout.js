import { cookies } from "next/headers";
import UserNavigation from "./UserNavigation";
import { redirect } from "next/navigation";

export default function UserRootLayout({ children }) {
  const userToken = cookies().get("userToken")?.value;
  if (!userToken) {
    redirect("/"); 
  }

  return (
    <div lang="en">
      <div className="flex w-full">
        <UserNavigation />
        <main className="w-4/5">{children}</main>
      </div>
    </div>
  );
}
