import { useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

export default function Table({ columns, data, pageSize = 10 }) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(data.length / pageSize);
    const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <div>
            <table className="w-full border-collapse text-sm mt-5">
                <thead>
                    <tr className="bg-stone-100 text-stone-700 border-b">
                        {columns.map((col) => (
                            <th className="text-left font-[Panchang-Semibold] py-2 px-3">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td className="
                                    py-4 px-3 border-b border-stone-200 
                                    font-[Panchang-Regular]"
                                >
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {totalPages > 1 && (        
                <div className="
                    flex items-center justify-end gap-2 
                    mt-4 text-sm font-[Panchang-Regular]"
                >
                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 0}
                        className="
                            px-3 py-1 border rounded-md 
                            disabled:opacity-30 hover:bg-black 
                            hover:text-white transition"
                    >
                        <IoArrowBackOutline />
                    </button>

                    <span className="text-stone-600 font-[Panchang-Regular]">
                        {page + 1} / {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= totalPages - 1}
                        className="
                            px-3 py-1 border rounded-md 
                            disabled:opacity-30 hover:bg-black 
                            hover:text-white transition"
                    >
                        <IoArrowForwardOutline />
                    </button>
                </div>
            )}
        </div>
    );
}