export default function Table({ columns, data }) {
    return (
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
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col) => (
                            <td className="py-4 px-3 border-b border-stone-200 font-[Panchang-Regular]">
                                {col.render ? col.render(row) : row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}