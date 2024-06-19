import { format } from "date-fns";

const AnnouncementCard = ({announcements}) => {
    const dateStr = format(new Date(announcements?.date), 'd MMMM, yyyy');
    return (
        <div className="card mb-5 bg-base-100 border-2 border-amber-600 shadow-amber-600 shadow-md hover:shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-blue-700 text-2xl font-bold">{announcements.title}</h2>
          <p className="text-lg text-black">{announcements.description}</p>
          <p className="text-base text-black font-medium">Announced on {dateStr}</p>
        </div>
      </div>
    );
};

export default AnnouncementCard;