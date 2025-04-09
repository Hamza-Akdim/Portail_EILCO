import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../utils/apiFunctions";

const ProtectedRoute = ({ requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const userData = await getUserDetails();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-eilco-blue animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-white animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/" replace />;
  }

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
