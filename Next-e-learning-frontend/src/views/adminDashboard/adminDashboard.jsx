import { Routes, Route } from "react-router-dom";
import AdminDashboardSidebar from "../../components/adminDashboardSidebar";
import Dashboard from "./dashboard";
import AccountDetails from "./accountDetails";
import StudentList from "./studentList";
import TeacherList from "./teacherList";
import CoursesList from "./coursesList";
import AddCourse from "./addCourse";
const AdminDashboard = () => {
  return (
    <div className=" d-flex m-0 p-0 mt-5 pt-5 justify-content-center ">
      <div className="container">
        <div className="row m-0 p-0">
          <AdminDashboardSidebar/>
          <div className="col-lg-9">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accountDetails" element={<AccountDetails/>} />
              <Route path="/student-list" element={<StudentList/>} />
              <Route path="/teacher-list" element={<TeacherList/>} />
              <Route path="/coursesList" element={<CoursesList/>} />
              <Route path="/add-course" element={<AddCourse/>} />
              
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
