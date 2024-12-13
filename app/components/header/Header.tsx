"use client";
import Container from "@/app/utils";
import { CartIcon, LoginIcon, SearchIcon } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";
import { usePathname } from "next/navigation";
import Modal from "../modal/Modal";
import { FormEvent, useContext, useState } from "react";
import RegisterForm from "../registerForm/RegisterForm";
import { instance } from "@/app/hook/instance";
import VerifyForm from "../verifyForm/VerifyForm";
import LoginForm from "../loginForm/LoginForm";
import ResetPassForm from "../reserPassForm/ResetPassForm";
import ForgotPassForm from "../forgotPassForm/ForgotPassForm";
import { Context } from "@/app/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {

    const queryClient  = useQueryClient()
    const id = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<
        "login" | "register" | "verify" | "reset-pass" | "forgot"
    >("login");
    const [emailProp, setEmailProp] = useState<string>("");

    const { setToken } = useContext(Context);

    function formSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isLogin == "register") {
            const data = {
                email: (e.target as HTMLFormElement).email.value,
                firstName: (e.target as HTMLFormElement).firstName.value,
                lastName: (e.target as HTMLFormElement).firstName.value,
                password: (e.target as HTMLFormElement).password.value,
            };
            if (
                (e.target as HTMLFormElement).password.value ==
                (e.target as HTMLFormElement).confirm.value
            ) {
                instance()
                    .post("/register", data)
                    .then(res => {
                        if (res.status == 200 || 201) {
                            setIsLogin("verify");
                        }
                        setEmailProp((e.target as HTMLFormElement).email.value);
                    });
            } else {
                alert("Confirm code");
            }
        } else if (isLogin == "verify") {
            const data = {
                email: emailProp,
                code: (e.target as HTMLFormElement).code.value,
            };
            instance()
                .post(
                    "/users/verify",
                    {},
                    {
                        params: data,
                    }
                )
                .then(res => {
                    if (res.status == 200 || 201) {
                        setIsLogin("login");
                    }
                });
        } else if (isLogin == "login") {
            const data = {
                usernameoremail: (e.target as HTMLFormElement).email.value,
                password: (e.target as HTMLFormElement).password.value,
            };
            instance()
                .post("/login", data)
                .then(res => {
                    setToken(res.data.access_token);
                    setIsOpen(false);
                    queryClient.invalidateQueries({queryKey:["products"]})
                });
        } else if (isLogin == "reset-pass") {
            const data = {
                email: emailProp,
                new_password: (e.target as HTMLFormElement).new_password.value,
                otp: (e.target as HTMLFormElement).otp.value,
            };

            instance()
                .put("/reset-password", data)
                .then(res => {
                    if (res.status == 200 || 201) {
                        setIsLogin("login");
                    }
                });
        } else if (isLogin == "forgot") {
            const email = (e.target as HTMLFormElement).email.value;
            instance()
                .post(`/forgot/${email}`, {})
                .then(res => {
                    if (res.status === 200 || 201) {
                        setEmailProp(email);
                        setIsLogin("reset-pass");
                    } else {
                        alert("bad request");
                    }
                });
        }
    }

    return (
        <header className="sticky top-0 left-0 right-0 bg-white z-[9999999]">
            <Container>
                <div className="flex items-center justify-between border-b-[0.5px] border-[#46A35880] pt-[25px] pb-[25px]">
                    <div className="">
                        <Link href={"/"}>
                            <Image
                                priority
                                style={{ width: "150px", height: "35px" }}
                                src={"/logo.svg"}
                                alt="Green Shop"
                                width={150}
                                height={35}
                                className="w-[150px] h-[35px]"
                            />
                        </Link>
                    </div>
                    <nav className="">
                        <ul className="relative flex gap-[45px]">
                            <li className="relative ">
                                <Link
                                    href="/"
                                    className={`font-[400] leading-normal text-[16px] ${
                                        id === "/" ? " text-[#3D3D3D]" : ""
                                    }`}>
                                    Home
                                </Link>
                                {id === "/" && (
                                    <span className="absolute left-0 bottom-[-33px] w-full h-[2px] bg-[#46A358] animate-slide-in"></span>
                                )}
                            </li>
                            <li className="relative">
                                <Link
                                    href="/shop"
                                    className={`font-[400] leading-normal text-[16px] ${
                                        id.includes("/shop")
                                            ? " text-[#3D3D3D]"
                                            : ""
                                    }`}>
                                    Shop
                                </Link>
                                {id.includes("/shop") && (
                                    <span className="absolute left-0 bottom-[-33px] w-full h-[2px] bg-[#46A358] animate-slide-in"></span>
                                )}
                            </li>
                            <li className="relative">
                                <Link
                                    href="/plants-care"
                                    className={`font-[400] leading-normal text-[16px] ${
                                        id.includes("/plants-care")
                                            ? " text-[#3D3D3D]"
                                            : ""
                                    }`}>
                                    Plants Care
                                </Link>
                                {id.includes("/plants-care") && (
                                    <span className="absolute left-0 bottom-[-33px] w-full h-[2px] bg-[#46A358] animate-slide-in"></span>
                                )}
                            </li>
                            <li className="relative">
                                <Link
                                    href="/blogs"
                                    className={`font-[400] leading-normal text-[16px] ${
                                        id.includes("/blogs")
                                            ? "text-[#3D3D3D]"
                                            : ""
                                    }`}>
                                    Blogs
                                </Link>
                                {id.includes("/blogs") && (
                                    <span className="absolute left-0 bottom-[-33px] w-full h-[2px] bg-[#46A358] animate-slide-in"></span>
                                )}
                            </li>
                        </ul>
                    </nav>
                    <div className="flex gap-[30px] items-center">
                        <Link href={"/"}>
                            <SearchIcon />
                        </Link>
                        <Link className="relative" href={"/"}>
                            <span className="absolute top-0 -right-[5px] h-[14px] w-[14px] rounded-full bg-[#46A358] text-[#fff] text-[10px] border-[1px] border-[#fff] flex items-center justify-center">
                                5
                            </span>
                            <CartIcon />
                        </Link>
                        <Button
                            onClick={() => setIsOpen(true)}
                            title={"Login"}
                            leftIcon={<LoginIcon />}
                            type="button"
                        />
                        <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
                            <ul className="flex gap-[16px] justify-center mb-[53px]">
                                <li
                                    onClick={() => setIsLogin("login")}
                                    className={`text-[20px] leading-[16px] font-[500] ${
                                        isLogin == "login"
                                            ? "text-[#46A358]"
                                            : "text-[#3D3D3D]"
                                    } `}>
                                    Login
                                </li>
                                <li className="h-[16px] !w-[1px] bg-[#3D3D3D]">
                                    {" "}
                                </li>
                                <li
                                    onClick={() => setIsLogin("register")}
                                    className={`text-[20px] leading-[16px] font-[500] ${
                                        isLogin == "register"
                                            ? "text-[#46A358]"
                                            : "text-[#3D3D3D]"
                                    } `}>
                                    Register
                                </li>
                            </ul>

                            <form
                                onSubmit={formSubmit}
                                className="flex flex-col gap-4">
                                {isLogin === "login" && (
                                    <LoginForm setIsLogin={setIsLogin} />
                                )}
                                {isLogin === "register" && <RegisterForm />}
                                {isLogin === "verify" && <VerifyForm />}
                                {isLogin == "reset-pass" && <ResetPassForm />}
                                {isLogin == "forgot" && <ForgotPassForm />}
                            </form>
                        </Modal>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
