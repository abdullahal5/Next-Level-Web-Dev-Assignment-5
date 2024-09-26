import {
  FaSpinner,
  FaUserFriends,
  FaBookOpen,
  FaDollarSign,
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
  Label,
  Brush,
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
    totalRevenue: number;
    totalSlots: number;
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

  const chartData =
    DashboardData?.data.result.map((item) => ({
      name: item.roomName,
      totalBookings: item.totalBookings,
      totalRevenue: item.totalRevenue,
      totalSlots: item.totalSlots,
    })) || [];

  const keys = ["totalRevenue", "totalBookings", "totalSlots"];

  const colors = ["#8884d8", "#82ca9d", "#ff7300"];

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
              <Card
                title="Total Paid"
                bordered={false}
                className="shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                style={{
                  backgroundImage: "linear-gradient(135deg, #fff0f6, #ffcad6)",
                }}
              >
                <div className="flex items-center justify-between">
                  <FaDollarSign
                    style={{ fontSize: "40px", color: "#eb2f96" }}
                  />
                  <h1 className="text-3xl font-bold">
                    ${DashboardData.data.totalPaid}
                  </h1>
                </div>
              </Card>
            </Col>
          </Row>

          <h1 className="text-3xl font-semibold pb-5 pt-12">
            Revenue of Each Room
          </h1>

          <ResponsiveContainer width="100%" height={450}>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
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
              <XAxis dataKey="name">
                <Label value="Room Name" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label
                  value="Amount/Bookings"
                  angle={-90}
                  position="insideLeft"
                />
              </YAxis>
              <Legend />
              <Tooltip
                content={({ payload, label }) => (
                  <div className="p-2 bg-white border rounded">
                    <h4>{label}</h4>
                    {payload?.map((entry, index) => (
                      <div key={index} style={{ color: entry.stroke }}>
                        {entry.name}: {entry.value}
                      </div>
                    ))}
                  </div>
                )}
              />
              {keys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fillOpacity={1}
                  fill={`url(#color${key})`}
                  dot={{
                    stroke: colors[index % colors.length],
                    strokeWidth: 2,
                    r: 4,
                  }}
                />
              ))}
              <Brush
                dataKey="name"
                height={30}
                stroke="#8884d8"
                startIndex={0}
                endIndex={chartData.length - 1}
              />
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
