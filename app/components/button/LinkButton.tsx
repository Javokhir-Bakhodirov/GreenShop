import Link from "next/link";
import React from "react";

interface LinkBtnType {
    href: string;
    className?: string;
    icon: React.ReactNode;
}

const LinkButton: React.FC<LinkBtnType> = ({ href, className, icon }) => {
    return (
        <Link
            href={href}
            className={`border-[#46A35833] text-[#46A358] bg-transparent hover:text-[white] hover:bg-[#46A358] transition duration-250 border-[1px] rounded-md p-[7px] flex items-center justify-center w-[35px] h-[35px] ${className}`}>
            {icon}
        </Link>
    );
};

export default LinkButton;
