"use client"

import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
import { z } from "zod"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from "@/Schema/FormSchema"
import { FormField } from './ui/form'
import { useState } from "react"
import { Loader2 } from 'lucide-react'
import Meta from '@/public/meta.png'
import Mixtral from "@/public/mistral-ai-icon.png"
import Image from 'next/image'


export default function Userinput({ handlegroqdata } : { handlegroqdata : any }) {
    const [generating,setIsGenerating] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          model : "",
          textfield : "",
          chooseyourway : "professional",
          generatefor : "twitter"
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsGenerating(true)

        try {

            const result = await fetch('/api/generate',{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })

            if(!result.ok){
                throw new Error("Result received is -invalid")
            }

            const resultData = await result.json()

            if(!resultData){
                throw new Error("Convverting in json failed")
            }
            
            handlegroqdata(resultData?.response)

            setIsGenerating(false)
            
        } catch (error : any) {
            console.log("Failed to get response", error?.message)

            return Response.json(
                {
                    success : false,
                    message : "Failed to get resonse",
                    error : error
                },
                {
                    status : 500
                }
            )
        }
        
    }
    

  return (
    <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <div className='flex flex-col gap-3 '>
            <div className='border border-black rounded-md p-5'>
                <h1>Choose Models</h1>
                <FormField
                 control={form.control}
                 name = "model"
                 render={({ field }) => (
                    <div>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='mixtral-8x7b-32768'>
                                        <div className='flex gap-1 justify-center items-center'>
                                            <Image src={Mixtral} alt='meta' className='w-3' />
                                            <p className='text-xs font-semibold'>Mixtral<span className='opacity-50 font-light'> - 8x7b</span></p>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='llama3-70b-8192'>
                                        <div className='flex gap-1 justify-center items-center'>
                                            <Image src={Meta} alt='meta' className='w-4' />
                                            <p className='text-xs font-semibold'>Llama3<span className='opacity-50 font-light'> - 70b</span></p>
                                        </div>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                 )}
                />
            </div>

            <div className='border flex flex-col gap-3 border-black rounded-md p-5'>
                <p className='text-sm'>Tell us about Yourself.</p>

                <FormField
                 control={form.control}
                 name="textfield"
                 render={({ field }) => (
                    <Textarea {...field}  rows={4} placeholder="* Write about yourself" className='p-3 placeholder:italic placeholder:text-xs'/>
                 )}
                 />

                <div className='flex gap-5 justify-center'>

                <FormField
                      control={form.control}
                      name="chooseyourway"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose Your way" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="professional">Professional</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="funny">Funny</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                       )}
                     />

                    <FormField
                      control={form.control}
                      name="generatefor"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose for" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="linkedin">Linkedin</SelectItem>
                                    <SelectItem value="twitter">twitter</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                       )}
                     />
                </div>
            </div>

            <Button type='submit'>
                {generating === true ? <Loader2 size={5} className='animate-spin' /> : "Generate" }
            </Button>
    </div>
    </form>
    </FormProvider>
  )
}
