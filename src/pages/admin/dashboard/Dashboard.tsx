import {
  FaSpinner,
  FaUserFriends,
  FaBookOpen,
  FaCalendarCheck,
} from "react-icons/fa";
import { useGetAllDashboardDataQuery } from "../../../redux/features/admin/dashboard/dashboardApi";
import { Card, Col, Row } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface Root {
  success: boolean;
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  totalRoom: number;
  totalSlots: number;
  totalBook: number;
  totalPaid: number;
  totalUser: number;
  result: Array<{
    _id: string;
    roomName: string;
    totalBookings: number;
    totalAmount: number;
    totalSlots: number;
    bookings: Array<{
      bookingId: string;
      user: string;
      date: Array<string>;
      amount: number;
      status: string;
    }>[];
  }>;
}

const Dashboard = () => {
  const { data, isLoading } = useGetAllDashboardDataQuery(undefined);
  const { user } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <FaSpinner fontSize={"3rem"} className="animate-spin" />
      </div>
    );
  }

  const DashboardData: Root | undefined = data as Root | undefined;
  console.log(DashboardData?.data.result);

  const chartData =
    DashboardData?.data.result.map((item) => ({
      name: item.roomName,
      totalBookings: item.totalBookings,
      totalAmount: item.totalAmount,
      totalSlots: item.totalSlots,
    })) || [];

  const keys = ["totalAmount", "totalBookings", "totalSlots"];

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ff7300",
    "#ffc658",
    "#d5aa4d",
    "#a055f8",
    "#56c9f9",
    "#ff639a",
    "#e85d75",
    "#2f8f8f",
  ];

  return (
    <div className="p-4">
      {DashboardData ? (
        <>
          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/${user?.role}/dashboard/get-room`}>
                <Card
                  title="Total Rooms"
                  bordered={false}
                  className="shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #f0f4ff, #dceafe)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <HomeOutlined
                      style={{ fontSize: "40px", color: "#1890ff" }}
                    />
                    <h1 className="text-3xl font-bold">
                      {DashboardData.data.totalRoom}
                    </h1>
                  </div>
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/${user?.role}/dashboard/allUser`}>
                <Card
                  title="Total Users"
                  bordered={false}
                  className="shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #e6fffb, #d6f7f2)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <FaUserFriends
                      style={{ fontSize: "40px", color: "#13c2c2" }}
                    />
                    <h1 className="text-3xl font-bold">
                      {DashboardData.data.totalUser}
                    </h1>
                  </div>
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/${user?.role}/dashboard/bookings`}>
                <Card
                  title="Total Bookings"
                  bordered={false}
                  className="shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #fff1e6, #ffebb3)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <FaBookOpen
                      style={{ fontSize: "40px", color: "#fa8c16" }}
                    />
                    <h1 className="text-3xl font-bold">
                      {DashboardData.data.totalBook}
                    </h1>
                  </div>
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/${user?.role}/dashboard/get-slot`}>
                <Card
                  title="Total Slots"
                  bordered={false}
                  className="shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #fff0f6, #ffcad6)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <FaCalendarCheck
                      style={{ fontSize: "40px", color: "#eb2f96" }}
                    />
                    <h1 className="text-3xl font-bold">
                      {DashboardData.data.totalSlots}
                    </h1>
                  </div>
                </Card>
              </Link>
            </Col>
          </Row>

          <h1 className="text-3xl font-semibold pb-7 pt-12">
            Revenue of each Rooms
          </h1>

          <ResponsiveContainer width="100%" height={500}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                {keys.map((key, index) => (
                  <linearGradient
                    key={key}
                    id={`color${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1000]} />
              <Legend />
              <Tooltip />
              {keys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fillOpacity={1}
                  fill={`url(#color${key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="text-center text-lg font-semibold">
          No data available
        </div>
      )}
    </div>
  );
};

export default Dashboard;
