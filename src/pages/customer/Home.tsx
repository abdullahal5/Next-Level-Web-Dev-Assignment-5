import Banner from "../../components/home/Banner";
import Service from "../../components/home/Service";
import Navbar from "../../components/shared/Navbar";

const Home = () => {
  return (
    <div className="h-[200vh]">
      <Navbar />
      <Banner />
      <Service />
    </div>
  );
};

export default Home;
