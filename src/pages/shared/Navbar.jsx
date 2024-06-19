import { FaSignInAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import { toast } from "react-toastify";
const Navbar = () => {

  const {user,logout}=useAuth();
  const navigate = useNavigate();
    const links=
    <>
    <li className="text-lg font-semibold"><NavLink to="/"  style={({ isActive}) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isActive ? "white" : "black",
      backgroundColor: isActive ? "#1967D2" : "",
    };
  }}>Home</NavLink></li>
    <li className="text-lg font-semibold"><NavLink to="/apartments"
    style={({ isActive}) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isActive ? "white" : "black",
          backgroundColor: isActive ? "#1967D2" : "",
        };
      }}
    >Apartment</NavLink></li>
    </>
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
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-100 rounded-box w-52">
       {links}
      </ul>
    </div>
    <a href="/" className="btn btn-ghost text-xl">
        <img src="/logo.png" alt="" className="w-10 h-10 rounded-full" />
        <span className="text-3xl text-[#202124] font-semibold">Build<span className="text-[#1967D2]">Aura</span></span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
     {user ? (
          <>
            <div className="dropdown dropdown-end ">
              <a className="my-anchor-element-id">
                <button
                  className="btn-ghost  rounded-full w-8 h-8 lg:w-12 lg:h-12"
                >
                  <img
                    src={user?.photoURL}
                    className="rounded-full w-8 h-8  lg:w-12 lg:h-12 lg:mr-3"
                    alt="user"
                  />
                </button>
              </a>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 z-[20] p-2 bg-[#f3f0ec] shadow  rounded-box w-36"
              >
                <li className="p-2">
                  <p className="text-center  text-base font-medium text-black">
                    {" "}
                    {user.displayName}
                  </p>
                  <hr></hr>
                </li>
                <li className="p-2">
                  <button className="btn btn-ghost text-base font-medium text-black">
                    {" "}
                    <Link to={`/dashboard/my-profile`}>
                      Dashboard
                    </Link>
                  </button>
                  <hr></hr>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-ghost text-base font-medium text-black"
                  >
                    Log Out
                  </button>
                  <hr></hr>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
           <Link to="/login">
   <button className="btn px-4 bg-[#1967D2] text-lg text-white">Log In<FaSignInAlt></FaSignInAlt></button>
  </Link>
          </>
        )}
  </div>
</div>
    );
};

export default Navbar;