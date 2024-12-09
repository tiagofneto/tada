export default function Header({ username }: { username: string }) {
  return (
    <header className="bg-gray fixed top-0 left-0 right-0 flex justify-between items-center p-4 shadow-md z-10">
      <span className="font-semibold">{username}</span>
      <span className="text-blue-600 font-bold">cracked</span>
    </header>
  )
}

