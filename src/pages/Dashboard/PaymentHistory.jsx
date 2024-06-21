import { Helmet } from "react-helmet-async";
import SectionHeading from "../shared/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import useAuth from "../../customHooks/useAuth";
import { useState } from "react";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: myPayment = [], isPending } = useQuery({
    queryKey: ["myPayment"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-payment-history/${user.email}`);
      return data;
    }
  });

  if (isPending) {
    return <span className="mx-auto mt-24 loading loading-dots loading-lg"></span>;
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredPayments([]);
      setIsSearching(false);
      return;
    }
    try {
      const { data } = await axiosSecure.get(`/search-payment-history/${user.email}`, {
        params: { searchTerm }
      });
      setFilteredPayments(data);
      setIsSearching(true);
    } catch (error) {
      console.error("Error fetching filtered payments:", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>BuildAura - My Payment History</title>
      </Helmet>
      <SectionHeading heading={"My Payment History"} subheading={""} />
      <div className="text-right px-5 md:mr-12 mb-5">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by month"
            className="input input-bordered"
          />
          <button
            type="submit"
            className="btn btn-ghost bg-[#1967D2] text-white text-lg font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-lg font-semibold text-center">
              <th></th>
              <th>Floor No</th>
              <th>Apartment No</th>
              <th>Block Name</th>
              <th>Paid For</th>
              <th>Transaction ID</th>
              <th>Payment Date</th>
              <th>Paid Rent</th>
            </tr>
          </thead>
          <tbody>
            {
              (isSearching ? filteredPayments : myPayment).length > 0 ? (
                (isSearching ? filteredPayments : myPayment).map((mp, index) => (
                  <tr className="text-center text-black" key={index}>
                    <td>{index + 1}</td>
                    <td>{mp.floorNo}</td>
                    <td>{mp.apartmentNo}</td>
                    <td>{mp.blockName}</td>
                    <td>{monthNames[mp.paidMonthNumber - 1]}</td>
                    <td>{mp.transactionId}</td>
                    <td>{mp.paymentDate}</td>
                    <td>{mp.rent}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center my-10 px-10 text-black font-bold">
                    No data found
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
