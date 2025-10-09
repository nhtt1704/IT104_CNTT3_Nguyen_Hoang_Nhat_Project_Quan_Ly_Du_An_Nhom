import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouterProps {
  children: React.ReactNode;
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ children }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkAuth = async () => {
      if (!userId) {
        setAuthorized(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8000/users/${userId}`);
        if (res.data) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [userId]);

  if (authorized === null) {
    return <div>Đang kiểm tra đăng nhập...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouter;
