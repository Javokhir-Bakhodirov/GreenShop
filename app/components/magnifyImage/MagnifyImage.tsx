import React, { useState } from "react";
import Image from "next/image";

interface MagnifyImageProps {
    image: string; // Path to the image
}

const MagnifyImage: React.FC<MagnifyImageProps> = ({ image }) => {
    const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
        display: "none",
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const zoomer = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - zoomer.left;
        const offsetY = e.clientY - zoomer.top;
        const xPercent = (offsetX / zoomer.width) * 100;
        const yPercent = (offsetY / zoomer.height) * 100;

        setZoomStyle({
            display: "block",
            backgroundPosition: `${xPercent}% ${yPercent}%`,
            backgroundImage: `url(${image})`,
            backgroundSize: "400%",
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ display: "none" });
    };

    return (
        <div
            className='relative w-[404px] h-[404px] bg-[#FBFBFB] rounded-lg overflow-hidden'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                cursor: "crosshair",
            }}>
            <Image
                src={image}
                alt='Zoomable'
                width={404}
                height={404}
                style={{
                    width: "404px",
                    height: "404px",
                }}
                priority
            />
            <div
                className='absolute w-[200px] h-[200px] rounded-full bg-no-repeat bg-cover border-[2px] border-white pointer-events-none'
                style={{
                    ...zoomStyle,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}></div>
        </div>
    );
};

export default MagnifyImage;
