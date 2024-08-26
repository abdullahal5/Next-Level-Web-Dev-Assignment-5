import { Form, Input } from "antd";
import { ReactNode, useState } from "react";
import { Controller } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  iconPosition?: "prefix" | "suffix";
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
};

const RAInput = ({
  name,
  type,
  label,
  disabled,
  defaultValue,
  prefixIcon,
  iconPosition = "prefix",
}: TInputProps) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="mb-5 gird grid-cols-2">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              size="large"
              {...field}
              className="border h-11"
              type={inputType}
              disabled={disabled}
              id={name}
              defaultValue={defaultValue}
              prefix={iconPosition === "prefix" ? prefixIcon : null}
              suffix={
                type === "password" ? (
                  <div onClick={togglePasswordVisibility}>
                    {inputType === "password" ? (
                      <EyeInvisibleOutlined />
                    ) : (
                      <EyeTwoTone />
                    )}
                  </div>
                ) : null
              }
            />
            {error && (
              <small className="text-center text-red-500 font-semibold pt-0.5">
                {error.message}
              </small>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default RAInput;
