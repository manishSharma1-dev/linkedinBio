"use client"

import React, { useEffect, useState } from 'react'
import { BorderBeam } from "@/components/magicui/border-beam";

export default function Aioutput({ groqdata } : { groqdata : any }) {
  const [formattext, setFormatText] = useState(undefined)

  useEffect(() => {
      const makedatainStructuredWay = () => {
        const bios = groqdata.split(/\d\./).map((bio: string) => bio.trim()).filter((bio: any) => bio)

        const formattedBios = bios.map((bio : any, index : number) => {
          const structuredBio = bio.replace(/\.(?!\s#)/g, ' | ').replace(/ #/g, ' #'); 

          return `${++index}. ${structuredBio.trim()}.`;

        }) 

        const structuredText = formattedBios.join("\n\n");

        console.log(structuredText)

        setFormatText(structuredText)

      }

      makedatainStructuredWay()
  },[groqdata])

  return (
    <div>
      <div className='border border-black rounded-md min-h-96 max-h-96 h-auto  overflow-hidden px-14 pt-5 relative w-auto bg-background md:shadow-xl'>
      <BorderBeam size={100} duration={12} delay={10} />
        <p className='text-md text-center mb-4 font-semibold'>Generated Output.</p>
        <div className='overflow-y-scroll max-h-80'>
          <p className='text-xs whitespace-pre-line'>{formattext}</p>
        </div>
      </div>
    </div>
  )
}
