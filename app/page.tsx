"use client";
import Link from "next/link";
import { CategoryType, GetCategories } from "../service/getCategories";
import Container from "./utils";
import { ArrowIcon } from "@/public/icons";
import Image from "next/image";
import Button from "./components/button/Button";
import Aside from "./components/aside/Aside";
import { useState } from "react";
import Products from "./components/products/Products";
import { GetProducts } from "../service/getProducts";
import Debounce from "./hook/debounce";
import Banner from "./components/banner/Banner";
import BannerImage from "@/public/plant.png";
import { blogInfo, BlogInfoType } from "./db/db";

export default function Home() {
    const categories: CategoryType[] = GetCategories();
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [category, setCategory] = useState<string | null>(null);
    const [tags, setTags] = useState<string | null>(null);
    const [value, setValue] = useState<number[]>([0, 1230]);
    const fullPrice = Debounce(value, 1000);
    const [size, setSize] = useState<string | null>(null);

    const products = GetProducts(category, page, setLimit, tags, fullPrice, size);

    return (
        <>
            <section className='hero md:py-[55px]'>
                <Container>
                    <div className='w-full lg:pt-[58px] lg:pb-[74px]  lg:pr-[25px]  p-6 md:p-[23px_0px_24px_50px] lg:p-[13px_105px_24px_67px] rounded-2xl overflow-hidden  bg-[#46a35930] lg:bg-[#F5F5F580]'>
                        <div className='md:flex md:items-center md:justify-between relative'>
                            <div className='content w-[215px] md:w-[382px] lg:w-[552px] flex flex-col gap-2 md:gap-3'>
                                <h1 className='uppercase lg:leading-[60px] flex flex-col text-[11px] md:text-[14px] lg:text-[16px] font-[500] leading-4 md:leading-[45px]'>
                                    Welcome to GreenShop
                                    <span className='text-[24px] md:text-[40px] lg:text-[54px] md:leading-[40px] font-[900] lg:leading-[70px] leading-[29px]'>
                                        Lets make a <span className='text-[#46A358]'>better planet</span>
                                    </span>
                                </h1>
                                <p className='text-[#727272] lg:hidden text-[12px] md:text-[14px] lg:text-[16px] font-[400] leading-[18px] md:leading-[20px]'>
                                    We are an online plant shop offering a wide range
                                </p>
                                <p className='text-[#727272] hidden lg:flex text-[12px] md:text-[14px] lg:text-[16px] font-[400] leading-[18px] md:leading-[20px]'>
                                    We are an online plant shop offering a wide range of cheap and trendy
                                    plants. Use our plants to create an unique Urban Jungle. Order your
                                    favorite plants!
                                </p>
                                <Link
                                    href={"/shop"}
                                    className='flex lg:hidden uppercase mt-[10px] text-[#46A358] items-center gap-[8px] text-[12px] md:text-[14px] lg:text-[16px]'>
                                    shop now <ArrowIcon />
                                </Link>

                                <Button
                                    type='button'
                                    title={"SHOP NOW"}
                                    className='max-w-[130px] mt-[35px] !text-center hidden lg:flex'
                                />
                                <div className='relative'></div>
                                <Image
                                    src={"/plant.png"}
                                    width={143}
                                    height={183}
                                    style={{ width: "143px", height: "183px" }}
                                    alt='plant'
                                    priority
                                    className='absolute  md:hidden -top-[22px] max-sm:right-[-40px] right-0 w-[100px] md:w-[120px] lg:w-[143px]'
                                />
                                <Image
                                    src={"/plamt-2.png"}
                                    width={73}
                                    height={93}
                                    style={{ width: "73px", height: "93px" }}
                                    alt='plant'
                                    priority
                                    className='absolute  md:hidden max-sm:right-[40px] top-[60px] right-[80px] md:right-[50px] lg:right-[70px] w-[50px] md:w-[60px] lg:w-[73px]'
                                />
                            </div>
                            <Image
                                src={"/plant.png"}
                                alt='plant'
                                priority
                                width={500}
                                height={500}
                                className='hidden md:flex md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px]'
                            />
                        </div>
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <div className='grid grid-cols-[310px_auto] gap-[50px]'>
                        <Aside
                            categories={categories}
                            setCategory={setCategory}
                            category={category}
                            value={value}
                            setValue={setValue}
                            setSize={setSize}
                            size={size}
                        />
                        <Products
                            category={category}
                            products={products}
                            limit={limit}
                            page={page}
                            setPage={setPage}
                            setTags={setTags}
                            tags={tags}
                        />
                    </div>
                </Container>
            </section>
            <section className=' pt-[146px]'>
                <Container>
                    <div className=' flex items-center justify-between'>
                        <Banner
                            title='summer cactus & succulents'
                            description='We are online plant shop offering a wide range of cheap anf trendy plants'
                            img={BannerImage}
                            btnTitle='Find More'
                            btnIcon={<ArrowIcon />}
                        />
                        <Banner
                            title='Styling trends & much more'
                            description='We are online plant shop offering a wide range of cheap anf trendy plants'
                            img={BannerImage}
                            btnTitle='Find More'
                            btnIcon={<ArrowIcon />}
                        />
                    </div>
                </Container>
            </section>
            <section className=' pt-[126px] pb-[100px]'>
                <Container>
                    <div className='blog'>
                        <div className='header mb-[40px] flex flex-col text-center gap-[15px]'>
                            <h2 className='text-[30px] font-[700] leading-4'>Our Blog Posts</h2>
                            <p className='text-[14px] font-[400] leading-6 text-[#727272]'>
                                We are an online plant shop offering a wide range of cheap and trendy plants.{" "}
                            </p>
                        </div>
                        <div className='grid grid-cols-4 gap-[43px]'>
                            {blogInfo.map((item: BlogInfoType) => (
                                <div key={item.id} className='flex  flex-col'>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: "341px", height: "235px" }}
                                        priority
                                        width={341}
                                        height={235}
                                    />
                                    <div className='p-[15px_13px] grid grid-rows-3 bg-[#FBFBFB]'>
                                        <h3 className='text-[20px] font-[700] mb-1 leading-6'>
                                            {item.title}
                                        </h3>
                                        <p className='text-[14px] flex items-center font-[400] line-clamp-2 leading-[22px] mb-[19px] text-[#727272]'>
                                            {item.description}
                                        </p>
                                        <Link
                                            className=' hover:text-[#46A358] items-center flex  transition duration-150'
                                            href={"/blog"}>
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
