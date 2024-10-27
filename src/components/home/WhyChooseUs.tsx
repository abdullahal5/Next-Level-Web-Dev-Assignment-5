import { FaCreditCard, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import Titlebar from "../ui/Titlebar";
import Stepper from "./Stepper";

const WhyChooseUs: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <Titlebar title="Why Choose Us?" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-gradient-to-r from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300 ">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Secure <span className="text-blue-600 dark:text-blue-400">Transactions</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We have integrated Amar Pay, a trusted and reliable payment gateway in Bangladesh. Amar Pay offers a seamless payment experience, supporting a wide range of payment methods including mobile banking, credit/debit cards, and bank transfers.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="text-green-500 text-2xl" />
                <span className="text-gray-700 dark:text-gray-300">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMobileAlt className="text-blue-500 text-2xl" />
                <span className="text-gray-700 dark:text-gray-300">Mobile-friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCreditCard className="text-purple-500 text-2xl" />
                <span className="text-gray-700 dark:text-gray-300">Multiple payment options</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative aspect-video rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <iframe
                src="https://www.youtube.com/embed/gwntHc3UTUk?si=LFtQvd3EHoWTlThi"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Seamless <span className="text-blue-500">Booking</span> Experience
            </h2>
            <ul className="space-y-4">
              {[
                { question: "How easy is it to find the perfect room?", answer: "Our intuitive search and filter options make finding the ideal space a breeze." },
                { question: "Worried about booking confusion?", answer: "Our real-time availability ensures you always get the slot you need, hassle-free." },
                { question: "Need flexible payment options?", answer: "Choose from a variety of secure payment methods to suit your needs." },
              ].map((item, index) => (
                <li key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://i.ibb.co/z6RNQw5/appointment-booking-mobile-concept.png"
              className="w-full rounded-lg transition-transform duration-300 hover:scale-105"
              alt="Seamless Booking Experience"
            />
          </div>
        </div>

        <Stepper />
      </div>
    </div>
  );
};

export default WhyChooseUs;