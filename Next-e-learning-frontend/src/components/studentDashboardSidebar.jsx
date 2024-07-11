import { Link, useLocation } from "react-router-dom";
import {toast} from 'react-toastify';
const StudentDashboardSidebar = () => {
  const location = useLocation();
  const handleLogout = () => {
    toast.success("Logout Successfully")
    localStorage.removeItem("token");
    setTimeout(()=>{
        window.location.href = "/";
    },1000)
  };
  return (
    <div className="sidebar col-lg-3">
      <Link className="text-decoration-none " to="/student/dashboard">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/student" ? "active" : ""
          } ${
            location.pathname === "/student/dashboard" ? "active" : ""
          } ${
            location.pathname === "/student/" ? "active" : ""
          }`}
        >
          <i className="bi bi-house-door-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6 ">Dashboard</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/student/enrolled-courses">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/student/enrolled-courses" ? "active" : ""
          }`}
        >
          <i className="bi bi-book-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">Enrolled Courses</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/student/accountDetails">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/student/accountDetails" ? "active" : ""
          }`}
        >
          <i className="bi bi-person-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">My Account</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/student/wishlist">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/student/wishlist" ? "active" : ""
          }`}
        >
          <i className="bi bi-bookmark-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">Wishlist</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/student/reviews">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/student/reviews" ? "active" : ""
          }`}
        >
          <i className="bi bi-star-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">Reviews</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/student/quizAttempt">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/student/quizAttempt" ? "active" : ""
          }`}
        >
          <i className="bi bi-speedometer2 w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">My Quiz Attempts</p>
        </div>
      </Link>
      <Link className="text-decoration-none " to="/student/questionAnswer">
        <div
          className={`list-item text-black row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
            location.pathname === "/student/questionAnswer" ? "active" : ""
          }`}
        >
          <i className="bi bi-person-check-fill w-auto fs-5"></i>
          <p className="m-0 p-0 w-auto fs-6">Questions & Answer</p>
        </div>
      </Link>
      <div
        className={`list-item row m-3 ms-0 me-0 p-2 rounded-3 align-items-center ${
          location.pathname === "/student/#/logout" ? "active" : ""
        }`}
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-left w-auto fs-5"></i>
        <p className="m-0 p-0 w-auto fs-6">Logout</p>
      </div>
    </div>
  );
};

export default StudentDashboardSidebar;
