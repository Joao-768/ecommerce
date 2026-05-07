import { useEffect, useState } from "react";
import { createProduct } from "../../../../api/productsApi";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../../api/categoriesApi";
import { getCollections } from "../../../../api/collectionsApi";
import { getGenders } from "../../../../api/genderApi";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { BsFileImageFill } from "react-icons/bs";

export default function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [genders, setGenders] = useState([]);
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        collection_id: 1,
        category_id: 1,
        gender_id: 1,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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

    return (
        <div className="flex justify-center items-start align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Create New Product
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            await createProduct(form);

                            alert("Product Created");
                            navigate("/admin/product-management");
                        } catch (err) {
                            alert(err.message);
                        }
                    }}
                    className="grid grid-cols-2 gap-6"
                >

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Description */}
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Price */}
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Stock */}
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Category */}
                    <div className="relative w-full font-[Panchang-Regular]">
                        <select
                            name="category_id"
                            value={form.category_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    [e.target.name]: Number(e.target.value)
                                })
                            }
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
                            value={form.collection_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    [e.target.name]: Number(e.target.value)
                                })
                            }
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
                            value={form.gender_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    [e.target.name]: Number(e.target.value)
                                })
                            }
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

                    <div className="relative w-full font-[Panchang-Regular]">
                        <label className="border border-stone-300 px-4 py-3 rounded-full cursor-pointer block">
                            {form.image ? form.image.name : "Select Image"}
                            <input
                                type="file"
                                name="image"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                                className="hidden"
                            />
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                <BsFileImageFill />
                            </div>
                        </label>
                    </div>

                    {/* Buttons */}
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
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}