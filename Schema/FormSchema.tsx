import * as z from "zod"

const formSchema = z.object({
    model : z.string(),
    textfield : z.string(),
    chooseyourway : z.string(),
    generatefor  : z.string()
})

export {
    formSchema
}