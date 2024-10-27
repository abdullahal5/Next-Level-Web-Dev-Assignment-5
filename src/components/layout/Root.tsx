import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Root: React.FC = () => {
  const location = useLocation();

  const noFooterRoutes = ["/error", "/auth", "/admin"];
  const hideFooter = noFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const hideNavbar = location.pathname.startsWith("/admin/dashboard");

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Root;
