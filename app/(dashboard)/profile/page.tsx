import ProfilePage from "@/features/profile/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - ERP Core",
  description: "View and edit your ERP user profile and settings",
};

export default function Page() {
  return <ProfilePage />;
}
