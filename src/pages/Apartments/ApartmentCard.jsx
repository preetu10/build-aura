import { toast } from "react-toastify";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApartmentCard = ({ apartment,refetch }) => {
   const {user}=useAuth();
   const axiosSecure=useAxiosSecure();
    const handleAgreement=() => {
        const id=apartment._id;
        const email=user.email;
        const name=user.displayName;
        const floorNo=apartment.floorNo;
        const blockName=apartment.blockName;
        const apartmentNo=apartment.apartmentNo;
        const rent=apartment.rent;
        const status="Pending";
        const data={
            id,
            email,
            name,
            floorNo,
            blockName,
            apartmentNo,
            rent,
            status,
        }
        console.log(data);
        Swal.fire({
            title: "Are you sure you want to request for this apartment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post("/add-agreement",data)
                .then((res)=>{
                    refetch();
                    console.log(res);
                    if(res.data.insertedId){
                      toast.success("Agreement Request Sent Successfully. Wait for Admin's Approval.");
                    }
                    else{
                       toast.warning("You may be already a member or requested for an apartment. Requesting for more than one apartment is not allowed.");
                    }
                }) 
            }
          });
    }

  return (
    <div>
      <div className="card flex flex-col md:flex-row  justify-center items-center border-2 border-amber-800 mt-6 bg-base-100 shadow-md shadow-amber-600 hover:shadow-lg">
        <figure className=" px-4 pt-5 md:pt-0">
          <img
            src={apartment.apartmentImage}
            alt="Apartment"
            className=" md:w-48 md:h-48 lg:w-80 lg:h-80 w-44 h-40 rounded-xl "
          />
        </figure>
        <div className="card-body">
            <div className="flex justify-end">
            <div className="text-center mt-2 md:w-36 rounded-badge p-3 bg-cyan-500">
                <h1 className="md:text-xl text-white font-bold">{apartment.status}</h1>
            </div>
            </div>
          <h1 className="text-amber-600 text-lg md:text-2xl font-extrabold ">
            Rent :  {apartment.rent}TK
          </h1> 
          <h1 className="text-gray-600 text-xl font-bold">Floor No: {apartment.floorNo}</h1>
          <h1 className="text-gray-600 text-xl font-bold">Block Name: {apartment.blockName}</h1>
          <h1 className="text-gray-600 text-xl font-bold">Apartment No: {apartment.apartmentNo}</h1>
          <p>Click agreement button to proceed with renting.</p>
          <div className="card-actions justify-start">
            <button onClick={handleAgreement} className="btn btn-ghost bg-[#1967D2] text-white text-lg font-semibold">
              Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
