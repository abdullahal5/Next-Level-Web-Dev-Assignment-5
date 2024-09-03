/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Titlebar from "../../components/ui/Titlebar";
import RAForm from "../../components/form/RAForm";
import RAInput from "../../components/form/RAInput";
import { Button, Upload, UploadProps } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FieldValues } from "react-hook-form";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { loginSchema, signupSchema } from "../../schema/Authentication";
import { verifyToken } from "../../utils/decodeJwt";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { TResponse } from "../../global/global";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary";

type LoginResponseData = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

type LoginResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: LoginResponseData;
};

const IMGBB_API_KEY = "228f07b239d69be9bcc9d7f97fbf57de";
const UPLOAD_LIMIT = 1;

const UploadImage: React.FC<{
  onImageUpload: (url: string) => void;
  setUploading: (uploading: boolean) => void;
}> = ({ onImageUpload, setUploading }) => {
  const props: UploadProps = {
    name: "image",
    beforeUpload: async (_file) => {
      setUploading(true);
      const url = await uploadImageToCloudinary(_file);
      if (url) {
        onImageUpload(url);
        toast.success(`${_file.name} file uploaded successfully`);
      } else {
        toast.error(`${_file.name} file upload failed.`);
      }
      setUploading(false);
      return false;
    },
    multiple: false,
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

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [addUser] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string>("");
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleImageUpload = (url: string) => {
    setUploadedImageUrls(url);
  };

  const handleLogin = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = (await login(data)) as unknown as TResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        const responseData = res.data as LoginResponse;

        toast.success(responseData.message, {
          id: toastId,
          duration: 2000,
        });

        const token = responseData.data.accessToken;
        const decoded = await verifyToken(token);

        dispatch(
          setUser({
            token: responseData.data.accessToken,
            user: decoded,
          })
        );

        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };


  const handleSignUp = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    try {

      const userData = {
        ...data,
        profileImage: uploadedImageUrls,
      };

      const res = (await addUser(userData)) as unknown as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
        setActiveTab("login");
      }
    } catch (error: any) {
      toast.error(error.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Titlebar title="Welcome Back" />
      <p className="text-lg text-gray-600 pt-1 text-center">
        Please enter your details here
      </p>
      <ul className="flex items-center mt-4 lg:w-[470px] md:w-96 justify-around bg-gray-200 rounded-xl p-1 lg:mx-auto md:mx-auto mx-5 duration-300 ">
        <li className="w-[50%]">
          <button
            className={`${
              activeTab === "login"
                ? " bg-white py-3 rounded-xl text-blue-600 border-blue-600 border"
                : ""
            } inline-block w-full font-semibold`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
        </li>
        <li className="w-[50%]">
          <button
            className={`${
              activeTab === "signup"
                ? " bg-white py-3 rounded-xl text-blue-600 border-blue-600 border"
                : ""
            } inline-block w-full font-semibold`}
            onClick={() => handleTabChange("signup")}
          >
            Register
          </button>
        </li>
      </ul>
      <div
        className={`lg:mx-auto md:mx-5 mx-5 lg:flex-row md:flex-row flex-col-reverse py-5 text-center flex items-center justify-center gap-10`}
      >
        <div className="w-80">
          {activeTab === "login" && (
            <RAForm resolver={zodResolver(loginSchema)} onSubmit={handleLogin}>
              <RAInput
                type="email"
                name="email"
                label="Email"
                prefixIcon={<MailOutlined />}
              />
              <RAInput
                type="password"
                name="password"
                label="Password"
                prefixIcon={<LockOutlined />}
                iconPosition="prefix"
              />
              <Button
                htmlType="submit"
                className="w-32 mx-auto h-9"
                type="primary"
              >
                Login
              </Button>
            </RAForm>
          )}
          {activeTab === "signup" && (
            <RAForm
              resolver={zodResolver(signupSchema)}
              onSubmit={handleSignUp}
            >
              <RAInput
                type="text"
                name="name"
                label="Name"
                prefixIcon={<UserOutlined />}
              />
              <RAInput
                type="email"
                name="email"
                label="Email"
                prefixIcon={<MailOutlined />}
              />
              <RAInput
                type="password"
                name="password"
                label="Password"
                prefixIcon={<LockOutlined />}
                iconPosition="prefix"
              />
              <RAInput
                type="text"
                name="phone"
                label="Phone"
                prefixIcon={<PhoneOutlined />}
              />
              <RAInput
                type="text"
                name="address"
                label="Adress"
                prefixIcon={<MdOutlineLocationOn />}
              />
              <UploadImage
                onImageUpload={handleImageUpload}
                setUploading={setIsUploading}
              />
              <Button
                htmlType="submit"
                disabled={isUploading}
                className="w-32 mx-auto h-9 mt-5"
                type="primary"
              >
                Register
              </Button>
            </RAForm>
          )}
        </div>
        <div>
          <img
            className={`${activeTab == "login" ? "w-[400px]" : "w-[450px]"}`}
            src="https://i.ibb.co/r0F893c/Login.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
