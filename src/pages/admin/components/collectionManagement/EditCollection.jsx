import { useNavigate, useParams } from "react-router-dom";
import { getCollections, updateCollection } from "../../../../api/collectionsApi";
import { useEffect, useState } from "react";

export default function EditCollection() {
    const [collection, setCollection] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => { 
        getCollections()
            .then((data) => {
                const found = data.find(c => c.id === Number(id));
                setCollection(found);
            })
            .catch(() => setCollection(null));
    }, [id])

    const editHandleChange = (e) => {
        const { name, value } = e.target;

        setCollection((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
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

                        await updateCollection(
                            collection.id,
                            collection.name,
                            collection.description,
                        );

                        alert("Product Edited");
                        navigate("/admin/collection-management");
                    }}

                    className="grid grid-cols-2 gap-6"
                >

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        value={collection.name}
                        onChange={editHandleChange}
                        placeholder="First Name"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Descrption */}
                    <input
                        type="text"
                        name="description"
                        value={collection.description}
                        onChange={editHandleChange}
                        placeholder="Description"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/collection-management")}
                            className="px-5 py-2 rounded-full border bg-white text-black hover:bg-black hover:text-white transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}