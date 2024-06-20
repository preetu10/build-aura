/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../customHooks/useAxiosPublic";
import SectionHeading from "../shared/SectionHeading";
import CouponCard from "./CouponCard";

const Coupon = () => {
  const axiosPublic = useAxiosPublic();
  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/coupons");
      return data;
    },
  });
  //console.log(coupons);
  return (
    <div className="my-8">
      <SectionHeading
        heading={"Exclusive Coupons"}
        subheading={
          "Unlock Special Discounts and Offers for BuildAura Residents"
        }
      ></SectionHeading>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 items-center mx-auto md:mx-auto max-w-full">
        {(coupons.length==0) ? (
          <p className="text-center text-2xl font-semibold text-black my-8">
            No coupons available now
          </p>
        ) : (
          coupons.map((coupon, idx) => (
            <CouponCard
              key={idx}
              code={coupon.code}
              description={coupon.description}
              discount={coupon.discount}
            ></CouponCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Coupon;
