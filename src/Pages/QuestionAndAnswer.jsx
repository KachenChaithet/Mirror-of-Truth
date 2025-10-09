import { UserButton } from "@clerk/clerk-react"
import Answer from "../Components/Answer"
import Header from "../Components/Header"
import QuestionCard from "../Components/QuestionCard"
import Navbar from "../Components/Navbar"

const QuestionAndAnswer = () => {
    return (
        <>
            <div className=" w-full min-h-screen bg-gradient-to-tl to-[#10172d] via-[#59168b] relative from-[#301c54] py-8 px-4">
                {/* UserButton มุมบนขวา */}
                <div className="absolute top-4 right-4">
                    <UserButton className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 shadow-lg transition" />
                </div>

                <Header />
                <QuestionCard />
                <Answer />
            </div>


        </>
    )
}
export default QuestionAndAnswer