"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
    .string()
    .trim()
    .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "Wrong phone format");

// coerce : string -> number, 변환 실패하면 숫자로 변환하는 것이 불가능한다는 의미
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
    token: boolean;
}

export async function sms(prevState: ActionState, formData: FormData) {
    const phone = formData.get("phone");
    const token = formData.get("token");
    if (!prevState.token) {
        const result = phoneSchema.safeParse(phone);
        if (!result.success) {
            return {
                token: false,
                error: result.error.flatten(),
            };
        } else {
            return { token: true };
        }
    } else {
        const result = tokenSchema.safeParse(token);
        if (!result.success) {
            return {
                token: true,
                error: result.error.flatten(),
            };
        } else {
            redirect("/");
        }
    }
}
