import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import RAForm from "../../../components/form/RAForm";
import RAInput from "../../../components/form/RAInput";
import RASelect from "../../../components/form/RASelect";
import Titlebar from "../../../components/ui/Titlebar";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomSchema } from "../../../schema/Room";
import { useCreateRoomMutation } from "../../../redux/features/admin/roomManagement/roomApi";
import { useAppSelector } from "../../../redux/hook";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const IMGBB_API_KEY = "228f07b239d69be9bcc9d7f97fbf57de";
const UPLOAD_LIMIT = 7;

const roomFacilitiesOption = [
  { value: "WiFi", label: "WiFi" },
  { value: "Projector", label: "Projector" },
  { value: "Air Conditioning", label: "Air Conditioning" },
  { value: "Whiteboard", label: "Whiteboard" },
  { value: "Video Conferencing", label: "Video Conferencing" },
  { value: "Parking", label: "Parking" },
  { value: "Refreshments", label: "Refreshments" },
  { value: "Sound System", label: "Sound System" },
  { value: "Tv", label: "Tv" },
  { value: "Swimming pool", label: "Swimming pool" },
];

const UploadImage: React.FC<{
  onImageUpload: (url: string) => void;
  setUploading: (uploading: boolean) => void;
}> = ({ onImageUpload, setUploading }) => {
  const props: UploadProps = {
    name: "image",
    action: `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    beforeUpload(_file, fileList) {
      if (fileList.length > UPLOAD_LIMIT) {
        toast.error(`You can only upload ${UPLOAD_LIMIT} images.`);
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      if (info.file.status === "uploading") {
        setUploading(true);
      }
      if (info.file.status === "done") {
        toast.success(`${info.file.name} file uploaded successfully`);
        onImageUpload(info.file.response.data.url);
        setUploading(false);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
        setUploading(false);
      }
    },
    multiple: true,
  };

  return (
    <Upload
      {...props}
      style={{
        width: "100%",
      }}
    >
      <Button
        style={{ width: "100%", height: "45px" }}
        icon={<UploadOutlined />}
      >
        Click to Upload
      </Button>
    </Upload>
  );
};

const CreateRoom: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [addRoom] = useCreateRoomMutation();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const handleImageUpload = (url: string) => {
    setUploadedImageUrls((prev) => [...prev, url]);
  };

  const handleCreateRoom = async (data: FieldValues) => {
    if (!uploadedImageUrls.length) {
      toast.error("At least one image is needed");
      return;
    }

    const toastId = toast.loading("Creating...");

    const formData = {
      ...data,
      roomNo: Number(data.roomNo),
      capacity: Number(data.capacity),
      floorNo: Number(data.floorNo),
      pricePerSlot: Number(data.pricePerSlot),
      images: uploadedImageUrls,
    };

    try {
      const res = await addRoom(formData);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
      }
      navigate(`/${user?.role}/dashboard/get-room`);
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-[500px] text-center mx-auto">
      <Titlebar title="Create Room" />
      <RAForm resolver={zodResolver(roomSchema)} onSubmit={handleCreateRoom}>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <RAInput type="text" name="name" label="Name" />
          </div>
          <div className="flex-1">
            <RAInput type="number" name="roomNo" label="Room No." />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <RAInput type="number" name="capacity" label="Capacity" />
          </div>
          <div className="flex-1">
            <RAInput type="number" name="floorNo" label="Floor No" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <RAInput type="number" name="pricePerSlot" label="Price Per Slot" />
          </div>
          <div className="flex-1">
            <RASelect
              options={roomFacilitiesOption}
              mode="multiple"
              name="amenities"
              label="Amenities"
            />
          </div>
        </div>
        <div className="w-full">
          <UploadImage
            onImageUpload={handleImageUpload}
            setUploading={setIsUploading}
          />
        </div>
        <Button
          htmlType="submit"
          className="w-56 mx-auto h-9 mt-4"
          type="primary"
          disabled={isUploading}
        >
          Create Room
        </Button>
      </RAForm>
    </div>
  );
};

export default CreateRoom;
