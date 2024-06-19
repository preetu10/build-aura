import { Outlet } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Footer from "./pages/shared/Footer";
import "./index.css";
import { ToastContainer } from "react-toastify";


const Root = () => {
    return (
        <>
        <div className="max-w-7xl mx-auto min-h-screen font-kumbh">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
        </>
    );
};

export default Root;