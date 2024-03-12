import * as z from "zod"

export const LoginModel = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, "Password at least have 1 character(s)"),
})

export const RegisterModel = z.object({
    name: z.string().min(1, "Name at least have 1 character(s)"),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, "Password at least have 6 character(s)"),
})
