import z from "zod";


export const signUpSchema=z.object({
    email:z.string().email("Please enter a valid email address"),
    password:z.string().min(10,"Password must be at least 10 characters"),
    username:z.string().min(4,"Min 4 length")
})

export type SignUpSchema=z.infer<typeof signUpSchema>;