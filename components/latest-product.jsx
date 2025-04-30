"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ProductCardLoader from "./loader/product-cardLoader";
import ProductEmpty from "./design/productEmpty";
import ProductCard from "./product-card";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/features/product";
import ServerErrorPage from "./design/serverError";

const LatestProductSection = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useAppSelector((state) => state.product);


    useEffect(() => {
        dispatch(fetchProducts({ limit: 4 }));
    }, [dispatch]);

    if (error) {
        return <ServerErrorPage />
    }
    return (
        <section className="mt-16">
            <Header />
            {isLoading ? (
                <div>
                    <main className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <ProductCardLoader count={4} />
                    </main>
                </div>
            ) : data.length === 0 ? (
                <ProductEmpty />
            ) : (
                <main className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((item, index) => (
                        <ProductCard key={index} product={item} />
                    ))}
                </main>

            )}
        </section>
    )
}

const Header = ({ fetchItems, searchItems, page }) => {
    return (
        <div className="w-full py-2 mb-4 border-b">
            <h2 className=" text-3xl font-bold">Latest Products</h2>
        </div>
    );
};



export default LatestProductSection