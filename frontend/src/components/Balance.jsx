import axios from "axios"
import { useEffect, useState } from "react"
import { resolvePath } from "react-router-dom"

export const Balance = () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            axios.get('http://localhost:3000/api/v1/account/balance/', {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                const balance = response.data.balance
                setBalance(balance)
            })
        }
    }, [])

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}