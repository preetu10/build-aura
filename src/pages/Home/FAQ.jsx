/* eslint-disable react-refresh/only-export-components */
import SectionHeading from "../shared/SectionHeading";
import Marquee from "react-fast-marquee";
const FAQ = () => {
  return (
    <div className="my-8">
      <SectionHeading
        heading={"Frequently Asked Questions (FAQ)"}
        subheading={"Find Answers to Common Queries About Living at BuildAura"}
      ></SectionHeading>
      <div className="space-y-5">
        <div className="collapse collapse-arrow bg-blue-50">
          <input type="radio" name="my-accordion-2"  />
          <div className="collapse-title text-xl font-medium">
          What types of apartments do you offer?
          </div>
          <div className="collapse-content">
            <Marquee speed={30}><p className="text-gray-600 px-2">We offer a variety of apartment layouts including one-bedroom, two-bedroom, and studio apartments. Each unit is designed for comfort and functionality.</p></Marquee>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-blue-50">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
          Are pets allowed in the building?
          </div>
          <div className="collapse-content">
            <Marquee speed={30}><p className="text-gray-600 px-2">Yes, we are a pet-friendly community.</p></Marquee>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-blue-50">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
          Is parking available?
          </div>
          <div className="collapse-content">
          <Marquee speed={30}><p className="text-gray-600 px-2">Yes, we provide secure parking facilities for residents. Assigned parking spaces are available for rent. Guests may also use designated visitor parking areas.</p></Marquee>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-blue-50">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
          What utilities are included in the rent?
          </div>
          <div className="collapse-content">
          <Marquee speed={30}><p className="text-gray-600 px-2">Rent includes water and sewer services. Residents are responsible for electricity, gas, and internet/cable services.</p></Marquee>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-blue-50">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
          How do I apply for an apartment?
          </div>
          <div className="collapse-content">
          <Marquee speed={30}><p className="text-gray-600  px-2">To apply for an apartment, please visit our website and confirm agreement from apartment section. Our admin will review your application and contact you regarding next steps.</p></Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
