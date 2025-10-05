"use client"

import InputField from "@/components/forms/InputField";
import React from "react";
import {register} from "node:module";
import Undici from "undici-types";
import errors = Undici.errors;
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {signInWithEmail, signUpWithEmail} from "@/lib/actions/auth_actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const SignInPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues:{

            email: '',
            password :'',
        },
        mode: 'onBlur'

    })

    const onSubmit = async (data:SignInFormData) =>{
        try {
            //signup with email
            const result = await signInWithEmail(data)
            if(result.success) router.push('/')


        }catch (e) {
            console.error(e)
            toast.error('sign in failed',{
                description: e instanceof Error ? e.message : 'failed to sign-in'            })
        }
    }


    return (

        <>
            <form onSubmit={handleSubmit(onSubmit)} className={"space-y-5 "}>
                <InputField name={"email"}
                            label={"email"}
                            placeholder={"enter email"}
                            register={register}
                            error={errors.email}
                            validation={{required:'email is required', minLength:2}}
                />

                <InputField name={"password"}
                            label={"password"}
                            placeholder={"enter password"}
                            register={register}
                            type={"password"}
                            error={errors.password}
                            validation={{required:'password is required', minLength:2}}
                />
                <Button type={"submit"} disabled={isSubmitting} className={"yellow-btn w-full mt-5"}>
                    {isSubmitting ? 'Creating account' : 'Start Your Investing Journey'}
                </Button>
                <FooterLink text={"Don't have an account? "} linkText={"Sign Up"} href={"/sign-up"}/>
            </form>
        </>
    )
}
export default SignInPage
