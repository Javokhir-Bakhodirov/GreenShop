import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
    return <div className="container px-[20px] mx-auto">{children}</div>;
};

export default Container;
