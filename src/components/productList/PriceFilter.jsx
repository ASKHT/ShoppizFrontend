import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";

const PriceFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceChange, setPriceChange] = useState([0, 200000]);

    const handlePriceFilter = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("min_price", priceChange[0]);
        newSearchParams.set("max_price", priceChange[1]);
        setSearchParams(newSearchParams.toString());
    };

    const removePriceFilter = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("min_price");
        newSearchParams.delete("max_price");
        setSearchParams(newSearchParams.toString());
        setPriceChange([0, 200000]);
    };

    return (
        <>
            <div className="flex justify-between font-bold my-5 cursor-pointer ">
                <div className="">Price</div>
                <div className="hover:text-white" onClick={removePriceFilter}>
                    Clear
                </div>
            </div>
            <div>
                <RangeSlider
                    value={[priceChange[0], priceChange[1]]}
                    min={0}
                    max={200000}
                    step={30}
                    onChangeEnd={handlePriceFilter}
                    onChange={(val) => setPriceChange(val)}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
                <div className="flex justify-between">
                    <div>{priceChange[0]}</div>
                    <div>{priceChange[1]}</div>
                </div>
            </div>
        </>
    );
};

export default PriceFilter;
