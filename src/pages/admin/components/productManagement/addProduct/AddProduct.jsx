import { useEffect, useState } from "react";
import { createProduct, setCode, setProductSize } from "../../../../../api/productsApi";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../../../api/categoriesApi";
import { getCollections } from "../../../../../api/collectionsApi";
import { getGenders } from "../../../../../api/gendersApi";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { BsFileImageFill } from "react-icons/bs";
import { generateCode } from "../../../../../utils/format";
import { uploadImage } from "../../../../../api/productsApi";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [genders, setGenders] = useState([]);
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        max_stock: "",
        collection_id: 1,
        category_id: 1,
        gender_id: 1,
        image: null,
        movement: "",
        case_material: "",
        crystal: "",
        water_resistance: "",
        strap: "",
        warranty: "",
        sizes: [],
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const selectedCollection = collections.find(c => c.id === form.collection_id);
            const selectedCategory = categories.find(c => c.id === form.category_id);

            const { path: imagePath } = await uploadImage(form.image, selectedCollection.name, form.name);

            const newProduct = await createProduct({ ...form, image: imagePath });

            const code = await generateCode(selectedCollection.code, selectedCategory.code, newProduct.id);
            await setCode(newProduct.id, code);

            for (const size of form.sizes) {
                await setProductSize(newProduct.id, size);
            }

            alert("Product Created");
            navigate("/admin/product-management");
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        // Get Categories
        getCategories()
            .then((data) => setCategories(data ?? []))
            .catch(() => setCategories([]));

        // Get Collections
        getCollections()
            .then((data) => setCollections(data ?? []))
            .catch(() => setCollections([]));

        // Get Genders
        getGenders()
            .then((data) => setGenders(data ?? []))
            .catch(() => setGenders([]));

    }, []);

    return (
        <div className="flex justify-center items-start h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Create New Product
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        {[1, 2].map((s) => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-[Panchang-Semibold] border transition-all
                                    ${step === s
                                        ? "bg-black text-white border-black"
                                        : step > s
                                        ? " text-stone-400 border-stone-300"
                                        : "bg-white text-stone-400 border-stone-300"
                                    }`}>
                                    {s}
                                </div>
                                {s < 2 && (
                                    <div className={`w-16 h-px transition-all bg-stone-300`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <Step1
                            form={form}
                            setForm={setForm}
                            handleChange={handleChange}
                            categories={categories}
                            collections={collections}
                            genders={genders}
                            navigate={navigate}
                            setStep={setStep}
                        />
                    )}

                    {step === 2 && (
                        <Step2
                            form={form}
                            setForm={setForm}
                            handleChange={handleChange}
                            setStep={setStep}
                        />
                    )}
                </form>
            </div>
        </div>
    );
}