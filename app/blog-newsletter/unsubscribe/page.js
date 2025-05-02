import ManageSubscription from "./ManageSubscription";

export const metadata = {
  title: "Manage Newsletter Subscription - Hey Sainty",
  description:
    "Manage your email newsletter subscription preferences with Hey Sainty. Subscribe or unsubscribe anytime with ease.",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div>
      <ManageSubscription />
    </div>
  );
}
