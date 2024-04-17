import { IoClose } from "react-icons/io5";
import { BsStarFill } from "react-icons/bs";
import { useState } from "react";
import { addReview } from "../api/review.api";
import { toast } from "react-toastify";

const ReviewModal = ({ setShowReviewModal, productId }) => {
    const arr = [0, 0, 0, 0, 0];
    const [idxStar, setIdxStar] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("0");

    const handleRating = (e) => {
        setRating(e.currentTarget.id);
    };

    const handleMouseEnter = (e) => {
        setRating(0);
        setIdxStar(e.currentTarget.id);
    };

    const handleMouseLeave = () => {
        setIdxStar(0);
    };

    const handleSubmiReview = (e) => {
        e.preventDefault();
        const review = {
            rating: rating,
            comment: comment,
            product: productId,
        };
        addReview(review)
            .then((res) => {
                toast.success("product reviewed");
                setShowReviewModal(false);
            })
            .catch((error) => {
                toast.error(error);
                setShowReviewModal(false);
            });
    };
    return (
        <div
            className="fixed top-0 left-0 h-[100vh] w-[calc(100vw-0px)] bg-black bg-opacity-70 overflow-hidden"
            onClick={() => setShowReviewModal(false)}
        >
            <div
                className=" flex flex-col max-w-[500px] mx-auto justify-center my-28 p-5  rounded-md bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <IoClose className="w-10 h-10 self-end rounded-full p-1 " onClick={() => setShowReviewModal(false)} />
                <div className="text-center font-semibold text-3xl mb-5">Write a Review</div>
                <form className="flex flex-col px-20 ">
                    <label htmlFor="rating" className="">
                        Rating
                    </label>
                    <div className="flex gap-1 mb-5">
                        {arr.map((item, idx) => (
                            <span
                                key={idx}
                                id={idx + 1}
                                className=""
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleRating}
                            >
                                <BsStarFill
                                    className={`text-2xl cursor-pointer ${
                                        idx + 1 <= idxStar ? "text-ratingYellow" : ""
                                    } ${idx + 1 <= rating ? "text-ratingYellow" : ""}`}
                                />
                            </span>
                        ))}
                    </div>
                    <textarea
                        name=""
                        id=""
                        rows="3"
                        placeholder="Type Review"
                        onChange={(e) => setComment(e.target.value)}
                        className="resize-none w-full border-2 rounded-2xl p-4"
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-black text-white rounded-md py-1 my-2"
                        onClick={handleSubmiReview}
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ReviewModal;
