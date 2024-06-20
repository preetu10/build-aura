import { FaTrash } from "react-icons/fa6";
import SectionHeading from "../shared/SectionHeading";
import { toast } from "react-toastify";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const ManageMembers = () => {
    const axiosSecure=useAxiosSecure();
    const {isPending,refetch,data:members=[]}=useQuery({
        queryKey:["members"],
        queryFn:async()=>{
            const {data}=await axiosSecure.get("/members");
            return data;
        }
    })
    
    if (isPending)
        return (
          <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
        );
    const handleDelete = (id) => {
        //console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/admin/delete-member/${id}`)
                .then((res) => {
                    if(res.data.modifiedCount > 0) {
                        refetch();
                    toast.success("Member Deleted Successfully");
                    } else {
                        toast.error("Something went wrong");
                    }
                });
            }
          });
     
    }
  return (
    <div>
         <Helmet>
        <title>BuildAura|Admin-Manage-Members</title>
      </Helmet>
      <SectionHeading heading={"All Members"} subheading={""} />
      <div className="overflow-x-auto px-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-lg font-semibold">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                members.map((member,index) => (
                  <tr key={index}>
                    <th>{index+1}</th>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td className=""><button className="btn" onClick={()=>{handleDelete(member._id)}}><FaTrash className="text-red-700"></FaTrash></button></td>
                  </tr>
                ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
