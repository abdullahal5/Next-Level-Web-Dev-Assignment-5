import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Root = () => {
  const location = useLocation();

  const noFooterRoutes = ["/error", "/auth", "/admin"];

  const hideFooter = noFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      <Navbar />
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Root;
