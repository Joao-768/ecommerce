import { useNavigate, useParams } from "react-router-dom";
import { getAdminTaskById, updateAdminTask } from "../../../../api/adminApi";
import { useEffect, useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default function EditTask() {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const navigate = useNavigate();

    const status = [
        {key: "pending", label: "Pending"},
        {key: "in_progress", label: "In Progress"},
        {key: "done", label: "Done"},
        {key: "cancelled", label: "Cancelled"}
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        getAdminTaskById(id)
            .then((data) => setTask(data.task))
            .catch(() => setTask({}))
    }, [id]);

    return (
        <div className="flex justify-center items-start align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Edit Task
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            await updateAdminTask(task);

                            alert("Task Updated");
                            navigate("/admin/dashboard");
                        } catch(err) {
                            alert(err.message);
                        }
                    }}

                    className="grid grid-cols-2 gap-6"
                >

                    {/* Name */}
                    <input
                        type="text"
                        name="task"
                        value={task?.task}
                        onChange={handleChange}
                        placeholder="Task"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Description */}
                    <input
                        type="text"
                        name="description"
                        value={task?.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Gender */}
                    <div className="relative w-full font-[Panchang-Regular]">
                        <select
                            name="status"
                            value={task?.status}
                            onChange={handleChange}
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white"
                        >
                            {status.map((status) => (
                                <option key={status.key} value={status.key}>
                                    {status.label}
                                </option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <TbTriangleInvertedFilled/>
                        </div>
                    </div>

                    <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
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