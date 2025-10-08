import { BookOpen, House } from "lucide-react"

const menu = [
    { title: 'Home', icon: <House />, paht: '/' },
    { title: 'All Perspectives', icon: <BookOpen />, paht: '/show' },

]

const Navbar = () => {
    return (
        <div className="w-full h-[60px] flex px-40 justify-between items-center text-white  bg-[#11172e]">
            <h1 className="font-semibold">Mirror of Truth</h1>
            <ul className="flex gap-8">
                <li></li>
                <li>sdl;ks;d</li>
            </ul>
        </div>
    )
}
export default Navbar