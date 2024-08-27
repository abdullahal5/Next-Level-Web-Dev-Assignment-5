import { ReactNode } from "react";
import { logout, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    dispatch(logout());
    return <Navigate to="/auth" replace={true} />;
  }

  return children;
};

export default Protected;
