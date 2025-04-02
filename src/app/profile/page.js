import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";

export default function Profile() {
  return (
    <div suppressHydrationWarning>
      <SignedIn suppressHydrationWarning>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton suppressHydrationWarning />
      </SignedOut>
    </div>
  );
}
