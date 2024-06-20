import { Helmet } from "react-helmet-async";
import SectionHeading from "../shared/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../customHooks/useAxiosPublic";
import ApartmentCard from "./ApartmentCard";

const Apartments = () => {
    const axiosPublic=useAxiosPublic();
    const {data:apartments=[],isPending,refetch}=useQuery({
        queryKey:"apartments",
        queryFn:async()=>{
            const {data}=await axiosPublic.get("/apartments");
            return data;
        }
    })
    if (isPending)
        return (
          <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
        );
  return (
    <div>
      <Helmet>
        <title>BuildAura-Apartments</title>
      </Helmet>
      <SectionHeading
        heading={"Apartments"}
        subheading={
          "Find Your Perfect Home: Explore Our Available Apartments with Comprehensive Details"
        }
      />
      <div className="px-5 mt-12 mb-8">
       {
        apartments.map((apartment,index)=>
            <ApartmentCard key={index} refetch={refetch} apartment={apartment} />
        )
       }
      </div>
    </div>
  );
};

export default Apartments;
