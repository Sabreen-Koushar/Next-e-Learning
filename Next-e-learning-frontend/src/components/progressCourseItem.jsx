import courseProgressItemImg1 from "../assets/images/course-progress-item-img-1.png";
import courseProgressItemImg2 from "../assets/images/course-progress-item-img-2.png";
import courseProgressItemImg3 from "../assets/images/course-progress-item-img-3.png";

import InstructorImg from "../assets/images/instructor-image-course.png";
const ProgressCourseItem = () => {
  return (
    <div className="progressCourseItem col-lg-12 p-3">
      <div className="card rounded-4 p-3 border-0">
        <img src={courseProgressItemImg1} alt="" className="w-100 rounded-4" />
        <h5 className="m-0 p-0 mt-3">AWS Certified Solutions Architect</h5>
        <div className="row m-0 p-0 mt-3 align-items-center w-auto">
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
          <p className="m-0 p-0 ps-2 w-auto fw-medium">Lina</p>
        </div>
        <div
          className="progress mt-3"
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{height:'10px '}}
        >
          <div className="progress-bar rounded-2" style={{width: "65%",backgroundColor:'#49BBBD'}}></div>
        </div>
        <p className="text-secondary text-end mt-3">Lesson 5 of 7</p>
      </div>
    </div>
  );
};

export default ProgressCourseItem;
