/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useUpdateRoomMutation } from "../../../redux/features/admin/roomManagement/roomApi";
import { useAppSelector } from "../../../redux/hook";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../../redux/features/rooms/roomApi";
import { FaSpinner } from "react-icons/fa";
import { TResponse } from "../../../global/global";

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

const RoomUpdate: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [updateRoom] = useUpdateRoomMutation();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const { data: roomData, isFetching } = useGetSingleRoomQuery(id);

  const handleImageUpload = (url: string) => {
    setUploadedImageUrls((prev) => [...prev, url]);
  };

  const handleUpdateRoom = async (data: FieldValues) => {
    if (!uploadedImageUrls.length) {
      toast.error("At least one image is needed");
      return;
    }

    const toastId = toast.loading("Updating...");

    const formData = {
      ...data,
      roomNo: Number(data.roomNo),
      capacity: Number(data.capacity),
      floorNo: Number(data.floorNo),
      pricePerSlot: Number(data.pricePerSlot),
      images: uploadedImageUrls,
    };

    try {
      const res = (await updateRoom({
        id,
        body: formData,
      })) as unknown as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
        navigate(`/${user?.role}/dashboard/get-room`);
      }
    } catch (error: any) {
      toast.error(error.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  React.useEffect(() => {
    if (roomData?.data?.images) {
      setUploadedImageUrls(roomData.data.images);
    }
  }, [roomData]);

  return (
    <div className="lg:w-[500px] md:w-[500px] w-full text-center lg:mx-auto md:mx-auto">
      <Titlebar title="Update Room" />
      {isFetching ? (
        <div className="flex items-center justify-center h-[80vh]">
          <FaSpinner fontSize={"3rem"} className="animate-spin" />
        </div>
      ) : (
        <RAForm onSubmit={handleUpdateRoom}>
          <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4">
            <div className="flex-1 w-full">
              <RAInput
                defaultValue={roomData?.data?.name ?? ""}
                type="text"
                name="name"
                label="Name"
              />
            </div>
            <div className="flex-1 w-full">
              <RAInput
                defaultValue={roomData?.data?.roomNo ?? ""}
                type="number"
                name="roomNo"
                label="Room No."
              />
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4">
            <div className="flex-1 w-full">
              <RAInput
                defaultValue={roomData?.data?.capacity ?? ""}
                type="number"
                name="capacity"
                label="Capacity"
              />
            </div>
            <div className="flex-1 w-full">
              <RAInput
                defaultValue={roomData?.data?.floorNo ?? ""}
                type="number"
                name="floorNo"
                label="Floor No"
              />
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4">
            <div className="flex-1 w-full">
              <RAInput
                defaultValue={roomData?.data?.pricePerSlot ?? ""}
                type="number"
                name="pricePerSlot"
                label="Price Per Slot"
              />
            </div>
            <div className="flex-1 w-full">
              <RASelect
                options={roomFacilitiesOption}
                mode="multiple"
                name="amenities"
                defaultValue={roomData?.data?.amenities ?? []}
                label="Amenities"
              />
            </div>
          </div>
          <div className="w-full mb-4">
            {uploadedImageUrls.length > 0 && (
              <div className="mb-4">
                <p>Existing Images:</p>
                <div className="flex flex-wrap gap-2">
                  {uploadedImageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Room image ${index + 1}`}
                      className="w-20 rounded-full h-20 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
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
            Update Room
          </Button>
        </RAForm>
      )}
    </div>
  );
};

export default RoomUpdate;
