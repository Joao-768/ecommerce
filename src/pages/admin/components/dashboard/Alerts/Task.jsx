import { useNavigate, useParams } from "react-router-dom";
import { getAdminTaskById, updateAdminTask } from "../../../../../api/adminApi";
import { useEffect, useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});

    useEffect(() => {
        getAdminTaskById(id)
            .then((data) => setTask(data.task))
            .catch(() => setTask({}))
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex justify-center items-start h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Edit Task
                </h2>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await updateAdminTask(task.id, task.task, task.description, task.status);
                        alert("Task Updated");
                        navigate("/admin/dashboard");
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Title */}
                    <input
                        type="text"
                        name="task"
                        value={task?.task || ""}
                        onChange={handleChange}
                        placeholder="Task Title"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Description */}
                    <textarea
                        name="description"
                        value={task?.description || ""}
                        onChange={handleChange}
                        placeholder="Description"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-xl outline-none focus:border-black transition-all font-[Panchang-Regular] resize-none h-32"
                    />

                    {/* Status */}
                    <div className="relative w-full font-[Panchang-Regular] col-span-2">
                        <select
                            name="status"
                            value={task?.status || ""}
                            onChange={handleChange}
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <TbTriangleInvertedFilled />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Update Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}