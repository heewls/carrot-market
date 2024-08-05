/*
use server action은 server component에서만 작동
client component에서 server action 호출할 수는 있으나 로직이 그 안에 있으면 작동 안함
*/

"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
    return Boolean(user);
};

const formSchema = z.object({
    email: z.string().email().toLowerCase().refine(checkEmailExists, "An account with this email does not exist"),
    password: z.string({
        required_error: "Password is required",
    }),
    //.min(PASSWORD_MIN_LENGTH)
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

//server action
export async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    const result = await formSchema.safeParseAsync(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                id: true,
                password: true,
            },
        });
        const ok = await bcrypt.compare(result.data.password, user!.password ?? "xxxx");
        if (ok) {
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            redirect("/profile");
        } else {
            return {
                fieldErrors: {
                    password: ["Wrong password"],
                    email: [],
                },
            };
        }
    }
}