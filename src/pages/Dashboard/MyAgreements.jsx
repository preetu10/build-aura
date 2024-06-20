import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../customHooks/useAxiosSecure";

const MyAgreements = ({user}) => {
  const axiosSecure = useAxiosSecure();
  const { isPending, data: agreement = {} } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-my-agreement/${user?.email}`);
      return res.data;
    },
  });
  if (isPending)
    return (
      <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
    );

    return (
        <div>
             <h1 className="mt-5 text-center p-5 text-black font-bold text-2xl">
        My Agreement
      </h1>
      <div className="overflow-x-auto p-2 ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Floor</th>
              <th>Block</th>
              <th>Apartment No</th>
              <th>Agreement Accept Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              user?.role==="member"?
              <tr className="text-center">
              <th>1</th>
              <td>{agreement.floorNo}</td>
              <td>{agreement.blockName}</td>
              <td>{agreement.apartmentNo}</td>
              <td>{agreement.acceptDate}</td>
              <td>{agreement.status==="Approved" && "Checked"}</td>
            </tr> : 
            <tr>
              <th></th>
              <td>None</td>
              <td>None</td>
              <td>None</td>
              <td>None</td>
              <td>None</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default MyAgreements;