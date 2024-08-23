import CloseBtn from "@/components/close-button";
import db from "@/lib/db";
import { formatToTImeAgo, formatToWon } from "@/lib/utils";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    return product;
}

export default async function Modal({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) return notFound();

    const product = await getProduct(id);
    if (!product) return notFound();

    return (
        <div className="absolute w-full h-full bg-black bg-opacity-60 left-0 top-0 z-50 flex justify-center items-center ">
            <div className=" w-full h-3/4 flex justify-center">
                <div className="rounded-md flex justify-center items-center">
                    <CloseBtn />
                    <div className="relative aspect-square h-full">
                        <Image fill src={product.photo} alt={product.title} className="object-cover" />
                    </div>
                    <div className="flex justify-start items-start flex-col bg-black h-full w-80">
                        <div className="p-5 flex items-center gap-3 border-b border-neutral-700 w-full">
                            <div className="size-10 rounded-full overflow-hidden">
                                {product.user.avatar !== null ? (
                                    <Image
                                        src={product.user.avatar}
                                        width={40}
                                        height={40}
                                        alt={product.user.username}
                                    />
                                ) : (
                                    <UserIcon />
                                )}
                            </div>
                            <div>
                                <h3>{product.user.username}</h3>
                            </div>
                        </div>
                        <div className="p-5 w-full h-full flex flex-col justify-between">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-xl">{product.title}</h1>
                                <span className="text-sm text-neutral-500">
                                    {formatToTImeAgo(product.created_at.toString())}
                                </span>
                                <p className="whitespace-pre-wrap">{product.description}</p>
                            </div>
                            <span className="font-semibold text-xl flex justify-end w-full pb-2">
                                {formatToWon(product.price)}원
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
