import { Helmet } from "react-helmet-async";
import useAuth from "../../customHooks/useAuth";
import MyAgreements from "./MyAgreements";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminSpecial from "./AdminSpecial";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: userPro = {} } = useQuery({
    queryKey: ["userPro", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  if (isPending)
    return (
      <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
    );
  console.log(userPro);
  return (
    <div>
      <Helmet>
        <title>BuildAura-My Profile</title>
      </Helmet>
      <div className="flex flex-col md:flex-row  items-center ">
        <div className=" p-5">
          <img
            src={user.photoURL}
            alt=""
            className="rounded-lg w-20 h-20 md:w-28 md:h-28"
          />
        </div>
        <div className="flex-1 p-5">
          <h1 className="font-semibold text-lg">{user.displayName}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      {/* table */}
      {userPro.role === "admin" ? (
        <AdminSpecial></AdminSpecial>
      ) : (
        <MyAgreements user={userPro}></MyAgreements>
      )}
    </div>
  );
};

export default MyProfile;
