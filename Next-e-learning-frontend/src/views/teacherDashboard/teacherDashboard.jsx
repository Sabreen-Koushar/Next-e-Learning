import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import CoursesList from "./coursesList";
import AccountDetails from "./accountDetails";
import TeacherDashboardSidebar from "../../components/teacherDashboardSidebar";
import AddCourse from "./addCourse";

const TeacherDashboard = () => {
  return (
    <div className=" d-flex m-0 p-0 mt-5 pt-5 justify-content-center ">
      <div className="container">
        <div className="row m-0 p-0">
          <TeacherDashboardSidebar />
          <div className="col-lg-9">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coursesList" element={<CoursesList />} />
              <Route path="/accountDetails" element={<AccountDetails />} />
              <Route path="/add-course" element={<AddCourse />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
