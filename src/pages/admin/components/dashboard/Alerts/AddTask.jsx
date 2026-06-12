import { useNavigate } from "react-router-dom";
import { createAdminTask } from "../../../../../api/adminApi";
import { useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default function AddTask() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        task: "",
        description: "",
        status: "pending"
    });

    const status = [
        {key: "pending", label: "Pending"},
        {key: "in_progress", label: "In Progress"},
        {key: "done", label: "Done"},
        {key: "cancelled", label: "Cancelled"}
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-start align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Create New Task
                </h2>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            await createAdminTask(form);
                            alert("Task Created");
                            navigate("/admin/dashboard");
                        } catch (err) {
                            alert(err.message);
                        }
                    }}
                    className="grid grid-cols-2 gap-6"
                >

                    {/* Task */}
                    <input
                        type="text"
                        name="task"
                        value={form.task}
                        onChange={handleChange}
                        placeholder="Task"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Description */}
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Status */}
                    <div className="relative w-full col-span-2 font-[Panchang-Regular]">
                        <select
                            name="status"
                            value={form.status}
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
                            <TbTriangleInvertedFilled />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 w-full flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
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
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}