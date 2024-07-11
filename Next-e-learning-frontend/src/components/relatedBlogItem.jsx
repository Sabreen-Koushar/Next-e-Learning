import { Link } from "react-router-dom";

import courseProgressItemImg1 from "../assets/images/course-progress-item-img-1.png";
import courseProgressItemImg2 from "../assets/images/course-progress-item-img-2.png";
import courseProgressItemImg3 from "../assets/images/course-progress-item-img-3.png";

import InstructorImg from "../assets/images/instructor-image-course.png";

const RelatedBlogItem = () => {
  return (
    <div className="relatedBlogItem col-lg-12 p-3">
      <div className="card rounded-4 p-4 pb-5 border-0">
        <img src={courseProgressItemImg1} alt="" className="w-100 rounded-4" />
        <h5 className="m-0 p-0 mt-3">
          Class adds $30 million to its balanace sheet for a zoom-friendly
          edteach solution
        </h5>
        <div className="row m-0 p-0 mt-4 align-items-center w-auto">
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
        <p className="m-0 p-0 mt-4 text-secondary ">
          class,launched less than a year ago by Blackboard co-founder Michael
          Chasen,integrated exclusively...
        </p>
        <div className="row m-0 p-0 mt-4 justify-content-between align-items-center">
          <Link className="text-secondary w-auto m-0 p-0">
            <p className="m-0 p-0 w-auto">Read more</p>
          </Link>
          <div className="row m-0 p-0 w-auto align-items-center justify-content-center">
            <i className="bi bi-eye-fill w-auto m-0 p-0 pe-3" style={{color:'#49BBBD'}}></i>
            <p className="m-0 p-0 text-secondary text-end w-auto">251,232</p>

          </div>
        </div>
      </div>
    </div>
  );
};
export default RelatedBlogItem;
