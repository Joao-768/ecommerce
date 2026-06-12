export default function AdminFormWrapper({ title, children }) {
    return (
        <div className="flex justify-center items-start h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}