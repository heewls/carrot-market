"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    // useFormStatus는 form의 자식에서만 사용 가능 action 사용하는 곳에 같이 사용하지 못함
    const { pending } = useFormStatus();
    return (
        <button
            disabled={pending}
            className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
            {pending ? "Loading" : text}
        </button>
    );
}
