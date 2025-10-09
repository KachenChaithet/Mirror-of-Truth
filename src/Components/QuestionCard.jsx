import { useEffect, useState } from "react"
import { QuestioniMirror } from "../Data/MirrorQuestion"
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"

const QuestionCard = () => {
    const [todayQuestion, setTodayQuestion] = useState({ question: "" })

    // ฟังก์ชันเลือกคำถามตามวัน
    const getQuestionOfToday = () => {
        const today = new Date().toISOString().split("T")[0] // "2025-10-08"
        let seed = 0
        for (let i = 0; i < today.length; i++) {
            seed += today.charCodeAt(i)
        }
        const index = seed % QuestioniMirror.length
        setTodayQuestion(QuestioniMirror[index])
    }

    // เรียกตอน mount component
    useEffect(() => {
        getQuestionOfToday()
    }, [])

    return (
        <div className="w-full flex flex-col  items-center justify-center gap-4 mt-10 ">
            <h1 className="text-2xl text-[#e6d5f7] font-semibold">Today's Reflection</h1>
            <div className="w-[90%] md:w-[70%] bg-white/10 rounded-md py-8 border border-[#804cb2] text-[#e6d5f7] text-[20px] flex justify-center items-center text-center">
                {todayQuestion.question}
            </div>
         
        </div>
    )
}

export default QuestionCard
