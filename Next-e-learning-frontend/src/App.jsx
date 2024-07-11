import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store"; // Assuming you have a file for Redux store setup

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Courses from "./views/courses";
import Blog from "./views/blog";
import AboutUs from "./views/aboutUs";
import Forum from "./views/forum";
import AdminDashboard from "./views/adminDashboard/adminDashboard";
import TeacherDashboard from "./views/teacherDashboard/teacherDashboard";
import StudentDashboard from "./views/studentDashboard/studentDashboard";
import Login from "./views/login";

// import "./assets/styles/style.css";
import './assets/styles/main.scss';
import CourseDetails from "./views/courseDetails";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

ReactQuill.Quill.debug('warn');

function App() {
  return (
    <Provider store={store}>
      
        <div className="row m-0 p-0">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-details/:id" element={<CourseDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/teacher/*" element={<TeacherDashboard />} />
            <Route path="/student/*" element={<StudentDashboard />} />
            <Route path="/login" element={<Login layout="login" />} />
            <Route path="/register" element={<Login layout="register" />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
   
    </Provider>
  );
}

export default App;
