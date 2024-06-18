interface FormInputProps {
    type: string;
    placeholder: string;
    required: boolean;
    errors?: string[];
    name: string;
}

export default function FormInput({ type, placeholder, required, errors = [], name }: FormInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <input
                className="bg-transparent rounded-md w-full h-10 border-none ring-1 ring-neutral-200 transition focus:outline-none focus:ring-4 focus:ring-orange-500 placeholder:text-neutral-400"
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
            />
            {errors?.map((error, idx) => (
                <span className="text-red-500 font-medium" key={idx}>
                    {error}
                </span>
            ))}
        </div>
    );
}
