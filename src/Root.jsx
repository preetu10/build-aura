import { Outlet } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Footer from "./pages/shared/Footer";

const Root = () => {
    return (
        <>
        <div className="max-w-7xl mx-auto min-h-screen">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </>
    );
};

export default Root;