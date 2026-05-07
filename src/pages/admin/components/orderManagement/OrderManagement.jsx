import { useEffect, useState } from 'react';
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../../../api/ordersApi';
import { getTotalOrders } from '../../../../api/adminApi';
import { formatCurrency } from '../../../../utils/format';
import Table from '../../../../ui/Table';

export default function OrdersManagement() {
    const [totalOrders, setTotalOrders] = useState(0);
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { key: "orderId", label: "Id" },
        { key: "name", label: "Name" },
        { key: "surname", label: "Surname" },
        { key: "total_price", label: "Total Price" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Date" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <button
                    onClick={() => navigate(`${row.id}/edit`)}
                    className="hover:underline text-left"
                >
                    Edit
                </button>
            )
        }
    ];

    const data = searchResults.map((order) => ({
        id: order.id,
        orderId: `# ${order.id}`,
        name: order.name,
        surname: order.surname,
        total_price: formatCurrency(order.total_price),
        status: order.status,
        created_at: order.created_at?.slice(0, 10) || "",
    }));

    useEffect(() => {
        getTotalOrders()
            .then((data) => setTotalOrders(data.totalOrders))
            .catch(() => setTotalOrders(0));

        getAllOrders()
            .then((data) => {
                setOrders(data);
                setSearchResults(data);
            })
            .catch(() => {
                setOrders([]);
                setSearchResults([]);
            });
    }, []);


    const handleSearch = (value) => {
        setSearchQuery(value);

        const filtered = orders.filter((user) =>
            user.name
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setSearchResults(filtered);
    };

    return (
        <div className="flex-1 pl-10 my-10 flex flex-col gap-5 pr-10">

            {/* Stats */}
            <h1 className="text-3xl font-[Panchang-Semibold]">Order Management</h1>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                <p className="text-md font-[Panchang-Regular] pb-2">Total Orders: {totalOrders}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">Paid Orders: {orders.filter(order => order.status === "paid").length}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">Shipped Orders: {orders.filter(order => order.status === "shipped").length}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">Delivered Orders: {orders.filter(order => order.status === "delivered").length}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">Cancelled Orders: {orders.filter(order => order.status === "cancelled").length}</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search for a Order"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md"
                    />
                </div>

                <Table 
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}
