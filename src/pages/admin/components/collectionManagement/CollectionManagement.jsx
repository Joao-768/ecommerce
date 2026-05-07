import { useEffect, useState } from 'react';
import { getCollections, deleteCollection } from '../../../../api/collectionsApi';
import { getTotalProductByCollection } from '../../../../api/productsApi'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Table from '../../../../ui/Table';

export default function CollectionManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [allCollections, setAllCollections] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [totals, setTotals] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { key: "name", label: "Name" },
        { key: "total", label: "Number of Products" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex flex-col gap-1">
                    <button 
                        className="hover:underline text-left"
                        onClick={() => navigate(`${row.id}/products`)}
                    >
                        View
                    </button>
                    <button 
                        className="hover:underline text-left"
                        onClick={() => {
                            if (!row) return;
                            navigate(`${row.id}/edit`);
                        }}
                    >
                        Edit
                    </button>
                    <button 
                        className="hover:underline text-left"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    const data = searchResults.map((collection) => ({
        id: collection.id,
        name: collection.name,
        total: totals.find(t => t.collection_id === collection.id)?.total ?? 0,
    }));

    const handleSearch = (value) => {
        setSearchQuery(value);

        const filtered = allCollections.filter((user) =>
            user.name
                .toLowerCase()
                .includes(value.toLowerCase())
            );

        setSearchResults(filtered);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are You Sure?")) return;

        try {
            await deleteCollection(id);

            // remover da lista
            setSearchResults(prev => prev.filter(collection => collection.id !== id));
            setAllCollections(prev => prev.filter(collection => collection.id !== id));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Get Collections
        getCollections()
            .then((data) => {
                setAllCollections(data);
                setSearchResults(data);
            })
            .catch(() => {
                setAllCollections([]);
                setSearchResults([]);
            });

        getTotalProductByCollection()
            .then((data) => setTotals(data ?? []))
            .catch(() => setTotals([]));
    }, [])

    return (
        <div className="flex-1 pl-10 pr-10 pt-10">
            <h1 className="text-3xl font-[Panchang-Semibold]">Collection Management</h1>

            {/* Search */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search for a collection"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md"
                    />
                    <button
                        className="border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md hover:bg-black hover:text-white duration-200"
                        onClick={() => navigate("add")}
                    >
                        Add New Collection
                    </button>
                </div>

                <Table 
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}