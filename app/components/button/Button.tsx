import React, { JSX, MouseEventHandler, ReactNode } from "react";

interface BtnT {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    title: string;
    type: "button" | "submit" | "reset";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Button: React.FC<BtnT> = ({ onClick, className, type, leftIcon, rightIcon, title }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#46A358] py-[8px]  px-[17px] text-[#fff] flex items-center gap-[6px] rounded-lg cursor-pointer ${className} `}
            type={type}>
            {leftIcon}
            {title}
            {rightIcon}
        </button>
    );
};

export default Button;
