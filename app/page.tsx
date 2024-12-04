import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";
import ReclaimDemo from "@/components/reclaim";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full max-w-4xl">
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          {session ? (
            <>
              <p>Username: {session.user?.name}</p>
              <SignOut />
            </>
          ) : (
            <SignIn />
          )}
        </div>
        <div className="border-l border-gray-300 h-full"></div>
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <ReclaimDemo />
        </div>
      </div>
    </div>
  );
}
