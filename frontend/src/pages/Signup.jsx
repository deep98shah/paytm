import { RecoilRoot, useRecoilState } from "recoil"
import { Input } from "../components/Input"
import { BottomWarning } from "../components/BottomWarning"
import { Heading, SubHeading } from "../components/Heading"
import { Button } from "../components/Button"
import axios from "axios"
import { userDetailsAtom } from "../store/atoms/userDetails"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    return (
        <RecoilRoot>
            <SignUpContainer></SignUpContainer>
        </RecoilRoot>
    )
}

function SignUpContainer() {
    const [ userDetails, setUserDetails ] = useRecoilState(userDetailsAtom)
    const navigate = useNavigate()

    // console.log(userDetails)
    return (<div className="bg-gray-400 flex justify-center min-h-screen">
            <div className="bg-white flex flex-col justify-center border rounded-lg max-w-xs my-8 px-6 py-4">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={"Enter your information to create an account"}></SubHeading>
                <Input onChange={(e) => {
                    // console.log(userDetails)
                    setUserDetails({
                        username: userDetails.username,
                        firstName: e.target.value,
                        lastName: userDetails.lastName,
                        password: userDetails.password
                    })
                }} title={"First Name"} placeholder={"Deep"} type={"text"}></Input>
                <Input onChange={(e) => {
                    // console.log(userDetails)
                    setUserDetails({
                        username: userDetails.username,
                        firstName: userDetails.firstName,
                        lastName: e.target.value,
                        password: userDetails.password
                    })
                }} title={"Last Name"} placeholder={"Shah"} type={"text"}></Input>
                <Input onChange={(e) => {
                    // console.log(userDetails)
                    setUserDetails({
                        username: e.target.value,
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        password: userDetails.password
                    })
                }} title={"Email"} placeholder={"deepshah@example.com"} type={"text"}></Input>
                <Input onChange={(e) => {
                    // console.log(userDetails)
                    setUserDetails({
                        username: userDetails.username,
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        password: e.target.value
                    })
                }} title={"Password"} type={"password"}></Input>
                <Button onClick={async () => {
                    try {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username: userDetails.username,
                            firstName: userDetails.firstName,
                            lastName: userDetails.lastName,
                            password: userDetails.password
                        })
                        if (res.status == 200) {
                            console.log('Sign up', res.status, res.data.message)
                            const token = res.data.token
                            print('Setting token', token)
                            if (token) {
                                localStorage.setItem("token", `Bearer ${token}`)
                                // console.log("Token set")
                                navigate("/dashboard")
                            }
                        }
                    } catch (error) {
                        // console.log(error)
                        // console.log('Sign up', error.status, error.data.message)
                    }
                }} label={"Sign up"}></Button>
                <BottomWarning label="Already have an acount?" buttonText="Login" to="/signin"></BottomWarning>
            </div>
    </div>)
}