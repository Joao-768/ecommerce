import { Button, SizeButton } from "../../../../../ui/Buttons";
import { FormInput } from "../../../../../ui/Form";

export default function Step2({ form, setForm, handleChange, setStep, t }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput type="text" name="movement" value={form.movement} onChange={handleChange} placeholder={t("movement")} className="col-span-2" />
            <FormInput type="text" name="case_material" value={form.case_material} onChange={handleChange} placeholder={t("caseMaterial")} className="col-span-2" />
            <FormInput type="text" name="crystal" value={form.crystal} onChange={handleChange} placeholder={t("crystal")} />
            <FormInput type="text" name="water_resistance" value={form.water_resistance} onChange={handleChange} placeholder={t("waterResistance")} />
            <FormInput type="text" name="strap" value={form.strap} onChange={handleChange} placeholder={t("strap")} />
            <FormInput type="text" name="warranty" value={form.warranty} onChange={handleChange} placeholder={t("warranty")} />

            <div className="col-span-2 flex gap-2">
                {sizeOptions.map(size => (
                    <SizeButton key={size} selected={form.sizes?.includes(size)} onClick={() => toggleSize(size)} className="flex-1 text-center">
                        {size}mm
                    </SizeButton>
                ))}
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                <Button shape="pill" variant="secondary" type="button" onClick={() => setStep(1)}>{t("back")}</Button>
                <Button shape="pill" type="submit">{t("createProduct")}</Button>
            </div>
        </div>
    );
}