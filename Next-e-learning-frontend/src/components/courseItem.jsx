import React from "react";
import { Link } from "react-router-dom";
import courseImg from "../assets/images/courseImg.png";
import InstructorImg from "../assets/images/instructor-image-course.png";
const CourseItems = (props) => {
  return (
    <div className="course-item col-lg-3 col-md-6 mt-4 mt-lg-0">
      <Link to={`/course-details/${props.id}`} className='text-decoration-none'>
        <div className="card p-3 rounded-4 border-0 ">
          <img
            src={courseImg}
            alt="course-Image"
            className="w-100 rounded-4 "
          />
          <div className="row m-0 p-0  mt-2 justify-content-between ">
            <div className="row m-0 p-0 w-auto">
              <i className="bi bi-grid w-auto text-secondary m-0 p-0"></i>
              <p className="m-0 p-0 ps-2 w-auto text-secondary">{props.category}</p>
            </div>
            <div className="row m-0 p-0 w-auto">
              <i className="bi bi-stopwatch w-auto text-secondary m-0 p-0"></i>
              <p className="m-0 p-0 ps-2  w-auto text-secondary">3 Month</p>
            </div>
          </div>
          <h5 className="m-0 p-0 mt-4"> {props.title}</h5>
          <p className="m-0 p-0 mt-3 text-secondary ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
            fuga ut placeat odit autem.
          </p>
          <div className="row m-0 p-0 justify-content-between mt-3 align-items-center ">
            <div className="row m-0 p-0 align-items-center w-auto">
              <div
                className=" rounded-circle overflow-hidden w-auto m-0 p-0"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <img
                  src={InstructorImg}
                  alt="instructor image"
                  className="instructorImg  rounded-circle"
                />
              </div>
              <p className="m-0 p-0 ps-2 w-auto fw-medium">{props.instructor}</p>
            </div>
            <button className="btn text-light w-auto">Enroll Now</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseItems;
