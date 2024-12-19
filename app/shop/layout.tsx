"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const path = usePathname();
    return (
        <div className=' container mx-auto space-y-[50px] '>
            <div className='px-[30px] pt-[35px]'>
                <span className='font-[700]'>Home</span> / Shop {path.includes("cart") && "/ Shopping Cart"}
            </div>
            {children}
        </div>
    );
};

export default Layout;
