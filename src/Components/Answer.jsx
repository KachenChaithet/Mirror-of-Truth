import { Save } from "lucide-react"
import { useQuestionContext } from "../utils/TodayQuestion"
import axios from "axios"
import { useAuth } from "@clerk/clerk-react"
import { useState } from "react"
import toast from "react-hot-toast"

const Answer = () => {
    const { todayQuestion } = useQuestionContext()
    const { getToken } = useAuth()
    const [content, setContent] = useState('')
    const Questiontoday = todayQuestion?.question || ""

    const handleSubmit = async () => {
        if (!todayQuestion) {
            toast.error("คำถามยังไม่พร้อม")
            return
        }
        const token = await getToken()
        try {
            const res = await axios.post('http://localhost:5000/api/perspectives', { title: Questiontoday, content: content }, {
                headers: {
                    'clerk': token
                }
            })

            if (res.status === 201) {
                toast.success('สร้างสำเสร็จ')
                setContent("")
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to save reflection.")
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center mt-10 ">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl text-[#e6d5f7] font-medium">Your Truth Journal</h1>
                <p className="text-[#b1a4c1] ">Write your honest thoughts and reflections</p>`
            </div>
            <div className="w-[90%] md:w-[60%] relative">
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className="w-full bg-white/10 h-[200px] border border-[#804cb2] outline-0 rounded-md focus:border-[#dabdf5] focus:outline-white/20 focus:outline-4 text-white p-4 resize-none"
                    placeholder="เขียน Reflection ของคุณที่นี่..."
                />
                <button
                    className="absolute bottom-2 right-2 flex items-center gap-1 text-white/60 bg-black/20   border border-[#804cb2] px-3 py-1 rounded-md hover:bg-[#804cb2]/20 transition"
                    onClick={handleSubmit}
                >
                    <Save className="w-4 h-4" />
                    Save Reflection

                </button>
            </div>

            <footer className="mt-20">
                <h1 className="text-white/40">Take time to reflect. Truth emerges in stillness.</h1>
            </footer>
        </div>
    )
}
export default Answer