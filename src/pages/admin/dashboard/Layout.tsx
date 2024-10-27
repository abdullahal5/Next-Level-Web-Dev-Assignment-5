import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/ui/Sidebar";

const Layout = () => {
  return (
    <div className="flex items-start gap-3 overflow-hidden">
      <div className="overh">
        <Sidebar />
      </div>
      <div className="w-full pr-3 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;