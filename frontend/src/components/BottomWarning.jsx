import { Link } from "react-router-dom";

export function BottomWarning({label, buttonText, to}) {
    return (
        <div className="flex justify-center text-sm font-medium py-1">
            <div>{label}</div>
            <Link className="underline px-1" to={to}>{buttonText}</Link>
        </div>
    )
}