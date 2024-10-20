"use client"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function Home() {
  return (
    <div className={`font-sans p-4 text-center`}>
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
      <div className=" mt-5 flex gap-3 flex-wrap justify-center flex-col">
        <h1 className="text-4xl font-[50px]">Your Perfect Bio, Ready in <span className="bg-yellow-200 px-4">Moments.</span></h1>
        <p className="text-sm opacity-70">Generate the perfect bio to boost your online presence.</p>
      </div>
    </div>
  );
}
