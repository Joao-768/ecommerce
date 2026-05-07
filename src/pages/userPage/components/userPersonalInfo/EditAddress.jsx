import { useNavigate, useParams } from "react-router-dom";
import { getAddresses, updateAddress } from "../../../../api/usersApi";
import { useEffect, useState } from "react";

export default function EditAddress() {
    const account = localStorage.getItem("account");
    const [editAddress, setEditAddress] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        getAddresses(account)
            .then((data) => setAddresses(data));
    }, [account]);

    useEffect(() => {

        const found = addresses.find(
            addr => addr.id === parseInt(id)
        );

        if (found) {
            setEditAddress(found);
        }
    }, [addresses, id]);

    const editHandleChange = (e) => {
        const { name, value } = e.target;

        setEditAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!editAddress) {
        return (
            <div className="flex justify-center items-center h-full">
                Loading address...
            </div>
        );
    }

    return(
        <div className="flex justify-center items-start pt-10 align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Edit Address
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        await updateAddress(
                            editAddress.id,
                            editAddress.street,
                            editAddress.city,
                            editAddress.postal_code,
                            editAddress.district,
                            editAddress.country
                        );

                        alert("Product Edited");
                        navigate("/user-page/personal-info");
                    }}

                    className="grid grid-cols-2 gap-6"
                >

                    {/* Street */}
                    <input
                        type="text"
                        name="street"
                        value={editAddress.street}
                        onChange={editHandleChange}
                        placeholder="Street"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* City */}
                    <input
                        type="text"
                        name="city"
                        value={editAddress.city}
                        onChange={editHandleChange}
                        placeholder="City"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Postal-Code */}
                    <input
                        type="text"
                        name="postal_code"
                        value={editAddress.postal_code}
                        onChange={editHandleChange}
                        placeholder="Postal Code"
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white font-[Panchang-Regular]"
                    />

                    {/* District */}
                    <input
                        type="text"
                        name="district"
                        value={editAddress.district}
                        onChange={editHandleChange}
                        placeholder="District"
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white font-[Panchang-Regular]"
                    />

                    {/* Country */}
                    <input
                        type="text"
                        name="country"
                        value={editAddress.country}
                        onChange={editHandleChange}
                        placeholder="Country"
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white font-[Panchang-Regular]"
                    />

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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}