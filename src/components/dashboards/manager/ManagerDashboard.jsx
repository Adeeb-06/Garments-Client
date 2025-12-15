import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import ManagerSidebar from "../../sidebars/ManagerSidebar";
import Footer from "../../Footer";
import ManagerDash from '../../ManagerDash'

const ManagerDashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    navigate("/auth/login");
    return null;
  }

  if (loading) return <p>Loading...</p>;

  const logoutUser = async () => {
    const res = await logout();
    if (res) navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Fixed Sidebar */}
      <ManagerSidebar logoutUser={logoutUser} />

      {/* Right Side */}
      <div className="md:ml-64 flex flex-col min-h-screen w-full">
        {/* Page Content */}
        <main className="flex-1 pt-10 md:pt-1  ">
          {location.pathname === "/dashboard" && <ManagerDash />}
          <Outlet />
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default ManagerDashboard;
