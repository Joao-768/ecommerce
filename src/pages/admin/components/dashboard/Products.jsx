import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import { getBestSellers, getTotalProducts, getOutOfStock } from "../../../../api/productsApi";

export default function Products() {
    const [totalProducts, setTotalProducts] = useState();
    const [outOfStock, setOutOfStock] = useState();
    const [bestSelling, setBestSelling] = useState([
        { name: "Produto A", sales: 120 },
        { name: "Produto B", sales: 80 },
        { name: "Produto C", sales: 30 },
        { name: "Produto D", sales: 25 },
        { name: "Produto E", sales: 20 },
    ]);

    useEffect(() => {
        // Get Total Products
        getTotalProducts()
            .then((data) => setTotalProducts(data?.totalProducts))
            .catch(() => setTotalProducts(0));

        // Get Out Of Stock Products
        getOutOfStock()
            .then((data) => setOutOfStock(data?.outOfStock))
            .catch(() => setOutOfStock(0));

        // Get Best Sellers
        getBestSellers(5)
            .then((data) => setBestSelling(data?.products))
            .catch(() =>
                setBestSelling([
                    { name: "Produto A", sales: 120 },
                    { name: "Produto B", sales: 80 },
                    { name: "Produto C", sales: 30 },
                    { name: "Produto D", sales: 25 },
                    { name: "Produto E", sales: 20 },
                ])
            );
    }, []);

    return (
        <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
            <h1 className="text-xl font-[Panchang-Semibold] pb-2">Products</h1>
            <p className="text-md font-[Panchang-Regular] pb-2">Total Products: {totalProducts}</p>
            <p className="text-md font-[Panchang-Regular] pb-2">Products Out of Stock: {outOfStock}</p>
            <div className="w-full h-180 font-[Panchang-Regular]">
                <h2 className="text-lg font-semibold mb-4 font-[Panchang-Semibold]">
                    Best-selling Products
                </h2>

                <ResponsiveContainer width="100%" height="90%">
                    <BarChart 
                        data={bestSelling}
                        margin={{ bottom: 150 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={40}
                        />
                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="sales" fill="black" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}