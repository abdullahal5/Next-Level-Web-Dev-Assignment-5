import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

const IMGBB_API_KEY = "228f07b239d69be9bcc9d7f97fbf57de";
const UPLOAD_LIMIT = 7;

const props: UploadProps = {
  name: "image",
  action: `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
  // headers: {
  //   authorization: "authorization-text",
  // },
  beforeUpload(file, fileList) {
    if (fileList.length > UPLOAD_LIMIT) {
      message.error(`You can only upload up to ${UPLOAD_LIMIT} images.`);
      return Upload.LIST_IGNORE;
    }
    return true;
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log("Uploaded Image URL:", info.file.response.data.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  multiple: true,
};

const UploadImage: React.FC = () => (
  <Upload {...props} className="w-full">
    <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
      Click to Upload
    </Button>
  </Upload>
);

export default UploadImage;
