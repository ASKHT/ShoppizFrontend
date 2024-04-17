const ProductCardLoading = () => {
    return (
        <div className="rounded-3xl overflow-hidden shadow-sm shadow-black m-2 animate-pulse">
            <div className="w-[17rem] h-[250px] bg-gray" />

            <div className="px-2 text-center space-y-2">
                <div className="mx-auto my-5 bg-gray w-[80%] h-5 rounded-lg" />
                <div className="flex">
                    <div className="mx-auto my-1 bg-gray w-28 h-5 rounded-lg" />
                    <div className="mx-auto my-1 bg-gray w-28 h-5 rounded-lg" />
                </div>
                <div className="mx-auto my-1 bg-gray w-20 h-5 rounded-lg"></div>
            </div>
        </div>
    );
};
export default ProductCardLoading;
