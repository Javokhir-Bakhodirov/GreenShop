"use client";
import { Context } from "@/app/context/AuthContext";
import { instance } from "@/app/hook/instance";
import { ProductType } from "@/service/getProducts";
import { CartIcon, HeartIcon, SearchIcon } from "@/public/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";

interface CardProps {
    item: ProductType;
}

const ProductCard: React.FC<CardProps> = ({ item }) => {
    const queryClient = useQueryClient();
    const { token } = useContext(Context);

    const likeMutation = useMutation({
        mutationFn: async (id: string) => {
            try {
                await instance().post(
                    `/like/${id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } catch (error) {
                throw new Error(`Failed to like the product. ${error}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["getSingleProduct"] });
        },
        onError: error => {
            console.error(error);
            alert("An error occurred while liking the product. Please try again.");
        },
    });

    const basketMutation = useMutation({
        mutationFn: async (data: { productId: string }) => {
            try {
                await instance().post(`/basket`, data, {
                    headers: { " Authorization": `Bearer ${token}` },
                });
            } catch (error) {
                throw new Error(`Failed to basket the product. ${error}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["basket_list"] });
            queryClient.invalidateQueries({ queryKey: ["getSingleProduct"] });
        },
        onError: error => {
            console.error(error);
            alert("An error occurred while basket the product. Please try again.");
        },
    });
    const handleBasket = (id: string) => {
        if (!token) {
            alert("Please log in to like products.");
            return;
        }
        const data = { productId: id };
        basketMutation.mutate(data);
    };

    const handleLike = (id: string) => {
        if (!token) {
            alert("Please log in to like products.");
            return;
        }
        likeMutation.mutate(id);
    };

    return (
        <div key={item.product_id} className='w-[260px] group flex flex-col justify-self-center'>
            <div className='w-[258px] relative bg-[#FBFBFB] flex items-center justify-center'>
                <Image
                    src={item.image_url ? item.image_url[0] : "/notFound.svg"}
                    priority
                    alt={item.product_name}
                    width={258}
                    height={258}
                    className='w-[258px] h-[258px]'
                    style={{
                        width: "258px",
                        height: "258px",
                    }}
                />
                <div className='group-hover:opacity-100 group-hover:bottom-1 flex transition-all duration-500 space-x-3 absolute -bottom-1 opacity-0'>
                    <button
                        onClick={() => handleLike(item.product_id)}
                        className={`w-[35px] h-[35px] bg-[#fff] flex items-center rounded-lg justify-center transition-colors duration-300 ${
                            item.liked ? "text-red-500" : "text-gray-600"
                        } hover:text-red-500`}
                        aria-label='Like'>
                        <HeartIcon />
                    </button>
                    <button
                        onClick={() => handleBasket(item.product_id)}
                        className={`w-[35px] h-[35px] bg-[#fff] flex items-center rounded-lg justify-center transition-colors duration-300 ${
                            item.basket ? "text-[#46A358]" : "text-gray-600"
                        } hover:text-[#46A358]`}
                        aria-label='Add to Cart'>
                        <CartIcon />
                    </button>
                    <Link
                        href={`/shop/${item.product_id}`}
                        className='w-[35px] h-[35px] bg-[#fff] flex items-center rounded-lg justify-center text-gray-600 hover:text-[#3b5fa1]'
                        aria-label='View Details'>
                        <SearchIcon />
                    </Link>
                </div>
            </div>
            <div>
                <p className='mt-[15px] mb-[15px] line-clamp-1 text-[16px] font-[400] leading-4'>
                    {item.product_name || "No Product Name"}
                </p>
                <div className='flex items-center gap-2'>
                    <strong className='text-[18px] font-[700] leading-4 text-[#46A358]'>
                        ${item.discount.toFixed(2)}
                    </strong>
                    {item.cost && <del className='text-[#CBCBCB] text-[14px]'>${item.cost.toFixed(2)}</del>}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
