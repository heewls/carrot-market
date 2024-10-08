import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTImeAgo, formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import { revalidateTag, unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getIsOwner(userId: number) {
    const session = await getSession();
    if (session.id) {
        return session.id === userId;
    }
    return false;
}

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

const getCachedProduct = unstable_cache(getProduct, ["product-detail"], {
    tags: ["product-detail"],
});

async function getProductTitle(id: number) {
    const product = await db.product.findUnique({
        where: {
            id,
        },
        select: {
            title: true,
        },
    });
    return product;
}

const getCachedProductTItle = unstable_cache(getProductTitle, ["product-title"], {
    tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getCachedProductTItle(Number(params.id));
    return {
        title: product?.title,
    };
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const product = await getCachedProduct(id);
    if (!product) {
        return notFound();
    }

    const isOwner = await getIsOwner(product.userId);

    const deleteProduct = async () => {
        "use server";
        // await db.product.delete({ where: { id } });
        // redirect("/home");
        revalidateTag("product-title");
    };

    return (
        <div style={{ marginBottom: "84px" }}>
            <div>
                <div className="relative aspect-square">
                    <Image className="object-cover" fill src={product.photo} alt={product.title} />
                </div>
                <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                    <div className="size-10 rounded-full overflow-hidden">
                        {product.user.avatar !== null ? (
                            <Image src={product.user.avatar} width={40} height={40} alt={product.user.username} />
                        ) : (
                            <UserIcon />
                        )}
                    </div>
                    <div>
                        <h3>{product.user.username}</h3>
                    </div>
                </div>
                <div className="p-5 gap-3">
                    <h1 className="text-2xl">{product.title}</h1>
                    <span className="text-sm text-neutral-500">{formatToTImeAgo(product.created_at.toString())}</span>
                    <p className="whitespace-pre-wrap">{product.description}</p>
                </div>
            </div>
            <div className="fixed w-full bottom-0 left-50 p-5 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
                <span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
                {isOwner ? (
                    <form action={deleteProduct}>
                        <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                            Delete product
                        </button>
                    </form>
                ) : null}
                <Link className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>
                    채팅하기
                </Link>
            </div>
        </div>
    );
}
