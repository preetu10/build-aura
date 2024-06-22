
const CouponCard = ({discount,code,description}) => {
    return (
        <div>
              <div data-aos="fade-up"
     data-aos-duration="1000" className="card  md:w-full border-2 border-amber-500 shadow-lg shadow-amber-600 bg-sky-100 text-[#1967D2] hover:shadow-xl">
          <div className="grid grid-cols-2 items-center divide-x-4 divide-solid divide-amber-600">
            <div className="card-body">
              <h2 className="font-extrabold text-3xl">
                Get {discount}% Discount
              </h2>
              <p>{description}</p>
            </div>
            <div className="h-3/4 px-3">
              <p className="text-center text-xl px-4 font-bold text-[#1967D2] mt-10">
                Code: <span className="text-amber-500">{code}</span>
              </p>
            </div>
          </div>
        </div>
        </div>
    );
};

export default CouponCard;