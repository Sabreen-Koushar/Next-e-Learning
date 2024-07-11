import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const TeacherDashboardSidebar = () => {
  const location = useLocation();
  const handleLogout = () => {
    toast.success("Logout Successfully");
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  return (
    <div className="sidebar col-lg-3">
      <Link className="text-decoration-none " to="/teacher/dashboard">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/teacher" ? "active" : ""
          } ${location.pathname === "/teacher/dashboard" ? "active" : ""} ${
            location.pathname === "/teacher/" ? "active" : ""
          }`}
        >
          <i className="bi bi-house-door-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6 ">Dashboard</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/teacher/coursesList">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/teacher/coursesList" ? "active" : ""
          } ${
            location.pathname === "/teacher/add-course" ? "active" : ""
          }`}
        >
          <i className="bi bi-book-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">Course List</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/teacher/accountDetails">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/teacher/accountDetails" ? "active" : ""
          }`}
        >
          <i className="bi bi-person-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">My Account</p>
        </div>
      </Link>
      <div
        className={`list-item row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
          location.pathname === "/teacher/#/logout" ? "active" : ""
        }`}
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-left w-auto fs-5"></i>
        <p className="m-0 p-0 w-auto fs-6">Logout</p>
      </div>
    </div>
  );
};

export default TeacherDashboardSidebar;
