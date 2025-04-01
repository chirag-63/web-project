import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";

export default function Profile() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton suppressHydrationWarning />
      </SignedOut>
    </div>
  );
}
