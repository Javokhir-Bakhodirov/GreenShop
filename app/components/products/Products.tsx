"use client";
import { ProductType } from "@/service/getProducts";
import React, { SetStateAction } from "react";
import ProductCard from "../productCard/ProductCard";
import { Pagination } from "@nextui-org/react";

interface ProductsProps {
    className?: string;
    products: ProductType[];
    limit: number;
    page: number;
    setPage: React.Dispatch<SetStateAction<number>>;
    setTags: React.Dispatch<SetStateAction<string | null>>;
    tags: string | null;
    category: string | null;
}

const Products: React.FC<ProductsProps> = ({
    className,
    products,
    limit,
    page,
    setPage,
    setTags,
    tags,
    category,
}) => {
    return (
        <div className={`w-full  p-[14px_18px] ${className}`}>
            <ul className=' flex gap-[25px]'>
                <li
                    onClick={() => setTags(null)}
                    className={`cursor-pointer ${tags == null ? "text-[#46A358]" : ""} `}>
                    All Plants
                </li>
                <li
                    onClick={() => setTags("new-arrivals")}
                    className={`cursor-pointer ${tags == "new-arrivals" ? "text-[#46A358]" : ""} `}>
                    New Arrivals
                </li>
                <li
                    onClick={() => setTags("sale")}
                    className={`cursor-pointer ${tags == "sale" ? "text-[#46A358]" : ""} `}>
                    Sale
                </li>
            </ul>
            <div className='grid grid-cols-3 gap-[45px] p-[20px]'>
                {products &&
                    products.map((item: ProductType) => <ProductCard item={item} key={item.product_id} />)}
            </div>
            <div className=' flex justify-self-end mt-[25px]'>
                <Pagination
                    key={`${category}-${page}-${tags}`}
                    onChange={(e: number) => setPage(e)}
                    color='success'
                    initialPage={page}
                    total={Math.ceil(limit / 6)}
                />
            </div>
        </div>
    );
};

export default Products;
