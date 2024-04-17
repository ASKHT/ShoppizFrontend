import { Link } from 'react-router-dom'
import { IoIosCall, IoIosMail } from "react-icons/io";
import { FaLocationDot, FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import ContentWrapper from './ContentWrapper';
import logolight from "../assets/banner-img/logo-light.png"
export const Footer = () => {
    return (
        <div className="bg-black text-white">
            <ContentWrapper>
                <div className="flex py-5 gap-5">
                    <div className="flex-1">
                       <h1 className="text-5xl font-mono ">Shoppizz</h1>
                        
                    </div>
                    <div className="flex-1">
                        <h2 className='text-xl pb-2'>Product Categories</h2>
                        <ul className="text-sm">
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">T-Shirts</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Jeans</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Sweatshirts</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Trackpants</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Jacket</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Shirts</li></Link>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h2 className='text-xl pb-2'>Company</h2>
                        <ul className="text-sm">
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">About</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Careers</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Services</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Privacy Policy</li></Link>
                            <Link to='/'><li className="py-1 hover:text-primaryGreen">Terms of Service</li></Link>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h2 className='text-xl pb-2'>Contact Us</h2>
                        <ul className="text-sm">
                            <li className="flex gap-2 py-1 items-center">
                                <IoIosCall />
                                <a href="tel:+">+61-9999599911</a>
                            </li>
                            <li className="flex gap-2 py-1 items-center">
                                <IoIosMail />
                                <a href="mailto:">Shoppiz@support.com</a>
                            </li>
                            <li className="flex gap-2 py-1 items-center">
                                <FaLocationDot />
                                <p>California ,UnitedStates</p>
                            </li>
                            <li className="py-5 text-xl">
                                <div className="flex gap-2 py-1 items-center">
                                    <FaFacebook />
                                    <FaInstagramSquare />
                                    <FaSquareXTwitter />
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>
            </ContentWrapper>
            <div className=" py-2 text-center">Copyright &#169; 2024. All rights reserved</div>
        </div>
    )
}

export default Footer
