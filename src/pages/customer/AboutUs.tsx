import Titlebar from "../../components/ui/Titlebar";

const AboutUs = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[url('https://i.ibb.co/mbKGYHg/competent-team-with-thumbs-up.jpg')] bg-cover w-full h-[400px] bg-no-repeat bg-center mt-5 rounded-lg bg-fixed py-10">
          <div className="absolute inset-0 bg-black/70 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
            <h1 className="text-4xl font-semibold text-white mb-8">ABOUT US</h1>
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-col flex-col items-start justify-center">
          <div className="pt-8 py-4 lg:w-[50%] mx-5">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="space-y-2 text-gray-700">
              Our mission is to deliver excellence by providing the highest
              quality products and services that meet the evolving needs of our
              customers. We are driven by innovation, continuously improving our
              offerings to stay ahead in the industry and bring the latest
              solutions to our customers. With a customer-centric approach, we
              place our customers at the heart of everything we do, ensuring
              their satisfaction and success with our products. We are also
              committed to sustainability, engaging in practices that positively
              contribute to our community and the environment. Integrity and
              trust are the foundations of our company, and we uphold the
              highest standards in all our relationships, building lasting trust
              with our customers, partners, and employees.
            </p>
          </div>
          <div className="flex-1">
            <img
              className="w-[400px] mx-auto"
              src="https://i.ibb.co/VB9p5B4/6152022-general2-14.jpg"
              alt=""
            />
          </div>
        </div>
        <div>
          <Titlebar title="Meet My Team" />
          <p className="text-sm text-center lg:mx-60 md:mx-60">
            Our team is the heart of our success, bringing together diverse
            talents and expertise to drive our vision forward. Meet the
            passionate individuals who are dedicated to delivering excellence in
            everything we do.
          </p>
          <div className="pt-10 mx-5 flex lg:flex-row md:flex-col flex-col items-start text-center gap-5">
            <img
              className="rounded-md grayscale hover:grayscale-0 duration-300 cursor-cell mx-auto"
              src="https://i.ibb.co/ZKhhTcv/business-people-posing-together-office.jpg"
              alt=""
            />
            <div className="text-center">
              <h1 className="text-3xl font-semibold">Our Team</h1>
              <p className="mt-4 text-zinc-900">
                At KeyNest, our team is a group of passionate individuals with a
                shared love for keyboards and technology. From design to
                customer support, every member plays a crucial role in ensuring
                that we provide the best possible products and services to our
                customers. Our diverse team brings together a wide range of
                skills and expertise, allowing us to innovate and push the
                boundaries of what a keyboard can be. We are committed to
                creating a community where quality and customer satisfaction are
                at the forefront of everything we do. Our designers are
                constantly exploring new materials and techniques to craft
                keyboards that are not only functional but also aesthetically
                pleasing. Our engineers work tirelessly to ensure that every
                product meets the highest standards of performance and
                reliability. Meanwhile, our customer support team is dedicated
                to assisting our customers at every step of their journey, from
                selecting the perfect keyboard to providing after-sales service.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="relative bg-[url('https://i.ibb.co/0qwHMXW/silhouette-confident-businesspeople.jpg')] bg-cover w-full h-[400px] bg-no-repeat mt-5 rounded-lg bg-fixed py-10">
            <div className="absolute inset-0 bg-black/70 rounded-lg"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
              <h1 className="text-4xl font-semibold text-white mb-8">
                ABOUT US
              </h1>
              <p className="text-white">
                KeyNest began with a simple idea: to create high-quality
                keyboards that cater to enthusiasts and professionals alike. Our
                journey started in a small workshop where a few keyboard lovers
                came together to craft custom keyboards for friends and local
                communities. As our passion grew, so did our vision. We realized
                that there was a demand for keyboards that not only perform
                exceptionally but also offer a unique and personalized
                experience. Over the years, we've expanded our team and
                capabilities, but our core values have remained the same. We are
                committed to innovation, quality, and customer satisfaction.
                Every keyboard we create is a testament to our dedication and
                love for the craft. From sourcing the finest materials to
                implementing cutting-edge technology, we strive to push the
                boundaries of what a keyboard can be. Today, KeyNest is more
                than just a brand; it's a community of keyboard enthusiasts who
                share our passion. We are proud of our roots and excited about
                the future as we continue to innovate and inspire keyboard
                lovers around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
