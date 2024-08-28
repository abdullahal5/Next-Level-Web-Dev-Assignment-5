import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import axios from "axios";

const props: UploadProps = {
  listType: "picture",
  maxCount: 1,
  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = "red";
          ctx.textBaseline = "middle";
          ctx.font = "33px Arial";
          ctx.fillText("Ant Design", 20, 20);
          canvas.toBlob(async (blob) => {
            console.log(blob);
            const formData = new FormData();
            formData.append("image", blob as Blob);
            try {
              const response = await axios.post(
                "https://api.imgbb.com/1/upload?key=228f07b239d69be9bcc9d7f97fbf57de",
                formData
              );
              console.log(response);
              resolve(response.data.data.url);
            } catch (error) {
              console.error("Upload failed:", error);
            }
          });
        };
      };
    });
  },
  // customRequest({ onSuccess }) {
  //   setTimeout(() => {
  //     // onSuccess("ok");
  //   }, 0);
  // },
};

const UploadImage: React.FC = () => (
  <Upload {...props} style={{ width: "100%", height: "44px" }}>
    <Button icon={<UploadOutlined />} style={{ width: "100%", height: "100%" }}>
      Upload
    </Button>
  </Upload>
);

export default UploadImage;
