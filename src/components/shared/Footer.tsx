import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex mx-auto text-center flex-col items-center mb-6 md:mb-0">
            <img
              src="https://i.ibb.co/2gcCpFb/images-removebg-preview.png"
              alt="Hotel Relax"
              className="w-24 mb-3"
            />
            <h1 className="text-2xl font-bold text-white mb-2">Hotel Relax</h1>
            <p className="text-center max-w-xs text-sm">
              Your trusted platform for finding the perfect room. Book your stay
              with ease and relax in comfort!
            </p>
          </div>

          <div className="flex flex-col items-center mx-auto text-center text-sm mb-6 md:mb-0">
            <h5 className="font-semibold text-white text-2xl mb-2">
              Quick Links
            </h5>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/rooms" className="hover:text-white transition-colors">
                  Rooms
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center mx-auto text-center mb-6 md:mb-0">
            <h5 className="font-semibold text-white text-2xl mb-2">
              We Accept
            </h5>
            <div className="flex items-center gap-1">
              <img
                src="https://i.ibb.co.com/s2yss0p/image-41.png"
                alt="Payment Method"
                className="w-10 rounded-md"
              />
              <img
                src="https://i.ibb.co.com/CVmMd7f/image-43.png"
                alt="Payment Method"
                className="w-10 rounded-md"
              />
              <img
                src="https://i.ibb.co.com/Dp7NPhJ/image-42.png"
                alt="Payment Method"
                className="w-10 rounded-md"
              />
              <img
                src="https://i.ibb.co.com/Rj6FPqb/image-42525-1643965434-removebg-preview.png"
                alt="Payment Method"
                className="w-10 rounded-md bg-white"
              />
              <img
                src="https://i.ibb.co.com/DCLvqFf/images-removebg-preview-1.png"
                alt="Payment Method"
                className="w-10 rounded-md bg-white object-cover py-1"
              />
            </div>
          </div>

          <div className="flex flex-col items-center mx-auto text-center">
            <div className="mb-8 text-center text-sm">
              <h5 className="font-semibold text-white text-2xl mb-2">
                Contact Us
              </h5>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@hotelrelax.com"
                  className="hover:text-blue-400"
                >
                  info@hotelrelax.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+123456789" className="hover:text-blue-400">
                  +123 456 789
                </a>
              </p>
              <p>Address: 123 Relax St, Comfort City, Country</p>
            </div>

            <h5 className="font-semibold text-white text-2xl mb-2">
              Subscribe to our Newsletter
            </h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md border border-gray-600 bg-gray-800 text-gray-300 focus:outline-none"
              />
              <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-r-md hover:bg-yellow-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-3 mt-6">
          <a
            target="_blank"
            href="https://facebook.com"
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            target="_blank"
            href="https://twitter.com"
            className="text-gray-400 hover:text-white"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            target="_blank"
            href="https://instagram.com"
            className="text-gray-400 hover:text-white"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>

        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-6">
          <p>
            &copy; {new Date().getFullYear()} Hotel Relax. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
