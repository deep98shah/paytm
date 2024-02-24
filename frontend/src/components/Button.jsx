import axios from "axios"

export function Button({onClick, label}) {
    return (
        <div className="py-2">
            <button className="rounded bg-black text-white min-w-full p-2.5 text-xs font-medium" onClick={onClick}>{label}</button>
        </div>
    )
}