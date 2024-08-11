"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";

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
    return (
        <div>
            <form action={uploadProduct} className="flex flex-col gap-5 p-5">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                    style={{ backgroundImage: `url(${preview})` }}
                >
                    {preview === "" ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">사진을 추가해주세요</div>
                        </>
                    ) : null}
                </label>
                <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />
                <Input name="title" required placeholder="제목" type="text" />
                <Input name="price" required placeholder="가격" type="text" />
                <Input name="description" required placeholder="설명" type="text" />
                <Button text="작성 완료" />
            </form>
        </div>
    );
}
