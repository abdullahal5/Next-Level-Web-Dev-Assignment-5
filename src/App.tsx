import RAInput from "./components/form/RAInput";


const App = () => {
  return (
    <div className="App h-screen flex justify-center items-center">
      <label className="relative cursor-pointer flex items-center focus-within:text-blue-500">
        <input
          type="text"
          placeholder="Username"
          className="peer py-2 px-3 w-56 border-gray-400 border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-md text-gray-400 text-opacity-80 bg-white absolute left-4 top-[60%] transform -translate-y-[69%] px-1 transition-all duration-200 input-text peer-focus:text-blue-500">
          Username
        </span>
      </label>
    </div>
  );
};

export default App;
