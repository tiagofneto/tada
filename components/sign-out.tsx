import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button 
        type="submit"
        className="flex items-center justify-center bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-200"
      >
        Sign Out
      </button>
    </form>
  )
}