import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";

const Dashboard = () => {
    return (
        <div className="flex ">
            <div className="">
            <Sidebar></Sidebar>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;