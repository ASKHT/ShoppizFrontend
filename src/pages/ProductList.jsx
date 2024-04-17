import { useEffect, useState } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ProductCard } from "../components/ProductCard";
import BrandFilter from "../components/productList/BrandFilter";
import PriceFilter from "../components/productList/PriceFilter";
import RatingFilter from "../components/productList/RatingFilter";
import ContentWrapper from "../components/ContentWrapper";

import { getAllProductAction } from "../redux/features/productSlice.js";
import ProductCardLoading from "../components/loading/ProductCardLoading.jsx";

const ProductList = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.product);
    const category = useParams().category;

    const [searchParams, setSearchParams] = useSearchParams();
    const [filterArray, setFilterArray] = useState([]);

    const handleSortOrder = (e) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("sort", e.target.value);
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        dispatch(getAllProductAction(`${category}${location.search}`));
    }, [location]);

    //TODO: remove the checked mark from clicking on filter criteria tags
    // const removeFilter = (e) => {
    //   console.log(e.target.parentNode)
    //   e.target.parentNode.style.display = 'none'
    // }

    return (
        <ContentWrapper>
            <div className="my-10 flex">
                {/* Filter criteria */}
                <div className="px-5 w-80 bg-white border-[2px] border-gray">
                    <div className="">
                        <div className="font-bold my-3">Brand</div>
                        <BrandFilter filterArray={filterArray} setFilterArray={setFilterArray} />
                    </div>
                    <div className="border-y-[2px] border-y-gray ">
                        <PriceFilter />
                    </div>
                    <div className="">
                        <RatingFilter />
                    </div>
                </div>

                <div className="px-5 w-full">
                    <div className="font-bold text-xl">{category}</div>
                    <div className="flex justify-between items-center">
                        <div className=""></div>
                        <div className="">
                            <label htmlFor="sortOrder" className="px-2">
                                Sort By :
                            </label>
                            <select
                                id="sortOrder"
                                // value={}
                                className="text-sm border-2 border-grey rounded-md outline-none p-1 w-32 h-12"
                                onChange={handleSortOrder}
                            >
                                <option value="whatNew">What&#8217;s new</option>
                                <option value="lowtohigh">Price: Low to High</option>
                                <option value="hightolow">Price: High to Low</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-between gap-5 mt-5">
                            <ProductCardLoading />
                            <ProductCardLoading />
                            <ProductCardLoading />
                        </div>
                    ) : (
                        <div className="grid grid-row-4 grid-cols-3 grid-flow-row-dense gap-5 mt-5">
                            {data && data?.map((item) => <ProductCard key={item._id} item={item} />)}
                        </div>
                    )}
                </div>
            </div>
        </ContentWrapper>
    );
};

export default ProductList;
