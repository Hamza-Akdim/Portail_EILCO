import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../utils/apiFunctions";

const ProtectedRoute = ({ requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const userData = await getUserDetails();
    setUser(userData);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  //TO FOX AFTER
  if (loading) return <p></p>;

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
