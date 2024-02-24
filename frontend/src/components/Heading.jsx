export function Heading({label}) {
    return (
        <div className="flex justify-center pb-2">
            <div className="flex justify-center text-2xl font-bold py-1">{label}</div>
        </div>
    )
}

export function SubHeading({label}) {
    return (
        <div className="flex justify-center pb-2">
            <div className="text-gray-500 text-sm font-normal px-4 text-center py-1">{label}</div>
        </div>
    )
}