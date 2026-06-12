import { Button, SizeButton } from "../../../../../ui/Buttons";
import { FormInput } from "../../../../../ui/Form";

export default function Step2({ form, setForm, handleChange, setStep }) {
    const sizeOptions = [36, 40, 44, 48];

    function toggleSize(size) {
        const current = form.sizes || [];
        if (current.includes(size)) {
            setForm({ ...form, sizes: current.filter(s => s !== size) });
        } else {
            setForm({ ...form, sizes: [...current, size] });
        }
    }

    return (
        <div className="grid grid-cols-2 gap-6">
            <FormInput type="text" name="movement" value={form.movement} onChange={handleChange} placeholder="Movement" className="col-span-2" />
            <FormInput type="text" name="case_material" value={form.case_material} onChange={handleChange} placeholder="Case Material" className="col-span-2" />
            <FormInput type="text" name="crystal" value={form.crystal} onChange={handleChange} placeholder="Crystal" />
            <FormInput type="text" name="water_resistance" value={form.water_resistance} onChange={handleChange} placeholder="Water Resistance" />
            <FormInput type="text" name="strap" value={form.strap} onChange={handleChange} placeholder="Strap" />
            <FormInput type="text" name="warranty" value={form.warranty} onChange={handleChange} placeholder="Warranty" />

            <div className="col-span-2 flex gap-2">
                {sizeOptions.map(size => (
                    <SizeButton key={size} selected={form.sizes?.includes(size)} onClick={() => toggleSize(size)} className="flex-1 text-center">
                        {size}mm
                    </SizeButton>
                ))}
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                <Button shape="pill" variant="secondary" type="button" onClick={() => setStep(1)}>Back</Button>
                <Button shape="pill" type="submit">Create Product</Button>
            </div>
        </div>
    );
}