import Container from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import MapIcon from "@/public/Location.png";
import {
    FaceBookIcon,
    InstagramIcon,
    LinkedInIcon,
    MailIcon,
    PhoneIcon,
    TwitterIcon,
    UnionIcon,
} from "@/public/icons";
import LinkButton from "../button/LinkButton";
const Footer = () => {
    return (
        <footer className='footer-section bg-[#FBFBFB] mt-[70px]'>
            <Container>
                <div className='footer-container'>
                    <div className='header'></div>
                    <div className='main p-[26px_0px_19px_0px] bg-[#46A3581A] border-y-[1px] border-[#46A358]'>
                        <ul
                            className='grid grid-cols-5 justify-center items-center
                        '>
                            <li className=' justify-self-center'>
                                <Link href={"/"}>
                                    <Image
                                        src={"/logo.svg"}
                                        alt='Green Shop'
                                        style={{ width: "150px", height: "35px" }}
                                        width={150}
                                        height={35}
                                    />
                                </Link>
                            </li>
                            <li className='justify-self-center'>
                                <address className='w-[220px] gap-[10px] flex items-center'>
                                    <Image
                                        src={MapIcon}
                                        alt='address'
                                        style={{ width: "16px", height: "20px" }}
                                        width={16}
                                        height={20}
                                    />
                                    <span className='text-[14px] leading-[22px] font-[400] '>
                                        70 West Buckingham Ave. Farmingdale, NY 11735
                                    </span>
                                </address>
                            </li>
                            <li className=' justify-self-center'>
                                <Link
                                    href={"mailto:contact@greenshop.com"}
                                    className="w-[220px] gap-[10px] flex items-center'">
                                    <MailIcon />
                                    <span> contact@greenshop.com</span>
                                </Link>
                            </li>
                            <li className=' justify-self-center'>
                                <Link
                                    href={"tel:+88 01911 717 490"}
                                    className="w-[220px] gap-[10px] flex items-center'">
                                    <PhoneIcon />
                                    <span> +88 01911 717 490</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='footer grid grid-cols-[1fr_1fr_1fr_2fr] p-[33px_23px]'>
                        <div className='flex flex-col'>
                            <h2 className='text-[18px] font-[700] leading-[18px] mb-[12px]'>My Account</h2>
                            <ul className=' flex flex-col gap-3'>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    My Account
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Our Store
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Carer
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Contact us
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Specials
                                </li>
                            </ul>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-[18px] font-[700] leading-[18px] mb-[12px]'>Help & Guide</h2>
                            <ul className=' flex flex-col gap-3'>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Help Center
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    How to Buy
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Shipping & Delivery
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Product Policy
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    How to Return
                                </li>
                            </ul>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-[18px] font-[700] leading-[18px] mb-[12px]'>Categories</h2>
                            <ul className=' flex flex-col gap-3'>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Small Plants
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    House Plants
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Potter Plants
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Seeds
                                </li>
                                <li className='text-[14px] font-[400] cursor-pointer text-[#3d3d3d76]'>
                                    Accessories
                                </li>
                            </ul>
                        </div>
                        <div className=''>
                            <div className=''>
                                <h2 className='text-[18px] font-[700] leading-4  mb-[12px]'>Social Media</h2>
                                <ul className=' flex items-center gap-[15px] '>
                                    <li className=''>
                                        <LinkButton href={"salom"} icon={<FaceBookIcon />} />
                                    </li>
                                    <li className=''>
                                        <LinkButton href={"salom"} icon={<InstagramIcon />} />
                                    </li>
                                    <li className=''>
                                        <LinkButton href={"salom"} icon={<LinkedInIcon />} />
                                    </li>
                                    <li className=''>
                                        <LinkButton href={"salom"} icon={<TwitterIcon />} />
                                    </li>
                                    <li className=''>
                                        <LinkButton href={"salom"} icon={<UnionIcon />} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
