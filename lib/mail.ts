import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL

/**
 * This action will trigger when you successful login
 * @param email string
 * @param token string
 */
export async function sendTwoFactorTokenEmail(email: string, token: string) {
   await resend.emails.send({
      from: "auth-full-cwa@resend.dev",
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code is: ${token}</p>`,
   })
}

/**
 * Action to send password reset email to user and redirect to /auth/new-password?token=${token}
 * @param email string
 * @param token string
 */
export async function sendPasswordResetEmail(email: string, token: string) {
   const resetLink = `${domain}/auth/new-password?token=${token}`

   await resend.emails.send({
      from: "auth-full-cwa@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `
            <p>Click <a href="${resetLink}">here</a> to reset password</p>
        `,
   })
}

/**
 * Action to send verification email for the first time and will redirect to /auth/new-verification?token=${token}
 * @param email string
 * @param token string
 */
export async function sendVerificationEmail(email: string, token: string) {
   const confirmLink = `${domain}/auth/new-verification?token=${token}`

   await resend.emails.send({
      from: "auth-full-cwa@resend.dev",
      to: email,
      subject: "Please confirm your email address",
      html: `
            <p>Click <a href="${confirmLink}">here</a> to confirm email</p>
        `,
   })
}
