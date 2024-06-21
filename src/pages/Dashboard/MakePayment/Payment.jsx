/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";
import SectionHeading from "../../shared/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import {  Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const parameterObject = useParams();
  const axiosSecure = useAxiosSecure();
  const [agreement, setAgreement] = useState({});
  const [rent, setRent] = useState(0);
  
  const agreeId = parameterObject.id;
  const monthToPay = parameterObject.month;
  console.log(monthToPay, agreeId);
//   const { data: agreement = {} } = useQuery({
//     queryKey: ["agreement", agreeId],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/get-agreement/${agreeId}`);
//       return data;
//     },
//   }); this is causing problem , so as per instructor's instruction, using useEffect and axios only
useEffect(() => {
    const fetchAgreement = async () => {
      try {
        const response = await axiosSecure.get(`/get-agreement/${agreeId}`);
        const data = await response.data;
        setAgreement(data);
        setRent(data.rent);
      } catch (err) {
        console.log(err);
      } 
    };

    fetchAgreement();
  }, [axiosSecure,agreeId]);

  
  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"], 
    queryFn: async () => {
      const { data } = await axiosSecure.get("/coupons");
      return data;
    },
  });
  //console.log(agreement, coupons);
  
  const [isCouponInputActive, setIsCouponInputActive] = useState(false);

  const handleCouponChange = (e) => {
    if (e.target.value.trim() !== "") {
      setIsCouponInputActive(true);
    } else {
      setIsCouponInputActive(false);
    }
  };
  const date = new Date(agreement.acceptDate);
  const actualRent =parseInt(rent);
  const paidMonthNumber = parseInt(monthToPay);
  const acceptMonth = date.getMonth() + 1;
  const email = agreement.email;
  const blockName = agreement.blockName;
  const apartmentNo = agreement.apartmentNo;
  const floorNo = agreement.floorNo;
  const agreementId = agreement._id;
  const data = {
    rent: actualRent,
    paidMonthNumber,
    acceptMonth,
    email,
    blockName,
    apartmentNo,
    floorNo,
    agreementId,
  };
  console.log(data);
  const handleCoupon = (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim();
    const coupon = coupons.find((coupon) => coupon.code === code);

    if (coupon) {
      const discount = (parseFloat(agreement.rent) * coupon.discount) / 100;
      const newRent = parseFloat(agreement.rent) - discount;
     // console.log(newRent);
      setRent(newRent);
      toast.success(`Coupon applied! Your new rent is ${newRent}`);
    } else {
      toast.error("Invalid coupon code. Please try again.");
    }
  };



  return (
    <div>
      <Helmet>
        <title>BuildAura|Make-Payment</title>
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

        <Elements stripe={stripePromise}>
        <CheckOutForm  data={data}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
