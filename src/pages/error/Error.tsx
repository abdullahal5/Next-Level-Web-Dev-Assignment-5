import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl max-w-md">
        {/* GIF Image */}
        <img
          src="https://i.ibb.co/CH9gqMq/SVG-Animation-404-Page.gif"
          alt="Error Animation"
          className="w-80 mx-auto mb-6 transition-transform duration-300 hover:scale-105"
        />
        <h1 className="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
          Oops!
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Something Went Wrong
        </h2>
        <p className="text-md text-gray-600 mb-4">
          We apologize for the inconvenience. Please try again later.
        </p>
        <p className="text-lg text-gray-700 italic mb-6">
          Best wishes from all of us at <span className="font-semibold">Hotel Relax</span>!
        </p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 hover:scale-105 transform transition-transform duration-200 ease-in-out shadow-md">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
