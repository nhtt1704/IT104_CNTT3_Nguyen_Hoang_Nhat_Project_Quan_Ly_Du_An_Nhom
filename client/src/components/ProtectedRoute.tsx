import React, { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setIsAuthorized(false);
          return;
        }

        const res = await axios.get(`http://localhost:8000/users/${userId}`);
        if (res.data) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch {
        setIsAuthorized(false);
      }
    };
    checkUser();
  }, []);

  if (isAuthorized === null) return <p>Đang kiểm tra quyền truy cập...</p>;
  if (!isAuthorized) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
