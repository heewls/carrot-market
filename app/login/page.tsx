import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { redirect } from "next/navigation";

export default function Login() {
    //server action
    const onFormSubmit = async (formData: FormData) => {
        "use server";
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("login");
        redirect("/");
    };

    return (
        <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Hi!</h1>
                <h2 className="text-xl">Log in with email and password</h2>
            </div>
            <form action={onFormSubmit} className="flex flex-col gap-3">
                <FormInput name="email" type="email" placeholder="Email" required errors={[]} />
                <FormInput name="password" type="password" placeholder="Password" required errors={[]} />
                <FormButton text="Log in" />
            </form>
            <SocialLogin />
        </div>
    );
}
