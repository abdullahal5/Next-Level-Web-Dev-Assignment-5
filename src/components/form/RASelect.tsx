import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  defaultValue?: string | number;
  mode?: "multiple" | undefined;
};

const RASelect = ({
  label,
  name,
  options,
  disabled,
  defaultValue,
  mode,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            mode={mode}
            disabled={disabled}
            size="large"
            {...field}
            options={options}
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
          {error && (
            <small className="text-center text-red-500 font-semibold pt-0.5">
              {error.message}
            </small>
          )}
        </Form.Item>
      )}
    />
  );
};

export default RASelect;
