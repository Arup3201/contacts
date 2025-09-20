import { Outlet } from "react-router";
import { Navbar } from "../../components/custom/navbar";

const ProtectedRoute = () => {
  return (
    <div className="flex flex-col gap-1">
      <Navbar />
      <Outlet />
    </div>
  );
};

export { ProtectedRoute };
