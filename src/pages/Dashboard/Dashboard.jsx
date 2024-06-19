import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";
import { ToastContainer } from "react-toastify";
import "../../index.css"
const Dashboard = () => {
    return (
        <>
        <div className="flex flex-col md:flex-row">
            <div className=" ">
            <Sidebar></Sidebar>
            </div>
            <div className="flex-1 py-8">
                <Outlet></Outlet>
            </div>   
        </div>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
        </>
    );
};

export default Dashboard;