import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Protected = ({ children }: any) => {
  const { userInfo } = useAuth();
  if (userInfo !== undefined) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Protected;
