import { APIKeys, useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { BookOpen, Search } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { axiosInstance } from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPath"

const ShowAnswer = () => {
  const [reflections, setReflections] = useState([])
  const [searchterm, setSearchTerm] = useState('')

  const { getToken } = useAuth()

  const filteredReflections = reflections.filter(item =>
    item.title.toLowerCase().includes(searchterm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchterm.toLowerCase()) ||
    moment(item.createdAt).format('D MMMM YYYY').toLowerCase().includes(searchterm.toLowerCase())
  );

  const fetchReflections = async () => {
    const token = await getToken()
    try {
      const res = await axiosInstance.get(API_PATHS.FUCNTION.GETALL, {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-10 w-full flex flex-col justify-center items-center gap-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col justify-center items-center gap-6"
      >
        <div className="bg-white/20 p-6 rounded-full">
          <BookOpen className="text-white size-10" />
        </div>
        <div className="text-[#eddcff] flex flex-col text-center items-center justify-center gap-4">
          <h1 className="text-4xl md:text-5xl ">All Perspectives</h1>
          <p className="text-[#baaec7] w-auto text-center">Browse through all reflection questions and their perspectives. Use the search to find specific topics.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="w-[80%] h-[60px] rounded-md bg-white/10 flex justify-center items-center px-4 gap-2 border border-white/40 focus-within:outline-4 focus-within:outline-white/30"
      >
        <Search className="text-white/40" />
        <input
          type="text"
          value={searchterm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-white outline-0 bg-transparent"
          placeholder="Search questions or perspectives "
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="w-[80%]"
      >
        <p className="flex justify-start w-full text-gray-400">{filteredReflections.length} reflections found</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.25 }}
        className="w-[80%] h-[400px] overflow-y-auto flex flex-col gap-4 justify-start
 
  [scrollbar-width:thin]
  [scrollbar-color:#311b56_transparent]
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-[#311b56]
  [&::-webkit-scrollbar-thumb]:rounded-md
  [&::-webkit-scrollbar-thumb:hover]:bg-[#1c0f32]"
      >
        {filteredReflections.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.3 + (index * 0.05) }}
            className="bg-white/10 flex rounded-md p-4 gap-4 w-full"
          >
            <div className="text-white bg-[#64349d] w-[32px] h-[32px] border border-white/40 rounded-full flex justify-center items-center">
              {index + 1}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-white font-semibold text-[20px] ">{item.title}</h1>
              <div className="w-full flex items-center ">
                <div className="flex-grow h-px bg-white/20"></div>
                <span className="px-4 text-white/20 text-sm">Perspective</span>
                <div className="flex-grow h-px bg-white/20"></div>
              </div>
              <p className="text-white/60">{item.content}</p>
              <div className="flex justify-end items-center text-sm">
                <p className="text-white/60">{moment(item.createdAt).format('D MMMM YYYY')}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ShowAnswer