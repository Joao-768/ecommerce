export default function StepIndicator({ steps, current }) {
    return (
        <div className="flex gap-2 mb-6">
            {Array.from({ length: steps }, (_, i) => (
                <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${current > i ? "bg-black" : "bg-gray-200"}`}
                />
            ))}
        </div>
    );
}