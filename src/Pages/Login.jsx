import { SignIn } from "@clerk/clerk-react"

const Login = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <SignIn path="/login" signUpUrl="/register" />
        </div>


    )
}
export default Login