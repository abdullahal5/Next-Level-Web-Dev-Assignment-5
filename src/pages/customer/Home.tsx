import Banner from "../../components/home/Banner";
import FeaturedRooms from "../../components/home/FeaturedRooms";
import Service from "../../components/home/Service";
import WhyChooseUs from "../../components/home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <Service />
      <FeaturedRooms />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
