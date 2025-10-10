import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { AwardIcon, BookOpen, Search } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const ShowAnswer = () => {
  const [reflections, setReflections] = useState([])
  const { getToken } = useAuth()
  console.log(reflections);


  const fetchReflections = async () => {
    const token = await getToken()
    try {
      const res = await axios.get('http://localhost:5000/api/perspectives', {
        headers: {
          'clerk': token
        }
      })
      setReflections(res.data)

    } catch (error) {
      console.error(error)
      toast.error("Failed to save reflection.")
    }

  }


  useEffect(() => {
    fetchReflections()
  }, [])

  return (
    <div className="mt-10 w-full flex flex-col justify-center items-center gap-10">

      {/* header */}
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="bg-white/20 p-6 rounded-full">
          <BookOpen className="text-white size-10" />
        </div>
        <div className="text-[#eddcff] flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl">All Perspectives</h1>
          <p className="text-[#baaec7] w-[690px] text-center">Browse through all reflection questions and their perspectives. Use the search to find specific topics.</p>
        </div>
      </div>

      {/* search */}
      <div className="w-[80%] h-[60px] rounded-md bg-white/10 flex justify-center items-center px-4 gap-2 border border-white/40 focus-within:outline-4 focus-within:outline-white/30">
        <Search className="text-white/40" />
        <input type="text" className="w-full text-white outline-0" placeholder="Search questions or perspectives " />


      </div>
      {/* show reflections.length */}
      <div className="w-[80%]">
        <p className="flex justify-start w-full text-gray-400">{reflections.length} reflections found</p>
      </div>

      <div className="w-[80%] flex flex-col gap-4 justify-start">

        {reflections.map((item) => (
          <div className="bg-white/10 flex rounded-md p-4 gap-4 w-full">

            <div className="text-white bg-[#64349d] w-[40px] h-[40px] border border-white/40 rounded-full flex justify-center items-center">
              {item.id}
            </div>

            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-white font-semibold text-[20px] ">{item.title}</h1>

              <div className="w-full flex items-center ">
                <div className="flex-grow h-px bg-white/20"></div>
                <span className="px-4 text-white/20 text-sm">Perspective</span>
                <div className="flex-grow h-px bg-white/20"></div>
              </div>

              <p className="text-white/60">{item.content}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}
export default ShowAnswer