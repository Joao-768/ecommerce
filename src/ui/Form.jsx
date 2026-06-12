import { BsFileImageFill } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";

const inputVariants = {
    rounded:
        `border border-stone-300 px-4 py-3 rounded-full 
        outline-none focus:border-black transition-all`,
    line: 
        `border-b border-stone-300 py-2 
        outline-none focus:border-black transition-all`,
}

export function FormInput({ variant = "rounded", className = "", ...props }) {
    return (
        <input
            className={`font-[Panchang-Regular] w-full ${inputVariants[variant]} ${className}`}
            {...props}
        />
    );
}

export function FormSelect({ options, className = "", ...props }) {
    return (
        <div className="relative w-full">
            <select
                className={`
                    w-full border border-stone-300 px-4 py-3 
                    rounded-full outline-none focus:border-black 
                    transition-all appearance-none bg-white 
                    font-[Panchang-Regular] ${className}
                `}
                {...props}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            <div className="
                pointer-events-none absolute 
                right-4 top-1/2 -translate-y-1/2
            ">
                <TbTriangleInvertedFilled />
            </div>
        </div>
    );
}

export function FormFileInput({ value, onChange, name }) {
    return (
        <div className="
            relative w-full col-span-2 
            font-[Panchang-Regular]"
        >
            <label className="
                border border-stone-300 px-4 py-3 
                rounded-full cursor-pointer block 
                outline-none focus:border-black transition-all
            ">
                {value ? value.name : "Select Image"}
                <input
                    type="file"
                    name={name}
                    onChange={onChange}
                    className="hidden"
                />
                <div className="
                    pointer-events-none absolute 
                    right-4 top-1/2 -translate-y-1/2
                ">
                    <BsFileImageFill />
                </div>
            </label>
        </div>
    );
}