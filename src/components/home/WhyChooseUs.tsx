import Titlebar from "../ui/Titlebar";
import Stepper from "./Stepper";

const WhyChooseUs = () => {
  return (
    <div className="lg:pt-12 md:pt-10 max-w-7xl lg:mx-auto md:mx-auto mx-5 space-y-16">
      <Titlebar title="Why Choose Us?" />
      
      <div className="flex gap-10 lg:flex-row md:flex-row flex-col items-center justify-around p-8 bg-gradient-to-r from-blue-50 to-gray-100 rounded-lg shadow-md">
        <div className="lg:max-w-md md:w-[60%] text-center lg:text-left md:text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Secure <span className="text-blue-600">Transactions</span>
          </h1>
          <p className="text-base text-gray-700 leading-relaxed">
            We have integrated Amar Pay, a trusted and reliable payment gateway in Bangladesh. Amar Pay offers a seamless payment experience, supporting a wide range of payment methods including mobile banking, credit/debit cards, and bank transfers. Whether you're making a payment online or through your mobile, Amar Pay ensures a smooth and secure transaction process.
          </p>
        </div>
        <div className="lg:w-[440px] md:w-[440px] px-3 mx-auto lg:h-[250px] md:h-[250px]">
          <iframe
            src="https://www.youtube.com/embed/gwntHc3UTUk?si=LFtQvd3EHoWTlThi"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="rounded-lg shadow-xl w-full h-full hover:scale-105 transition-transform"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="lg:flex-row md:flex-row flex-col flex items-center justify-around bg-white p-8 rounded-lg">
        <div className="lg:w-[500px] md:w-[500px]">
          <img
            src="https://i.ibb.co/z6RNQw5/appointment-booking-mobile-concept.png"
            className="w-full rounded-md hover:scale-105 transition-transform"
            alt="Seamless Booking Experience"
          />
        </div>
        <div className="lg:w-[35%] md:w-[40%] w-full text-center space-y-6 mt-8 lg:mt-0">
          <h1 className="text-3xl font-semibold">
            Seamless <span className="text-blue-500">Booking</span> Experience
          </h1>
          <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700">
            <li className="text-[16px]">
              <label className="font-semibold text-gray-900">
                How easy is it to find the perfect room?
              </label>{" "}
              <p>
                Our intuitive search and filter options make finding the ideal space a breeze.
              </p>
            </li>
            <li className="text-[16px]">
              <label className="font-semibold text-gray-900">
                Worried about booking confusion?
              </label>{" "}
              <p>
                Our real-time availability ensures you always get the slot you need, hassle-free.
              </p>
            </li>
            <li className="text-[16px]">
              <label className="font-semibold text-gray-900">
                Need flexible payment options?
              </label>{" "}
              <p>
                Choose from a variety of secure payment methods to suit your needs.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <Stepper />
    </div>
  );
};

export default WhyChooseUs;
