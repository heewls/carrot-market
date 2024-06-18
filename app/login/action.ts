/*
use server action은 server component에서만 작동
client component에서 server action 호출할 수는 있으나 로직이 그 안에 있으면 작동 안함
*/

"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(PASSWORD_MIN_LENGTH)
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

//server action
export async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}
