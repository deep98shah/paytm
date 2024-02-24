import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import { filteredUsersSelector, userFilterAtom } from "../store/atoms/Users";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDebouncedValue } from "../hooks/useDeboucedValue";


export const Users = () => {
    return (
        <RecoilRoot>
            <UsersList></UsersList>
        </RecoilRoot>
    )
}

function UsersList() {
    // Replace with backend call
    // const filteredUsers = useRecoilValue(filteredUsersSelector);
    // const setFilter = useSetRecoilState(userFilterAtom);

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    const debouncedValue = useDebouncedValue(filter, 500)

    useEffect(() => {
        console.log("Running bulk user", debouncedValue)
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedValue)
            .then(response => {
                setUsers(response.data.users)
            })
    }, [debouncedValue])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {/* {filteredUsers.map(user => <User user={user} />)} */}
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}