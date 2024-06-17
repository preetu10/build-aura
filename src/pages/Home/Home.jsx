import useAuth from "../../customHooks/useAuth";
import About from "./About";
import Banner from "./Banner";
import Coupon from "./Coupon";
import FAQ from "./FAQ";
import Location from "./Location";

const Home = () => {
    const {user}=useAuth();
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Location></Location>
            {user && <Coupon></Coupon>}
            <FAQ></FAQ>
        </div>
    );
};

export default Home;