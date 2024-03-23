import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "./verification-token"
import { db } from "@/lib/database"

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    // new Date(new Date().getTime() + 3600 * 1000) will take the current time, convert it to milliseconds (menit -> milisecond), add 3600 seconds (1 hour), and then convert it back to a Date object.
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: { email, token, expires },
    })

    return verificationToken // { id: 1, email: '...', token: '...', expires: '...' }
}
