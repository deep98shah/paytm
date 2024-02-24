import axios from "axios"
import { useEffect, useState } from "react"

export const Appbar = () => {
    const [ user, setUser ] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        const finalToken = "Bearer " + token
        if (finalToken) {
            try {
                axios.get("http://localhost:3000/api/v1/user/getuser", { headers: { Authorization:  finalToken} }).then((response) => {
                    if (response.data.user.firstName) {
                        setUser(response.data.user.firstName)
                    }
                })
            } catch (error) {
                console.log("Couldn't fetch a user details")
            }   
        }
    }, [])
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello {user}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.length > 0 ? user[0] : "S"}
                </div>
            </div>
        </div>
    </div>
}