import { useState, useEffect } from "react"
import { getPreferences, setUserPreference, getUserPreferences, removeUserPreference } from "../../../api/preferencesApi";

import { BiSolidWatchAlt } from "react-icons/bi";
import { IoMdWatch } from "react-icons/io";
import { IoWatch } from "react-icons/io5";
import { FiWatch } from "react-icons/fi";
import { VscWatch } from "react-icons/vsc";
import { CgAppleWatch } from "react-icons/cg";

export default function UserPreferences() {
    const account = localStorage.getItem("account");
    const [preferences, setPreferences] = useState([]);
    const [userPreferences, setUserPreferences] = useState([]);
    const icons = [BiSolidWatchAlt, IoMdWatch, IoWatch, FiWatch, VscWatch, CgAppleWatch];

    useEffect(() => {
        getPreferences()
            .then((data) => setPreferences(data))
            .catch(() => setPreferences([]));
    }, []);

    useEffect(() => {
        if (!account) return;

        getUserPreferences(account)
            .then((data) => setUserPreferences(data))
            .catch(() => setUserPreferences([]));
    }, [account]);

    const handlePreference = (id) => {
        const alreadySelected = userPreferences
            .map(up => up.preference_id)
            .includes(id);

        if (alreadySelected) {
            removeUserPreference(account, id)
                .then(() => {
                    setUserPreferences(prev =>
                        prev.filter(up => up.preference_id !== id)
                    );
                })
                .catch(err => console.error(err));
        } else {
            setUserPreference(account, id)
                .then(() => {
                    setUserPreferences(prev => [
                        ...prev,
                        { preference_id: id }
                    ]);
                })
                .catch(err => console.error(err));
        }
    };

    return(
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col gap-4">
            <h1 className="text-3xl font-[Panchang-Semibold]">
                User Preferences
            </h1>
            <p className="text-xs font-[Panchang-Regular]">
                Selet your preferences
            </p>
            <div className="flex gap-4 flex-wrap">
                {preferences.map((p, index) => {
                    const Icon = icons[index];

                    return (
                        <div
                            key={p.id}
                            className="relative w-28 h-28 border rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition"
                        >
                            {/* Check Button */}
                            <button
                                className="absolute top-2 right-2 w-6 h-6 bg-black text-white text-xs rounded-md flex items-center justify-center hover:bg-white hover:text-black border border-black transition"
                                onClick={() => handlePreference(p.id)}
                            >
                                {userPreferences.map(up => up.preference_id).includes(p.id) ? "✓" : "+"}
                            </button>

                            {/* Image and Name */}
                            <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl" />
                            <span className="absolute bottom-3 w-full text-center text-sm font-[Panchang-Regular]">
                                {p.name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}