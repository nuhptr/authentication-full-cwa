import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL

/** Action to send verification email for the first time & redirect to /auth/new-verification?token=${token} */
export const sendVerificationEmail = async (email: string, token: string) => {
   const verificationLink = `${domain}/auth/new-verification?token=${token}`

   await resend.emails.send({
      from: "next-auth-v5-completed@resend.dev",
      to: email,
      subject: "Please verify your email.",
      html: `<p>Click <a href="${verificationLink}">here</a> to confirm email.</p>`,
   })
}

/** Trigger when successful login */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
   await resend.emails.send({
      from: "next-auth-v5-completed@resend.dev",
      to: email,
      subject: "Two Factor Authentication Email",
      html: `<p>Your token code is: ${token}</p>`,
   })
}

/** Action to send password reset email & redirect to /auth/new-password?token=${token} */
export const sendPasswordResetEmail = async (email: string, token: string) => {
   const resetLink = `${domain}/auth/new-password?token=${token}`

   await resend.emails.send({
      from: "next-auth-v5-completed@resend.dev",
      to: email,
      subject: "Password Reset Email",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
   })
}
