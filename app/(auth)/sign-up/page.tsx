'use client'
import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import {error} from "next/dist/build/output/log";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import {signUpWithEmail} from "@/lib/actions/auth_actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


const SignUpPage = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues:{
            fullName: '',
            email: '',
            password :'',
            country:'us',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry:'Technology'
        },
        mode: 'onBlur'

    })
    const onSubmit = async (data:SignUpFormData) =>{
        try {
            //signup with email
            const result = await signUpWithEmail(data)
            if(result.success) router.push('/')


        }catch (e) {
            console.error(e)
            toast.error('sign up failed',{
                description: e instanceof Error ? e.message : 'failed to create account'            })
        }
    }
   
    return (
        <>
            <h1 className={"form-title"}>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={"space-y-5 "}>
                <InputField name={"fullName"}
                            label={"fullName"}
                            placeholder={"John doe"}
                            register={register}
                            error={errors.fullName}
                            validation={{required:'Full name is required', minLength:2}}
                />

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
                <CountrySelectField name={"country"}
                                    label={"country"}
                                    control={control}
                                    error={errors.country}
                                    required/>

                <SelectField name={"investmentGoals"}
                             label={"Investment Goals"}
                             placeholder={"Select goal"}
                             options = {INVESTMENT_GOALS}
                             control = {control}
                             error={errors.investmentGoals}
                             required
                />
                <SelectField name={"riskTolerence"}
                             label={"Risk Tolerence"}
                             placeholder={"Select risk premium"}
                             options = {RISK_TOLERANCE_OPTIONS}
                             control = {control}
                             error={errors.riskTolerance}
                             required
                />
                <SelectField name={"PreferredIndustry"}
                             label={"Preferred Industry"}
                             placeholder={"Select preferred industry"}
                             options = {PREFERRED_INDUSTRIES}
                             control = {control}
                             error={errors.preferredIndustry}
                             required
                />

                <Button  type={"submit"} disabled={isSubmitting} className={"yellow-btn w-full mt-5"}>
                    {isSubmitting ? 'Creating account' : 'Start Your Investing Journey'}
                </Button>
                <FooterLink text={"Already have an account? "} linkText={"Sign in"} href={"/sign-in"}/>
            </form>
        </>
    )
}
export default SignUpPage
