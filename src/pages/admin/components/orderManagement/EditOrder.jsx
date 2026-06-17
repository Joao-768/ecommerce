import { useNavigate, useParams } from "react-router-dom";
import { getOrderAddress, getOrderById, getUserOrdersItems, updateOrder, updateOrderAddress } from "../../../../api/ordersApi";
import { adjustStock } from "../../../../api/productsApi";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/format";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper";
import { FormInput, FormSelect } from "../../../../ui/Form";
import { Button } from "../../../../ui/Buttons";
import { useTranslation } from "react-i18next";

export default function EditOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [address, setAddress] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (!id) return;
        getOrderById(id).then((data) => setOrder(data)).catch(() => setOrder([]));
        getOrderAddress(id).then((data) => setAddress(data)).catch(() => setAddress([]));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    function handleRefund(orderId) {
        getUserOrdersItems(orderId)
            .then((items) => {
                items.forEach((item) => adjustStock(item.product_id, item.quantity || 1, "increase"));
                updateOrder(orderId, order.name, order.surname, order.total_price, "cancelled", order.created_at);
                alert("Refund feito!");
                navigate("/admin/order-management");
            })
            .catch((error) => { console.error(error); alert("Erro no refund"); });
    }

    return (
        <AdminFormWrapper title={t("editOrder")}>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await updateOrder(order.id, order.name, order.surname, order.total_price, order.status, order.created_at);
                    await updateOrderAddress(address.id, address.street, address.city, address.postal_code, address.district, address.country);
                    alert("Order Edited");
                    navigate("/admin/order-management");
                }}
                className="grid grid-cols-2 gap-6"
            >
                <FormInput type="text" name="name" value={order?.name} onChange={handleChange} placeholder="First Name" />
                <FormInput type="text" name="surname" value={order?.surname} onChange={handleChange} placeholder="Surname" />
                <FormInput type="text" name="price" value={order?.total_price} onChange={handleChange} placeholder="Price" />

                <FormSelect
                    name="status"
                    value={order?.status}
                    onChange={handleChange}
                    options={[
                        { value: "pending", label: "Pending" },
                        { value: "paid", label: "Paid" },
                        { value: "shipped", label: "Shipped" },
                        { value: "delivered", label: "Delivered" },
                        { value: "cancelled", label: "Cancelled" },
                    ]}
                />

                <FormInput type="text" name="date" value={formatDate(order?.created_at)} onChange={handleChange} placeholder="Date" className="col-span-2" />
                <FormInput type="text" name="street" value={address?.street} onChange={handleAddressChange} placeholder="Street" className="col-span-2" />
                <FormInput type="text" name="city" value={address?.city} onChange={handleAddressChange} placeholder="City" />
                <FormInput type="text" name="district" value={address?.district} onChange={handleAddressChange} placeholder="District" />
                <FormInput type="text" name="postalCode" value={address?.postal_code} onChange={handleAddressChange} placeholder="Postal Code" />
                <FormInput type="text" name="country" value={address?.country} onChange={handleAddressChange} placeholder="Country" />

                <div className="col-span-2 flex justify-end gap-4 mt-4">
                    <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/admin/order-management")}>Cancel</Button>
                    <Button shape="pill" type="button" onClick={() => handleRefund(order.id)}>{t("refund")}</Button>
                    <Button shape="pill" type="submit">{t("update")}</Button>
                </div>
            </form>
        </AdminFormWrapper>
    );
}