import z, { maxLength } from "zod";

export const CrateUserInput = z.object({
    username: z.string(),
    password: z.string()
    
})
    