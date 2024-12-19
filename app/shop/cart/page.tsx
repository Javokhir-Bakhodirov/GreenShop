"use client";
import Button from "@/app/components/button/Button";
import Modal from "@/app/components/modal/Modal";
import SwipeBanner from "@/app/components/swipe-banner/SwipeBanner";
import { Context } from "@/app/context/AuthContext";
import { instance } from "@/app/hook/instance";
import Container from "@/app/utils";
import { TrashIcon } from "@/public/icons";
import { ProductType } from "@/service/getProducts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const Page = () => {
    const queryClient = useQueryClient();
    const { token } = useContext(Context);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const getBasketList = async () => {
        return await instance()
            .get("/basket", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: 1,
                    limit: 1000,
                },
            })
            .then(res => {
                return res.data;
            });
    };

    const { data: basket = [] } = useQuery({
        queryKey: ["basket_list"],
        queryFn: () => (token ? getBasketList() : Promise.resolve([])),
        enabled: true,
    });

    const [basketList, setBasketList] = useState<ProductType[] | []>(
        basket?.ProductId?.map((item: ProductType) => {
            return { ...item, quantity: 1 };
        }) || []
    );

    useEffect(() => {
        setBasketList(
            basket?.ProductId?.map((item: ProductType) => {
                return { ...item, quantity: 1 };
            })
        );
    }, [basket]);

    const handleAddToCart = (id: string) => {
        if (!basketList) {
            return;
        }

        const index = basketList.findIndex((item: ProductType) => item.product_id === id);
        if (index === -1) {
            return;
        } else {
            const updatedBasketList = [...basketList];
            (updatedBasketList[index].quantity as number) += 1;
            setBasketList(updatedBasketList);
        }
    };

    const handleRemoveFromCart = (id: string) => {
        if (!basketList) {
            return;
        }

        const updatedBasketList = basketList
            .map((item: ProductType) => {
                if (item.product_id === id) {
                    if ((item.quantity as number) > 1) {
                        return { ...item, quantity: (item.quantity as number) - 1 };
                    } else {
                        basketMutation.mutate(item.product_id);
                        return null;
                    }
                }
                return item;
            })
            .filter(item => item !== null);

        setBasketList(updatedBasketList);
    };

    const basketMutation = useMutation({
        mutationFn: async (productId: string) => {
            return await instance().post(
                "/basket",
                { productId },
                {
                    headers: { " Authorization": `Bearer ${token}` },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["basket_list"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const shipping = 16;

    const totalPrice = basketList?.reduce((total, item: ProductType) => {
        return total + item.cost * (item.quantity as number);
    }, 0);

    return (
        <section className='pb-[70px'>
            <Container>
                <div className='grid grid-cols-[1fr_400px] gap-[50px]'>
                    <div className='w-full '>
                        <div className='grid grid-cols-[2fr_2fr_1fr_2fr] gap-[20px] p-[11px] border-b-[1px] border-b-[#46A35880]'>
                            <div>
                                <strong className='text-[16px] font-[500] leading-4'>Products</strong>
                            </div>
                            <div className='justify-self-center'>
                                <strong className='text-[16px] font-[500] leading-4'>Price</strong>
                            </div>
                            <div>
                                <strong className='text-[16px] font-[500] leading-4'>Quantity</strong>
                            </div>
                            <div>
                                <strong className='text-[16px] font-[500] leading-4'>Total</strong>
                            </div>
                        </div>
                        <ul className='w-full grid max-h-[600px] overflow-y-scroll'>
                            {basketList &&
                                basketList.map((item: ProductType) => {
                                    return (
                                        <li
                                            key={item.product_id}
                                            className='grid grid-cols-[2fr_2fr_1fr_2fr] gap-[20px] justify-center bg-[#FBFBFB] mt-[12px] '>
                                            <div className=' grid grid-cols-[80px_1fr]'>
                                                <Image
                                                    src={item.image_url ? item.image_url[0] : "/notFound.svg"}
                                                    alt={item.product_name}
                                                    width={80}
                                                    height={80}
                                                    style={{ width: "80px", height: "80px" }}
                                                    priority
                                                />
                                                <div className='flex flex-col gap-[6px] justify-center pl-[8px] '>
                                                    <h2 className='text-[16px] font-[500] leading-4'>
                                                        {item.product_name}
                                                    </h2>
                                                    <p className='text-[#A5A5A5] flex'>
                                                        SKU:
                                                        <span className='line-clamp-1'>
                                                            {item.product_id}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=' justify-self-center flex items-center'>
                                                <strong className='text-[16px] font-[500] leading-4 text-[#727272]'>
                                                    ${item.cost.toFixed(2)}
                                                </strong>
                                            </div>
                                            <div className='flex items-center space-x-4'>
                                                <button
                                                    onClick={() => handleRemoveFromCart(item.product_id)}
                                                    className='bg-[#46A358] w-[21px] h-[25px] text-[16px] font-[600]  text-[#fff] rounded-full'>
                                                    -
                                                </button>
                                                <strong>{item.quantity}</strong>
                                                <button
                                                    onClick={() => {
                                                        handleAddToCart(item.product_id);
                                                    }}
                                                    className='bg-[#46A358] w-[21px] h-[25px] text-[16px] font-[600]  text-[#fff] rounded-full'>
                                                    +
                                                </button>
                                            </div>
                                            <div className=' grid grid-cols-2 gap-[50px] items-center'>
                                                <div className=''>
                                                    <strong className='text-[16px] font-[700] leading-4 text-[#46A358]'>
                                                        $
                                                        {item.quantity
                                                            ? (item.cost * item.quantity).toFixed(2)
                                                            : item.cost.toFixed(2)}
                                                    </strong>
                                                </div>
                                                <button
                                                    onClick={() => basketMutation.mutate(item.product_id)}
                                                    className=''>
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className='w-full flex flex-col'>
                        <div className='w-full border-b-[1px] border-b-[#46A35880] flex items-center p-[15px]'>
                            <h2 className='text-[16xp] font-[700] leading-4 items-center'>Cart Totals</h2>
                        </div>
                        <div className=' mt-[11px]'>
                            <div className='coupon'>
                                <label htmlFor='coupon' title='Coupon Apply' className='flex flex-col '>
                                    <span className='text-[14px] font-[400] leading-4 text-[#3d3d3d69] mb-[15px]'>
                                        {" "}
                                        Coupon Apply
                                    </span>
                                </label>
                                <div className='flex items-center '>
                                    <input
                                        name='coupon'
                                        id='coupon'
                                        className='p-[10px_52px_10px_9px] w-full text-[14px] font-[400] leading-4 outline-none border-[#46A358] border-[2px]'
                                        type='text'
                                        placeholder=''
                                    />
                                    <button className='text-[#FFF] bg-[#46A358] px-[35px] h-[40px]'>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-[20px] mt-[15px]'>
                            <div className='flex items-center justify-between'>
                                <span className='text-[15px] font-[400] leading-4 text-[#3d3d3d65]'>
                                    Subtotal:
                                </span>
                                <strong>${totalPrice ? totalPrice.toFixed(2) : 0}</strong>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-[15px] font-[400] leading-4 text-[#3d3d3d65]'>
                                    Coupon Discount:
                                </span>
                                <strong className='text-[15px] font-[400] leading-4 text-[#3d3d3d65]'>
                                    (-) 00.00
                                </strong>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-[15px] font-[400] leading-4 text-[#3d3d3d65]'>
                                    Shipping:
                                </span>
                                <strong>${shipping.toFixed(2)}</strong>
                            </div>
                            <div className='flex justify-end'>
                                <span className='text-[15px] font-[400] leading-4 text-[#46A358]'>
                                    View shipping charge
                                </span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className=''>Total:</span>
                                <strong>${totalPrice ? totalPrice + shipping : 0}</strong>
                            </div>
                            <Button
                                onClick={() => setIsOpen(true)}
                                title='Proceed To Checkout'
                                type='button'
                                className='!items-center  !justify-center !rounded-sm'
                            />
                        </div>
                    </div>

                    <Modal className='relative !w-[600px] !px-[41px]' isOpen={isOpen} setIsOpen={setIsOpen}>
                        <div className='absolute bg-[#46A3580F] top-0 left-0 right-0 h-[156px]'>
                            <div className=' flex flex-col justify-center gap-[16px] text-center py-[20px]'>
                                <Image
                                    className='mx-auto'
                                    src={"/thank-you.svg"}
                                    alt='Thank You'
                                    priority
                                    width={80}
                                    height={80}
                                    style={{ width: "80px", height: "80px" }}
                                />
                                <p className='text-[16px] font-[400] leading-4 text-[#727272]'>
                                    Your order has been received
                                </p>
                            </div>
                        </div>
                        <div className='pt-[106px] flex items-center justify-between border-b-[1px] border-b-[#46A35833] '>
                            <div className='p-3 '>
                                <div className='text-[#727272] text-[14px] font-[400] leading-4'>
                                    Order Number
                                </div>
                                <div className='text-[15px] font-[700] leading-4'>19586687</div>
                            </div>
                            <div className='p-3'>
                                <div className='text-[#727272] text-[14px] font-[400] leading-4'>Date</div>
                                <div className='text-[15px] font-[700] leading-4'>15 Sep, 2021</div>
                            </div>
                            <div className='p-3'>
                                <div className='text-[#727272] text-[14px] font-[400] leading-4'>Date</div>
                                <div className='text-[15px] font-[700] leading-4'>
                                    {totalPrice ? totalPrice + shipping : 0}
                                </div>
                            </div>
                            <div className='py-3'>
                                <div className='text-[#727272] text-[14px] font-[400] leading-4'>
                                    Payment Method
                                </div>
                                <div className='text-[15px] font-[700] leading-4'>Cash on delivery</div>
                            </div>
                        </div>
                        <div className='pt-[18px]'>
                            <h2 className='text-[15px] font-[700] leading-4'>Order Details</h2>
                            <div className='grid grid-cols-[4fr_1fr_2fr] py-[12px] border-b-[1px] border-b-[#46a3592f]'>
                                <div className=''>
                                    <h3 className='text-[16px] font-[500] leading-4 '>Products</h3>
                                </div>
                                <div className=' '>
                                    <h3 className='text-[16px] font-[500] leading-4 justify-self-center '>
                                        Qty
                                    </h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-[16px] font-[500] leading-4 justify-self-center '>
                                        Subtotal
                                    </h3>
                                </div>
                            </div>
                            <ul className=' max-h-[230px] overflow-y-auto gap-[10px] grid'>
                                {basketList &&
                                    basketList.map((item: ProductType) => {
                                        return (
                                            <li
                                                key={item.product_id}
                                                className='grid grid-cols-[4fr_1fr_2fr] gap-[15px] bg-[#FBFBFB]'>
                                                <div className=' grid grid-cols-[70px_1fr]'>
                                                    <Image
                                                        src={
                                                            item.image_url
                                                                ? item.image_url[0]
                                                                : "/notFound.svg"
                                                        }
                                                        alt={item.product_name}
                                                        width={70}
                                                        height={70}
                                                        style={{ width: "70px", height: "70px" }}
                                                        priority
                                                    />
                                                    <div className='flex flex-col gap-[6px] justify-center pl-[8px] '>
                                                        <h2 className='text-[16px] font-[500] leading-4'>
                                                            {item.product_name}
                                                        </h2>
                                                        <p className='text-[#A5A5A5] flex'>
                                                            SKU:
                                                            <span className='line-clamp-1'>
                                                                {item.product_id}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className=' flex items-center justify-center'>
                                                    (x {item.quantity})
                                                </div>
                                                <div className='flex items-center justify-center'>
                                                    <strong>${(item.quantity as number) * item.cost}</strong>
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                            <div className='grid border-b-[1px] border-b-[#46a35952] py-[20px] grid-rows-2 gap-[15px]'>
                                <div className='grid grid-cols-[3fr_1fr]'>
                                    <div className='justify-self-center'>
                                        <p className='text-[15px] font-[400] leading-4 opacity-35'>Shiping</p>
                                    </div>
                                    <div className='justify-self-end'>
                                        <strong className='text-[18px] font-[500] leading-[16px]'>
                                            ${shipping.toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                                <div className='grid grid-cols-[3fr_1fr]'>
                                    <div className='justify-self-center'>
                                        <p className='text-[16px] font-[700] leading-4 '>Total</p>
                                    </div>
                                    <div className='justify-self-end'>
                                        <strong className='text-[18px] font-[700] text-[#46A358] leading-[16px]'>
                                            ${(totalPrice + shipping).toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <div className=' py-[18px]'>
                                <p className='text-[14px] font-[400] leading-[22px] text-[#727272] text-center'>
                                    Your order is currently being processed. You will receive an order
                                    confirmation email shortly with the expected delivery date for your items.
                                </p>
                            </div>
                            <Button
                                onClick={() => setIsOpen(false)}
                                title='Track your order'
                                type='button'
                                className='!items-center mx-auto  !justify-center !rounded-sm'
                            />
                        </div>
                    </Modal>
                </div>
                {basketList && <SwipeBanner title='You may Like' categoryId={null} />}
            </Container>
        </section>
    );
};

export default Page;
