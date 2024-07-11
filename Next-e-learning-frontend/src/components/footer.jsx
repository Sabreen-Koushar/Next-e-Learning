import { Link } from "react-router-dom";
import logo from "../assets/images/logo-white.png";
const Footer = () => {
  return (
    <div className="footer m-0  pt-5 pb-5 p-lg-5 d-flex justify-content-center align-items-center">
      <div className="container row justify-content-center align-items-center">
        <div className="col-lg-2 col-8">
          <img src={logo} alt="logo image" className="w-100" />
          <p className="m-0 p-0 text-light mt-4 text-center text-lg-start">
            Learning often happens in classrooms but it doesn't have to .
          </p>

          <p className="m-0 p-0 text-light fw-medium mt-5 text-center text-lg-start">+91-9999999999</p>
          <p className="m-0 p-0 text-light fw-medium text-center text-lg-start">nextgenedu@gmail.com</p>

          <p className="m-0 p-0 text-light fw-medium text-center text-lg-start">
            sabreenkoushar@gmail.com
          </p>
        </div>
        <div className="col-lg-3 mt-lg-0 mt-5 col-8 p-lg-5 pt-0">
          <h5 className="text-light text-center text-lg-start">Quicks links</h5>
          <Link to="/about" className="text-decoration-none text-light">
            <p className="mt-lg-5 text-center text-lg-start ">About</p>
          </Link>
          <Link to="/courses" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Courses</p>
          </Link>
          <Link to="/blog" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Blog</p>
          </Link>
          <Link to="/login" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Login</p>
          </Link>
        </div>
        <div className="col-lg-3  mt-lg-0 mt-5  col-8 p-lg-5 pt-0">
          <h5 className="text-light text-center text-lg-start">Resources</h5>
         
          <Link to="/courses" className="text-decoration-none text-light">
            <p className="mt-lg-5 text-center text-lg-start">Courses</p>
          </Link>
          <Link to="#" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Membership</p>
          </Link>
          <Link to="#" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Instructor</p>
          </Link>
          <Link to="#" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Faqs</p>
          </Link>
        </div>{" "}
        <div className="col-lg-3  mt-lg-0 mt-5 col-8 p-lg-5 pt-0">
          <h5 className="text-light text-center text-lg-start">Support</h5>
         
          <Link to="#" className="text-decoration-none text-light text-center text-lg-start">
            <p className="mt-lg-5 text-center text-lg-start">Forums</p>
          </Link>
          <Link to="#" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Documentation</p>
          </Link>
          <Link to="#" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Terms</p>
          </Link>
          <Link to="#" className="text-decoration-none text-light">
            <p className="text-center text-lg-start">Community</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
