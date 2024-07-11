import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import noData from "../../assets/images/noDataSvg.svg";
import VARIABLES from "../../../environmentVariables";
import CourseItems from "../../components/courseItem";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const handleViewWishList = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/view-wishlist`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setWishlist(response.data.data);
      } else {
        toast.error("Failed to view wishlist");
      }
    } catch (error) {
      toast.error("Failed to view wishlist");
      console.log(error);
    }
  };

  useEffect(() => {
    handleViewWishList();
  }, []);

  return (
    <div className="row m-0 p-0">
       <h5 className="m-0 p-0 pb-3 mb-5 mt-4 border border-1 border-top-0 border-start-0 border-end-0 " style={{ color: "rgb(0, 203, 184)" }}>
        Wishlist Courses
      </h5>
      {wishlist.length > 0 ? (
        wishlist.map((course) => (
          <CourseItems
            key={course._id}
            id={course._id}
            title={course.courseTitle}
            category={course.courseCategory}
            instructor={course.teacherId.firstname}
          />
        ))
      ) : (
        <div className="content row m-0 p-0 justify-content-center align-items-center pt-5">
          <img src={noData} alt="No Data" />
          <p className="m-0 p-0 text-center">No data available in wishlist</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
