import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InstructorImg from "../assets/images/instructor-Avatar.jpg";
import profileImage from "../assets/images/instructor-image-course.png";
import axios from "axios";
import { toast } from "react-toastify";
import VARIABLES from "../../environmentVariables";
import { decode } from "jwt-js-decode";

const CourseDetails = () => {
  const [courseInfoTabBtn, setCourseInfoTabBtn] = useState(true);
  const [reviewTabBtn, setReviewTabBtn] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState();
  const [isWishlist, setIsWishlist] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [rating, setRating] = useState(1);
  const [reviewDetails, setReviewDetails] = useState({
    rating: rating,
    reviewText: "",
  });
  const [reviewList, setReviewList] = useState([]);

  const courseId = useParams().id;
  const handleTab = (e) => {
    console.log(e.currentTarget.id);
    if (e.currentTarget.id === "reviews") {
      setReviewTabBtn(true);
      setCourseInfoTabBtn(false);
      // handleIsReviewedByStudentIdCourseId();
    }
    if (e.currentTarget.id === "courseInfo") {
      setReviewTabBtn(false);
      setCourseInfoTabBtn(true);
    }
  };

  const handleViewDetails = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/view-courseDetails-ById`,
        { courseId }
      );
      console.log(response);
      if (response.status == 200) {
        setCourseDetails(response.data.data);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/add-wishlist`,
        {
          courseId,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setErrorMessage(response.data.message);

      if (response.status === 200) {
        toast.success("Added to wishlist");
        setIsWishlist(true);
      } else if (response.status === 400) {
        // Check if the error message is specific to course already in wishlist
        if (response.data.message === "Course already in wishlist") {
          setIsWishlist(true); // Course is already in the wishlist
        } else {
          // Handle other bad request scenarios
          // Display a generic error message or handle it as needed
          toast.error("Bad request. Please try again later.");
        }
      }
    } catch (error) {
      toast.error("failed to add wishlist");
      console.log(error);
    }
  };
  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/add-enrolled`,
        {
          courseId,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        toast.success("enrolled successfully");
        setIsEnrolled(true);
      } else if (response.status === 400) {
        toast.error("failed to enrolled");
        setIsEnrolled(false);
      }
    } catch (error) {
      toast.error("failed to enrolled");
      console.log(error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("token")) {
        let jwt = decode(localStorage.getItem("token"));
        const role = jwt.payload.user.role;
        if (role === "student") {
          console.log(reviewDetails);
          reviewDetails.rating=rating;
          const response = await axios.post(
            `${VARIABLES.API_URL_REMOTE}/add-review`,
            { reviewDetails, courseId },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          if (response.status === 201) {
            toast.success("review added successfully!");
            handleViewReview();
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to add review!!");
    }
  };

  const handleViewReview = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/view-Review-courseId`,
        { courseId }
      );
      console.log("review:", response);
      if (response.status === 200) {
        setReviewList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleIsReviewedByStudentIdCourseId=async()=>{
  //   try{
  //     const response=await axios.post(`${VARIABLES.API_URL_REMOTE}/isReviewed-studentId-courseId`,{courseId},{
  //       headers:{
  //         Authorization:localStorage.getItem('token')
  //       }
  //     })

      
  //     if(response.status===200){
  //       console.log(response)
  //       setReviewDetails({...reviewDetails,reviewText:response.data.data.reviewText});
  //       setRating(response.data.data.rating);
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  const handleStarFill = (value) => {
    setRating(value);
    console.log(rating)
  };

  const handleReviewInputChange = (e) => {
    setReviewDetails({ ...reviewDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("please login first");
      setTimeout(() => {
        window.location.href = "#/login";
      }, 1000);
    }
    handleViewDetails();
    handleViewReview();
  }, []);
  return (
    <div className="courseDetails d-flex m-0 p-0 pt-5 mt-5 justify-content-center ">
      <div className="container pt-lg-5">
        <div className="row m-0 p-0 align-items-center ">
          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-0 pe-1"></i>
          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-2 pe-1"></i>
          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-2 pe-1"></i>
          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-2 pe-1"></i>
          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-2 pe-1"></i>
          <span className="m-0 p-0 ps-2 w-auto fw-medium ">4.67</span>
          <span className="m-0 p-0 ps-2 text-muted w-auto text-secondary ">
            (9 Ratings)
          </span>
        </div>
        <h3 className="m-0 p-0 mt-3">{courseDetails.courseTitle}</h3>
        {/* <h3 className="m-0 p-0  mt-3 " style={{ color: "rgb(47, 50, 125)" }}>
          Perfect Diet &{" "}
          <span className="" style={{ color: "rgb(0, 203, 184)" }}>
            Meal Plan-Complete Course
          </span>
        </h3> */}
        <div className="row m-0 p-0 justify-content-between align-items-center ">
          <p className="text-secondary m-0 p-0 mt-2 w-auto">
            Categories:{" "}
            <span className="text-black">{courseDetails.courseCategory}</span>
          </p>
          {isWishlist ? (
            <div className="w-auto d-flex align-items-center m-0 p-0 mt-3 mt-md-0">
              <i
                className="bi bi-bookmark-fill w-auto m-0 p-0 text-secondary ps-0 pe-2 "
                onClick={handleWishlist}
                style={{ cursor: "pointer" }}
              ></i>
              <p
                className="m-0 p-0 w-auto text-secondary ps-1 pe-2 "
                onClick={handleWishlist}
                style={{ cursor: "pointer" }}
              >
                Wishlist
              </p>

              <i className="bi bi-share w-auto m-0 p-0 text-secondary ps-3 pe-2"></i>
              <p className="m-0 p-0 w-auto text-secondary ps-1 pe-0">share</p>
            </div>
          ) : (
            <div className="w-auto d-flex align-items-center m-0 p-0 mt-3 mt-md-0">
              <i
                className="bi bi-bookmark w-auto m-0 p-0 text-secondary ps-0 pe-2 "
                onClick={handleWishlist}
                style={{ cursor: "pointer" }}
              ></i>
              <p
                className="m-0 p-0 w-auto text-secondary ps-1 pe-2 "
                onClick={handleWishlist}
                style={{ cursor: "pointer" }}
              >
                Wishlist
              </p>

              <i className="bi bi-share w-auto m-0 p-0 text-secondary ps-3 pe-2"></i>
              <p className="m-0 p-0 w-auto text-secondary ps-1 pe-0">share</p>
            </div>
          )}
        </div>

        <div className="row m-0 p-0 mt-5">
          <div className="col-lg-9 p-lg-4 pe-0 pe-lg-4 pt-0 pt-lg-0 ps-0 ps-lg-0">
            <iframe
              id="player"
              type="text/html"
              width="640"
              height="490"
              className="w-100"
              src="http://www.youtube.com/embed/yGDwk4z9EEg?enablejsapi=1&origin=http://example.com"
              frameborder="0"
            ></iframe>

            <div className="navtab row m-0 p-0 mt-5 border border-1 border-start-0 border-end-0 border-top-0 pb-3">
              <button
                className={`btn fw-medium w-auto ms-0 me-md-2 mt-2 mt-md-0 ${
                  courseInfoTabBtn ? "btn-active" : ""
                }`}
                id="courseInfo"
                onClick={handleTab}
              >
                Course Info
              </button>

              <button
                className={`btn fw-medium w-auto ms-2 me-2 mt-2 mt-md-0 ${
                  reviewTabBtn ? "btn-active" : ""
                }`}
                id="reviews"
                onClick={handleTab}
              >
                Reviews
              </button>
            </div>
            {courseInfoTabBtn ? (
              <div className="row m-0 p-0 mt-3" id="courseInfoDetails">
                <h3 className="m-0 p-0">About Course</h3>
                {/**about courses details paragraph */}

                <div
                  className="row m-0 p-0 mt-3"
                  dangerouslySetInnerHTML={{
                    __html: courseDetails.aboutCourse,
                  }}
                />

                {/**what will you learn */}
                <h3 className="m-0 p-0 mt-5 mb-3">What will you learn</h3>
                <div className="row m-0 p-0">
                  {Array.isArray(courseDetails.learnItems) &&
                    courseDetails.learnItems.map((item, index) => (
                      <div className="col-lg-6" key={index}>
                        <div className="row m-0 p-0 align-items-center mt-2 justify-content-between">
                          <div className="col-1 m-0 p-0">
                            <div className="dot bg-secondary rounded-circle p-0 m-0"></div>
                          </div>
                          <div className="col-11 m-0 p-0">
                            <p className="m-0 p-0">{item}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/**course content */}
                <div className="row m-0 p-0">
                  <h3 className="m-0 p-0 mt-5 mb-3">Course Content</h3>

                  <div className="card content-item p-0 m-0 mt-3 overflow-hidden ">
                    <div
                      className="row m-0 p-0 p-3 border border-1 border-top-0 border-start-0 border-end-0"
                      data-bs-toggle="collapse"
                      data-bs-target="#contentItem1"
                      aria-expanded="false"
                      aria-controls="contentItem1"
                    >
                      <h5 className="m-0 p-0">Meal Planning Basics</h5>
                    </div>

                    <div className="collapse m-0 p-0" id="contentItem1">
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Meal Planning Explained
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Macronutrients Explained
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">05:12</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            How Much Protein Should You Consume Per day?
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">13:00</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            How Much Fat Should You Consume Per Day?
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-clipboard-data-fill w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Meal Timing Introduction
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-question-circle w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">This is Demo Quiz</p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card content-item p-0 m-0 mt-3 overflow-hidden ">
                    <div
                      className="row m-0 p-0 p-3 border border-1 border-top-0 border-start-0 border-end-0"
                      data-bs-toggle="collapse"
                      data-bs-target="#contentItem2"
                      aria-expanded="false"
                      aria-controls="contentItem2"
                    >
                      <h5 className="m-0 p-0">Supplements</h5>
                    </div>

                    <div className="collapse m-0 p-0" id="contentItem2">
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Supplements Explained
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            The Top 3 Beginner Supplements For Fitness
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">05:12</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>

                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-clipboard-data-fill w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            How To Use Protein Powder
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-clipboard-data-fill w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Other Supplements To Consider
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card content-item p-0 m-0 mt-3 overflow-hidden ">
                    <div
                      className="row m-0 p-0 p-3 border border-1 border-top-0 border-start-0 border-end-0"
                      data-bs-toggle="collapse"
                      data-bs-target="#contentItem3"
                      aria-expanded="false"
                      aria-controls="contentItem3"
                    >
                      <h5 className="m-0 p-0">Setting Up Your Diet</h5>
                    </div>

                    <div className="collapse m-0 p-0" id="contentItem3">
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Meal Planning Explained
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Macronutrients Explained
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">05:12</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            How Much Protein Should You Consume Per day?
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">13:00</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            How Much Fat Should You Consume Per Day?
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-clipboard-data-fill w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">
                            Meal Timing Introduction
                          </p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                      <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-question-circle w-auto text-secondary m-0 p-0 pe-2"></i>
                          <p className="m-0 p-0 w-auto">This is Demo Quiz</p>
                        </div>
                        <div className="row m-0 p-0 w-auto align-items-center">
                          <i className="bi bi-lock w-auto text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card content-item p-0 m-0 mt-3 overflow-hidden ">
                  <div
                    className="row m-0 p-0 p-3 border border-1 border-top-0 border-start-0 border-end-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#contentItem4"
                    aria-expanded="false"
                    aria-controls="contentItem4"
                  >
                    <h5 className="m-0 p-0">
                      Adjusting Your Diet For Weight Loss & Muscle Gains
                    </h5>
                  </div>

                  <div className="collapse m-0 p-0" id="contentItem4">
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Meal Planning Explained
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Macronutrients Explained
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">05:12</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          How Much Protein Should You Consume Per day?
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">13:00</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          How Much Fat Should You Consume Per Day?
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-clipboard-data-fill w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Meal Timing Introduction
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-question-circle w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">This is Demo Quiz</p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card content-item p-0 m-0 mt-3 overflow-hidden ">
                  <div
                    className="row m-0 p-0 p-3 border border-1 border-top-0 border-start-0 border-end-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#contentItem5"
                    aria-expanded="false"
                    aria-controls="contentItem5"
                  >
                    <h5 className="m-0 p-0">Micronuterients</h5>
                  </div>

                  <div className="collapse m-0 p-0" id="contentItem5">
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Meal Planning Explained
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Macronutrients Explained
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">05:12</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          How Much Protein Should You Consume Per day?
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">13:00</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          How Much Fat Should You Consume Per Day?
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-clipboard-data-fill w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Meal Timing Introduction
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-question-circle w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">This is Demo Quiz</p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card content-item p-0 m-0 mt-3 overflow-hidden ">
                  <div
                    className="row m-0 p-0 p-3 border border-1 border-top-0 border-start-0 border-end-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#contentItem6"
                    aria-expanded="false"
                    aria-controls="contentItem6"
                  >
                    <h5 className="m-0 p-0">More Dieting Tips & Strategies</h5>
                  </div>

                  <div className="collapse m-0 p-0" id="contentItem6">
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Meal Planning Explained
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Macronutrients Explained
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">05:12</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          How Much Protein Should You Consume Per day?
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">13:00</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-youtube w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          How Much Fat Should You Consume Per Day?
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <p className="m-0 p-0 text-secondary w-auto">17:24</p>
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-clipboard-data-fill w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">
                          Meal Timing Introduction
                        </p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                    <div className="row m-0 p-0 p-3 justify-content-between align-items-center">
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-question-circle w-auto text-secondary m-0 p-0 pe-2"></i>
                        <p className="m-0 p-0 w-auto">This is Demo Quiz</p>
                      </div>
                      <div className="row m-0 p-0 w-auto align-items-center">
                        <i className="bi bi-lock w-auto text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row m-0 p-0" id="courseInfoDetails">
                {/**Reiviews and Rating */}

                <h3 className="m-0 p-0 mt-4">Student Rating & Reviews</h3>
                <div className="review-card card m-0 p-0 p-4 mt-4 border-0 ">
                  {/**star and rating row */}
                  <div className="row m-0 p-0 align-items-center">
                    <div className="col-lg-4">
                      <div className="card p-4 border-0 ">
                        <h5 className="m-0 p-0 text-secondary text-center">
                          4 Out of 5
                        </h5>
                        <div className="row m-0 p-0 justify-content-center mt-2">
                          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-1 pe-1"></i>
                          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-1 pe-1"></i>
                          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-1 pe-1"></i>
                          <i className="bi bi-star-fill text-warning w-auto m-0 p-0 ps-1 pe-1"></i>
                          <i className="bi bi-star text-warning w-auto m-0 p-0 ps-1 pe-1"></i>
                        </div>
                        <p className="m-0 p-0 text-secondary text-center mt-2">
                          Top Rating
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="row m-0 p-0 align-items-center mt-2">
                        <div className="col-3 col-lg-2 m-0 p-0">
                          <p className="m-0 p-0 text-secondary w-auto">
                            5 Stars
                          </p>
                        </div>
                        <div className="col-9 col-lg-10 m-0 p-0">
                          <div
                            className="progress m-0 p-0"
                            role="progressbar"
                            aria-label="Basic example"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                              height: "10px ",
                              backgroundColor: "#D9D9D9",
                            }}
                          >
                            <div
                              className="progress-bar rounded-2 "
                              style={{
                                width: "65%",
                                backgroundColor: "#49BBBD",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="row m-0 p-0 align-items-center mt-2">
                        <div className="col-3 col-lg-2 m-0 p-0">
                          <p className="m-0 p-0 text-secondary w-auto">
                            4 Stars
                          </p>
                        </div>
                        <div className="col-9 col-lg-10 m-0 p-0">
                          <div
                            className="progress m-0 p-0"
                            role="progressbar"
                            aria-label="Basic example"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                              height: "10px ",
                              backgroundColor: "#D9D9D9",
                            }}
                          >
                            <div
                              className="progress-bar rounded-2 "
                              style={{
                                width: "65%",
                                backgroundColor: "#49BBBD",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="row m-0 p-0 align-items-center mt-2">
                        <div className="col-3 col-lg-2 m-0 p-0">
                          <p className="m-0 p-0 text-secondary w-auto">
                            3 Stars
                          </p>
                        </div>
                        <div className="col-9 col-lg-10 m-0 p-0">
                          <div
                            className="progress m-0 p-0"
                            role="progressbar"
                            aria-label="Basic example"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                              height: "10px ",
                              backgroundColor: "#D9D9D9",
                            }}
                          >
                            <div
                              className="progress-bar rounded-2 "
                              style={{
                                width: "65%",
                                backgroundColor: "#49BBBD",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="row m-0 p-0 align-items-center mt-2">
                        <div className="col-3 col-lg-2 m-0 p-0">
                          <p className="m-0 p-0 text-secondary w-auto">
                            2 Stars
                          </p>
                        </div>
                        <div className="col-9 col-lg-10 m-0 p-0">
                          <div
                            className="progress m-0 p-0"
                            role="progressbar"
                            aria-label="Basic example"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                              height: "10px ",
                              backgroundColor: "#D9D9D9",
                            }}
                          >
                            <div
                              className="progress-bar rounded-2 "
                              style={{
                                width: "65%",
                                backgroundColor: "#49BBBD",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="row m-0 p-0 align-items-center mt-2">
                        <div className="col-3 col-lg-2 m-0 p-0">
                          <p className="m-0 p-0 text-secondary w-auto">
                            1 Stars
                          </p>
                        </div>
                        <div className="col-9 col-lg-10 m-0 p-0">
                          <div
                            className="progress m-0 p-0"
                            role="progressbar"
                            aria-label="Basic example"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                              height: "10px ",
                              backgroundColor: "#D9D9D9",
                            }}
                          >
                            <div
                              className="progress-bar rounded-2 "
                              style={{
                                width: "65%",
                                backgroundColor: "#49BBBD",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**reviews list */}
                  <div className="review-list row m-0 p-0 mt-4">
                    {Array.isArray(reviewList) &&
                      reviewList.map((item) => (
                        <div className="row m-0 p-0 mt-2 mb-2 border border-2 border-top-0 border-start-0 border-end-0 pb-3">
                          <div className="row m-0 p-0 justify-content-between align-items-end">
                            <div className="row m-0 p-0 w-auto">
                              <div
                                className=" rounded-circle overflow-hidden w-auto m-0 p-0"
                                style={{ backgroundColor: "#D9D9D9" }}
                              >
                                <img
                                  src={`${VARIABLES.API_URL_REMOTE}/uploads/${item.student.profileImage}`}
                                  alt="instructor image"
                                  className="instructorImg  rounded-circle"
                                />
                              </div>
                              <div className="w-auto">
                                <p className="m-0 p-0 fw-medium w-auto">{item.student.firstname} {item.student.lastname}</p>
                                <div className="row m-0 p-0">
                                  {
                                    [...Array(5)].map((_,index)=>(
                                      
                                      <i key={index} className={`bi bi-star-fill ${index<item.rating?"":"bi-star"} w-auto text-warning m-0 p-0 pe-2`}></i>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="row m-0 p-0 w-auto">
                              <i className="bi bi-stopwatch text-secondary w-auto"></i>
                              <p className="w-auto text-secondary m-0 p-0">
                                3 Month
                              </p>
                            </div>
                          </div>
                          <p className="m-0 p-0 text-secondary mt-3">
                           {item.reviewText}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                {/**write a reiview */}
                <button
                  className="add-review-btn btn text-light w-auto mt-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#reviewForm"
                >
                  <i className="w-auto text-light bi bi-star"></i> Write a
                  review
                </button>
                <div className="row m-0 p-0 mt-3 ">
                  <form
                    action="/add-review"
                    method="post"
                    className="m-0 p-0 collapse"
                    onSubmit={handleAddReview}
                    id="reviewForm"
                  >
                    <div className="row m-0 p-0">
                      <i
                        className={`bi  ${
                          rating >= 1 ? "bi-star-fill" : "bi-star"
                        } w-auto text-warning m-0 p-0 pe-2`}
                        onClick={() => {
                          handleStarFill(1);
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className={`bi ${
                          rating >= 2 ? "bi-star-fill" : "bi-star"
                        } w-auto text-warning m-0 p-0 pe-2`}
                        onClick={() => {
                          handleStarFill(2);
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className={`bi ${
                          rating >= 3 ? "bi-star-fill" : "bi-star"
                        } w-auto text-warning m-0 p-0 pe-2`}
                        onClick={() => {
                          handleStarFill(3);
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className={`bi ${
                          rating >= 4 ? "bi-star-fill" : "bi-star"
                        } w-auto text-warning m-0 p-0 pe-2`}
                        onClick={() => {
                          handleStarFill(4);
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className={`bi ${
                          rating >= 5 ? "bi-star-fill" : "bi-star"
                        } w-auto text-warning m-0 p-0 pe-2`}
                        onClick={() => {
                          handleStarFill(5);
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                    <textarea
                      name="reviewText"
                      id="reviewText"
                      cols="30"
                      rows="8"
                      className="form-control mt-3"
                      placeholder="write a review"
                      onChange={handleReviewInputChange}
                      value={reviewDetails.reviewText}
                    ></textarea>
                    <button
                      className="add-review-btn btn text-light w-auto mt-3"
                      onClick={handleAddReview}
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-3 pe-lg-0 p-0 p-lg-2 pt-lg-0">
            <div className="card overflow-hidden me-0 mt-4 mt-lg-0">
              <div className="upper p-4 bg-light border border-1 border-bottom-1 border-top-0 border-start-0 border-end-0">
                <h4 className="m-0 p-0">Free</h4>
                <button
                  className="btn btn-active w-100 mt-4"
                  onClick={handleEnroll}
                >
                  Enroll now
                </button>
                <p className="m-0 p-0 text-secondary text-center mt-3">
                  Free access this course
                </p>
              </div>
              <div className="lower m-0 p-4">
                <div className="row m-0 p-0 mt-2">
                  <i className="bi bi-bar-chart m-0 p-0 w-auto"></i>
                  <p className="m-0 p-0 ms-2 w-auto">Beginner</p>
                </div>
                <div className="row m-0 p-0 mt-2">
                  <i className="bi bi-mortarboard m-0 p-0 w-auto"></i>
                  <p className="m-0 p-0 ms-2 w-auto">87 Total Enrolled</p>
                </div>
                <div className="row m-0 p-0 mt-2">
                  <i className="bi bi-stopwatch m-0 p-0 w-auto"></i>
                  <p className="m-0 p-0 ms-2 w-auto">
                    15 hours 20 minutes Duration
                  </p>
                </div>
                <div className="row m-0 p-0 mt-2">
                  <i className="bi bi-arrow-clockwise m-0 p-0 w-auto"></i>
                  <p className="m-0 p-0 ms-2 w-auto">
                    April 20,2024 Last Updated
                  </p>
                </div>
              </div>
            </div>

            <div className="card me-0 mt-5">
              <div className="upper p-4 border border-1 border-top-0 border-start-0 border-end-0">
                <p className="m-0 p-0 fs-5">A course by</p>
                <div className="row m-0 p-0 align-items-center w-auto mt-2">
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
                  <p className=" text-decoration-none  m-0 p-0 ps-2 w-auto fw-medium">
                    {courseDetails && courseDetails.teacherId
                      ? courseDetails.teacherId.username
                      : ""}
                  </p>
                </div>
              </div>
              <div className="lower p-4">
                {/**Material includes */}
                <h5 className="m-0 p-0 mb-4">Material includes</h5>

                {Array.isArray(courseDetails.materialIncludesItems) &&
                  courseDetails.materialIncludesItems.map((item, index) => (
                    <div
                      className="row m-0 p-0 align-items-center mt-2"
                      key={index}
                    >
                      <span className="dot bg-secondary  rounded-circle p-0 m-0"></span>
                      <p className="m-0 p-0 w-auto ps-2">{item}</p>
                    </div>
                  ))}

                {/**Requirements */}
                <h5 className="m-0 p-0 mb-4 mt-5">Requirements</h5>
                {Array.isArray(courseDetails.requirementItems) &&
                  courseDetails.requirementItems.map((item, index) => (
                    <div
                      className="row m-0 p-0 align-items-center mt-2 justify-content-between"
                      key={index}
                    >
                      <div className="col-1 m-0 p-0">
                        <div className="dot bg-secondary  rounded-circle p-0 m-0"></div>
                      </div>
                      <div className="col-11 m-0 p-0">
                        <p className="m-0 p-0 ">{item}</p>
                      </div>
                    </div>
                  ))}

                {/**Tags */}
                <h5 className="m-0 p-0 mb-4 mt-5">Tags</h5>
                {Array.isArray(courseDetails.tagItems) &&
                  courseDetails.tagItems.map((item, index) => (
                    <button
                      className="btn btn-transparent border border-1  me-2"
                      key={index}
                    >
                      {item}
                    </button>
                  ))}

                {/**Audience */}
                <h5 className="m-0 p-0 mb-3 mt-5">Audience</h5>
                {Array.isArray(courseDetails.audienceItems) &&
                  courseDetails.audienceItems.map((item, index) => (
                    <div
                      className="row m-0 p-0 align-items-center mt-2 justify-content-between"
                      key={index}
                    >
                      <div className="col-1 m-0 p-0">
                        <div className="dot bg-secondary  rounded-circle p-0 m-0"></div>
                      </div>
                      <div className="col-11 m-0 p-0">
                        <p className="m-0 p-0 ">{item}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
