import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import ContentWrapper from "../components/ContentWrapper";
import ProductCardLoading from "../components/loading/ProductCardLoading";
import { BASE_URL } from "../constants/constant";
const WishList = () => {
    const wishlist = useSelector((state) => state.wishlist.data);
    const [product, setProduct] = useState();

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = JSON.parse(localStorage.getItem("ecommerce-token"));
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/wishlist`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            setProduct(data.wishlistProducts);
        };
        fetchWishlist();
    }, [wishlist]);

    return (
        <ContentWrapper>
            <div className="font-bold text-2xl">{`My WishList (${wishlist?.length || 0})`}</div>
            <div className="flex gap-5">
                {product ? (
                    product.map((item) => (
                        // console.log(item)
                        <ProductCard key={item._id} item={item} />
                    ))
                ) : (
                    <div className="flex gap-5">
                        <ProductCardLoading />
                        <ProductCardLoading />
                        <ProductCardLoading />
                    </div>
                )}
            </div>
        </ContentWrapper>
    );
};

export default WishList;
