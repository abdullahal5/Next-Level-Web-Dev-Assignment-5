import { FaCalendarAlt, FaCheckCircle, FaClock, FaHeadset } from 'react-icons/fa';

const serviceData = [
  {
    headline: "Real-Time Availability",
    text: "View available rooms instantly.",
    icon: <FaCalendarAlt />,
    bgColor: "bg-lime-100",
  },
  {
    headline: "Instant Confirmation",
    text: "Book now, get confirmed.",
    icon: <FaCheckCircle />,
    bgColor: "bg-yellow-100",
  },
  {
    headline: "Flexible Scheduling",
    text: "Schedule meetings at your pace.",
    icon: <FaClock />,
    bgColor: "bg-sky-100",
  },
  {
    headline: "24/7 Support",
    text: "Help is always available.",
    icon: <FaHeadset />,
    bgColor: "bg-rose-100",
  },
];

const Service = () => {
  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 border border-gray-200 mt-10 py-12 px-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Our <span className="text-blue-600">Premium</span> Services
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {serviceData.map((item, idx) => (
          <div
            key={idx}
            className="group border border-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-60 h-48 flex flex-col items-center justify-between transition-transform duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div
                className={`${item.bgColor} w-14 h-14 rounded-full p-3 mb-4 group-hover:scale-105 transition-all duration-300 flex items-center justify-center text-blue-600`}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {item.headline}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
