import { useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

const NotFound = () => {
    const { isSignedIn, isLoaded } = useUser()

    // ถ้ายังโหลดข้อมูล user
    if (!isLoaded) return <p className="text-white">Loading...</p>

    return (
        <div className="h-screen w-full flex flex-col gap-4 justify-center items-center bg-gradient-to-tl from-[#301c54] via-[#59168b] to-[#10172d]">
            <h1 className="text-8xl text-white">404</h1>
            <p className="text-white text-xl">Page Not Found</p>

            <Link to={"/login"}>
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition">
                    {isSignedIn ? "Go to HomePage" : "Go to Login"}
                </button>
            </Link>
        </div>
    )
}

export default NotFound
