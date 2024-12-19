import React, { ReactNode } from "react";
import Button from "../button/Button";
import Image, { StaticImageData } from "next/image";

interface BannerType {
    img: StaticImageData | string | ReactNode;
    title: string;
    description: string;
    btnIcon?: ReactNode;
    btnTitle: string;
}

const Banner: React.FC<BannerType> = ({ img, title, description, btnIcon, btnTitle }) => {
    return (
        <div className='w-[686px] h-[250px] bg-[#FBFBFB] p-[45px_36px] relative'>
            <div className='flex flex-col gap-6  items-end '>
                <h2 className='text-[20px] font-[800] leading-6  w-[50%] flex items-end text-end  uppercase'>
                    {title}
                </h2>
                <p className='text-[#727272] text-[14px] font-[400] w-[60%] flex items-end text-end leading-[22px]'>
                    {description}
                </p>
                <Button type='button' title={btnTitle} rightIcon={btnIcon} />
            </div>
            <Image
                className='absolute left-0 bottom-5'
                src={img as string}
                alt={title}
                width={312}
                height={312}
                style={{ width: "312px", height: "312px" }}
                priority
            />
        </div>
    );
};

export default Banner;
