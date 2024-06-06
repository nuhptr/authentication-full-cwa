import * as z from "zod"
import { UserRole } from "@prisma/client"

export const LoginModel = z.object({
   email: z.string().email({ message: "Email is required." }),
   password: z.string().min(6, { message: "Password at least 6 characters." }),
   // for 2FA authentication
   code: z.optional(z.string()),
})

export const RegisterModel = z.object({
   name: z.string().min(1, { message: "Name at least have 1 character(s)" }),
   email: z.string().email({ message: "Email is required." }),
   password: z.string().min(6, { message: "Password at least have 6 character(s)." }),
})

export const ResetModel = z.object({
   email: z.string().email({ message: "Email is required." }),
})

export const NewPasswordModel = z.object({
   password: z.string().min(6, { message: "Password at least have 6 character(s)." }),
})

export const SettingsModel = z
   .object({
      name: z.optional(z.string()),
      email: z.optional(z.string().email()),
      password: z.optional(z.string().min(6)),
      newPassword: z.optional(z.string().min(6)),
      isTwoFactorEnabled: z.optional(z.boolean()),
      role: z.enum([UserRole.ADMIN, UserRole.USER]),
   })
   .refine(
      (data) => {
         if (data.password && !data.newPassword) return false
         return true
      },
      { message: "New password is required!", path: ["newPassword"] }
   )
   .refine(
      (data) => {
         if (data.newPassword && !data.password) return false
         return true
      },
      { message: "Password is required!", path: ["password"] }
   )
