import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createAddress } from "../../../../api/usersApi";

export default function AddAddress() {
    const account = localStorage.getItem("account");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        street: "",
        city: "",
        postal_code: "",
        district: "",
        country: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-start pt-10 h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Add Address
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        await createAddress(
                            account,
                            form.street,
                            form.city,
                            form.postal_code,
                            form.district,
                            form.country
                        );

                        alert("Address created");
                        navigate("/user-page/personal-info");
                    }}
                    className="grid grid-cols-2 gap-6"
                >

                    {/* Street */}
                    <input
                        type="text"
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        placeholder="Street"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* City */}
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Postal Code */}
                    <input
                        type="text"
                        name="postal_code"
                        value={form.postal_code}
                        onChange={handleChange}
                        placeholder="Postal Code"
                        className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white font-[Panchang-Regular]"
                    />

                    {/* District */}
                    <input
                        type="text"
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        placeholder="District"
                        className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white font-[Panchang-Regular]"
                    />

                    {/* Country */}
                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white font-[Panchang-Regular]"
                    />

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">

                        <button
                            type="button"
                            onClick={() => navigate("/user-page/personal-info")}
                            className="px-5 py-2 rounded-full border bg-white text-black hover:bg-black hover:text-white transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Save
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}