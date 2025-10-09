import { BookOpen, House, Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

const menu = [
    { title: 'Home', icon: <House className="w-4 h-4" />, path: '/' },
    { title: 'All Perspectives', icon: <BookOpen className="w-4 h-4" />, path: '/show' },
]

const Navbar = () => {
    const location = useLocation()
    const [open, setOpen] = useState(false)

    return (
        <nav className="w-full h-[60px] fixed top-0 left-0 z-50 backdrop-blur-md shadow-md shadow-black/20 bg-black/30 text-white">
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-6 md:px-10">
                <h1 className="font-semibold text-lg">Mirror of Truth</h1>

                {/* ปุ่มเมนู (เฉพาะมือถือ) */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white focus:outline-none"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* เมนูปกติ (เฉพาะจอใหญ่) */}
                <ul className="hidden md:flex gap-4">
                    {menu.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link key={item.path} to={item.path}>
                                <button
                                    className={`flex text-[14px] justify-center items-center gap-2 px-3 py-1 rounded-md font-semibold transition-all duration-150
                                    ${isActive
                                        ? 'hover:text-black bg-white/10 rounded-md font-semibold'
                                        : 'font-semibold text-white/60 hover:bg-white/10 rounded-md'}
                                    `}
                                >
                                    {item.icon}
                                    {item.title}
                                </button>
                            </Link>
                        )
                    })}
                </ul>
            </div>

            {/* เมนูแบบ slide ลง (เฉพาะมือถือ) */}
            {open && (
                <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10">
                    <ul className="flex flex-col items-center py-4 gap-3">
                        {menu.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
                                    <button
                                        className={`flex text-[15px] justify-center items-center gap-2 px-4 py-2 rounded-md w-[180px] transition-all duration-150
                                        ${isActive
                                            ? 'bg-white text-black font-semibold'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'}
                                        `}
                                    >
                                        {item.icon}
                                        {item.title}
                                    </button>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar
