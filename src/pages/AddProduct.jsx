import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [feature1, setFeature1] = useState("");
    const [feature2, setFeature2] = useState("");
    const [feature3, setFeature3] = useState("");
    const [feature4, setFeature4] = useState("");
    const [feature5, setFeature5] = useState("");

    const [productInfo, setProductInfo] = useState({
        name: "",
        price: 0,
        description: "",
        category: "",
        brand: "",
        quantity: 0,
    });

    const handleChange = (e) => {
        if (e.target.name === "images") {
            setProductInfo({ ...productInfo, [e.target.name]: e.target.files });
        } else {
            setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const { name, price, category, brand, quantity } = productInfo;
        if (!name || !price || !category || !brand || !quantity) {
            alert("Missing product details");
            return;
        }
        setProductInfo(async (prev) => {
            const updated = { ...prev, highlights: [feature1, feature2, feature3, feature4, feature5] };
            console.log(updated);
            const token = JSON.parse(localStorage.getItem("ecommerce-token"));
            const { data } = await axios.post("http://localhost:8000/api/v1/product/", updated, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(data);
            return updated;
        });
    };

    return (
        <div className="my-5">
            <h1 className="text-center font-bold text-2xl text-primaryGreen my-5">Add Product</h1>
            <form
                className="flex flex-col gap-2 max-w-[50%] mx-auto border border-primaryGreen rounded-md shadow-md drop-shadow-md shadow-primaryGreen p-5"
                onSubmit={handleAddProduct}
            >
                <div className="flex items-center gap-5">
                    <label htmlFor="name" className="w-40">
                        Name
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        name="name"
                        value={productInfo.name}
                        onChange={handleChange}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="brand" className="w-40">
                        Brand
                    </label>
                    <input
                        type="text"
                        id="brand"
                        placeholder="Brand"
                        name="brand"
                        value={productInfo.brand}
                        onChange={handleChange}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="price" className="w-40">
                        Price
                    </label>
                    <input
                        type="Number"
                        id="price"
                        placeholder="Price"
                        name="price"
                        value={productInfo.price}
                        onChange={handleChange}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5 ">
                    <label htmlFor="description" className="w-40">
                        Description
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={productInfo.description}
                        onChange={handleChange}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full resize-none"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="quantity" className="w-40">
                        Quantity
                    </label>
                    <input
                        type="Number"
                        id="quantity"
                        placeholder="Quantity"
                        name="quantity"
                        value={productInfo.quantity}
                        onChange={handleChange}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5 ">
                    <label htmlFor="category" className="w-40">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        placeholder="select"
                        className="w-full border border-gray outline-none px-2 py-1 rounded-md"
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="Smartphones">Smartphones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Monitors">Monitors</option>
                        <option value="Televisions">Televisions</option>
                        <option value="Audio">Audio</option>
                        <option value="Camera">Camera</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="feature1" className="w-40">
                        Feature 1
                    </label>
                    <input
                        type="text"
                        id="feature1"
                        placeholder="Feature 1"
                        name="feature1"
                        value={feature1}
                        onChange={(e) => setFeature1(e.target.value)}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="feature2" className="w-40">
                        Feature 2
                    </label>
                    <input
                        type="text"
                        id="feature2"
                        placeholder="Feature 2"
                        name="feature2"
                        value={feature2}
                        onChange={(e) => setFeature2(e.target.value)}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="feature3" className="w-40">
                        Feature 3
                    </label>
                    <input
                        type="text"
                        id="feature3"
                        placeholder="Feature 3"
                        name="feature3"
                        value={feature3}
                        onChange={(e) => setFeature3(e.target.value)}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="feature4" className="w-40">
                        Feature 4
                    </label>
                    <input
                        type="text"
                        id="feature4"
                        placeholder="Feature 4"
                        name="feature4"
                        value={feature4}
                        onChange={(e) => setFeature4(e.target.value)}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="feature5" className="w-40">
                        Feature 5
                    </label>
                    <input
                        type="text"
                        id="feature5"
                        placeholder="Feature 5"
                        name="feature5"
                        value={feature5}
                        onChange={(e) => setFeature5(e.target.value)}
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                    />
                </div>

                <div className="flex items-center gap-5">
                    <label htmlFor="images" className="w-40">
                        Images
                    </label>
                    <input
                        type="file"
                        id="images"
                        placeholder="Images"
                        multiple={true}
                        name="images"
                        className="border border-gray outline-none px-2 py-1 rounded-md w-full"
                        onChange={handleChange}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                    />
                </div>
                <button className="bg-primaryGreen self-center text-white rounded-md py-2 px-5 w-fit my-3">
                    Add Products
                </button>
            </form>
        </div>
    );
};
export default AddProduct;
