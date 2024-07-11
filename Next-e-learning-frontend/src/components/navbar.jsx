import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { decode } from "jwt-js-decode";
import { useSelector } from "react-redux";

import InstructorImg from "../assets/images/instructor-image-course.png";
import logo from "../assets/images/logo.png";
import VARIABLES from "../../environmentVariables";

const Navbar = () => {
  const [isUser, setIsUser] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [profileLink, setProfileLink] = useState(null);
  const [userDetails, setUserDetails] = useState();
  const currentUser=useSelector((state)=>state.auth.isAuthenticated);
  const userProfileImage=useSelector(state=>state.auth.userProfile.profileImage);

  

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = 100;

      setIsFixed(scrollPosition > offset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      setIsUser(true);
      let jwt = decode(token);
      setUserDetails(jwt.payload.user);
      setProfileLink(`/${jwt.payload.user.role}`);
     
    } else {
      setIsUser(false);
    }
  }, [currentUser]);

  return (
    <div
      className={`Navbar row m-0 p-0 justify-content-between align-items-center pt-3 pb-3 p-md-5 pt-md-3 pb-md-3  fixed ${
        isFixed ? "navbar-light" : " "
      }`}
    >
      <div className="col-3 col-lg-2 overflow-hidden ">
        <img src={logo} alt="logo" className="w-lg-75 w-100" />
      </div>
      <div className="col-9 d-lg-flex d-none">
        <div className="row m-0 p-0 w-100 align-items-center justify-content-between">
          <Link
            to="/"
            className={`text-light col-1 m-0 p-0 text-decoration-none   ${
              isFixed ? "text-dark" : " "
            }`}
          >
            <p className="m-0 p-0 w-auto">Home</p>
          </Link>
          <Link
            to="/courses"
            className={`text-light col-1 m-0 p-0 text-decoration-none  ${
              isFixed ? "text-dark" : " "
            }`}
          >
            <p className="m-0 p-0 w-auto">Courses</p>
          </Link>
          <Link
            to="/forum"
            className={`text-light col-2 m-0 p-0 text-decoration-none  ${
              isFixed ? "text-dark" : " "
            }`}
          >
            <p className="m-0 p-0 w-auto">Community-Forum</p>
          </Link>
          <Link
            to="/blog"
            className={`text-light col-1 m-0 p-0 text-decoration-none  ${
              isFixed ? "text-dark" : " "
            }`}
          >
            <p className="m-0 p-0 w-auto">Blog</p>
          </Link>
          <Link
            to="/aboutUs"
            className={`text-light col-1 m-0 p-0 text-decoration-none ${
              isFixed ? "text-dark" : " "
            }`}
          >
            <p className="m-0 p-0 w-auto">About Us</p>
          </Link>
          {userDetails? (
            <div className="col-4 d-flex justify-content-end">
              <Link to={profileLink} className="text-decoration-none">
                <div className="row m-0 p-0 align-items-center w-auto">
                  <div
                    className=" rounded-circle overflow-hidden m-0 p-0"
                    style={{ backgroundColor: "#D9D9D9",height:'50px',width:'50px' }}
                  >
                    <img
                      src={  userProfileImage ? `${VARIABLES.API_URL_REMOTE}/uploads/${userProfileImage}` :( userDetails.profileImage? `${VARIABLES.API_URL_REMOTE}/uploads/${userDetails.profileImage}` :InstructorImg)}
                      alt="instructor image"
                      className="instructorImg  rounded-circle"
                      style={{height:'50px',width:'50px'}}
                    />
                  </div>
                  <p
                    className={`text-light text-decoration-none  m-0 p-0 ps-2 w-auto fw-medium ${
                      isFixed ? "text-dark" : " "
                    }`}
                  >
                    {userDetails.username}
                  </p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="col-4 d-flex justify-content-end">
              <Link
                to="/login"
                className={`text-light w-auto m-0 p-0 text-decoration-none  ${
                  isFixed ? "text-light" : " "
                }`}
              >
                <button
                  className={`login btn bg-light rounded-pill ps-4 pe-4 ${
                    isFixed ? "login-scroll" : " "
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link
                to="/register"
                className={`text-light w-auto m-0 p-0 text-decoration-none ms-1 ${
                  isFixed ? "text-dark" : " "
                }`}
              >
                <button
                  className={`signup btn rounded-pill ps-3 pe-3 text-light ${
                    isFixed ? "signup-scroll" : ""
                  }`}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <i
        className="bi bi-list fs-1 w-auto d-flex d-lg-none"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      ></i>

      <div
        className="offcanvas offcanvas-end"
       
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <div className="col-6">
            <img src={logo} alt="logo" className="w-100" />
          </div>

          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row m-0 p-0 align-items-center">
            <Link
              to="/"
              className=" text-light  m-0 p-0 text-decoration-none mt-3 mb-3 "
            >
              <p className="m-0 p-0 w-auto fs-4 ">Home</p>
            </Link>
            <Link
              to="/courses"
              className="text-light  m-0 p-0 text-decoration-none mt-3 mb-3"
            >
              <p className="m-0 p-0 w-auto fs-4 ">Courses</p>
            </Link>
            <Link
              to="/forum"
              className="text-light  m-0 p-0 text-decoration-none mt-3 mb-3"
            >
              <p className="m-0 p-0 w-auto fs-4 ">Community-forum</p>
            </Link>
            <Link
              to="/blog"
              className="text-light  m-0 p-0 text-decoration-none mt-3 mb-3"
            >
              <p className="m-0 p-0 w-auto fs-4 ">Blog</p>
            </Link>
            <Link
              to="/aboutUs"
              className="text-light  m-0 p-0 text-decoration-none mt-3 mb-3"
            >
              <p className="m-0 p-0 w-auto fs-4 ">About Us</p>
            </Link>
            {userDetails ? (
              <div className="row m-0 p-0">
                <Link to={profileLink} className="text-decoration-none m-0 p-0">
                  <div className="row m-0 p-0 align-items-center w-auto">
                    <div
                      className=" rounded-circle overflow-hidden w-auto m-0 p-0"
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <img
                      src={  userProfileImage ? `${VARIABLES.API_URL_REMOTE}/uploads/${userProfileImage}` :( userDetails.profileImage? `${VARIABLES.API_URL_REMOTE}/uploads/${userDetails.profileImage}` :InstructorImg)}
                      alt="instructor image"
                        className="instructorImg  rounded-circle"
                        style={{height:'50px',width:'50px'}}
                      />
                    </div>
                    <p
                      className={`text-light text-decoration-none  m-0 p-0 ps-2 w-auto fw-medium ${
                        isFixed ? "text-dark" : " "
                      }`}
                    >
                      {userDetails.username}
                    </p>
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-light w-auto m-0 p-0 text-decoration-none"
                >
                  <button className="login btn bg-light rounded-pill ps-4 pe-4 fs-4">
                    Login
                  </button>
                </Link>
                <Link
                  to="/register"
                  className="text-light w-auto m-0 p-0 text-decoration-none ms-2"
                >
                  <button className="signup btn rounded-pill ps-3 pe-3 text-light fs-4">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
