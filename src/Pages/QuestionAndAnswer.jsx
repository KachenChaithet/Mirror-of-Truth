import { UserButton } from "@clerk/clerk-react"
import { motion } from "framer-motion"
import Answer from "../Components/Answer"
import Header from "../Components/Header"
import QuestionCard from "../Components/QuestionCard"

const QuestionAndAnswer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen bg-gradient-to-tl from-[#301c54] via-[#59168b] to-[#10172d] relative py-8 px-4"
    >
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute top-4 right-4"
      >
        <UserButton className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 shadow-lg transition-all duration-300" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Header />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <QuestionCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      >
        <Answer />
      </motion.div>
    </motion.div>
  )
}

export default QuestionAndAnswer
