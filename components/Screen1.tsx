import { MiniKit } from "@worldcoin/minikit-js"

export default async function Screen1({ onNext }: { onNext: () => void }) {
  async function generateWalletAuth() {
  const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth({
    nonce: Math.floor(Math.random() * 1000000).toString(),
    })
    return { generateMessageResult, finalPayload }
  }

  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        How cracked of a dev are you?
      </h1>
      <button
        onClick={async () => {
          const { generateMessageResult, finalPayload } = await generateWalletAuth()
          if (finalPayload.status === 'error') {
            console.error('Error generating wallet auth:')
            console.error(generateMessageResult)
            console.error(finalPayload)
          } else {
            onNext()
          }
        }}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Take me to the test
      </button>
    </div>
  )
}

