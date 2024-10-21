"use client"

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import SparklesText from "@/components/magicui/sparkles-text";
import Github from "@/public/github1.png"
import Image from "next/image";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Userinput from "@/components/Userinput";
import Aioutput from "@/components/Aioutput";
import { useState } from "react";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text"

export default function Home() {
  const [groqdata,setgroqData] = useState("")


  function handleGroqData(data: any) {
    console.log("Type of data of groq response",typeof(data))
    setgroqData(data)
  }

  function handletogithub(){
    window.open("https://github.com/manishSharma1-dev/linkedinBio")
  }

  return (
    <div className={`font-sans py-3 pl-10 pr-10`}>
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

      <div className="flex justify-center  items-center flex-col mt-5 gap-5">

      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 border-black border rounded-3xl cursor-pointer">
        <span className="text-sm">✨ Using llama and mixtral llm</span>
      </AnimatedShinyText>

      <ShimmerButton onClick={handletogithub}  borderRadius="10px" className="flex gap-2 p-2 shadow-2xl shadow-neutral-400 ">
        <Image src={Github} className="w-5" alt="github" />
        <p className="text-xs opacity-70">star on github</p>
      </ShimmerButton>

      </div>

      <div className="grid grid-cols-2 gap-10 mt-7 ml-16 mr-16">
        <Userinput handlegroqdata={handleGroqData} />
        <Aioutput groqdata={groqdata} />
      </div>
      
    </div>
  );
}
