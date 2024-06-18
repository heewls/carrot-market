/*
use server action은 server component에서만 작동
client component에서 server action 호출할 수는 있으나 로직이 그 안에 있으면 작동 안함
*/

"use server";

import { redirect } from "next/navigation";

//server action
export async function onFormSubmit(prevState: any, formData: FormData) {
    return {
        errors: ["wrong password", "password too short"],
    };
}
