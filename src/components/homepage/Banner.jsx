import { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Categories } from '../Categories';
import modelphoto1 from "../../assets/banner-img/model2.avif"
import modelphoto2 from "../../assets/banner-img/model3.jpg"
import modelphoto3 from "../../assets/banner-img/model4.avif"
import modelphoto4 from "../../assets/banner-img/model5.jpeg"
const Banner = () => {
    const bannerImages = [modelphoto1, modelphoto2,modelphoto3,modelphoto4]
    const [currentslide, setCurrentSlide] = useState(0)

    let timeout = useRef(null)

    const handelLeft = () => {
        clearTimeout(timeout.current)
        setCurrentSlide(currentslide > 0 ? currentslide - 1 : bannerImages.length - 1)
    }

    const handleRight = () => {
        clearTimeout(timeout.current)
        setCurrentSlide(currentslide < bannerImages.length - 1 ? currentslide + 1 : 0)
    }

    const handleDots = (idx) => {
        clearTimeout(timeout.current)
        setCurrentSlide(idx)
    }

    useEffect(() => {
        const changeBannerImg = () => {
            timeout.current = setTimeout(() => {
                setCurrentSlide(currentslide < bannerImages.length - 1 ? currentslide + 1 : 0)
            }, 3000)
        }
        // changeBannerImg()
        return (() => {
            clearTimeout(timeout)
        })
    }, [currentslide, bannerImages.length])

    return (
        <div className="mt-10 mb-10 flex mr-9 gap-10 ">
           <Categories/>
                <div className='flex w-[80%] '>
                    <div className="w-[100%] bg-[#F9F9F9] flex justify-center flex-col items-center gap-3">
                        <h1 className='text-5xl font-bold'>Season<span className='mx-3  bg-black text-white'>Sale</span></h1>
                        <p>New Modern Stylish Wear for Trendy Fashion.</p>
                        <p>You Can Shop Now</p>
                       <b className='hover:border-b-2 border-black'>Explore Now</b>
                          <h1 className='text-5xl font-bold'>50% Off</h1>
                    </div>
                    <div className='w-[100%] h-[28rem]'>
                         <img src={bannerImages[currentslide]} alt="" className="w-[100%] h-[100%]" />
                    </div>
                </div>
        </div>
    )
}

export default Banner