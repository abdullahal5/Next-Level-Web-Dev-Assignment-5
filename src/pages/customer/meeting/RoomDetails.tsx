import { Button } from "antd";
import {
  FaDoorOpen,
  FaUsers,
  FaBuilding,
  FaDollarSign,
  FaSpinner,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../../redux/features/rooms/roomApi";
import { RoomDetailsType } from "../../../types/room.types";

const RoomDetails = () => {
  const { id } = useParams<{ id: string | undefined }>();
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
            className="object-cover rounded-md border h-full w-full"
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
      <div className="flex flex-col gap-3 w-full md:w-[200px]">
        {roomData.images.slice(4).map((image, idx) => (
          <img
            key={idx}
            src={image}
            className="object-cover border rounded-md w-full h-full"
            alt={`Room ${idx + 5}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Image section */}
        <div className="w-full lg:w-[500px] mx-auto">
          <div className="mt-5 flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-[500px]">
              <img
                className="rounded-md border object-cover w-full"
                src={roomData?.images[0]}
                alt="Main Room"
              />
              {renderUnderImages()}
            </div>
            {renderRightImages()}
          </div>
        </div>

        {/* Details section */}
        <div className="px-5 lg:px-10 py-3 bg-gray-50 mt-5 lg:mt-0 rounded-lg shadow-inner flex-grow">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 lg:mb-6">
            {roomData?.name}
          </h1>

          <div className="space-y-4 lg:space-y-5">
            {/* Room Number */}
            <div className="flex border p-3 rounded-md items-center gap-3 text-gray-700">
              <FaDoorOpen className="text-gray-600" />
              <div>
                <span className="font-semibold">Room No:</span>
                <span className="text-lg text-gray-900 ml-2">
                  {roomData?.roomNo}
                </span>
              </div>
            </div>

            {/* Capacity */}
            <div className="flex items-center border p-3 rounded-md gap-3 text-gray-700">
              <FaUsers className="text-gray-600" />
              <div>
                <span className="font-semibold">Capacity:</span>
                <span className="text-lg text-gray-900 ml-2">
                  {roomData?.capacity}
                </span>
              </div>
            </div>

            {/* Floor Number */}
            <div className="flex items-center border p-3 rounded-md gap-3 text-gray-700">
              <FaBuilding className="text-gray-600" />
              <div>
                <span className="font-semibold">Floor No:</span>
                <span className="text-lg text-gray-900 ml-2">
                  {roomData?.floorNo}
                </span>
              </div>
            </div>

            {/* Price per Slot */}
            <div className="flex items-center border p-3 rounded-md gap-3 text-gray-700">
              <FaDollarSign className="text-gray-600" />
              <div>
                <span className="font-semibold">Price per slot:</span>
                <span className="text-lg text-gray-900 ml-2">
                  ${roomData?.pricePerSlot}
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap items-center border p-3 rounded-md gap-2 text-gray-700">
              {roomData?.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="text-sm font-semibold items-center bg-gray-200 px-2 py-1 rounded-md"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Book Now Button */}
            <Link to={`/meeting-rooms/${id}/booking`}>
              <Button
                type="primary"
                className="w-full h-12 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
