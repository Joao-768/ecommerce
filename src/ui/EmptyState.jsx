export default function EmptyState({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-stone-400 font-[Panchang-Regular]">
            <p>{message}</p>
        </div>
    );
}