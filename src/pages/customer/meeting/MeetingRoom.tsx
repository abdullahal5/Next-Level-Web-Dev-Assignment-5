import { SearchOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import Input from "antd/es/input/Input";
import { useState } from "react";
import RoomCard from "../../../components/ui/RoomCard";
import { useGetAllRoomsQuery } from "../../../redux/features/rooms/roomApi";
import { RoomData } from "../../../types/room.types";
import { FaSpinner } from "react-icons/fa";

const MeetingRoom = () => {
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const {
    data: room,
    isLoading,
    isFetching,
  } = useGetAllRoomsQuery({
    price,
    capacity,
    searchTerm,
    sortOrder,
  });

  const increaseCapacity = () => {
    setCapacity((prev) => prev + 1);
  };

  const decreaseCapacity = () => {
    if (capacity > 1) {
      setCapacity((prev) => prev - 1);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const clearFilters = () => {
    setPrice(0);
    setCapacity(0);
    setSearchTerm("");
    setSortOrder("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <FaSpinner fontSize={"3rem"} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl lg:mx-auto md:mx-5 mx-5">
      <div className="flex lg:flex-row md:flex-row flex-col items-start gap-3 my-3 pt-5">
        <div className="lg:w-80 md:w-80 border shadow sticky p-3 rounded-md mx-auto">
          <div className="pb-3 flex lg:flex-row md:flex-row flex-col items-center justify-between">
            <h1 className="text-xl font-semibold ">Filter</h1>
            <span
              onClick={clearFilters}
              className="bg-gray-100 px-2 py-1 font-semibold rounded-md text-sm cursor-pointer"
            >
              Clear
            </span>
          </div>
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined size={30} />}
            placeholder="Search by room name or keyword"
            style={{ height: "45px" }}
          />
          <div className="pt-7">
            <p className="text-sm font-semibold">
              Filter with price (${price})
            </p>
            <input
              type="range"
              min={50}
              max={1000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="outline-none w-full mt-2"
            />
            <div className="flex items-center justify-between text-sm">
              <p>$50</p>
              <p>$1000</p>
            </div>
          </div>

          <div className="pt-7">
            <p className="text-sm font-semibold">
              Filter with capacity ({capacity} people)
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button style={{ height: "45px" }} onClick={decreaseCapacity}>
                -
              </Button>
              <Select
                value={capacity}
                style={{
                  width: "100px",
                  flex: 1,
                  textAlign: "center",
                  height: "45px",
                }}
                onChange={(value) => setCapacity(value)}
                options={Array.from({ length: 50 }, (_, i) => ({
                  value: i + 1,
                  label: `${i + 1} people`,
                }))}
              />
              <Button style={{ height: "45px" }} onClick={increaseCapacity}>
                +
              </Button>
            </div>
          </div>

          <div className="pt-7">
            <p className="text-sm font-semibold mb-2">Sort by price</p>
            <div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="price"
                  value="ascending"
                  checked={sortOrder === "ascending"}
                  onChange={(e) => setSortOrder(e.target.value)}
                />
                <p>Ascending</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="price"
                  value="descending"
                  checked={sortOrder === "descending"}
                  onChange={(e) => setSortOrder(e.target.value)}
                />
                <p>Descending</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-md mx-auto">
          <div>
            {isLoading || isFetching ? (
              <div className="flex items-center justify-center h-[80vh]">
                <FaSpinner fontSize={"3rem"} className="animate-spin" />
              </div>
            ) : (
              <div>
                {room?.data?.length === 0 || !room ? (
                  <p className="h-[70vh] rounded-md border flex items-center justify-center text-xl font-semibold">
                    No available room
                  </p>
                ) : (
                  <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-3">
                    {room?.data?.map((item: RoomData) => (
                      <div key={item._id}>
                        <RoomCard item={item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
