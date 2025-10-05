'use server'

import {auth} from "@/lib/better-auth/auth";

import {inngest} from "@/lib/inngest/client";

export const signUpWithEmail = async ({email,password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData)=>{
    try {
        const response = await auth.api.signUpEmail({

            body:{
                email: email,
                password: password,
                name:fullName
            }
        })

        if(response){
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            })
        }

        return {success: true, data: response }
    }catch (e) {
        console.log('sign up failed', e)
        return {success: false, error: 'sign in failed'}
    }
}


export const signInWithEmail = async ({email,password}: SignInFormData)=>{
    try {
        const response = await auth.api.signInEmail({

            body:{
                email: email,
                password: password,

            }
        })


        return {success: true, data: response }
    }catch (e) {
        console.log('sign in failed', e)
        return {success: false, error: 'sign in failed'}
    }
}