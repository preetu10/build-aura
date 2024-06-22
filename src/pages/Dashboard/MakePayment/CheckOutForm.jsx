import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CheckOutForm = ({data}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error,setError]=useState("");
  const axiosSecure=useAxiosSecure();
  const [clientSecret,setClientSecret]=useState("");
  const {user}=useAuth();
  const [transactionId,setTransactionId]=useState("");
  const navigate=useNavigate();
    
  useEffect(()=>{
    console.log(data);
    const amount={
        rent:data.rent
    }
    if(data.rent>0){
        // toast.error("Something went wrong");
        // navigate("/dashboard/make-payment");
        axiosSecure.post('/create-payment-intent',amount)
        .then((res)=>{
            console.log(res.data.clientSecret);
           setClientSecret(res.data.clientSecret);
        })
    }
  },[axiosSecure,data]);
  const handlePayment = async(e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setError(error.message);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setError("");
      }

    //   confirm payment method
    const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
            card:card,
            billing_details:{
                email:user?.email || 'anonymous',
                name:user?.displayName || 'anonymous'
            }
        }
      });
      if(confirmError){
        console.log(confirmError);
      }
      else{
        console.log("payment-intent",paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            console.log("transaction id",paymentIntent.id);
            setTransactionId(paymentIntent.id);
            const date=format(new Date(), 'yyyy-MM-dd');
            const  info={
                transactionId:paymentIntent.id,
                paymentDate:date,
                ...data
            }
           axiosSecure.post("/add-payment",info)
           .then((res)=>{
            if(res.data.insertedId){
            toast.success("Payment successful");
            navigate("/dashboard/my-profile");
            }else{
                toast.error("Something went wrong");
                e.target.reset();
            }
        })
        }
      }
   


  };
  return (
    <div className="flex flex-col items-center justify-center px-2">
      <div className="w-full py-6 rounded-xl border-[#CC935C] border-2 shadow-amber-500  max-w-2xl shadow-md hover:shadow-lg bg-base-100 mt-10 mb-6">
        <form className="card-body" onSubmit={handlePayment}>
          <div
            style={{
              padding: "10px",
              margin: "20px",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Total Rent</span>
            </label>
            <input
              type="number"
              value={data.rent}
              className="input input-bordered"
              disabled={true}
            />
          </div>
          <div className="form-control mt-6">
            <button disabled={!stripe || !clientSecret} className="btn bg-[#1967D2] text-white">
              Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-700">Your transaction id is {transactionId}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
