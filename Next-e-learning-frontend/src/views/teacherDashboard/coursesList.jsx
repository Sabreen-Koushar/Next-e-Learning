import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noData from "../../assets/images/noDataSvg.svg";
import axios from "axios";
import { toast } from "react-toastify";
import VARIABLES from "../../../environmentVariables";
import CourseItems from "../../components/courseItem";

const CoursesList = () => {
  const [publishTabBtn, setPublishTabBtn] = useState(true);
  const [draftTabBtn, setDraftTabBtn] = useState(false);
  const [publishCourseList, setPublishCourseList] = useState([]);
  const handleTab = (e) => {
    console.log(e.currentTarget.id);
    if (e.currentTarget.id === "publishCourses") {
      setDraftTabBtn(false);
      setPublishTabBtn(true);
    }
    if (e.currentTarget.id === "draftCourses") {
      setDraftTabBtn(true);
      setPublishTabBtn(false);
    }
  };

  const handlePublishCourse = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/view-course-teacher-publish`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        setPublishCourseList(response.data.data.courses);
      }
    } catch (error) {
      toast.error("failed to view");
      console.log(error);
    }
  };
  useEffect(() => {
    handlePublishCourse();
  }, []);

  return (
    <div className="enrolled-courses row m-0 p-0 pt-3">
      <h5 className="m-0 p-0" style={{ color: "rgb(0, 203, 184)" }}>
        My Courses
      </h5>
      <div className="navtab row m-0 p-0 mt-3 justify-content-between  border border-1 border-start-0 border-end-0 border-top-0 pb-3">
        <div className="w-auto m-0 p-0">
          <button
            className={`btn fw-medium w-auto ms-0 me-md-2 mt-2 mt-md-0 ${
              publishTabBtn ? "btn-active" : ""
            }`}
            id="publishCourses"
            onClick={handleTab}
          >
            Publish
          </button>

          <button
            className={`btn fw-medium w-auto ms-2 me-2 mt-2 mt-md-0 ${
              draftTabBtn ? "btn-active" : ""
            }`}
            id="draftCourses"
            onClick={handleTab}
          >
            Draft
          </button>
        </div>

        <div className="w-auto p-0 m-0">
          <Link
            to="/teacher/add-course"
            className="text-decoration-none m-0 p-0"
          >
            <button className="btn fw-medium w-auto ms-2 mt-2 mt-md-0">
              +Add Course
            </button>
          </Link>
        </div>
      </div>
      {publishTabBtn ? (
        <div className="content row m-0 p-0 pt-5">
          {publishCourseList.map((course) => (
            <CourseItems
              key={course._id}
              id={course._id}
              title={course.courseTitle}
              category={course.courseCategory}
              instructor={course.teacherId.firstname}
            />
          ))}
        </div>
      ) : (
        <div className="content row m-0 p-0 justify-content-center align-items-center pt-5">
          <img src={noData} alt="No Data" />
          <p className="m-0 p-0 text-center">
            No data is Available on this section
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesList;
