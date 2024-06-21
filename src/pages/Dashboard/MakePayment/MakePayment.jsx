/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../shared/SectionHeading";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import MakePaymentForm from "./MakePaymentForm";
import { Helmet } from "react-helmet-async";

const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { data: agreement = {}, isPending } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/get-my-agreement/${user?.email}`
      );
      return data;
    },
  });

  if (isPending)
    return (
      <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
    );

  return (
    <>
    <Helmet>
      <title>
        BuildAura|Make-Payment
      </title>
    </Helmet>
      <SectionHeading heading={"Make Payment"} subheading={""} />
      <MakePaymentForm agreement={agreement}></MakePaymentForm>
    </>
  );
};

export default MakePayment;
