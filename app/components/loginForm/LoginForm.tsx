import Input from "../input/Input";
import Button from "../button/Button";
import { SetStateAction } from "react";

interface LoginProps {
    setIsLogin: React.Dispatch<
        SetStateAction<
            "login" | "register" | "verify" | "reset-pass" | "forgot"
        >
    >;
}

const LoginForm: React.FC<LoginProps> = ({ setIsLogin }) => {
    return (
        <>
            <p className="text-[13px] leading-[16px] font-[400] mb-[12px]">
                Enter your username and password to login.
            </p>
            <div className="flex flex-col gap-4">
                <Input
                    type={"email"}
                    required={true}
                    name={"email"}
                    placeholder="Enter your email"
                />
                <Input
                    type={"password"}
                    required={true}
                    name={"password"}
                    placeholder="Enter your password"
                />
                <button
                    onClick={() => setIsLogin("forgot")}
                    type="button"
                    className="flex ml-auto hover:underline transition duration-200 text-[14px] leading-4 font-[400] text-[#46A358]">
                    Forgot Password?
                </button>

                <Button
                    title="Login"
                    type="submit"
                    className="w-full flex items-center justify-center mt-[41px]"
                />
            </div>
        </>
    );
};

export default LoginForm;
