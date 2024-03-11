import * as z from "zod"

export const LoginModel = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, "Password at least have 1 character(s)"),
})
