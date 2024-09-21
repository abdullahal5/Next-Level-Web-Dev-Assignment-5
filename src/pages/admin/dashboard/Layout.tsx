import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/ui/Sidebar";

const Layout = () => {
  return (
    <div className="flex items-start gap-3 ">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full pr-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;