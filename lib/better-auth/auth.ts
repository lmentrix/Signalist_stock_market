import { betterAuth } from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {connectToDatabase} from "@/app/database/mongoose";
import {nextCookies} from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null=null


export const get_auth = async ()=>{
    if(authInstance) return authInstance

    const mongoose = await connectToDatabase()
    const db = mongoose.connection.db

    if(!db) throw new Error('mongobd conneciton not found')
    authInstance = betterAuth({
        database: mongodbAdapter(db),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword:{
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 120,
            autoSignIn: true
        },
        plugins: [nextCookies()],

    })
    return authInstance
}

export const auth = await get_auth()