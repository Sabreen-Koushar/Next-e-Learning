import { useState, useRef, useEffect } from "react";

import profilePhoto from "../../assets/images/instructor-Avatar.jpg";
import VARIABLES from "../../../environmentVariables";
import axios from "axios";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { updateProfileImage } from "../../redux/actions/authActions";


const AccountDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch=useDispatch();

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    expertise: "",
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    pincode: "",
    address: "",
    city: "",
    country: "",
    aboutInfo: "",
    personalWebsite: "",
    githubProfile: "",
  });

  const handleViewUserDetails = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/view-student-details`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        if (response.data.data.profileImage) {
          setSelectedImage(
            `${VARIABLES.API_URL_REMOTE}/uploads/${response.data.data.profileImage}`
          );
        } 
        setUserDetails({
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          email: response.data.data.email,
          phone: response.data.data.phone,
          expertise: response.data.data.expertise,
          username: response.data.data.username,
          password: response.data.data.password,
          confirmPassword: "",
          profileImage: response.data.data.profileImage,
          pincode: response.data.data.pincode,
          address: response.data.data.address,
          city: response.data.data.city,
          country: response.data.data.country,
          aboutInfo: response.data.data.aboutInfo,
          personalWebsite: response.data.data.personalWebsite,
          githubProfile: response.data.data.githubProfile,
        });
      }
    } catch (error) {
      toast.error("Something went wrong in view");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in userDetails) {
        formData.append(key, userDetails[key]);
      }

      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/update-student-details`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // Dispatch action to update profile image in Redux store
        dispatch(updateProfileImage(response.data.data.profileImage));
        toast.success("Update successful!");
        setUserDetails(response.data.data);
      } else {
        toast.error("Update failed. Please try again later.");
      }
    } catch (error) {
      toast.error("Update failed. Please try again later.");
      console.error("Update failed:", error);
    }
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    setUserDetails({ ...userDetails, profileImage: imageFile });
  };

  // Function to handle "Change Image" button click
  const handleChangeImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    if (e.target.name === "profileImage") {
      setUserDetails({ ...userDetails, profileImage: e.target.files[0] });
    } else {
      setUserDetails({
        ...userDetails,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  useEffect(() => {
    handleViewUserDetails();
  }, []);

  return (
    <div className="accountdetails row card m-0 p-3 mt-3 mb-3">
      <div className="row m-0 p-0">
        <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3">
          Generals
        </h4>

        <form
          action=""
          method="post"
          className="m-0 p-0 mt-4"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          {/**Generals Information */}
          <div className="row m-0 p-0">
            <div className="col-lg-9 m-0 p-0">
              <div className="row m-0 p-0">
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="firstname"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="firstname"
                    name="firstname"
                    onChange={handleInputChange}
                    value={userDetails.firstname}
                  />
                </div>
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="lastname"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="lastname"
                    name="lastname"
                    onChange={handleInputChange}
                    value={userDetails.lastname}
                  />
                </div>
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="email"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="email"
                    name="email"
                    onChange={handleInputChange}
                    value={userDetails.email}
                  />
                </div>
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="phone"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    Phone no.
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="phone"
                    name="phone"
                    onChange={handleInputChange}
                    value={userDetails.phone}
                  />
                </div>
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="expertise"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    Expertise
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="expertise"
                    name="expertise"
                    onChange={handleInputChange}
                    value={userDetails.expertise}
                  />
                </div>
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="username"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="username"
                    name="username"
                    onChange={handleInputChange}
                    value={userDetails.username}
                  />
                </div>
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="password"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                    value={userDetails.password}
                  />
                </div>
                <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
                  <label
                    htmlFor="confirmPassword"
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    className="border border-1 rounded-2 p-2 ps-3 m-0"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    value={userDetails.confirmPassword}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <p
                className="m-0 p-0 fw-medium mb-3"
                style={{ color: "#252641" }}
              >
                Profile Update
              </p>
              <div className="profile-image rounded-2 overflow-hidden d-flex align-items-center justify-content-center">
                <img
                  src={selectedImage || profilePhoto}
                  alt=""
                  className="rounded-2 w-100 h-100"
                />
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="imageInput"
                name="profileImage"
              />
              {/* Custom button to trigger file input */}
              <button
                className="upload-image btn btn-transparent border border-1 w-100 mt-4"
                onClick={handleChangeImageButtonClick}
              >
                Upload Image
              </button>
            </div>
          </div>

          {/**Others Information */}

          <div className="row m-0 p-0 mt-5 mt-lg-0">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              Other Information
            </h4>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="phone"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Phone no.
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="phone"
                name="phone"
                onChange={handleInputChange}
                value={userDetails.phone}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="email"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Email
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="email"
                name="email"
                onChange={handleInputChange}
                value={userDetails.email}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-0 mb-3 mt-3 position-relative ">
              <label
                htmlFor="pincode"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Pincode
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="pincode"
                name="pincode"
                onChange={handleInputChange}
                value={userDetails.pincode}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="address"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Address
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="address"
                name="address"
                onChange={handleInputChange}
                value={userDetails.address}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="city"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                City
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="city"
                name="city"
                onChange={handleInputChange}
                value={userDetails.city}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-0 mb-3 mt-3 position-relative ">
              <label
                htmlFor="country"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Country
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="country"
                name="country"
                onChange={handleInputChange}
                value={userDetails.country}
              />
            </div>
            <div className="input-feild col-lg-12 row m-0 p-0 pe-lg-0 mb-3 mt-3 position-relative ">
              <label
                htmlFor="aboutInfo"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                About Info
              </label>
              <textarea
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0 h-auto"
                id="aboutInfo"
                name="aboutInfo"
                value={userDetails.aboutInfo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/**Online Presence*/}
          <div className="row m-0 p-0 mt-5 mt-lg-4">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              Online Presence
            </h4>
            <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="personalWebsite"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Personal Website
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="personalWebsite"
                name="personalWebsite"
                onChange={handleInputChange}
                value={userDetails.personalWebsite}
              />
            </div>
            <div className="input-feild col-lg-6 row m-0 p-0 pe-lg-0 mb-3 mt-3 position-relative ">
              <label
                htmlFor="githubProfile"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Github Profile
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="githubProfile"
                name="githubProfile"
                onChange={handleInputChange}
                value={userDetails.githubProfile}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="address"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Address
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="address"
                name="address"
                onChange={handleInputChange}
                value={userDetails.address}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="city"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                City
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="city"
                name="city"
                onChange={handleInputChange}
                value={userDetails.city}
              />
            </div>
            <div className="input-feild col-lg-4 row m-0 p-0 pe-lg-0 mb-3 mt-3 position-relative ">
              <label
                htmlFor="country"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Country
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="country"
                name="country"
                onChange={handleInputChange}
                value={userDetails.country}
              />
            </div>
          </div>
          <div className="row m-0 p-0 justify-content-end ">
            <button className="saveChanges btn text-light w-auto">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
