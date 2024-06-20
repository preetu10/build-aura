import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import SectionHeading from "../shared/SectionHeading";
import AnnouncementCard from "./AnnouncementCard";
import { Helmet } from "react-helmet-async";

const Announcements = () => {
    const axiosSecure=useAxiosSecure();
    const {isPending,data:announcements=[]}=useQuery({
        queryKey:["announcements"],
        queryFn:async()=>{
            const {data}=await axiosSecure.get("/announcements");
            return data;
        }
    })
    //console.log(announcements);
    if (isPending)
        return (
          <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
        );
  return (
    <div>
       <Helmet>
        <title>BuildAura-Announcements</title>
      </Helmet>
      <SectionHeading
        heading={"Announcements"}
        subheading={"All sorts of announcements are published here."}
      />
     <div className="mx-auto px-16 my-12">
   {
    announcements.map((an,index)=><AnnouncementCard key={index} announcements={an}></AnnouncementCard>)
   }
     </div>
    </div>
  );
};

export default Announcements;
