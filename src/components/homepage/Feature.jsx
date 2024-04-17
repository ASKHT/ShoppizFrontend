import ContentWrapper from '../ContentWrapper'
import { ProductCard } from '../ProductCard'

const Feature = () => {
    const featuredProducts = [1, 2, 3, 4]
    return (
        <ContentWrapper>
            <div className="overflow-hidden my-10">
                <div className="flex items-center gap-2 mb-5">
                    <div className="text-3xl text-nowrap">Featured Products</div>
                    <div className="h-[2px] bg-primaryGreen w-full"></div>
                </div>
                <div className="flex gap-5 justify-between ">
                    {featuredProducts.map((item) => (
                        <ProductCard key={item} />
                    ))}
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Feature