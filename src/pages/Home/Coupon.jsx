/* eslint-disable react/no-unescaped-entities */
import SectionHeading from "../shared/SectionHeading";

const Coupon = () => {
  return (
    <div className="my-8">
      <SectionHeading
        heading={"Exclusive Coupons"}
        subheading={
          "Unlock Special Discounts and Offers for BuildAura Residents"
        }
      ></SectionHeading>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 items-center mx-auto">
        <div className="card w-full md:w-4/5 bg-sky-100 text-[#1967D2]">
          <div className="grid grid-cols-2 items-center divide-x-4 divide-solid  divide-amber-600">
            <div className="card-body">
              <h2 className="card-title font-extrabold text-3xl">
                Get 10% Discount
              </h2>
              <p>Save 10% on your next month's rent.</p>
            </div>
            <div className=" h-1/2 ml-3 pr-3">
              <p className="text-center px-4 font-bold text-[#1967D2] mt-10">
                Code: SAVE10
              </p>
            </div>
          </div>
        </div>
        <div className="card w-full md:w-4/5 bg-sky-100 text-[#1967D2]">
          <div className="grid grid-cols-2 items-center divide-x-4 divide-solid  divide-amber-600">
            <div className="card-body">
              <h2 className="card-title font-extrabold text-3xl">
                Get 10% Discount
              </h2>
              <p>Save 10% on your next month's rent.</p>
            </div>
            <div className=" h-1/2 ml-3 pr-3">
              <p className="text-center px-4 font-bold text-[#1967D2] mt-10">
                Code: SAVE10
              </p>
            </div>
          </div>
        </div>
        <div className="card w-full md:w-4/5 border-2 border-amber-500 shadow-lg shadow-amber-600 bg-sky-100 text-[#1967D2] hover:shadow-xl">
          <div className="grid grid-cols-2 items-center divide-x-4 divide-solid divide-amber-600">
            <div className="card-body">
              <h2 className="card-title font-extrabold text-3xl">
                Get 10% Discount
              </h2>
              <p>Save 10% on your next month's rent.</p>
            </div>
            <div className="h-1/2 ml-3 pr-3">
              <p className="text-center text-xl px-4 font-bold text-[#1967D2] mt-10">
                Code: <span className="text-amber-500">SAVE10</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
