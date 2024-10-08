"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";
import { useFormState } from "react-dom";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = event;
        if (!files) return;
        const file = files[0];
        // URL 생성, 브라우저에만 존재하고 이 URL은 파일이 업로드 된 메모리 참조
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const [state, action] = useFormState(uploadProduct, null);

    return (
        <div>
            <form action={action} className="flex flex-col gap-5 p-5">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                    style={{ backgroundImage: `url(${preview})` }}
                >
                    {preview === "" ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요
                                {state?.fieldErrors.photo}
                            </div>
                        </>
                    ) : null}
                </label>
                <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />
                <Input name="title" required placeholder="제목" type="text" errors={state?.fieldErrors.title} />
                <Input name="price" required placeholder="가격" type="text" errors={state?.fieldErrors.price} />
                <Input
                    name="description"
                    textarea
                    height={140}
                    required
                    placeholder="설명"
                    type="text"
                    errors={state?.fieldErrors.description}
                />
                <Button text="작성 완료" />
            </form>
        </div>
    );
}
