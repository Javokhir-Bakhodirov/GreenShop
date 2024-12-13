import BlogImg1 from "@/public/blog-1.png";
import BlogImg2 from "@/public/blog-2.png";
import BlogImg3 from "@/public/blog-3.png";
import BlogImg4 from "@/public/blog-4.png";
import { StaticImageData } from "next/image";

export interface BlogInfoType {
    id: number;
    image: string | StaticImageData;
    title: string;
    description: string;
}

export const blogInfo: BlogInfoType[] = [
    {
        id: 1,
        image: BlogImg1,
        title: "Cactus & Succulent Care Tips",
        description: "Cacti are succulents are easy care plants for any home or patio. ",
    },
    {
        id: 2,
        image: BlogImg2,
        title: "Top 10 Succulents for Your Home",
        description: "Best in hanging baskets. Prefers medium to high light.",
    },
    {
        id: 3,
        image: BlogImg3,
        title: "Cactus & Succulent Care Tips",
        description: "Cacti are succulents are easy care plants for any home or patio. ",
    },
    {
        id: 4,
        image: BlogImg4,
        title: "Best Houseplants Room by Room",
        description: "The benefits of houseplants are endless. In addition to..",
    },
];
