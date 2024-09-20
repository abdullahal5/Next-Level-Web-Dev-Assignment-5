import { Form, Input } from "antd";
import { ReactNode, useState } from "react";
import { Controller } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string | number | null;
  disabled?: boolean;
  iconPosition?: "prefix" | "suffix";
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  placeholder?: string;
};

const RAInput = ({
  name,
  type,
  label,
  disabled,
  defaultValue,
  prefixIcon,
  iconPosition = "prefix",
  placeholder,
}: TInputProps) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="mb-5">
      <Controller
        name={name}
        defaultValue={defaultValue ?? undefined}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Form.Item label={label}>
            {type === "textarea" ? (
              <TextArea
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                placeholder={placeholder}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            ) : (
              <Input
                size="large"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="border h-11 w-full"
                type={inputType}
                disabled={disabled}
                id={name}
                prefix={iconPosition === "prefix" ? prefixIcon : null}
                placeholder={placeholder}
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
            )}
            {error && (
              <small className="text-center text-red-500 font-semibold">
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
