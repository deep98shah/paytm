import { RecoilRoot, useRecoilState } from "recoil"
import { Input } from "../components/Input"
import { Heading, SubHeading } from "../components/Heading"
import { Button } from "../components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { userSignInDetailsAtom } from "../store/atoms/UserSignInDetails"

export default function SignIn() {
    return (
        <RecoilRoot>
            <SignInContainer></SignInContainer>
        </RecoilRoot>
    )
}

function SignInContainer() {
    const [ userDetails, setUserDetails ] = useRecoilState(userSignInDetailsAtom)
    const navigate = useNavigate()

    // console.log(userDetails)
    return (<div className="bg-gray-400 flex justify-center min-h-screen">
            <div className="flex flex-col justify-center min-h-screen">
                <div className="bg-white border rounded-lg max-w-xs y-8 px-6 py-4">
                    <Heading label={"Sign In"}></Heading>
                    <SubHeading label={"Enter your information to sign in"}></SubHeading>
                    <Input onChange={(e) => {
                        // console.log(userDetails)
                        setUserDetails({
                            username: e.target.value,
                            password: userDetails.password
                        })
                    }} title={"Email"} placeholder={"deepshah@example.com"} type={"text"}></Input>
                    <Input onChange={(e) => {
                        // console.log(userDetails)
                        setUserDetails({
                            username: userDetails.username,
                            password: e.target.value
                        })
                    }} title={"Password"} type={"password"}></Input>
                    <Button onClick={async () => {
                        try {
                            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username: userDetails.username,
                                password: userDetails.password
                            })
                            if (res.status == 200) {
                                console.log('Sign in', res.status, res.data.message)
                                const token = res.data.token
                                print('Setting token', token)
                                if (token) {
                                    localStorage.setItem("token", token)
                                    // console.log("Token set")
                                    navigate("/dashboard")
                                }
                            }
                        } catch (error) {
                            console.log('Sign in', error.response.status, error.response.data.message)
                        }
                    }} label={"Sign in"}></Button>
                </div>
            </div>
    </div>)
}