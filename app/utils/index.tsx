import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
    return <div className={`container px-[20px] mx-auto ${className}`}>{children}</div>;
};

export default Container;
