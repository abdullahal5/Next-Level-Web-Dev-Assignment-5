import { useState } from "react";
import { Link } from "react-router-dom";
import { RoomCardProps } from "../../types/room.types";

export type roomData = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: [string];
  isDeleted: boolean;
  capacity: number;
  images: [string];
};

const RoomCard: React.FC<RoomCardProps> = ({ item }) => {
  const [activeImage, setActiveImage] = useState(0);

  const images = item.images.slice(0, 3);

  const handlePrevImage = () => {
    setActiveImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNextImage = () => {
    setActiveImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };
  return (
    <div className="max-w-lg lg:mx-auto md:mx-auto flex flex-col md:flex-row shadow items-start overflow-hidden p-5 rounded-md gap-5 group bg-white border mx-5 lg:w-full md:w-full w-80">
      <div className="flex-1 flex justify-center rounded-md overflow-hidden relative">
        <img
          src={images[activeImage]}
          alt={"hotel"}
          className="object-cover lg:w-full md:w-full w-72 mx-auto lg:h-[148px] md:h-[148px] h-44 transform group-hover:scale-110 duration-300"
        />
        <div className="absolute inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePrevImage}
            className="text-white bg-black bg-opacity-40 p-2 rounded-full duration-300"
          >
            &#10094;
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleNextImage}
            className="text-white bg-black bg-opacity-40 p-2 rounded-full duration-300"
          >
            &#10095;
          </button>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`w-2 h-2 rounded-full ${
                idx === activeImage ? "bg-blue-500" : "bg-gray-300"
              } hover:bg-blue-400 transition-colors duration-200`}
            />
          ))}
        </div>
      </div>

      <div className="md:w-1/2 w-full lg:text-left md:text-left text-center flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{item?.name}</h2>
          <p className="text-gray-600 mt-2">
            Capacity: {item?.capacity} people
          </p>
          <p className="text-gray-600 mt-2">
            Price Per Slot: ${item?.pricePerSlot}
          </p>
        </div>
        <div className="mt-4 lg:text-left md:text-left text-center">
          <Link to={`/meeting-rooms/${item?._id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-300 font-semibold">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
