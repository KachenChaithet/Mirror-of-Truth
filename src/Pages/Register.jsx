import { SignUp } from "@clerk/clerk-react"

const Register = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <SignUp path="/register" signInUrl="/login"/>
        </div>
    )
}
export default Register