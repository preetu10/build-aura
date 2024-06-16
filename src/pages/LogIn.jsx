import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Lottie from "lottie-react";
import login from "../../public/login.json"
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAuth from "../customHooks/useAuth";
import useAxiosPublic from "../customHooks/useAxiosPublic";
const LogIn = () => {
    const [showPW, setShowPW] = useState(false);
    const {signInUser,signInWithGoogle}=useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate=useNavigate();
    const handleLogin=e=>{
      e.preventDefault();
      const email=e.target.email.value;
      const password=e.target.password.value;
      console.log(email,password);
      signInUser(email, password)
      .then(() => {
        toast.success("You have successfully logged in.");
          navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Incorrect email or password. Please try again.");
      })
    }
    const handleGoogle = () => {
      signInWithGoogle()
        .then((res) => {
          console.log(res);
          const userInfo = {
            name: res.user?.displayName,
            email: res.user?.email,
            image: res.user?.photoURL,
            role: "user",
          };
          axiosPublic.post("/users",userInfo)
            .then((res) => {
                if(res.data.insertedId){
                  console.log("first inserted to db");
                    toast.success("You have successfully logged in!");
                    navigate("/");
                }
                else{
                  toast.success("You have successfully logged in!");
                  navigate("/");
                }
            })
          
        
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to log in with Google. Please try again.");
        });
    };
    return (
        <div className="hero text-center my-5 bg-[#f5f1ec] rounded-xl md:p-5">
          <Helmet>
            <title>BuildAura-LogIn</title>
          </Helmet>
        <div className="hero-content flex-col lg:flex-row-reverse md:gap-24">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl mt-16 font-semibold w-full ">Welcome to <span className=" text-[#202124] font-semibold">Build<span className="text-[#1967D2]">Aura</span></span>!</h1>
            <Lottie animationData={login} classID="mb-5"/>
          </div>
          <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-center  mt-10 text-black text-3xl font-bold">Log In Now</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control mb-2 ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Enter Email Address Here" name="email" className="input input-bordered" required />
              </div>
              <div className="form-control mb-2 relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input 
                  type={showPW ? "text" : "password"}
               placeholder="Enter Password Here" name="password" className="input input-bordered" required />
                 <span
              className="absolute top-12 right-5"
              onClick={() => setShowPW(!showPW)}
            >
              {showPW ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-ghost bg-[#1967D2] text-lg text-white">Login</button>
              </div>
            </form>
            <hr></hr>
        <div className="text-center my-4">
          <p className="text-center  text-base font-medium">OR</p>
          <button
             onClick={handleGoogle}
            className="btn bg-[#1967D2] text-white"
          >
            <FaGoogle></FaGoogle>
            Log In With Google
          </button>
        </div>
        <hr />
        <div className="mb-6">
          <p className="text-center font-base text-base mb-2 mt-2">
            Do not have an account? Please{" "}
            <Link to="/register" className="font-bold text-[#1967D2]">
              Register
            </Link>
          </p>
        </div>
          </div>
        </div>
      </div>
    );
};

export default LogIn;