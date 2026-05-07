import { useNavigate } from "react-router-dom";
import { createCollection } from "../../../../api/collectionsApi";
import { useState } from "react";

export default function AddCollection() {

    const [form, setForm] = useState({
        name: "",
        description: "",
    })

    const navigate = useNavigate();

    const newHandleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-start align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Create New Collection
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            await createCollection(form);
                            alert("Collection Created");
                            navigate("/admin/collection-management");
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
                        onChange={newHandleChange}
                        placeholder="Name"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Description */}
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={newHandleChange}
                        placeholder="Description"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Buttons */}
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
                            Create Collection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}