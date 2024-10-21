"use client"

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import SparklesText from "@/components/magicui/sparkles-text";
import Github from "@/public/github1.png"
import Image from "next/image";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Userinput from "@/components/Userinput";
import Aioutput from "@/components/Aioutput";

export default function Home() {
  return (
    <div className={`font-sans p-4`}>
      <DotPattern
        width={20}
        height={20}
        cx={3}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] z-10 ",
        )}
      />
      <div className=" mt-5 flex gap-3 flex-wrap items-center justify-center flex-col">
        <h1 className="text-4xl font-[50px]">Your Perfect Bio, Ready in <SparklesText text="Moments ."  sparklesCount={7} className=" text-center text-4xl font-light" /></h1>
        <p className="text-sm opacity-70">Generate the perfect bio to boost your online presence.</p>
      </div>

      <div className="flex justify-center mt-10 gap-5">
      <ShimmerButton  borderRadius="10px" className="flex gap-2 p-2 shadow-2xl ">
        <Image src={Github} className="w-5" alt="github" />
        <p className="text-xs opacity-70">star on github</p>
      </ShimmerButton>

      <ShimmerButton  borderRadius="10px" className="shadow-2xl p-2">
        <span className="text-xs opacity-70">Using groq ai inference</span>
      </ShimmerButton>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-10 ml-16 mr-16">
        <Userinput />
        <Aioutput />
      </div>
      
    </div>
  );
}
