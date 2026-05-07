import { useNavigate, useParams } from "react-router-dom";
import { getOrderAddress, getOrderById, getUserOrdersItems, updateOrder, updateOrderAddress } from "../../../../api/ordersApi";
import { increaseStock } from "../../../../api/productsApi";
import { useEffect, useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { formatDate } from "../../../../utils/format";

export default function EditOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [address, setAddress] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        getOrderById(id)
            .then((data) => setOrder(data))
            .catch(() => setOrder([]));

        getOrderAddress(id)
            .then((data) => setAddress(data))
            .catch(() => setAddress([]));
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    function handleRefund(orderId) {
        getUserOrdersItems(orderId)
            .then((items) => {

                items.forEach((item) => {
                    increaseStock(item.product_id);
                });

                updateOrder(
                    orderId,
                    order.name,
                    order.surname,
                    order.total_price,
                    "cancelled",
                    order.created_at
                );

                alert("Refund feito!");
                navigate("/admin/order-management");
            })
            .catch((error) => {
                console.error(error);
                alert("Erro no refund");
            });
    }


    return(
        <div className="flex justify-center items-start align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Edit Order
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        await updateOrder(
                            order.id,
                            order.name,
                            order.surname,
                            order.total_price,
                            order.status,
                            order.created_at
                        );

                        await updateOrderAddress(
                            address.id,
                            address.street,
                            address.city,
                            address.postal_code,
                            address.district,
                            address.country
                        );

                        alert("Order Edited");
                        navigate("/admin/order-management");
                    }}

                    className="grid grid-cols-2 gap-6"
                >

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        value={order?.name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Surame */}
                    <input
                        type="text"
                        name="surname"
                        value={order?.surname}
                        onChange={handleChange}
                        placeholder="Surname"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Price */}
                    <input
                        type="text"
                        name="price"
                        value={order?.total_price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Status */}
                    <div className="relative w-full font-[Panchang-Regular]">
                        <select
                            name="status"
                            value={order?.status}
                            onChange={handleChange}
                                className="relative w-full font-[Panchang-Regular] border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white"
                        >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>

                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                <TbTriangleInvertedFilled/>
                            </div>
                        </select>
                    </div>

                    {/* Date */}
                    <input
                        type="text"
                        name="date"
                        value={formatDate(order?.created_at)}
                        onChange={handleChange}
                        placeholder="Date"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Street */}
                    <input
                        type="text"
                        name="street"
                        value={address?.street}
                        onChange={handleAddressChange}
                        placeholder="Street"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* City */}
                    <input
                        type="text"
                        name="city"
                        value={address?.city}
                        onChange={handleAddressChange}
                        placeholder="City"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* District */}
                    <input
                        type="text"
                        name="district"
                        value={address?.district}
                        onChange={handleAddressChange}
                        placeholder="District"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Postal Code */}
                    <input
                        type="text"
                        name="postalCode"
                        value={address?.postal_code}
                        onChange={handleAddressChange}
                        placeholder="Postal Code"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                     {/* Country */}
                    <input
                        type="text"
                        name="country"
                        value={address?.country}
                        onChange={handleAddressChange}
                        placeholder="Country"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/order-management")}
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={() =>{handleRefund(order.id)}}
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Refund
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