import { AccountNav } from "@/components/Account/AccountNav";
import { ProfileForm } from "@/components/Account/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information and how it appears to your team.
        </p>
      </div>
      <AccountNav />
      <div className="mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}
