"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("potato");
const checkPassword = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
    password === confirm_password;

const formSchema = z
    .object({
        username: z
            .string({ invalid_type_error: "Username must be a string!", required_error: "Where is my username?" })
            .min(3, "Way too short!")
            .max(10, "That is too long!")
            .toLowerCase()
            .trim()
            // transform : 변환된 값 return(return 필수)
            .transform((username) => `🐈 ${username} 🐈`)
            // refine : validation 성공 여부에 따라 true/false return
            .refine(checkUsername, "NO POTATO!"),
        email: z.string().email().toLowerCase(),
        password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    })
    .refine(checkPassword, {
        message: "Both password should be the same",
        path: ["confirm_password"],
    });

export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}
