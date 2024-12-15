"use client";
import { CategoryType } from "@/service/getCategories";
import React, { SetStateAction } from "react";
import { Slider } from "@nextui-org/react";

interface AsidePropsType {
    categories: CategoryType[];
    className?: string;
    setCategory: React.Dispatch<SetStateAction<string | null>>;
    category: string | null;
    value: number[] | number;
    setValue: React.Dispatch<SetStateAction<number[]>>;
    setSize: React.Dispatch<SetStateAction<string | null>>;
    size: string | null;
}

const Aside: React.FC<AsidePropsType> = ({
    categories,
    category,
    className,
    setCategory,
    value,
    setValue,
    setSize,
    size,
}) => {
    return (
        <>
            <div className={`w-full p-[14px_18px] bg-[#FBFBFB] rounded-lg  ${className}`}>
                <h2 className='text-[18xp] font-[700] leading-[16px]'>Categories</h2>
                <ul className='px-[15px] mt-[15px]'>
                    {categories &&
                        [{ category_name: "All", category_id: null }, ...categories].map(
                            (item: CategoryType) => (
                                <li
                                    key={item.category_id}
                                    onClick={() => {
                                        setCategory(item.category_name == "All" ? null : item.category_name);
                                    }}
                                    className={` ${
                                        category == item.category_name ? "text-[#46A358] font-[600]" : ""
                                    }text-[15px] transition-all duration-300 font-[400] leading-[40px] `}>
                                    {item.category_name}
                                </li>
                            )
                        )}
                </ul>
                <div className='flex flex-col gap-2  max-w-md items-start justify-center mt-[36px]'>
                    <h2 className='text-[18px] font-[700] leading-4 mg-[12px]'>Price Range</h2>
                    <Slider
                        classNames={{
                            base: "max-w-[209px]",
                            labelWrapper: " hidden",
                            track: "bg-[#46a35924]",
                            filler: "bg-[#46A358]",
                            value: "font-medium text-default-500 text-small",
                            thumb: [
                                "transition-size",
                                "bg-[#46A358]",
                                "border-[3px]",
                                "border-[#fff]",
                                "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                                "data-[dragging=true]:w-5 data-[dragging=true]:h-5 data-[dragging=true]:after:h-5 data-[dragging=true]:after:w-5",
                            ],
                        }}
                        formatOptions={{ style: "currency", currency: "USD" }}
                        size={"sm"}
                        label={" "}
                        maxValue={2000}
                        minValue={0}
                        step={2}
                        value={value}
                        onChange={setValue}
                    />
                    <p className='text-[15px] text-[#3d3d3d76] font-[400] leading-4'>
                        Price:
                        <span className='text-[#46A358] font-[700]'>
                            {" "}
                            {Array.isArray(value) && value.map(b => `$${b}`).join(" – ")}
                        </span>
                    </p>
                </div>
                <div className=' mt-[55px]'>
                    <h2 className='text-[18px] font-[700] leading-4 mg-[12px]'>Size</h2>
                    <ul className='flex flex-col mt-[5px] p-[8px] gap-[15px]'>
                        <li
                            onClick={() => setSize("Small")}
                            className={`text-[15px] font-[400] cursor-pointer ${
                                size == "Small" ? "text-[#46A358]" : ""
                            } `}>
                            Small
                        </li>
                        <li
                            onClick={() => setSize("Medium")}
                            className={`text-[15px] font-[400] cursor-pointer ${
                                size == "Medium" ? "text-[#46A358]" : ""
                            } `}>
                            Medium
                        </li>
                        <li
                            onClick={() => setSize("Large")}
                            className={`text-[15px] font-[400] cursor-pointer ${
                                size == "Large" ? "text-[#46A358]" : ""
                            } `}>
                            Large
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Aside;
