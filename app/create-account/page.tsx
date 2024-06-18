"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
    return (
        <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Hi!</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput name="username" type="text" placeholder="Username" required />
                <FormInput name="email" type="email" placeholder="Email" required />
                <FormInput name="password" type="password" placeholder="Password" required />
                <FormInput name="passwordCheck" type="password" placeholder="Confirm Password" required />
                <FormButton text="Create account" />
            </form>
            <SocialLogin />
        </div>
    );
}
