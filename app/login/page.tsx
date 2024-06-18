"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { onFormSubmit } from "./action";

export default function Login() {
    const [state, action] = useFormState(onFormSubmit, null);

    return (
        <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Hi!</h1>
                <h2 className="text-xl">Log in with email and password</h2>
            </div>
            <form action={action} className="flex flex-col gap-3">
                <FormInput name="email" type="email" placeholder="Email" required />
                <FormInput name="password" type="password" placeholder="Password" required />
                <FormButton text="Log in" />
            </form>
            <SocialLogin />
        </div>
    );
}
