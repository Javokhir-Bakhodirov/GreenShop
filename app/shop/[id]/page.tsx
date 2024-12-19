"use client";
import { Context } from "@/app/context/AuthContext";
import { instance } from "@/app/hook/instance";
import Container from "@/app/utils";
import { ProductType } from "@/service/getProducts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import NotFound from "@/public/notFound.svg";
import Image from "next/image";
import { FullHeartIcon, HeartIcon, SpinIcon } from "@/public/icons";
import Button from "@/app/components/button/Button";
import SwipeBanner from "@/app/components/swipe-banner/SwipeBanner";
import { CategoryType, GetCategories } from "@/service/getCategories";
import MagnifyImage from "@/app/components/magnifyImage/MagnifyImage";

const Page = () => {
    const categories: CategoryType[] = GetCategories();
    const path = usePathname();
    const queryClient = useQueryClient();
    const id = path.split("/")[2];
    const { token } = useContext(Context);
    const [size, setSize] = useState<string>();
    const [product, setProduct] = useState<ProductType>();

    const { data, isLoading, isError } = useQuery<ProductType>({
        queryKey: ["getSingleProduct", id],
        queryFn: () =>
            instance()
                .get(`/product/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
                .then(res => res.data),
    });

    const basketMutation = useMutation({
        mutationFn: async (data: { productId: string }) => {
            try {
                await instance().post(`/basket`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                throw new Error(`Failed to basket the product. ${error}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["basket_list"] });
            queryClient.invalidateQueries({ queryKey: ["getSingleProduct"] });
            queryClient.invalidateQueries({ queryKey: ["banner_product"] });
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
            queryClient.invalidateQueries({ queryKey: ["banner_product"] });
        },
        onError: error => {
            console.error(error);
            alert("An error occurred while liking the product. Please try again.");
        },
    });
    const handleLike = (id: string) => {
        if (!token) {
            alert("Please log in to like products.");
            return;
        }
        likeMutation.mutate(id);
    };

    const [image, setImage] = useState<string>(product?.image_url ? product.image_url[0] : NotFound);

    useEffect(() => {
        if (data) {
            setImage(prevImage => (data.image_url ? data.image_url[0] : prevImage));
            setProduct({ ...data, quantity: data.basket ? 1 : 0 });
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className=' min-h-[625px] flex items-center justify-center'>
                <div className='animate-spin text-[#46A358]'>
                    <SpinIcon />
                </div>
            </div>
        );
    }

    if (isError) {
        return <div>Error loading product data.</div>;
    }

    const handleAddToCart = () => {
        if (product) {
            setProduct(prevProduct => {
                if (!prevProduct) return prevProduct;
                return {
                    ...prevProduct,
                    quantity: (prevProduct.quantity as number) + 1,
                };
            });
        }
    };
    const handleRemoveFromCart = () => {
        if (product?.quantity) {
            if (product.quantity > 0) {
                setProduct(prevProduct => {
                    if (!prevProduct) return prevProduct;
                    return {
                        ...prevProduct,
                        quantity: (prevProduct.quantity as number) - 1,
                    };
                });
            }
        }
    };

    return (
        <>
            {product && (
                <section>
                    <Container>
                        <div className=''>
                            <div className='main grid grid-cols-[1fr_1fr] gap-[52px]'>
                                <div className='image-section flex gap-[46px]'>
                                    <ul className='gap-[12px] flex'>
                                        {product?.image_url ? (
                                            product.image_url.map((item: string) => {
                                                return (
                                                    <li
                                                        key={item}
                                                        onClick={() => setImage(item)}
                                                        className='cursor-pointer flex items-center justify-center w-[100px] bg-[#FBFBFB] h-[100px] rounded-lg overflow-hidden'>
                                                        <Image
                                                            src={item}
                                                            alt='img'
                                                            width={80}
                                                            priority
                                                            height={80}
                                                            style={{ width: "80px", height: "80px" }}
                                                        />
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <div className='cursor-pointer flex items-center justify-center w-[100px] bg-[#FBFBFB] h-[100px] rounded-lg overflow-hidden'>
                                                <Image
                                                    src={NotFound}
                                                    alt='img'
                                                    width={80}
                                                    priority
                                                    height={80}
                                                    style={{ width: "80px", height: "80px" }}
                                                />
                                            </div>
                                        )}
                                    </ul>
                                    <MagnifyImage image={product.image_url ? image : NotFound} />
                                </div>
                                <div className=''>
                                    <div className='header'>
                                        <h1 className='text-[28px] font-[700] leading-4'>
                                            {product.product_name}
                                        </h1>
                                        <div className=' flex items-end justify-between py-[21px] border-b-[1px] border-b-[#46a35939]'>
                                            <strong className='text-[22px] font-[700] leading-4 text-[#46A358]'>
                                                ${product.cost.toFixed(2)}
                                            </strong>
                                            <p className='text-[16px] font-[300] leading-4 text-[]'>
                                                19 Customer Review
                                            </p>
                                        </div>
                                        <div className='main'>
                                            <div className='description py-[15px]'>
                                                <h2 className='text-[15px] font-[400] leading-4'>
                                                    Short Description:
                                                </h2>
                                                <p className='text-[14px] leading-4 font-[400] text-[#727272] py-[14px] '>
                                                    {product.short_description}
                                                </p>
                                            </div>
                                            <div className='size '>
                                                <h2 className='text-[15px] font-[400] leading-4'>Size:</h2>
                                                <ul className='flex gap-[10px] py-[15px]'>
                                                    {product?.size.map((item: string, index) => {
                                                        return (
                                                            <li
                                                                onClick={() => setSize(item)}
                                                                key={index}
                                                                className={`w-[28px]  h-[28px] rounded-full border-[1px] flex items-center justify-center ${size == item ? "text-[#46A358] border-[#46A358]" : ""}`}>
                                                                {item == "Small"
                                                                    ? "S"
                                                                    : item == "Medium"
                                                                      ? "M"
                                                                      : item == "Large"
                                                                        ? "L"
                                                                        : "XL"}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                                <div className='quantity flex py-[8px]'>
                                                    <div className='flex items-center space-x-4 '>
                                                        <button
                                                            onClick={() => {
                                                                handleRemoveFromCart();
                                                            }}
                                                            className='bg-[#46A358] w-[21px] h-[25px] text-[16px] font-[600]  text-[#fff] rounded-full'>
                                                            -
                                                        </button>
                                                        <strong className='text-[20px] font-[300] leading-[16px]'>
                                                            {product.quantity}
                                                        </strong>
                                                        <button
                                                            onClick={() => {
                                                                handleAddToCart();
                                                            }}
                                                            className='bg-[#46A358] w-[21px] h-[25px] text-[16px] font-[600]  text-[#fff] rounded-full'>
                                                            +
                                                        </button>
                                                    </div>
                                                    <Button
                                                        type='button'
                                                        title='Buy NOW'
                                                        className='!ml-[26px] !mr-[10px] !p-[11px_19px] !h-[40px] !items-center !justify-center !uppercase text-[14px] font-[600] leading-5 '
                                                    />
                                                    {product.basket ? (
                                                        <Button
                                                            onClick={() => handleBasket(product.product_id)}
                                                            type='button'
                                                            title='remove from cart'
                                                            className='!p-[11px_19px]  !h-[40px] !items-center !justify-center !bg-[#fff] !text-[#46A358]  !uppercase text-[14px] font-[700] '
                                                        />
                                                    ) : (
                                                        <Button
                                                            onClick={() =>
                                                                handleBasket(product.product_id as string)
                                                            }
                                                            type='button'
                                                            title='add to cart'
                                                            className='!p-[11px_19px]  !h-[40px] !items-center !justify-center !bg-[#fff] !text-[#46A358]  !uppercase text-[14px] font-[700] '
                                                        />
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            handleLike(product.product_id);
                                                        }}
                                                        className={`border-[1px] w-[40px] text-[40px] ml-[10px] transition-all duration-300 border-[#46A358] rounded-lg flex items-center justify-center text-[#46A358] ${product.liked ? "text-white bg-[#46A358]" : ""}`}>
                                                        {!product.liked ? <HeartIcon /> : <FullHeartIcon />}
                                                    </button>
                                                </div>
                                                <ul className=''>
                                                    <li className='text-[#ACACAC]'>
                                                        SKU:{" "}
                                                        <span className='text-[#727272]'>
                                                            {product.product_id}
                                                        </span>
                                                    </li>
                                                    <li className='text-[#ACACAC]'>
                                                        Categories:{" "}
                                                        <span className='text-[#727272]'>
                                                            {categories.map((item: CategoryType) => {
                                                                if (item.category_id == product.category_id) {
                                                                    return item.category_name;
                                                                }
                                                            })}
                                                        </span>
                                                    </li>
                                                    <li className='text-[#ACACAC]'>
                                                        Tags:{" "}
                                                        <span className='text-[#727272]'>
                                                            {product.tags.map((item: string) => {
                                                                return item + ",";
                                                            })}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='comments pt-[90px]'>
                                <div className='py-[12xp] border-b-[1px] border-b-[#46a35941]'>
                                    <h2 className='text-[17px] inline font-[600] leading-4 relative'>
                                        Product Description
                                        <span className='absolute left-0 bottom-[-1px] w-full h-[2px] bg-[#46A358] animate-slide-in'></span>
                                    </h2>
                                </div>
                                <p className=' py-[18px] text-[14px] font-[300] leading-6 text-[#727272]'>
                                    {product.product_description}
                                </p>
                            </div>
                        </div>
                        <SwipeBanner title='Releted Products' categoryId={null} />
                    </Container>
                </section>
            )}
        </>
    );
};

export default Page;
