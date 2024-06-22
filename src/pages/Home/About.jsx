import SectionHeading from "../shared/SectionHeading";

const About = () => {
  return (
    <div>
      <SectionHeading
        heading={"About the Building"}
        subheading={"Discover the Perfect Blend of Comfort and Convenience"}
      ></SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5  lg:gap-10 my-6 items-center">
        <div data-aos="zoom-in" data-aos-duration="1000">
          <img src="/about.jpg" alt="" className="rounded-2xl px-2" />
        </div>
        <div className="text-lg text-gray-600 px-2">
          Welcome to BuildAura, where modern living meets comfort in the heart
          of the city. Our state-of-the-art building combines functionality and
          style, offering a high-quality lifestyle. BuildAura features spacious
          apartments with contemporary interiors and top-notch amenities,
          designed for a serene living experience. Enjoy on-site facilities like
          a fully-equipped fitness center, a cozy lounge, and a rooftop garden
          with stunning views. Located in a prime area, BuildAura provides easy
          access to local attractions, dining, and entertainment. Whether
          commuting to work or exploring the neighborhood, everything you need
          is nearby. Experience modern living at BuildAura, where comfort,
          style, and convenience come together to create your perfect home.
        </div>
      </div>
    </div>
  );
};

export default About;
