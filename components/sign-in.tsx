import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", {
            redirectTo: "https://e18b-85-244-177-81.ngrok-free.app/api/auth/callback/github",
        })
      }}
    >
      <button 
        type="submit" 
        className="flex items-center justify-center bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-200"
      >
        Sign in with GitHub
      </button>
    </form>
  )
} 