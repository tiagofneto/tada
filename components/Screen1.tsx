export default function Screen1({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        How cracked of a dev are you?
      </h1>
      <button
        onClick={onNext}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Take the test
      </button>
    </div>
  )
}

