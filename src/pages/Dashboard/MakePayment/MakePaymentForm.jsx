import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { toast } from "react-toastify";

const MakePaymentForm = ({agreement}) => {
    const axiosSecure = useAxiosSecure();
    const {data:paymentInfo={}}=useQuery({
        queryKey:["paymentInfo",agreement._id],
        queryFn:async()=>{
            const {data}=await axiosSecure.get(`/get-payment-info/${agreement._id}`);
            return data;
        }
    })
    console.log(paymentInfo);

    const [selectedMonth, setSelectedMonth] = useState("");
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date = new Date(agreement.acceptDate);
      const monthName = monthNames[date.getMonth()];
      const agreementMonthNumber = monthNames.indexOf(monthName) + 1;//the month number when the agreement was accepted
      console.log(agreementMonthNumber);

      const navigate=useNavigate();
    
  const handleMakePayment = (e) => {
    e.preventDefault();

    const monthNumber = monthNames.indexOf(selectedMonth) + 1; // month number of which month is selected
    console.log(monthNumber);

    const exactMonth=monthNames[agreementMonthNumber]; //for which month's rent needs to be paid if no other month's payment is done.

    if(!paymentInfo){
        if(monthNumber === agreementMonthNumber+1){
            navigate(`/dashboard/payment/${agreement._id}/${monthNumber}`);
        }
       else if(monthNumber <= agreementMonthNumber){
        toast.warning("Select correct month to pay rent.");
       }
       else{
        toast.warning(`First pay for the month ${exactMonth} `);
       }
    }
    else{
        const lastPaidMonthNumber = paymentInfo.paidMonthNumber;//last paid month's number
        console.log(lastPaidMonthNumber);


        const exact=monthNames[lastPaidMonthNumber]//according to laast paid month's number ,which month needs to be paid next 

        if(lastPaidMonthNumber === monthNumber-1){
            navigate(`/dashboard/payment/${agreement._id}/${monthNumber}`);
        }
        else{
            toast.warning(`You need to pay for the month ${exact}`);
        }
    }

  };
    return (
        <div>
            <div className="flex flex-col items-center justify-center px-2">
        <div className="w-full py-6 rounded-xl border-[#CC935C] border-2 max-w-2xl shadow-2xl bg-base-100 mt-10 mb-6">
          <form className="card-body" onSubmit={handleMakePayment}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                value={agreement.name}
                className="input input-bordered"
                disabled={true}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email Address</span>
              </label>
              <input
                type="email"
                value={agreement.email}
                className="input input-bordered"
                disabled={true}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Floor Number</span>
              </label>
              <input
                type="number"
                value={agreement.floorNo}
                className="input input-bordered"
                disabled={true}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Block Name</span>
              </label>
              <input
                type="text"
                value={agreement.blockName}
                className="input input-bordered"
                disabled={true}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Apartment No</span>
              </label>
              <input
                type="text"
                value={agreement.apartmentNo}
                className="input input-bordered"
                disabled={true}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rent</span>
              </label>
              <input
                type="number"
                value={agreement.rent}
                className="input input-bordered"
                disabled={true}
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">
                  Select the month you want to pay the rent for
                </span>
              </label>
              <select
                required
                className="select select-info w-full max-w-xs"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="" disabled>
                  Select month
                </option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#1967D2] text-white">Submit</button>
            </div>
          </form>
        </div>
      </div>
        </div>
    );
};

export default MakePaymentForm;