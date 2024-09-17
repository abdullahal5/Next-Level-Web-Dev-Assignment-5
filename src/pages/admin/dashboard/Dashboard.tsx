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

  return (
    <div className="p-4">
      {DashboardData ? (
        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} sm={12} md={12} lg={6}>
            <Link to={`/${user?.role}/dashboard/get-room`}>
              <Card
                title="Total Rooms"
                bordered={false}
                className="shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f0f4ff, #dceafe)",
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
                  backgroundImage: "linear-gradient(135deg, #e6fffb, #d6f7f2)",
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
                  backgroundImage: "linear-gradient(135deg, #fff1e6, #ffebb3)",
                }}
              >
                <div className="flex items-center justify-between">
                  <FaBookOpen style={{ fontSize: "40px", color: "#fa8c16" }} />
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
                  backgroundImage: "linear-gradient(135deg, #fff0f6, #ffcad6)",
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
      ) : (
        <div className="text-center text-lg font-semibold">
          No data available
        </div>
      )}
    </div>
  );
};

export default Dashboard;
