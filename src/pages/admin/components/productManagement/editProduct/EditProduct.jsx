import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct, uploadImage } from '../../../../../api/productsApi';
import { getCollections } from '../../../../../api/collectionsApi';
import { getCategories } from '../../../../../api/categoriesApi';
import { getGenders } from '../../../../../api/gendersApi';
import Step1 from "../editProduct/Step1";
import Step2 from "../editProduct/Step2";

export default function EditProduct() {
    const { id } = useParams();
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
        newImage: "",
        movement: "",
        case_material: "",
        crystal: "",
        water_resistance: "",
        strap: "",
        warranty: "",
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let updatedForm = { ...form };

            if (form.newImage) {
                const selectedCollection = collections.find(c => c.id === form.collection_id);
                const { path: imagePath } = await uploadImage(form.newImage, selectedCollection.name, form.name);
                updatedForm = { ...updatedForm, image: imagePath };
            }

            await updateProduct(updatedForm);
            alert("Product Edited");
            navigate("/admin/product-management");
        } catch (err) {
            alert(err.message);
        }
    }


    useEffect(() => {
        getProductById(id)
            .then((data) => setForm(data.product))
            .catch(() => setForm({}));
    }, [id]);

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data ?? []))
            .catch(() => setCategories([]));

        getCollections()
            .then((data) => setCollections(data ?? []))
            .catch(() => setCollections([]));

        getGenders()
            .then((data) => setGenders(data ?? []))
            .catch(() => setGenders([]));
    }, []);

    return (
        <div className="flex justify-center items-start h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                <h2 className="text-3xl font-[Panchang-Semibold] mb-2 text-center">Edit Product</h2>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-[Panchang-Semibold] border transition-all
                                ${step === s ? "bg-black text-white border-black"
                                : step > s ? "text-stone-400 border-stone-300"
                                : "bg-white text-stone-400 border-stone-300"}`}>
                                {s}
                            </div>
                            {s < 2 && <div className={`w-16 h-px transition-all bg-stone-300`} />}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <Step1
                            form={form}
                            handleChange={handleChange}
                            setForm={setForm}
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
                            handleChange={handleChange}
                            setStep={setStep}
                        />
                    )}
                </form>
            </div>
        </div>
    );
}