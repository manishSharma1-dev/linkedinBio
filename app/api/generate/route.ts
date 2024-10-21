import Groq from "groq-sdk"
import { ApiError } from "next/dist/server/api-utils";
import { Apiresponse } from "@/utils/Apiresponse";
import { NextResponse } from "next/server";


const groq = new Groq({ apiKey : "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" });

export async function POST(request : Request ){
    try {
      const data : any  = await request.json() 
  
      if(!data || data.length === 0){ 
        console.log("Invalid data")
        throw new ApiError(400,"Invalid Data")
      }

      console.log(data)
      console.log(typeof(data?.model))
      console.log(typeof(data?.textfield))
      console.log(typeof(data?.chooseyourway))
      console.log(typeof(data?.generatefor))
  
      const systemPrompt : string = `You are an expert in generating ${data?. chooseyourway} ${data?.generatefor} bios for individuals across various industries, focusing on creating profiles that highlight skills, experience,achievements and key attributes. You will generate 4 ${data?.chooseyourway}, relevant, and concise ${data?.generatefor} bios based on the user's information, regardless of their job profile or industry.`

      const UserInput = data.textfield
  
      try {
        const completion = await groq.chat.completions
          .create({
            messages : [
                {
                    role : "system",
                    content : systemPrompt
                },
                {
                    role : "user",
                    content : typeof(data) === "string" ? JSON.stringify(UserInput) : ''
                }
            ],
            model : data?.model
          } 
        )
        
        const response = await completion.choices[0]?.message?.content
    
        return NextResponse.json(
            {
              success: true,
              message: "Groq data received",
              response: response || "",  // Include the actual response if needed
            },
            {
              status: 200,
            }
        );

      } catch (error : any) {
        console.log("Issue faced generating response from Groq", error?.error?.message);
  
        return NextResponse.json<Apiresponse>(
          {
            success: false,
            message: "Failed Generating Content",
          },
          {
            status: 500,
          }
        );
      }
    } catch (error : any ) {
      console.log("Response Generation Failed");

      return NextResponse.json<Apiresponse>(
        {
          success: false,
          message: "Response -Generation failed",
        },
        {
          status: 500,
        }
      );

    }
}