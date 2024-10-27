import { useState, useEffect } from 'react';
import { FiChevronUp, FiAward, FiUsers, FiHeart, FiGlobe } from 'react-icons/fi';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <FiChevronUp className="h-6 w-6" />
    </button>
  );
};

const Titlebar: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 relative">
    <span className="bg-gray-50 px-4 relative z-10">{title}</span>
    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-200 -z-10"></div>
  </h2>
);

const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('mission');

  return (
    <div className="bg-gray-50 min-h-screen">
      <ScrollToTopButton />
      <div className="max-w-7xl mx-auto p-6">
        <div className="relative bg-[url('https://i.ibb.co/mbKGYHg/competent-team-with-thumbs-up.jpg')] bg-cover w-full h-[500px] rounded-lg bg-fixed py-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-start justify-center h-full text-left p-12 space-y-4">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
              About <span className="text-blue-400">KeyNest</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-lg">
              Discover the passion behind our keyboards and our commitment to quality.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-400 transition-colors duration-300 transform hover:scale-105">
              Explore Our Story
            </button>
          </div>
        </div>

        <div className="mt-16">
          <Titlebar title="Our Essence" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                <div className="flex space-x-4 mb-4">
                  <button
                    className={`px-4 py-2 rounded-full ${
                      activeTab === 'mission'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } transition-colors duration-300`}
                    onClick={() => setActiveTab('mission')}
                  >
                    Our Mission
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full ${
                      activeTab === 'vision'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } transition-colors duration-300`}
                    onClick={() => setActiveTab('vision')}
                  >
                    Our Vision
                  </button>
                </div>
                {activeTab === 'mission' ? (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                      At KeyNest, we strive to deliver high-quality keyboards tailored for enthusiasts and professionals. Our mission is to innovate continually, ensuring every product meets the highest standards of performance and design.
                    </p>
                    <ul className="list-none space-y-2">
                      {['Exceptional craftsmanship', 'Personalized experiences', 'Eco-friendly practices'].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <FiAward className="text-blue-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">Our Vision</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We envision a world where every keystroke is a delightful experience. KeyNest aims to be at the forefront of keyboard innovation, setting new standards in the industry and fostering a global community of keyboard enthusiasts.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                src="https://i.ibb.co/VB9p5B4/6152022-general2-14.jpg"
                alt="Teamwork"
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Titlebar title="Our Values" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FiAward, title: "Innovation", content: "Pushing boundaries to create cutting-edge designs." },
              { icon: FiHeart, title: "Quality", content: "Crafting with the finest materials and utmost precision." },
              { icon: FiUsers, title: "Community", content: "Fostering connections among keyboard enthusiasts." },
              { icon: FiGlobe, title: "Sustainability", content: "Committed to eco-friendly practices for a better future." }
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                <value.icon className="text-4xl text-blue-500 mb-4" />
                <h3 className="font-bold text-xl text-blue-600 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Titlebar title="Meet Our Team" />
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <img
                className="rounded-lg shadow-xl w-full transition-transform duration-300 transform hover:scale-105"
                src="https://i.ibb.co/ZKhhTcv/business-people-posing-together-office.jpg"
                alt="Our Team"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-blue-600">Passionate Innovators</h3>
              <p className="text-gray-700 leading-relaxed">
                From our innovative designers to our dedicated customer support, each team member plays a vital role in making KeyNest a leader in keyboard technology. We are driven by a shared love for keyboards and a commitment to excellence.
              </p>
              <ul className="space-y-2">
                {['Innovative designers', 'Skilled engineers', 'Customer-focused support team'].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FiUsers className="text-blue-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-400 transition-colors duration-300 transform hover:scale-105">
                Join Our Team
              </button>
            </div>
          </div>
        </div>

        <div className="my-16">
          <div className="relative bg-[url('https://i.ibb.co/0qwHMXW/silhouette-confident-businesspeople.jpg')] bg-cover w-full h-[400px] rounded-lg bg-fixed py-10">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 rounded-lg"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
              <h2 className="text-4xl font-bold text-white mb-4">Join Our Community</h2>
              <p className="text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Be part of a growing community of keyboard enthusiasts. Share your passion, learn from others, and help shape the future of keyboard technology.
              </p>
              <button className="mt-4 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;