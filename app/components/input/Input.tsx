"use client";
import { HidePass, ShowPass } from "@/public/icons";
import React, { useState } from "react";

interface InputT {
    name: string;
    type: "text" | "password" | "email" | "number";
    readOnly?: boolean;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

const Input: React.FC<InputT> = ({
    type,
    name,
    className,
    readOnly,
    required,
    placeholder,
}) => {
    const [isHide, setIsHide] = useState<boolean>(false);
    return (
        <label className="relative">
            <input
                className={`w-full p-[12px_100px_12px_14px] outline-none border-[#EAEAEA] border-[1.5px] rounded-lg focus:border-[#46A358] ${className}`}
                readOnly={readOnly}
                required={required}
                placeholder={placeholder}
                type={
                    type == "password" ? (!isHide ? "password" : "text") : type
                }
                name={name}
            />
            {type === "password" && (
                <div
                    onClick={() => {
                        setIsHide(!isHide);
                    }}
                    className=" absolute top-[15px] right-3">
                    {!isHide ? <HidePass /> : <ShowPass />}
                </div>
            )}
        </label>
    );
};

export default Input;
