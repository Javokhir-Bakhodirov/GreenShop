"use client";
import { CloseIcon } from "@/public/icons";
import React, { ReactNode, SetStateAction } from "react";

interface ModalT {
    isOpen?: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
    className?: string;
}

const Modal: React.FC<ModalT> = ({ isOpen, setIsOpen, children, className }) => {
    return (
        <>
            {isOpen && (
                <div
                    onClick={e => ((e.target as HTMLDivElement).id != "modal" ? "" : setIsOpen(false))}
                    className='fixed   flex z-[123546789] items-center justify-center inset-0 bg-[#0A0D1240]'
                    id='modal'>
                    <div
                        className={`w-[600px] scroll-smooth  border-b-[#46A358] border-b-[10px] bg-white  relative py-[68px] px-[100px] ${className} overscroll-none`}>
                        <button
                            onClick={() => setIsOpen(false)}
                            className=' absolute top-[11px] z-[123] right-3'>
                            <CloseIcon />
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
