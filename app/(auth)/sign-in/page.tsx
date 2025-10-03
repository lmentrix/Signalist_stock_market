"use client"

import InputField from "@/components/forms/InputField";
import React from "react";
import {register} from "node:module";
import Undici from "undici-types";
import errors = Undici.errors;
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";

const SignInPage = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues:{

            email: '',
            password :'',
        },
        mode: 'onBlur'

    })

    const onSubmit = async (data:SignUpFormData) =>{
        try {
            console.log(data)
        }catch (e) {
            console.error(e)
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
