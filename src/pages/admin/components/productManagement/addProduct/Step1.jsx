import { BsFileImageFill } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { FormFileInput, FormInput, FormSelect } from "../../../../../ui/Form";
import { Button } from "../../../../../ui/Buttons";

export default function Step1({ form, setForm, handleChange, categories, collections, genders, navigate, setStep }) {
    return (
        <div className="grid grid-cols-2 gap-6">
            <FormInput type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="col-span-2" />
            <FormInput type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="col-span-2" />
            <FormInput type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" />

            <FormSelect name="category_id" value={form.category_id} onChange={(e) => setForm({ ...form, [e.target.name]: Number(e.target.value) })} options={categories.map(c => ({ value: c.id, label: c.name }))} />
            <FormSelect name="collection_id" value={form.collection_id} onChange={(e) => setForm({ ...form, [e.target.name]: Number(e.target.value) })} options={collections.map(c => ({ value: c.id, label: c.name }))} />
            <FormSelect name="gender_id" value={form.gender_id} onChange={(e) => setForm({ ...form, [e.target.name]: Number(e.target.value) })} options={genders.map(g => ({ value: g.id, label: g.name }))} />

            <FormInput type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
            <FormInput type="number" name="max_stock" value={form.max_stock} onChange={handleChange} placeholder="Max Stock" />

            <FormFileInput
                name="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/admin/product-management")}>Cancel</Button>
                <Button shape="pill" type="submit" onClick={() => setStep(2)}>Continue</Button>
            </div>
        </div>
    );
}