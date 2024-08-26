import { useState } from "react";
import Titlebar from "../../components/ui/Titlebar";
import RAForm from "../../components/form/RAForm";
import RAInput from "../../components/form/RAInput";
import { Button } from "antd";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FieldValues } from "react-hook-form";
import { MdOutlineLocationOn } from "react-icons/md";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogin = (data: FieldValues) => {
    console.log(data);
  };

  const handleSignUp = (data: FieldValues) => {
    console.log(data);
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
            <RAForm onSubmit={handleLogin}>
              <RAInput
                type="email"
                name="E-mail Login"
                label="Email"
                prefixIcon={<MailOutlined />}
              />
              <RAInput
                type="password"
                name="Password Login"
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
            <RAForm onSubmit={handleSignUp}>
              <RAInput
                type="text"
                name="Name"
                label="Name"
                prefixIcon={<UserOutlined />}
              />
              <RAInput
                type="email"
                name="E-mail Register"
                label="Email"
                prefixIcon={<MailOutlined />}
              />
              <RAInput
                type="password"
                name="Password Register"
                label="Password"
                prefixIcon={<LockOutlined />}
                iconPosition="prefix"
              />
              <RAInput
                type="text"
                name="Phone"
                label="Phone"
                prefixIcon={<PhoneOutlined />}
              />
              <RAInput
                type="text"
                name="Address"
                label="Adress"
                prefixIcon={<MdOutlineLocationOn />}
              />
              <Button
                htmlType="submit"
                className="w-32 mx-auto h-9"
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
