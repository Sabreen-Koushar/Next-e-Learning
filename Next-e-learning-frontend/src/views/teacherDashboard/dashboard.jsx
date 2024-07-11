import { Link } from "react-router-dom";
import courseProgressItem from "../../assets/images/course-progress-item-img-1.png";
import ProgressCourseItem from "../../components/progressCourseItem";
const Dashboard = () => {
  return (
    <div className="dashboard row card m-0 p-3 mt-3 mb-3">
      <h5 className="m-0 p-0" style={{ color: "rgb(0, 203, 184)" }}>
        Dashboard
      </h5>
      <div className="row m-0 p-0">
        <div className="col-lg-4 ps-0 pe-0 pe-lg-3 mb-3 mt-3">
          <div className="card p-4 justify-content-center align-items-center">
            <div
              className="icon mb-3 p-3 pt-2 pb-2 w-auto rounded-circle d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(73,187,189,0.3)" }}
            >
              <i
                className="fs-1 m-0 p-0 bi bi-book-fill w-auto"
                style={{ color: "#49BBBD" }}
              ></i>
            </div>
            <h2 className="m-0 mb-3 p-0 text-center">1</h2>
            <p className="m-0 p-0 fw-medium text-center">Enrolled Courses</p>
          </div>
        </div>
        <div className="col-lg-4 ps-0 pe-0 pe-lg-3 mb-3 mt-3">
          <div className="card p-4 justify-content-center align-items-center">
            <div
              className="icon mb-3 p-3 pt-2 pb-2 w-auto rounded-circle d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(91,114,238,0.3)" }}
            >
              <i
                className="fs-1 m-0 p-0 bi bi-display w-auto"
                style={{ color: "#5B72EE" }}
              ></i>
            </div>
            <h2 className="m-0 mb-3 p-0 text-center">2</h2>
            <p className="m-0 p-0 fw-medium text-center">Active Courses</p>
          </div>
        </div>
        <div className="col-lg-4 ps-0 pe-0 pe-lg-0 mb-3 mt-3">
          <div className="card p-4 justify-content-center align-items-center">
            <div
              className="icon mb-3 p-3 pt-2 pb-2 w-auto rounded-circle d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(157,204,255,0.3)" }}
            >
              <i
                className="fs-1 m-0 p-0 bi bi-database-fill w-auto"
                style={{ color: "#9DCCFF" }}
              ></i>
            </div>
            <h2 className="m-0 mb-3 p-0 text-center">1</h2>
            <p className="m-0 p-0 fw-medium text-center">Completed Courses</p>
          </div>
        </div>
        <div className="col-lg-4 ps-0 pe-0 pe-lg-3 mb-3 mt-3">
          <div className="card p-4 justify-content-center align-items-center">
            <div
              className="icon mb-3 p-3 pt-2 pb-2 w-auto rounded-circle d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(0,203,184,0.3)" }}
            >
              <i
                className="fs-1 m-0 p-0 bi bi-briefcase w-auto"
                style={{ color: "#00CBB8" }}
              ></i>
            </div>
            <h2 className="m-0 mb-3 p-0 text-center">3</h2>
            <p className="m-0 p-0 fw-medium text-center">Earn Badged</p>
          </div>
        </div>
        <div className="col-lg-4 ps-0 pe-0 pe-lg-3 mb-3 mt-3">
          <div className="card p-4 justify-content-center align-items-center">
            <div
              className="icon mb-3 p-3 pt-2 pb-2 w-auto rounded-circle d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(73,187,189,0.3)" }}
            >
              <i
                className="fs-1 m-0 p-0 bi bi-book-fill w-auto"
                style={{ color: "#49BBBD" }}
              ></i>
            </div>
            <h2 className="m-0 mb-3 p-0 text-center">1</h2>
            <p className="m-0 p-0 fw-medium text-center">Enrolled Courses</p>
          </div>
        </div>
        <div className="col-lg-4 ps-0 pe-0 pe-lg-0 mb-3 mt-3">
          <div className="card p-4 justify-content-center align-items-center">
            <div
              className="icon mb-3 p-3 pt-2 pb-2 w-auto rounded-circle d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(91,114,238,0.3)" }}
            >
              <i
                className="fs-1 m-0 p-0 bi bi-display w-auto"
                style={{ color: "#5B72EE" }}
              ></i>
            </div>
            <h2 className="m-0 mb-3 p-0 text-center">2</h2>
            <p className="m-0 p-0 fw-medium text-center">Active Courses</p>
          </div>
        </div>
      </div>
      <div className="row m-0 p-0 mt-4">
        <h5 className="m-0 p-0" style={{ color: "rgb(0, 203, 184)" }}>
          In Progress Courses
        </h5>
        <div className="col-lg-6 m-0 p-0  mt-3 mb-3">
          <ProgressCourseItem />
        </div>
        <div className="col-lg-6 p-0  mt-3 mb-3">
          <ProgressCourseItem />
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;
