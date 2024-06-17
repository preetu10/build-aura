
const SectionHeading = ({heading,subheading}) => {
    return (
        <div className="px-2">
            <div className="border-2 border-y-amber-600 border-x-0 my-5 py-5 max-w-4xl mx-auto px-2">
            <h1 className="text-center  font-bold text-3xl ">{heading}</h1>
            <p className="text-center text-lg text-gray-600 mt-2">{subheading}</p>
            </div>
        </div>
    ); 
};

export default SectionHeading;