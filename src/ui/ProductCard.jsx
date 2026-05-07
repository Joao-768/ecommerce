export default function ProductCard({ item, onClick, isSelling }) {

    function currency(price) {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    return (
        <div 
            className="w-60 h-96 bg-white rounded-lg shadow-sm border border-stone-100
            transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
            flex flex-col justify-between hover:cursor-pointer"
        >
            <button
                onClick={onClick}
                className="w-60 h-96 mb-4 flex items-center justify-center overflow-hidden hover:cursor-pointer"
            >
                <img
                    className="w-full h-full object-cover p-5 hover:cursor-pointer"
                    src={item.image}
                    alt={item.name}
                />
            </button>

            <h2 className="text-lg font-[Panchang-Semibold] text-center pl-2 pr-2 hover:cursor-pointer">
                {item.name}
            </h2>

            {isSelling && item.status === 1 ? 
                <h3 className="text-md font-[Panchang-Regular] pb-2 text-center hover:cursor-pointer">
                    {currency(item.price)}
                </h3>
            : 
                <h3 className="text-md font-[Panchang-Regular] pb-2 text-center hover:cursor-pointer">
                    Unavailable
                </h3>
            }
        </div>
    );
}