import Groq from "groq-sdk"
import { ApiError } from "next/dist/server/api-utils";
import { Apiresponse } from "@/utils/Apiresponse";
import { NextResponse } from "next/server";


const groq = new Groq({ apiKey : process.env.GROQ_API_CLIENT });

export async function POST(request : Request ){
    try {
      const data : any  = await request.json() 
  
      if(!data || data.length === 0){ 
        console.log("Invalid data")
        throw new ApiError(400,"Invalid Data")
      }
  
      const systemPrompt : string = `You are an expert in generating ${data?.chooseyourway} ${data?.generatefor} bios for individuals in the any industry(will provided by the user). You will generate 4 ${data?.chooseyourway}, relevant, and concise ${data?.generatefor} bios based on the user's information.Avoid Emojis in professional,Don't make it too bid , generate no of words in bio that are acceptable by the ${data?.generatefor} organisation, keep relevant and concise use keywords when neccessary , Don't include hashtags .`
  
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
                    content : data?.textfield
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
              response: response || "", 
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
