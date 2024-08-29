import { useState, useRef } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const Sidebar = () => {
  const [isSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const roomManagementRef = useRef<HTMLDivElement>(null);
  const slotManagementRef = useRef<HTMLDivElement>(null);
  const bookManagementRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.auth);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const getHeight = (ref: React.RefObject<HTMLDivElement>) => {
    return ref.current ? `${ref.current.scrollHeight}px` : "0px";
  };

  return (
    <div>
      <div
        className={`w-64 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`h-screen left-0 w-64 bg-gray-100 p-4 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-3 pt-8">
            <div>
              <button
                onClick={() => toggleDropdown("roomManagement")}
                className="w-full flex items-center gap-1 text-left border text-blue-600 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
              >
                {openDropdown === "roomManagement" ? (
                  <FaAngleUp />
                ) : (
                  <FaAngleDown />
                )}{" "}
                Room Management
              </button>
              <div
                ref={roomManagementRef}
                style={{
                  height:
                    openDropdown === "roomManagement"
                      ? getHeight(roomManagementRef)
                      : "0px",
                }}
                className={`overflow-hidden transition-all duration-300`}
              >
                <div className="pl-4 space-y-2">
                  <Link
                    to={`/${user?.role}/dashboard/create-room`}
                    className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Create room
                  </Link>
                  <Link
                    to={`/${user?.role}/dashboard/get-room`}
                    className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Get All Rooms
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => toggleDropdown("slotManagement")}
                className="w-full flex items-center gap-1 text-left border text-blue-600 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
              >
                {openDropdown === "slotManagement" ? (
                  <FaAngleUp />
                ) : (
                  <FaAngleDown />
                )}{" "}
                Slot Management
              </button>
              <div
                ref={slotManagementRef}
                style={{
                  height:
                    openDropdown === "slotManagement"
                      ? getHeight(slotManagementRef)
                      : "0px",
                }}
                className={`overflow-hidden transition-all duration-300`}
              >
                <div className="pl-4 space-y-2">
                  <Link
                    to={`/${user?.role}/dashboard/create-slot`}
                    className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Create Slot
                  </Link>
                  <Link
                    to={`/${user?.role}/dashboard/get-slot`}
                    className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Get Slot
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => toggleDropdown("bookMangement")}
                className="w-full flex items-center gap-1 text-left border text-blue-600 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
              >
                {openDropdown === "bookMangement" ? (
                  <FaAngleUp />
                ) : (
                  <FaAngleDown />
                )}{" "}
                Book Management
              </button>
              <div
                ref={bookManagementRef}
                style={{
                  height:
                    openDropdown === "bookMangement"
                      ? getHeight(bookManagementRef)
                      : "0px",
                }}
                className={`overflow-hidden transition-all duration-300`}
              >
                <div className="pl-4 space-y-2">
                  <Link
                    to="/slot-management/create"
                    className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Create
                  </Link>
                  <Link
                    to="/slot-management/update"
                    className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Update
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
