"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useState } from "react";
import { TbReceiptEuro } from "react-icons/tb";
import { getMoreProducts } from "@/app/(tabs)/products/action";

interface ProductListProps {
    initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const onLoadMoreClick = async () => {
        setIsLoading(true);
        const newProducts = await getMoreProducts(page + 1);
        if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
        } else {
            setIsLastPage(true);
        }
        setIsLoading(false);
    };

    return (
        <div className="p-5 flex flex-col gap-5">
            {products.map((p) => (
                <ListProduct key={p.id} {...p} />
            ))}
            {isLastPage ? null : (
                <button
                    onClick={onLoadMoreClick}
                    disabled={isLoading}
                    className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
                >
                    {isLoading ? "Loading..." : "Load more"}
                </button>
            )}
        </div>
    );
}
