const shapes = {
    cta: "px-6 h-12 border-2 border-black rounded-md text-sm",
    pill: "px-5 py-2 border rounded-full text-sm",
    full: "w-full py-3 border-2 border-black rounded-xl",
}

const variants = {
    primary:   "bg-black text-white hover:bg-white hover:text-black",
    secondary: "bg-white text-black hover:bg-black hover:text-white",
}

export function Button({ shape = "cta", variant = "primary", className = "", type = "button", ...props }) {
    return (
        <button
            type={type}
            className={`
                font-[Panchang-Regular] cursor-pointer 
                transition-all duration-200 active:scale-95
                ${shapes[shape]} ${variants[variant]} ${className}
            `}
            {...props}
        />
    );
}

export function TabButton({ active, children, ...props }) {
    return (
        <button
            className={`
                bg-transparent border-0 font-[Panchang-Regular] cursor-pointer pb-2 
                transition-all duration-200 active:scale-95
                ${active ? "border-b border-black" : "text-stone-400"}
            `}
            {...props}
            >
            {children}
        </button>
    );
}

export function GhostButton({ className = "", ...props }) {
    return (
        <button
            className={`
                bg-transparent border-none font-[Panchang-Regular] 
                cursor-pointer hover:underline 
                transition-all duration-200 active:scale-95 ${className}
            `}
            {...props}
        />
    );
}

export function IconButton({ className = "", ...props }) {
    return (
        <button
            className={`
                h-10 w-10 border border-stone-300 hover:border-black 
                rounded-xs cursor-pointer transition-all duration-300 
                flex items-center justify-center active:scale-95 ${className}
            `}
            {...props}
        />
    );
}

export function SizeButton({ selected = false, className = "", ...props }) {
    return (
        <button
            type="button"
            className={`
                py-2 border font-[Panchang-Regular] text-sm 
                cursor-pointer transition-all duration-200 active:scale-95
                ${selected
                    ? "bg-black text-white border-black"
                    : "border-stone-300 hover:border-black hover:bg-black hover:text-white"
                } ${className}`
            }
            {...props}
        />
    );
}

export function NavButton({ className = "", header = false, ...props }) {
    return (
        <button
            className={`
                bg-none border-none text-black cursor-pointer 
                flex m-0 p-0 pointer-events-auto outline-none 
                active:scale-95 font-[Panchang-Regular] 
                ${header ? "header-button z-10 text" : ""} ${className}`
            }
            {...props}
        />
    );
}

export function AddCardButton({ className = "", ...props }) {
    return (
        <button
            type="button"
            className={`
                group w-60 h-96 border-2 border-dashed border-stone-300 
                rounded-lg flex flex-col items-center justify-center 
                hover:border-black transition-all duration-300 
                active:scale-95 ${className}`
            }
            {...props}
        />
    );
}