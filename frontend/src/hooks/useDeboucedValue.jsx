import { useEffect, useState } from "react";

export function useDebouncedValue(value, delay) {
    const [debouncedValue, setDebouncedValue ] = useState("")

    useEffect(() => {
        let timeount = setTimeout(() => {
            console.log('before dEbounced: ', value)
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(timeount)
        }
    }, [value])

    return debouncedValue
}