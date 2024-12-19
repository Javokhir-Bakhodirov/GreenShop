"use client";

import { instance } from "@/app/hook/instance";
import Container from "@/app/utils";
import { ProductType } from "@/service/getProducts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { CartIcon, HeartIcon, SearchIcon } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import { Context } from "@/app/context/AuthContext";

interface PropsType {
    categoryId: string | null;
    title: string;
}

const SwipeBanner: React.FC<PropsType> = ({ title, categoryId }) => {
    const params = {
        page: 1,
        limit: 100,
        category: categoryId,
    };

    const { data: products = [] } = useQuery<ProductType[]>({
        queryKey: ["banner_product", categoryId],
        queryFn: () =>
            instance()
                .get("/products", { headers: token ? { Authorization: `Bearer ${token}` } : {}, params })
                .then(res => res.data.products),
    });
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
            queryClient.invalidateQueries({ queryKey: ["banner_product"] });
            queryClient.invalidateQueries({ queryKey: ["basket_list"] });
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
        <section className='pt-[70px] hero-section'>
            <Container className='!px-0'>
                <div className=''>
                    <div className='content py-[12px] border-b-[1px] border-b-[#46a35949]'>
                        <h2 className='text-[17px] font-[600] leading-4 text-[#46a359da]'>{title}</h2>
                    </div>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={5}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 5 },
                        }}
                        style={{ position: "relative", padding: "50px 0px" }}>
                        {products.slice(0, 10).map(product => (
                            <SwiperSlide key={product.product_id}>
                                <div
                                    key={product.product_id}
                                    className='w-[260px] group flex flex-col justify-self-center'>
                                    <div className='w-[258px] relative bg-[#FBFBFB] flex items-center justify-center'>
                                        <Image
                                            src={product.image_url ? product.image_url[0] : "/notFound.svg"}
                                            priority
                                            alt={product.product_name}
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
                                                onClick={() => handleLike(product.product_id)}
                                                className={`w-[35px] h-[35px] bg-[#fff] flex items-center rounded-lg justify-center transition-colors duration-300 ${
                                                    product.liked ? "text-red-500" : "text-gray-600"
                                                } hover:text-red-500`}
                                                aria-label='Like'>
                                                <HeartIcon />
                                            </button>
                                            <button
                                                onClick={() => handleBasket(product.product_id)}
                                                className={`w-[35px] h-[35px] bg-[#fff] flex items-center rounded-lg justify-center transition-colors duration-300 ${
                                                    product.basket ? "text-[#46A358]" : "text-gray-600"
                                                } hover:text-[#46A358]`}
                                                aria-label='Add to Cart'>
                                                <CartIcon />
                                            </button>
                                            <Link
                                                href={`/shop/${product.product_id}`}
                                                className='w-[35px] h-[35px] bg-[#fff] flex items-center rounded-lg justify-center text-gray-600 hover:text-[#3b5fa1]'
                                                aria-label='View Details'>
                                                <SearchIcon />
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='mt-[15px] mb-[15px] line-clamp-1 text-[16px] font-[400] leading-4'>
                                            {product.product_name || "No Product Name"}
                                        </p>
                                        <div className='flex items-center gap-2'>
                                            <strong className='text-[18px] font-[700] leading-4 text-[#46A358]'>
                                                ${product.discount.toFixed(2)}
                                            </strong>
                                            {product.cost && (
                                                <del className='text-[#CBCBCB] text-[14px]'>
                                                    ${product.cost.toFixed(2)}
                                                </del>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </section>
    );
};

export default SwipeBanner;
