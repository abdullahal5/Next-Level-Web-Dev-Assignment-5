import Banner from "../../components/home/Banner";
import FeaturedRooms from "../../components/home/FeaturedRooms";
import Service from "../../components/home/Service";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import ScrollToTopButton from "../../components/shared/ScrollToTopButton";

const Home = () => {
  return (
    <div>
      <Banner />
      <Service />
      <FeaturedRooms />
      <WhyChooseUs />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
