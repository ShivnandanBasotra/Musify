import {z} from "zod";

export const signupSchema = z.object({
    username: z.string().min(1),
    password:z.string().min(1) ,
    firstName:z.string().min(1),
    lastName:z.string().min(1)
})

export type SignupSchemaType = z.infer<typeof signupSchema>;