import RAForm from "../../components/form/RAForm";
import RAInput from "../../components/form/RAInput";
import Titlebar from "../../components/ui/Titlebar";
import { useAppSelector } from "../../redux/hook";

const Checkout = () => {
  const data = useAppSelector((state) => state.booking);
  console.log(data);
  window.onbeforeunload = function (event) {
    if (data) {
      event.preventDefault();
      event.returnValue = "";
      return "Are you sure you want to refresh? Your cart data will be lost.";
    }
  };

  const onSubmit = () => {};

  return (
    <div className="max-w-7xl mx-auto">
      <Titlebar title="Confirmation and Payment" />
      <div className="border rounded-md w-[1000px] mx-auto p-5 lg:h-[250px]">
        <h1 className="text-center text-2xl font-semibold py-1">
          User Information
        </h1>
        <RAForm onSubmit={onSubmit}>
          <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-5 mx-5">
            <div className="lg:flex-1 md:flex-1 w-full">
              <RAInput
                type="text"
                disabled
                name="name"
                label="Name"
                defaultValue={data?.name}
              />
            </div>
            <div className="lg:flex-1 md:flex-1 w-full">
              <RAInput
                type="text"
                disabled
                name="email"
                label="Email"
                defaultValue={data?.email}
              />
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-5 mx-5">
            <div className="lg:flex-1 md:flex-1 w-full">
              <RAInput
                type="text"
                disabled
                name="address"
                label="Address"
                defaultValue={data?.address}
              />
            </div>
            <div className="lg:flex-1 md:flex-1 w-full">
              <RAInput
                type="text"
                disabled
                name="phone"
                label="Phone"
                defaultValue={data?.phone}
              />
            </div>
          </div>
        </RAForm>
        <div className="border rounded-md">
          <h1 className="text-center text-2xl font-semibold py-1">
            Order Summary
          </h1>
          <div className="flex items-center center">
            {}
            <div className="w-full lg:w-80">
              <div className="border w-full rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">Pricing Details</p>
                  <p className="text-lg px-2 rounded-full border">
                    {/* {cart?.length} */}
                  </p>
                </div>
                <hr className="my-3" />
                <div>
                  {/* {cart.map((item) => (
                  <div key={item._id}>
                    <div className="flex items-center justify-between text-md space-y-1 text-gray-700">
                      <p>{item.name}</p>
                      <p>{item.orderPrice}</p>
                    </div>
                  </div>
                ))} */}
                </div>
                <hr className="my-3" />
                <p className="flex items-center justify-between font-semibold">
                  <span>Total Price:</span> <span>$232</span>
                </p>
              </div>
              <div className="text-center">
                <button
                  // disabled={cart.length === 0 || isAnyProductZero}
                  className="text-center border rounded-md w-full py-2 hover:text-[#4c9c64] text-white bg-[#4c9c64] hover:bg-white duration-300 border-[#4c9c64] font-semibold mt-4 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
