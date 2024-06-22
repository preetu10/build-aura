import { format } from "date-fns";
import SectionHeading from "../shared/SectionHeading";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MakeAnnouncement = () => {
    const axiosSecure=useAxiosSecure();
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const date=format(new Date(), 'yyyy-MM-dd');
        const data = {
            title,
            description,
            date
        }
        axiosSecure.post("/admin/announcement", data)
        .then((res)=>{
            if(res.data.insertedId){
            toast.success("Announcement added successfully");
            navigate("/dashboard/announcements");
            }else{
                toast.error("Something went wrong");
                e.target.reset();
            }
        })
    }
  return (
    <div>
         <Helmet>
        <title>BuildAura|Admin-Make-Announcement</title>
      </Helmet>
      <SectionHeading heading={"Make Announcement"} subheading={""} />
      <div className="card  mx-auto mt-8 px-2 shrink-0 w-full md:max-w-xl shadow-amber-600 shadow-md hover:shadow-lg border-t-0 bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Add Announcement Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title Here"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Add Description</span>
            </label>
            <textarea className="textarea textarea-bordered" 
             name="description"
             placeholder="Enter Description"
             required
            ></textarea>
          </div>
          <div className="form-control mt-6">
          <button className="btn btn-ghost bg-[#1967D2] text-lg text-white">Add Announcement</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
