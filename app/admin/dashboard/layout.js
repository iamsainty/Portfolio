import { AdminSidebar } from "./AdminSidebar";

export default function adminLayout({ children }) {
  return (
    <div lang="en">
      <div className="flex w-full">
        <AdminSidebar/>
        <main className="w-4/5">{children}</main>
      </div>
    </div>
  );
}
