import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
    return <div className="max-w-[83%] mx-auto ">{children}</div>;
};

export default Container;
