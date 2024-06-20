import { Helmet } from "react-helmet-async";
import SectionHeading from "../shared/SectionHeading";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRef, useState } from "react";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [addCode,setAddCode]=useState("");
  const [addDes,setAddDes]=useState("");
  const [addDiscount,setAddDiscount]=useState("");
  const modalRef = useRef();
  const {
    data: coupons = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: "coupons",
    queryFn: async () => {
      const { data } = await axiosSecure.get("/get-all-coupons");
      return data;
    },
  });
  if (isPending)
    return (
      <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
    );

  const handleAdd = () => {
    const data = {
      code: addCode,
      discount: addDiscount,
      description: addDes,
      status: "Available",
    };
    console.log(data);
    
  
    axiosSecure.post("/admin/add-coupon", data).then((result) => {
      if (result.data.insertedId) {
        refetch();
        setAddCode("");
        setAddDes("");
        setAddDiscount("");
        toast.success("Coupon Added Successfully.");
        document.getElementById("my_modal_2").close();
      } else {
        toast.error("Coupon Addition Failed.");
      }
    });
  };

  const handleCoupon = (coupon) => {
    console.log(coupon);
    let track = "";
    if (coupon.status === "Available") track = "Unavailable";
    else track = "Available";
    const data = {
      id: coupon._id,
      status: track,
    };

    Swal.fire({
      title: `Are you sure you want to make it ${track}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.put("/admin/update-coupon", data).then((result) => {
          if (result.data.modifiedCount > 0) {
            refetch();
            toast.success("Update Successful.");
          } else {
            toast.error("Update Failed.");
          }
        });
      }
    });
  };
  const handleModalClose = () => {
    setAddCode("");
    setAddDes("");
    setAddDiscount("");
    modalRef.current.close();
  };
  return (
    <div>
      <Helmet>
        <title>BuildAura|Admin-Manage-Coupons</title>
      </Helmet>
      <SectionHeading
        heading={"Manage Coupons"}
        subheading={"Effortlessly Create and Manage Coupons for Your Users"}
      />
      <div className="text-right px-5 md:mr-12 mb-5">
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="btn btn-ghost bg-[#1967D2] text-white text-lg font-semibold "
        >
          Add Coupon
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-lg font-semibold text-center">
              <th></th>
              <th>Coupon Code</th>
              <th>Description</th>
              <th>Discount Percentage</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr className="text-center" key={index}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.description}</td>
                <td>{coupon.discount}%</td>
                <td>
                  <button
                    onClick={() => {
                      handleCoupon(coupon);
                    }}
                    className="text-lg btn btn-ghost bg-[#1967D2]
                     text-white font-semibold border-2 border-amber-600 
                     shadow-md shadow-amber-500"
                  >
                    {coupon.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-semibold text-xl text-center">Add Coupon</h3>
          <p className="py-4 text-center ">
            Give necessary information to add a new coupon.
          </p>
          <form  onSubmit ={handleAdd} method="dialog" className="modal-backdrop" >
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Coupon Code</span>
              </label>
              <input
                type="text"
                value={addCode}
                onChange={(e)=>setAddCode(e.target.value)}
                placeholder="Enter Coupon Code"
                className="input input-bordered text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Add Coupon Description
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered text-black"
                value={addDes}
                onChange={(e)=>setAddDes(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Add Discount Percentage
                </span>
              </label>
              <input
                type="number"
                value={addDiscount}
                onChange={(e)=>setAddDiscount(e.target.value)}
                placeholder="Discount Percentage"
                className="input input-bordered text-black"
                required
              />
            </div>
            <button type="submit" className="btn btn-ghost mt-4 bg-[#1967D2] text-white ">
                Add 
              </button>
              <button
              type="button"
              className="btn btn-ghost mt-4 bg-red-500 text-white ml-2"
              onClick={handleModalClose}
            >
              Close
            </button>
          </form>
          
        </div>
      </dialog>
    </div>
  );
};

export default ManageCoupons;
