import { useEffect, useState } from "react";
import { getLowStock } from "../../../../../api/productsApi";
import { getAdminTasks } from "../../../../../api/adminApi";
import { useNavigate } from "react-router-dom";
import Table from "../../../../../ui/Table";

export default function Alerts() {
    const [lowStock, setLowStock] = useState(0);
    const [adminTasks, setAdminTasks] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status" },
        { key: "action", label: "Action" },
    ];

    const data = adminTasks.map((task) => ({
        id: task.id,
        name: task.task,
        description: task.description,
        status: task.status,
        date: task.created_at?.slice(0, 10) || "",
        action: (
            <button
                className="hover:underline"
                onClick={() => navigate(`/admin/task/${task.id}`)}
            >
                View
            </button>
        )
    }));

    useEffect(() => {
        // Get Low Stock
        getLowStock()
            .then((data) => setLowStock(data?.lowStock ?? 0))
            .catch(() => setLowStock(0));

        // Get Admin Tasks
        getAdminTasks()
            .then((data) => setAdminTasks(data.tasks))
            .catch(() => setAdminTasks([]));
    }, []);

    return (
        <div>
            {/* Alerts */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <h1 className="text-xl font-[Panchang-Semibold] pb-2">Alerts</h1>
                <p className="text-md font-[Panchang-Regular] pb-2">Low Stock: {lowStock}</p>
                <div className="flex justify-between items-center pb-2">
                    <p className="text-md font-[Panchang-Regular]">
                        Admin Tasks
                    </p>

                    <button
                        className="border border-black px-4 py-2 bg-transparent rounded-full font-[Panchang-Regular] shadow-md hover:bg-black hover:text-white duration-200"
                        onClick={() => navigate("/admin/task/add")}
                    >
                        Add Task
                    </button>
                </div>

                <Table 
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}