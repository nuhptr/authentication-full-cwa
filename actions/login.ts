"use server"

type LoginModelProps = {
    email: string
    password: string
}

export const login = (values: LoginModelProps) => {
    console.log("login action", values)
}
