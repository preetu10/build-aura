/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";
import SectionHeading from "../../shared/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Payment = () => {
  const parameterObject = useParams();
  const axiosSecure = useAxiosSecure();
  const agreementId = parameterObject.id;
  const monthToPay = parameterObject.month;
  console.log(monthToPay, agreementId);
  const { data: agreement = {} } = useQuery({
    queryKey: ["agreement", agreementId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/get-agreement/${agreementId}`);
      return data;
    },
  });

  // Fetch another piece of data, for example, coupon data
  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"], // Adjust the queryKey and parameter as needed
    queryFn: async () => {
      const { data } = await axiosSecure.get("/coupons");
      return data;
    },
  });
  console.log(agreement, coupons);
  const [rent, setRent] = useState(agreement.rent);
  const [isCouponInputActive, setIsCouponInputActive] = useState(false);

  const handleCouponChange = (e) => {
    if (e.target.value.trim() !== "") {
      setIsCouponInputActive(true);
    } else {
      setIsCouponInputActive(false);
    }
  };

  const handleCoupon = (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim();
    const coupon = coupons.find((coupon) => coupon.code === code);

    if (coupon) {
      const discount = (parseFloat(agreement.rent) * coupon.discount) / 100;
      const newRent = parseFloat(agreement.rent) - discount;
      console.log(newRent);
      setRent(newRent);
      toast.success(`Coupon applied! Your new rent is ${newRent}`);
    } else {
      toast.error("Invalid coupon code. Please try again.");
    }
  };
  const handlePayment = (e) => {
    e.preventDefault();
    const date = new Date(agreement.acceptDate);

    const cardNumber=e.target.cardNumber.value;
    const actualRent=rent;
    const paidMonthNumber=monthToPay;
    const acceptMonth=date.getMonth()+1;
    const email=agreement.email;
    const blockName=agreement.blockName;
    const apartmentNo=agreement.apartmentNo;
    const floorNo=agreement.floorNo;
    const agreementId=agreement._id;
    const data={
        cardNumber,
        rent:actualRent,
        paidMonthNumber,
        acceptMonth,
        email,
        blockName,
        apartmentNo,
        floorNo,
        agreementId,
    }
    console.log(data);

  };

  return (
    <div>
         <Helmet>
      <title>
        BuildAura|Make-Payment
      </title>
    </Helmet>
      <SectionHeading heading={"Make Payment"} subheading={""} />
      <div>
        <div className="flex flex-col items-center justify-center px-2">
          <div className="w-full py-6 rounded-xl border-[#CC935C] border-2 max-w-2xl shadow-2xl bg-base-100 mt-10 mb-6">
            <p className="mx-auto text-center px-5 text-gray-500">
              If you apply the coupon code, your rent will be decreased to that
              corresponding coupon's percentage
            </p>
            <form className="card-body" onSubmit={handleCoupon}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Coupon Code</span>
                </label>
                <input
                  type="text"
                  name="code"
                  className="input input-bordered"
                  onChange={handleCouponChange}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn bg-[#1967D2] text-white"
                  disabled={!isCouponInputActive}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center px-2">
          <div className="w-full py-6 rounded-xl border-[#CC935C] border-2 max-w-2xl shadow-2xl bg-base-100 mt-10 mb-6">
            <form className="card-body" onSubmit={handlePayment}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Card Number</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Total Rent</span>
                </label>
                <input
                  type="email"
                  value={rent}
                  className="input input-bordered"
                  disabled={true}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#1967D2] text-white">Pay</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
