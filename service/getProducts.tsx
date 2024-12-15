"use client";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../app/hook/instance";
import { SetStateAction, useContext } from "react";
import { Context } from "../app/context/AuthContext";

type ProductSize = "Small" | "Medium" | "Large" | "Extra Large";

export interface ProductType {
    basket: boolean;
    category_id: string;
    cost: number;
    count: number;
    discount: number;
    image_url: string[] | null;
    liked: boolean;
    product_description: string;
    product_id: string;
    product_name: string;
    product_status: "sale" | "new" | "out-of-stock";
    short_description: string;
    size: ProductSize[];
    tags: string[];
}

export const GetProducts = (
    category: string | null,
    page: number,
    setLimit: React.Dispatch<SetStateAction<number>>,
    tags: string | null,
    fullPrice: number[],
    size: string | null
) => {
    const params = {
        page: page,
        limit: 6,
        category: category,
        tags,
        min_price: fullPrice[0],
        max_price: fullPrice[1],
        size,
    };
    const { token } = useContext(Context);
    const { data = [] } = useQuery<ProductType[]>({
        queryKey: ["products", category, page, tags, fullPrice, size],
        queryFn: () =>
            instance()
                .get("/products", {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    params,
                })
                .then(res => {
                    setLimit(res.data.total_count);
                    return res.data.products;
                }),
    });

    return data;
};
