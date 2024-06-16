import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link,  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../customHooks/useAuth";
import useAxiosPublic from "../customHooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";

// const image_hosting_key = import.meta.env.IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const [showPW, setShowPW] = useState(false);
  const { createUser, logout, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleRegister = (e) => {
    e.preventDefault();
    const accepted = e.target.terms.checked;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.value;
    console.log(name, email, password);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long"
      );
      return;
    }
    if (!accepted) {
      toast.info("Please accept our terms and conditions");
      return;
    }
    createUser(email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: name,
          photoURL: image,
        })
          .then(() => {
            const userInfo = {
                name: name,
                email: email,
                image: image,
                role: "user",
              };
            axiosPublic.post("/users",userInfo)
            .then((res) => {
                if(res.data.insertedId){
                    toast.success("You have successfully registered!");
                    navigate("/login");
                    logout()
                    .then(() => console.log("You have successfully logged out!"))
                    .catch((err) => console.log(err));
                }
            }) 
          })
          .catch((err) => {
            console.error(err);
            toast.error("something went wrong.try again later");
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("You may already have an account. Try to login.");
      });
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        const userInfo = {
            name: res.user?.displayName,
            email: res.user?.email,
            image: res.user?.photoURL,
            role: "user",
          };
          axiosPublic.post("/users",userInfo)
            .then((res) => {
                if(res.data.insertedId){
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
    <div className="hero text-center my-8  px-4 rounded-xl md:p-5">
      <Helmet>
        <title>BuildAura-SignUp</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-5xl mt-2 font-semibold w-full ">
          Welcome to{" "}
          <span className=" text-[#202124] font-semibold">
            Build<span className="text-[#1967D2]">Aura</span>
          </span>
          !
        </h1>
        <p className="font-medium text-gray-500 my-5">
          Create an account providing appropriate information and join our
          community to get updated about us.
        </p>
        <div className="card w-full lg:w-[450px] mx-auto mt-4  shadow-2xl shadow-[#5566a7] bg-base-100">
          <h1 className="text-center  mt-10 text-black text-3xl font-bold">
            Register Now
          </h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control mb-2 ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name Here"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-2 ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Email Address Here"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-2 ">
              <label className="label">
                <span className="label-text">Profile Photo</span>
              </label>
              <input
                type="text"
                placeholder="Choose Photo"
                name="image"
                className="input input-bordered py-2"
                required
              />
            </div>
            <div className="form-control mb-2 relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPW ? "text" : "password"}
                placeholder="Enter Password Here"
                name="password"
                className="input input-bordered"
                required
              />
              <span
                className="absolute top-12 right-5"
                onClick={() => setShowPW(!showPW)}
              >
                {showPW ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
            </div>
            <div className="mt-3">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms" className="ml-3">
                I accept all terms and conditions of this website.
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-ghost bg-[#1967D2] text-lg text-white">
                Register
              </button>
            </div>
          </form>
          <div className="text-center my-4">
            <p className="text-center  text-base font-medium">OR</p>
            <button
               onClick={handleGoogle}
              className="btn bg-[#1967D2] text-white"
            >
              <FaGoogle></FaGoogle>
              Create Account With Google
            </button>
          </div>
          <hr />
          <div className="mb-6">
            <p className="text-center font-base text-base mb-5 mt-2">
              Already have an account? Please{" "}
              <Link to="/login" className="font-bold text-[#1967D2]">
                LogIn
              </Link>
            </p>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default SignUp;
