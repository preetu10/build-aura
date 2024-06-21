import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { FaBuilding, FaUsers } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const AdminSpecial = () => {
    const axiosSecure=useAxiosSecure();
    const {data:adminSpecial={}}=useQuery({
        queryKey:"adminSpecial",
        queryFn:async()=>{
            const {data}=await axiosSecure.get("/admin");
            return data;
        }
    })
    //console.log(adminSpecial);
    
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 my-16 px-6 lg:px-20">
      <div className="stats bg-red-300 shadow-md shadow-red-400 border-2 border-red-600 hover:shadow-xl">
        <div className="stat text-center">
          <div className="stat-title flex flex-row items-center justify-center gap-2 ">
            <FaUsers className="text-xl"></FaUsers>
           <span className="text-xl text-black font-bold"> Total User</span></div>
          <div className="stat-value mt-2">{adminSpecial.totalUser} persons</div>
        </div>
      </div>
      <div className="stats bg-blue-300 shadow-md shadow-blue-400 border-2 border-blue-600 hover:shadow-xl">
        <div className="stat text-center">
          <div className="stat-title flex flex-row items-center justify-center gap-2 ">
            <FaUser className="text-xl"></FaUser>
           <span className="text-xl text-black font-bold"> Total Member</span></div>
          <div className="stat-value mt-2">{adminSpecial.totalMember} persons</div>
        </div>
      </div>
      <div className="stats bg-amber-300 shadow-md shadow-amber-400 border-2 border-amber-600 hover:shadow-xl">
        <div className="stat text-center">
          <div className="stat-title flex flex-row items-center justify-center gap-2 ">
            <FaBuilding className="text-xl"></FaBuilding>
           <span className="text-xl text-black font-bold"> Total Apartments</span></div>
          <div className="stat-value mt-2">{adminSpecial.totalApartment} apartments</div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 mx-auto gap-12 lg:gap-4 my-16 px-6 lg:px-20">
    <div className="stats w-4/5 bg-green-300 shadow-md shadow-green-400 border-2 border-green-600 hover:shadow-xl">
        <div className="stat text-center">
          <div className="stat-title flex flex-row items-center justify-center gap-2 ">
            <FaBuilding className="text-xl"></FaBuilding>
           <span className="text-xl text-black font-bold">  Available Apartments</span></div>
          <div className="stat-value mt-2">{adminSpecial.availablePercentage}% </div>
        </div>
      </div>
      <div className="stats  w-4/5 bg-accent bg-opacity-50 shadow-md shadow-accent border-2 border-cyan-600 hover:shadow-xl">
        <div className="stat text-center">
          <div className="stat-title flex flex-row items-center justify-center gap-2 ">
            <FaBuilding className="text-xl"></FaBuilding>
           <span className="text-xl text-black font-bold"> Unavailable Apartments</span></div>
          <div className="stat-value mt-2">{adminSpecial.unavailablePercentage}% </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminSpecial;
