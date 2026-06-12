import Users from "./Users"
import Products from "./Products"
import Orders from "./Orders"
import Categories from "./Categories"
import Collections from "./Collections"
import Logs from "./Logs"
import Alerts from "./Alerts/Alerts"
import { Outlet } from "react-router-dom"


export default function Dashboard() {
    const sections = [
        {key: "users", component: <Users/>},
        {key: "products", component: <Products/>},
        {key: "orders", component: <Orders/>},
        {key: "categories", component: <Categories/>},
        {key: "collections", component: <Collections/>},
        {key: "logs", component: <Logs/>},
        {key: "alerts", component: <Alerts/>}
    ]

    return (
        <div className="flex-1 pl-10 flex flex-col gap-5 pr-10">
            <h1 className="text-3xl font-[Panchang-Semibold]">Dashboard</h1>
            
            {sections.map((s) => (
                <div key={s.key}>
                    {s.component}
                </div>
            ))}
            
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>

    )

}
