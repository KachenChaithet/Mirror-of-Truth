import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {
    return (
        <><div className="pt-[60px]">
            <Navbar />
            <Outlet />

        </div>
        </>
    )
}
export default Layout