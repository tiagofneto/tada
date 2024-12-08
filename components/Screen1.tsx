import { Button } from "./ui/button";
import Image from "next/image";

export default function Screen1({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="relative w-screen h-[50vh]">
        <Image 
          src="/contribs.png" 
          alt="contribs" 
          fill
          className="object-contain px-4"
          priority
        />
      </div>
      <h1 className="text-2xl font-bold text-center mb-8 px-4">
        How cracked of a dev are you?
      </h1>
      <Button
        onClick={onNext}
      >
        Take the test
      </Button>
    </div>
  )
}

