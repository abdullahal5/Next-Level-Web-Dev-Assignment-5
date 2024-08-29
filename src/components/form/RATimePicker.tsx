import { Controller, useFormContext } from "react-hook-form";
import { Form, TimePicker } from "antd";
import dayjs from "dayjs";

type TPHDatePicker = {
  name: string;
  label: string;
  defaultValue?: string | undefined;
};

const RATimePicker = ({ name, label, defaultValue }: TPHDatePicker) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? dayjs(defaultValue, "HH:mm") : undefined}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <TimePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value, "HH:mm") : null} // Ensure value is a Dayjs object
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      />
    </div>
  );
};

export default RATimePicker;
