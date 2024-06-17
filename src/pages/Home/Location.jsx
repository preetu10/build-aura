import SectionHeading from "../shared/SectionHeading";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
const Location = () => {
    const position=[22.35, 91.821667];
  return (
    <div className="my-10">
      <SectionHeading
        heading={"Where Is It Located?"}
        subheading={
          "Easily Accessible and Conveniently Situated in the Heart of the City"
        }
      ></SectionHeading>

      <div className="">

      <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={false}
      style={{height:500,width:"100%"}}
      >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  <Marker position={position}>
    <Popup>
     BuildAura Apartment, Building No-108, Beside Highway Plaza <br /> LalKhan Bazar, Chittagong, Bangladesh
    </Popup>
  </Marker>
</MapContainer>
      </div>
    </div>
  );
};

export default Location;
