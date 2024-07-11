import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/authActions';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import registerImg from "../assets/images/register-img.png";
import loginImg from "../assets/images/login-img.png";
import VARIABLES from "../../environmentVariables";

const Login = (props) => {
  const dispatch=useDispatch();
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });
  const [userRegisterDetails, setRegisterDetails] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    role: "",
  });
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          `${VARIABLES.API_URL_REMOTE}/user-Login`,
          userData
        );
        if (response.status === 200) {
          const token = response.data.data.token;
          localStorage.setItem("token", token);
          console.log("Login Successful and the user:", response.data);
          toast.success("Login successful!!");

          setUserData({
            password: "",
            email: "",
          });
          
          //Dispatch action to Redux store
          dispatch(loginUser(response.data.data));
          setTimeout(() => {
            if (response.data.data.role === "student") {
              window.location.href = "/Next-e-learning/#/student/";
            } else if (response.data.data.role === "admin") {
              window.location.href = "/Next-e-learning/#/admin/";
            } else if (response.data.data.role === "teacher") {
              window.location.href = "/Next-e-learning/#/teacher/";
            }
          }, 1000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Login failed!!");
        console.log("Failed to login:", error);
      }
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/user-Register`,
        userRegisterDetails
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("successfully register!!");
        setRegisterDetails({
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
          password: "",
          role: "",
        });
      }
    } catch (error) {
      toast.error("registration failed!!");
      console.log("error:", error);
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterDetails({ ...userRegisterDetails, [name]: value });
  };

  if (props.layout === "login") {
    const [loginStatus, setLoginStatus] = useState(true);
    const handleSetLoginStatus = () => {
      setLoginStatus(!loginStatus);
    };
    return loginStatus ? (
      <div className="login row m-0 p-0 mt-5 pt-5 justify-content-evenly align-items-center ">
        <div className="col-lg-6 d-none d-lg-flex overflow-hidden ">
          <img
            src={loginImg}
            alt="login image"
            className="login-Image w-100 rounded-5"
          />
        </div>
        <div className="col-lg-5 pb-5 d-flex flex-column align-items-center ">
          <p className="m-0 p-0 fw-medium pb-4">Welcome to NextGenEdu...!!</p>
          <div className="row m-0 p-0">
            <div className="login-tab  rounded-pill w-auto p-2">
              <button className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto">
                Login
              </button>
              <button
                className="btn text-light rounded-pill ps-5 pe-5 w-auto"
                onClick={handleSetLoginStatus}
              >
                Register
              </button>
            </div>
          </div>
          <p className="m-0 p-0 mt-5 mb-4   text-secondary">
            NextGenEdu is not just a platform, but a community of learners and
            educators who are passionate about innovation and creativity in
            education.
          </p>
          <div className="row m-0 p-0 w-100">
            <form
              action=""
              method="post"
              className="m-0 p-0"
              onSubmit={handleLoginSubmit}
            >
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleLoginInputChange}
                  value={userData.email}
                  required
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleLoginInputChange}
                  value={userData.password}
                  required
                />
              </div>
              <div className="row m-0 p-0 justify-content-between ">
                <div className="row m-0 p-0 w-auto">
                  <input type="checkbox" className="w-auto" />
                  <p className="m-0 p-0 w-auto ps-2">Remember me</p>
                </div>
                <Link
                  to="/forget-password"
                  className="text-decoration-none text-black w-auto"
                >
                  <p className="m-0 p-0 w-auto">Forget Password?</p>
                </Link>
              </div>
              <div className="row m-0 p-0 justify-content-end mt-4">
                <button
                  onClick={handleLoginSubmit}
                  type="submit"
                  className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div className="login row m-0 p-0 mt-5 pt-5 justify-content-evenly align-items-center ">
        <div className="col-lg-6 d-none d-lg-flex overflow-hidden ">
          <img
            src={registerImg}
            alt="register image"
            className="login-Image w-100 rounded-5"
          />
        </div>
        <div className="col-lg-5 d-flex flex-column align-items-center pt-5 pb-5">
          <p className="m-0 p-0 fw-medium pb-4">Welcome to NextGenEdu...!!</p>
          <div className="row m-0 p-0">
            <div className="login-tab  rounded-pill w-auto p-2">
              <button
                className=" btn text-light rounded-pill ps-5 pe-5 w-auto"
                onClick={handleSetLoginStatus}
              >
                Login
              </button>
              <button className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto">
                Register
              </button>
            </div>
          </div>
          <p className="m-0 p-0 mt-5 mb-4   text-secondary">
            NextGenEdu is not just a platform, but a community of learners and
            educators who are passionate about innovation and creativity in
            education.
          </p>
          <div className="row m-0 p-0 w-100">
            <form
              action=""
              method="post"
              className="m-0 p-0"
              onSubmit={handleRegisterSubmit}
            >
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.email}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="firstname"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="firstname"
                  placeholder="Enter your firstname"
                  name="firstname"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.firstname}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="lastname"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="lastname"
                  placeholder="Enter your lastname"
                  name="lastname"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.lastname}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="phone"
                  placeholder="Enter your phone"
                  name="phone"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.phone}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.password}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="role">Role</label>
                <select
                  className="form-input rounded-pill m-0 mt-2 p-2"
                  aria-label="select the role"
                  id="role"
                  name="role"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.role}
                >
                  <option selected>select the role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              <div className="row m-0 p-0 justify-content-between ">
                <div className="row m-0 p-0 w-auto">
                  <input type="checkbox" className="w-auto" />
                  <p className="m-0 p-0 w-auto ps-2">Remember me</p>
                </div>
                <Link
                  to="/forget-password"
                  className="text-decoration-none text-black w-auto"
                >
                  <p className="m-0 p-0 w-auto">Forget Password?</p>
                </Link>
              </div>
              <div className="row m-0 p-0 justify-content-end mt-4">
                <button
                  onClick={handleRegisterSubmit}
                  type="submit"
                  className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  if (props.layout === "register") {
    const [loginStatus, setLoginStatus] = useState(false);
    const handleSetLoginStatus = () => {
      setLoginStatus(!loginStatus);
    };
    return loginStatus ? (
      <div className="login row m-0 p-0 mt-5 pt-5 justify-content-evenly align-items-center ">
        <div className="col-lg-6 d-none d-lg-flex overflow-hidden ">
          <img
            src={loginImg}
            alt="login image"
            className="login-Image w-100 rounded-5"
          />
        </div>
        <div className="col-lg-5 pb-5 d-flex flex-column align-items-center ">
          <p className="m-0 p-0 fw-medium pb-4">Welcome to NextGenEdu...!!</p>
          <div className="row m-0 p-0">
            <div className="login-tab  rounded-pill w-auto p-2">
              <button className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto">
                Login
              </button>
              <button
                className="btn text-light rounded-pill ps-5 pe-5 w-auto"
                onClick={handleSetLoginStatus}
              >
                Register
              </button>
            </div>
          </div>
          <p className="m-0 p-0 mt-5 mb-4   text-secondary">
            NextGenEdu is not just a platform, but a community of learners and
            educators who are passionate about innovation and creativity in
            education.
          </p>
          <div className="row m-0 p-0 w-100">
            <form
              action=""
              method="post"
              className="m-0 p-0"
              onSubmit={handleLoginSubmit}
            >
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleLoginInputChange}
                  value={userData.email}
                  required
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleLoginInputChange}
                  value={userData.password}
                  required
                />
              </div>
              <div className="row m-0 p-0 justify-content-between ">
                <div className="row m-0 p-0 w-auto">
                  <input type="checkbox" className="w-auto" />
                  <p className="m-0 p-0 w-auto ps-2">Remember me</p>
                </div>
                <Link
                  to="/forget-password"
                  className="text-decoration-none text-black w-auto"
                >
                  <p className="m-0 p-0 w-auto">Forget Password?</p>
                </Link>
              </div>
              <div className="row m-0 p-0 justify-content-end mt-4">
                <button
                  onClick={handleLoginSubmit}
                  type="submit"
                  className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div className="login row m-0 p-0 mt-5 pt-5 justify-content-evenly align-items-center ">
        <div className="col-lg-6 d-none d-lg-flex overflow-hidden ">
          <img
            src={registerImg}
            alt="register image"
            className="login-Image w-100 rounded-5"
          />
        </div>
        <div className="col-lg-5 d-flex flex-column align-items-center pt-5 pb-5">
          <p className="m-0 p-0 fw-medium pb-4">Welcome to NextGenEdu...!!</p>
          <div className="row m-0 p-0">
            <div className="login-tab  rounded-pill w-auto p-2">
              <button
                className=" btn text-light rounded-pill ps-5 pe-5 w-auto"
                onClick={handleSetLoginStatus}
              >
                Login
              </button>
              <button className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto">
                Register
              </button>
            </div>
          </div>
          <p className="m-0 p-0 mt-5 mb-4   text-secondary">
            NextGenEdu is not just a platform, but a community of learners and
            educators who are passionate about innovation and creativity in
            education.
          </p>
          <div className="row m-0 p-0 w-100">
            <form
              action=""
              method="post"
              className="m-0 p-0"
              onSubmit={handleRegisterSubmit}
            >
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.email}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="firstname"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="firstname"
                  placeholder="Enter your firstname"
                  name="firstname"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.firstname}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="lastname"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="lastname"
                  placeholder="Enter your lastname"
                  name="lastname"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.lastname}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="phone"
                  placeholder="Enter your phone"
                  name="phone"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.phone}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="m-0 mt-2 form-input rounded-pill w-100 p-4"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.password}
                />
              </div>
              <div className="form-group row m-0 p-0 mb-4">
                <label htmlFor="role">Role</label>
                <select
                  className="form-input rounded-pill m-0 mt-2 p-2"
                  aria-label="select the role"
                  id="role"
                  name="role"
                  onChange={handleRegisterInputChange}
                  value={userRegisterDetails.role}
                >
                  <option selected>select the role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              <div className="row m-0 p-0 justify-content-between ">
                <div className="row m-0 p-0 w-auto">
                  <input type="checkbox" className="w-auto" />
                  <p className="m-0 p-0 w-auto ps-2">Remember me</p>
                </div>
                <Link
                  to="/forget-password"
                  className="text-decoration-none text-black w-auto"
                >
                  <p className="m-0 p-0 w-auto">Forget Password?</p>
                </Link>
              </div>
              <div className="row m-0 p-0 justify-content-end mt-4">
                <button
                  onClick={handleRegisterSubmit}
                  type="submit"
                  className="login-btn btn text-light rounded-pill ps-5 pe-5 w-auto"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
