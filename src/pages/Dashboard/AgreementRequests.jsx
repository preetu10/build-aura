import { Helmet } from "react-helmet-async";
import SectionHeading from "../shared/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { format } from "date-fns";

const AgreementRequests = () => {
  const axiosSecure=useAxiosSecure();
  const {data:requests=[],isPending,refetch}=useQuery({
    queryKey:["requests"],
    queryFn:async()=>{
      const {data}=await axiosSecure.get("/requests");
      return data;
    }
  })
  if (isPending)
    return (
      <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
    );

    const handleRequest=(request)=>{
      const today=format(new Date(), 'yyyy-MM-dd');
      const data={
        _id: request._id,
        id: request.id,
        name: request.name,
        email: request.email,
        floorNo: request.floorNo,
        blockName: request.blockName,
        apartmentNo: request.apartmentNo,
        requestDate: request.requestDate,
        acceptDate:today,
        rent: request.rent,
        status: "Approved",
      }
      Swal.fire({
        title: `Are you sure you want to accept it?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.put('/admin/update-request',data).then((result) => {
            if (result.data.modifiedCount > 0) {
              refetch();
              toast.success("Request Accepted.");
            } else {
              toast.error("Something went wrong.");
            }
          });
        }
      });
    }
    const handleDelete=(id) => {
      Swal.fire({
        title: `Are you sure you want to reject it?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/admin/delete-request/${id}`)
         .then((res) => {
            if(res.data.deletedCount > 0) {
              refetch();
              toast.success("Request Deleted Successfully");
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
        <title>BuildAura|Admin-Agreement-Requests</title>
      </Helmet>
      <SectionHeading heading={"Requests for Agreement"} subheading={""} />


      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-center">
        <th></th>
        <th>User Name</th>
        <th>User Email</th>
        <th>Floor No</th>
        <th>Block Name</th>
        <th>Apartment No</th>
        <th>Rent</th>
        <th>Request Date</th>
        <th>Accept</th>
        <th>Reject</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
       (requests.length>0) ? requests.map((request,index) =>
        <tr key={index} className="text-center">
      <th>{index+1}</th>
      <td>{request.name}</td>
      <td>{request.email}</td>
      <td>{request.floorNo}</td>
      <td>{request.blockName}</td>
      <td>{request.apartmentNo}</td>
      <td>{request.rent}</td>
      <td>{request.requestDate}</td>
      <td> <button
                  onClick={() => {
                   handleRequest(request)
                  }}
                  className="text-lg btn btn-ghost bg-[#1967D2]
                   text-white font-semibold border-2 border-amber-600 
                   shadow-md shadow-amber-500"
                >
                  Accept
                </button></td>
                <td><button
                  onClick={() => {
                   handleDelete(request._id)
                  }}
                  className="text-lg btn btn-ghost bg-red-500
                   text-white font-semibold border-2 border-amber-600 
                   shadow-md shadow-amber-500"
                >
                Reject
                </button></td>
     
    </tr> ):<p className="text-gray-500 text-lg text-center my-5">No request found</p>
      }
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AgreementRequests;
