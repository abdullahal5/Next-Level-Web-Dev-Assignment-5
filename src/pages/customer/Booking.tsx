import { useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/features/rooms/roomApi";

const Booking = () => {
  const { id } = useParams();
  const { data: booking } = useGetSingleRoomQuery(id);

  return (
    <div className="max-w-7xl mx-auto">
      <img
        className="w-full h-[300px] object-cover rounded-md mt-5"
        src={booking?.data?.images[0]}
        alt=""
      />
    </div>
  );
};

export default Booking;
