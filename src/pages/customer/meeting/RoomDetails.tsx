import { Button } from "antd";
import {
  FaDoorOpen,
  FaUsers,
  FaBuilding,
  FaDollarSign,
  FaSpinner,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../../redux/features/rooms/roomApi";
import { RoomDetailsType } from "../../../types/room.types";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: roomDetails, isFetching } = useGetSingleRoomQuery(id);
  const roomData: RoomDetailsType | undefined = roomDetails?.data;

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <FaSpinner fontSize={"3rem"} className="animate-spin" />
      </div>
    );
  }

  const renderUnderImages = () => {
    if (!roomData?.images || roomData.images.length <= 1) return null;

    const imagesToShow =
      roomData.images.length <= 3
        ? roomData.images.slice(1)
        : roomData.images.slice(1, 4);

    return (
      <div className="flex gap-3 items-center w-full pt-3">
        {imagesToShow.map((image, idx) => (
          <img
            key={idx}
            src={image}
            className="object-cover rounded-md"
            alt={`Room ${idx + 2}`}
            style={{
              width: `calc((100% - 2 * 0.75rem) / ${imagesToShow.length})`,
            }}
          />
        ))}
      </div>
    );
  };

  const renderRightImages = () => {
    if (!roomData?.images || roomData.images.length <= 4) return null;

    return (
      <div className="flex flex-col gap-3 w-[200px]">
        {roomData.images.slice(4).map((image, idx) => (
          <img
            key={idx}
            src={image}
            className="object-cover rounded-md w-full h-full"
            alt={`Room ${idx + 5}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start gap-4">
        <div className="mx-auto">
          <div className="mt-5 flex gap-3 lg:mx-0 md:mx-0 mx-5">
            <div className="w-[500px]">
              <div>
                <img
                  className="rounded-md object-cover w-full"
                  src={roomData?.images[0]}
                  alt="Main Room"
                />
              </div>
              {renderUnderImages()}
            </div>
            {renderRightImages()}
          </div>
        </div>
        <div className="px-10 py-3 mx-auto bg-gray-50 mt-5 rounded-lg shadow-inner">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            {roomData?.name}
          </h1>
          <div className="space-y-5">
            <div className="flex border p-3 rounded-md items-center gap-3 text-gray-700">
              <FaDoorOpen className="text-gray-600" />
              <div>
                <span className="font-semibold">Room No:</span>
                <span className="text-lg text-gray-900 ml-2">
                  {roomData?.roomNo}
                </span>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md gap-3 text-gray-700">
              <FaUsers className="text-gray-600" />
              <div>
                <span className="font-semibold">Capacity:</span>
                <span className="text-lg text-gray-900 ml-2">
                  {roomData?.capacity}
                </span>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md gap-3 text-gray-700">
              <FaBuilding className="text-gray-600" />
              <div>
                <span className="font-semibold">Floor No:</span>
                <span className="text-lg text-gray-900 ml-2">
                  {roomData?.floorNo}
                </span>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md gap-3 text-gray-700">
              <FaDollarSign className="text-gray-600" />
              <div>
                <span className="font-semibold">Price per slot:</span>
                <span className="text-lg text-gray-900 ml-2">
                  ${roomData?.pricePerSlot}
                </span>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md gap-3 text-gray-700">
              <div>
                <span className="text-lg text-gray-900 gap-2 ml-2 flex items-center justify-center">
                  {roomData?.amenities.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className="text-sm items-center justify-center mx-auto bg-gray-200 px-2 py-1 rounded-md gap-2"
                      >
                        {item}
                      </div>
                    );
                  })}
                </span>
              </div>
            </div>
            <Button
              type="primary"
              className="w-full h-12 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
