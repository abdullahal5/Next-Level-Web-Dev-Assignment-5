import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string | number;
  disabled?: boolean;
};

const RAInput = ({ name, type }: TInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <label className="relative cursor-pointer flex items-center focus-within:text-blue-500">
            <input
              type={type}
              placeholder={name}
              {...field}
              id={name}
              className="peer py-2 px-3 w-56 border-gray-400 border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            {error && (
              <small className="text-center text-red-500 font-semibold pt-0.5">
                {error.message}
              </small>
            )}
            <span className="text-md text-gray-400 text-opacity-80 bg-white absolute left-4 top-[60%] transform -translate-y-[69%] px-1 transition-all duration-200 input-text peer-focus:text-blue-500">
              {name}
            </span>
          </label>
        )}
      />
    </>
  );
};

export default RAInput;
