/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import Titlebar from "../../../components/ui/Titlebar";
import { useGetAlluserQuery } from "../../../redux/features/admin/userManagement/userApi";

export interface Root {
  success: boolean;
  statusCode: number;
  message: string;
  data: Daum[];
}

export interface Daum {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AllUser = () => {
  const { data: user, isFetching } = useGetAlluserQuery(undefined);

  const UserData: Root | undefined = user as Root | undefined;

  // Define the columns for the table
  const columns = [
    {
      title: "Profile",
      dataIndex: "profileImage",
      key: "profileImage",
      align: "center" as const,
      render: (data: string | undefined) => (
        <img className="w-14 h-14 rounded-full" src={data} alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center" as const,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center" as const,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center" as const,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center" as const,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center" as const,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center" as const,
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
  ];

  const dataSource = UserData
    ? UserData.data.map((user) => ({
        key: user._id,
        profileImage: user.profileImage,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        createdAt: user.createdAt,
      }))
    : [];

  return (
    <>
      <Titlebar title="All Users" />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
        size="large"
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default AllUser;
