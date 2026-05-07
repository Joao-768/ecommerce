import { useEffect, useState } from "react";
import { getNewUsers, getTotalUsers, getUsersByMonth } from "../../../../api/adminApi";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function Users() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [newWeekUsers, setNewUsers] = useState(0);
    const actualMonth = getMonth();
    const [monthUsers, setMonthUsers] = useState([
        { name: "Jan", users: 0 },
        { name: "Feb", users: 0 },
        { name: "Mar", users: 0 },
        { name: "Apr", users: 0 },
        { name: "May", users: 0 },
        { name: "Jun", users: 0 },
        { name: "Jul", users: 0 },
        { name: "Aug", users: 0 },
        { name: "Sep", users: 0 },
        { name: "Oct", users: 0 },
        { name: "Nov", users: 0 },
        { name: "Dec", users: 0 },
    ]);

    function getMonth()  {
        const date = new Date();
        return date.getMonth();
    }


    useEffect(() => {
        // Get Total Users
        getTotalUsers()
            .then((data) => setTotalUsers(data?.totalUsers ?? 0))
            .catch(() => setTotalUsers(0));

        // Get New Users
        getNewUsers()
            .then((data) => setNewUsers(data?.newUsers ?? 0))
            .catch(() => setNewUsers(0));

        // Get Users By Month
        getUsersByMonth()
            .then((data) => setMonthUsers(data))
            .catch(() => setMonthUsers([]));
            
    }, [])

    return (
        <div className="pt-5">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <h1 className="text-xl font-[Panchang-Semibold] pb-2">Users</h1>
                <p className="text-md font-[Panchang-Regular] pb-2">Total Users: {totalUsers}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">New Users This Week: {newWeekUsers}</p>
                
                {/* Grafico de Linhas */}
                <div className="w-full h-100 font-[Panchang-Regular]">
                    <h2 className="text-md font-[Panchang-Regular] mb-4 pb-2">
                        User Growth
                    </h2>

                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={monthUsers.slice(0, actualMonth + 1)}>
                            <CartesianGrid strokeDasharray="4 4" />

                            <XAxis dataKey="name"/>
                            <YAxis />

                            <Tooltip 
                                trigger="click" 
                            
                                style={{
                                    position: "absolute",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="black"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}