import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from '../../../../api/productsApi';
import { getCollections } from '../../../../api/collectionsApi';
import { getCategories } from '../../../../api/categoriesApi';
import { getGenders } from '../../../../api/genderApi';
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [genders, setGenders] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        getProductById(id)
            .then((data) => setProduct(data.product))
            .catch(() => setProduct([]));
    }, [id])

    useEffect(() => {
        // Get Categories
        getCategories()
            .then((data) => setCategories(data ?? []))
            .catch(() => setCategories([]));

        // Get Collections
        getCollections()
            .then((data) => setCollections(data ?? []))
            .catch(() => setCollections([]));

        // Get Genders
        getGenders()
            .then((data) => setGenders(data ?? []))
            .catch(() => setGenders([]));

    }, []);

    return(
        <div className="flex justify-center items-start align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Edit Product
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        await updateProduct(
                            product.id,
                            product.name,
                            product.price,
                            product.stock,
                            product.category_id,
                            product.collection_id,
                            product.gender_id
                        );

                        alert("Product Edited");
                        navigate("/admin/product-management");
                    }}

                    className="grid grid-cols-2 gap-6"
                >

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        value={product?.name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Price */}
                    <input
                        type="text"
                        name="price"
                        value={product?.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Stock */}
                    <input
                        type="number"
                        name="stock"
                        value={product?.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white font-[Panchang-Regular]"
                    />

                    {/* Category */}
                    <div className="relative w-full font-[Panchang-Regular]">
                        <select
                            name="category_id"
                            value={product?.category_id}
                            onChange={handleChange}
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white"
                        >
                            {categories.map((category) => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <TbTriangleInvertedFilled/>
                        </div>
                    </div>

                    {/* Collection */}
                    <div className="relative w-full font-[Panchang-Regular]">
                        <select
                            name="collection_id"
                            value={product?.collection_id}
                            onChange={handleChange}
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white"
                        >
                            {collections.map((collection) => (
                                <option value={collection.id}>{collection.name}</option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <TbTriangleInvertedFilled/>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="relative w-full font-[Panchang-Regular]">
                        <select
                            name="gender_id"
                            value={product?.gender_id}
                            onChange={handleChange}
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white"
                        >
                            {genders.map((gender) => (
                                <option value={gender.id}>{gender.name}</option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <TbTriangleInvertedFilled/>
                        </div>
                    </div>

                    <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/product-management")}
                            className="px-5 py-2 rounded-full border bg-white text-black hover:bg-black hover:text-white transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}