import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";
import ReclaimDemo from "@/components/reclaim";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
      <ReclaimDemo />
    </div>
  );
}
