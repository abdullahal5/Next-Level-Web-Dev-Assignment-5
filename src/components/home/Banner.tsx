import videobg from "../../assets/6466564-hd_1366_720_25fps.mp4";

const Banner = () => {
  return (
    <div className="relative">
      <video
        className="h-screen object-cover w-full"
        src={videobg}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white space-y-5 drop-shadow-2xl lg:px-0 md:px-0 px-5">
          {" "}
          <h1 className="lg:text-5xl md:text-5xl text-4xl font-semibold">
            Book Your Ideal Meeting Room with Ease.
          </h1>
          <p className=" text-xl">
            Efficient, hassle-free room booking for all your meeting needs.
          </p>
          <button className="bg-blue-600 text-white px-7 py-2 rounded-md font-semibold">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
