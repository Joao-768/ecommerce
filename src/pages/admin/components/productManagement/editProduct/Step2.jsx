import { Button } from "../../../../../ui/Buttons";
import { FormInput } from "../../../../../ui/Form";

export default function Step2({ form, handleChange, setStep }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput type="text" name="movement" value={form.movement ?? ""} onChange={handleChange} placeholder="Movement" className="col-span-2" />
            <FormInput type="text" name="case_material" value={form.case_material ?? ""} onChange={handleChange} placeholder="Case Material" className="col-span-2" />
            <FormInput type="text" name="crystal" value={form.crystal ?? ""} onChange={handleChange} placeholder="Crystal" />
            <FormInput type="text" name="water_resistance" value={form.water_resistance ?? ""} onChange={handleChange} placeholder="Water Resistance" />
            <FormInput type="text" name="strap" value={form.strap ?? ""} onChange={handleChange} placeholder="Strap" />
            <FormInput type="text" name="warranty" value={form.warranty ?? ""} onChange={handleChange} placeholder="Warranty" />

            <div className="col-span-2 flex justify-end gap-4 mt-4">
                <Button shape="pill" variant="secondary" type="button" onClick={() => setStep(1)}>Back</Button>
                <Button shape="pill" type="submit">Update</Button>
            </div>
        </div>
    );
}