import { DatePicker, Form } from "antd";
import moment from "moment";
import { Controller } from "react-hook-form";

type TInputDatePickerProps = {
  name: string;
  label?: string;
  defaultValue?: string | number | undefined;
};

const RADatePicker = ({ name, label, defaultValue }: TInputDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              size="large"
              {...field}
              value={field.value ? moment(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : null)
              } 
              id={name}
              style={{ width: "100%" }}
            />
            {error && (
              <small className="text-center text-red-500 font-semibold pt-0.5">
                {error.message}
              </small>
            )}
          </Form.Item>
        )}
        defaultValue={defaultValue ? moment(defaultValue) : undefined} // Ensure defaultValue is moment
      />
    </div>
  );
};

export default RADatePicker;
