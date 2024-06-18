import {
  FaEdit,
  FaHandshake,
  FaHistory,
  FaHome,
  FaReceipt,
} from "react-icons/fa";
import {
  FaBuilding,
  FaCircleUser,
  FaFile,
  FaTicket,
  FaUsers,
} from "react-icons/fa6";
import { NavLink, useNavigate} from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: userPro } = useQuery({
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

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast("You have successfully logged out");
        navigate("/");
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn m-4 drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu py-8 px-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            {/* website name and logo */}
            <li className="text-center py-1 px-2">
              {" "}
              <a href="/" className="btn btn-ghost text-xl">
                <img
                  src="/logo.png"
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-3xl text-[#202124] font-semibold">
                  Build<span className="text-[#1967D2]">Aura</span>
                </span>
              </a>
            </li>
            <hr className="my-4  border-2 border-amber-600 " />

            {/* for user role */}
            {userPro?.role === "user" && (
              <>
                <li>
                  <NavLink
                    to={`/dashboard`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaCircleUser />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/announcements`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaFile></FaFile>Announcements
                  </NavLink>
                </li>
              </>
            )}

            {/* for member role */}
            {userPro?.role === "member" && (
              <>
                <li>
                  <NavLink
                    to={`/dashboard`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaCircleUser />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/make-payment`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaReceipt />
                    Make Payment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/payment-history`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaHistory />
                    Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/announcements`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaFile></FaFile>Announcements
                  </NavLink>
                </li>
              </>
            )}

            {/* for admin role */}
            {userPro?.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to={`/dashboard`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaCircleUser />
                    Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/manage-members`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaUsers />
                    Manage Members
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/make-announcements`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaEdit />
                    Make Announcement
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/announcements`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaFile></FaFile>Announcements
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/agreement-requests`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaHandshake />
                    Agreement Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/manage-coupon`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "#1967D2" : "",
                      };
                    }}
                  >
                    <FaTicket />
                    Manage Coupon
                  </NavLink>
                </li>
              </>
            )}

            {/* common links */}
            <hr className="my-4 border-2 border-amber-600 " />
            <li>
              <NavLink
                to="/"
                className="text-base"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "semibold" : "",
                    color: isActive ? "white" : "black",
                    backgroundColor: isActive ? "#1967D2" : "",
                  };
                }}
              >
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/apartments"
                className="text-base"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "semibold" : "",
                    color: isActive ? "white" : "black",
                    backgroundColor: isActive ? "#1967D2" : "",
                  };
                }}
              >
                <FaBuilding></FaBuilding>Apartments
              </NavLink>
            </li>

            {/* logout part */}
            <hr className="my-4 border-2 border-amber-600 " />
            <li>
              <button
                onClick={handleLogOut}
                className="font-semibold text-base text-black"
              >
                {" "}
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
