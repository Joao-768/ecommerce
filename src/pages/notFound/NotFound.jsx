import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-6xl font-[Panchang-Semibold]">404</h1>
            <h2 className="text-2xl font-[Panchang-Semibold]">Oops... page not found</h2>
            <button
                onClick={() => navigate("/")}
                className="bg-black text-white px-4 py-2 rounded-full border border-white hover:bg-white hover:border-black hover:text-black transition-all duration-300 font-[Panchang-Regular]"
            >
                Return to Home
            </button>
        </div>
    );
}
