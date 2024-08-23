import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputOrTextareaProps {
    errors?: string[];
    name: string;
    height?: number;
    textarea?: boolean;
}

export default function Input({
    errors = [],
    name,
    height = 40,
    textarea = false,
    ...rest
}: InputOrTextareaProps & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>)) {
    return (
        <div className="flex flex-col gap-2">
            {textarea ? (
                <textarea
                    className="bg-transparent rounded-md w-full min-h-10 border-none ring-1 ring-neutral-200 transition focus:outline-none focus:ring-4 focus:ring-orange-500 placeholder:text-neutral-400"
                    name={name}
                    style={{ height: `${height}px` }}
                    {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <input
                    className="bg-transparent rounded-md w-full h-10 border-none ring-1 ring-neutral-200 transition focus:outline-none focus:ring-4 focus:ring-orange-500 placeholder:text-neutral-400"
                    name={name}
                    {...(rest as InputHTMLAttributes<HTMLInputElement>)}
                />
            )}
            {errors?.map((error, idx) => (
                <span className="text-red-500 font-medium" key={idx}>
                    {error}
                </span>
            ))}
        </div>
    );
}
