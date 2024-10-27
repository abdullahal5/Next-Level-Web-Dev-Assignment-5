import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";

const Links = [
  { path: "/", name: "Home" },
  { path: "/meeting-rooms", name: "Meeting Rooms" },
  { path: "/about", name: "About Us" },
  { path: "/contact", name: "Contact Us" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          {user?.role === "user" ? (
            <Link to={`/${user?.role}/my-bookings`}>My Bookings</Link>
          ) : (
            <Link to={`/${user?.role}/dashboard`}>Dashboard</Link>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <p onClick={() => dispatch(logout())}>Logout</p>
        </>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-shadow duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-lg font-bold flex items-center">
              <img
                src="https://i.ibb.co.com/2gcCpFb/images-removebg-preview.png"
                className="w-16 pr-1"
                alt=""
              />
              Hotel <span className="text-blue-600 pl-2">Relax</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-7">
            {Links.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-600 px-2 py-1"
                    : "text-zinc-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Dropdown trigger={["click"]} menu={{ items }} placement="bottom">
                <Button
                  style={{
                    border: "none",
                    padding: 0,
                    borderRadius: "50%",
                    width: 45,
                    height: 45,
                    overflow: "hidden",
                  }}
                  type="text"
                >
                  <Avatar
                    size={45} // Avatar size
                    src={user?.profileImage} // Avatar image
                    style={{ borderRadius: "50%" }} // Ensure Avatar is round
                  />
                </Button>
              </Dropdown>
            ) : (
              <div className="lg:block md:block hidden">
                <div className="flex items-center font-medium">
                  <Link
                    className={`rounded-md text-base font-medium ${
                      location.pathname === "/auth"
                        ? "bg-blue-100 text-blue-600 px-2 py-1"
                        : "text-zinc-900"
                    }`}
                    to="/auth"
                  >
                    Login/Register
                  </Link>
                </div>
              </div>
            )}

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 lg:hidden focus:outline-none"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white p-4 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="text-blue-600 mb-4 focus:outline-none"
            onClick={closeSidebar}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="space-y-3">
            {Links.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`block border text-blue-600 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path ? "bg-blue-100" : "bg-white"
                }`}
                onClick={closeSidebar}
              >
                {item.name}
              </Link>
            ))}
            <Link
              className={`block border text-blue-600 px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/auth" ? "bg-blue-100" : "bg-white"
              }`}
              to="/auth"
            >
              Login/Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
