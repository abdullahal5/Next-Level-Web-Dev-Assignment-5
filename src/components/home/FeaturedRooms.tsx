import { FaSpinner } from "react-icons/fa";
import { useGetAllRoomsQuery } from "../../redux/features/rooms/roomApi";
import RoomCard from "../ui/RoomCard";
import { RoomData } from "../../types/room.types";
import Titlebar from "../ui/Titlebar";

const FeaturedRooms = () => {
  const { data: room, isLoading, isFetching } = useGetAllRoomsQuery({});
  return (
    <div className="max-w-7xl mx-auto pt-7">
      <Titlebar title="Featured Rooms" />
      <div className="pt-6">
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center h-[80vh]">
            <FaSpinner fontSize={"3rem"} className="animate-spin" />
          </div>
        ) : (
          <div>
            {room?.data?.length === 0 || !room ? (
              <p className="h-[70vh] rounded-md flex items-center justify-center text-xl font-semibold">
                No available room
              </p>
            ) : (
              <div className="flex items-center justify-center">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:mx-0 mx-auto md:mx-5 grid-cols-1 gap-3">
                  {room?.data?.slice(0, 6).map((item: RoomData) => (
                    <div key={item._id}>
                      <RoomCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedRooms;
