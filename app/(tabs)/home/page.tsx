import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import Link from "next/link";

const getCachedProducts = unstable_cache(getInitialProducts, ["home-products"]);

async function getInitialProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return products;
}

//prisma에게 이 함수가 return할 type이 무엇인지 알려줌
export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export const metadata = {
    title: "Home",
};

export default async function Products() {
    const initialProducts = await getCachedProducts();
    const revalidate = async () => {
        "use server";
        revalidatePath("/home");
    };
    return (
        <div>
            <ProductList initialProducts={initialProducts} />
            <form action={revalidate}>
                <button>revalidate</button>
            </form>
            <Link
                href="/products/add"
                className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
            >
                <PlusIcon className="size-10 " />
            </Link>
        </div>
    );
}
