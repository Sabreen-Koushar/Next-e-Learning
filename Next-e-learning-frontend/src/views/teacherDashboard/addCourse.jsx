import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";
import VARIABLES from "../../../environmentVariables";

const AddCourse = () => {
  const initialCourseDetails = {
    courseTitle: "",
    courseCategory: "",
    videoLink: "",
    aboutCourse: "",
    learnItems: [""],
    materialIncludesItems: [""],
    requirementItems: [""],
    tagItems: [""],
    audienceItems: [""],
  };
  const [courseDetails, setCourseDetails] = useState(initialCourseDetails);

  const handleInputChange = (key, value) => {
    setCourseDetails({ ...courseDetails, [key]: value });
  };

  const handleArrayItemChange = (key, index, value) => {
    const updatedItems = [...courseDetails[key]];
    updatedItems[index] = value;
    setCourseDetails({ ...courseDetails, [key]: updatedItems });
  };

  const handleAddItem = (key) => {
    setCourseDetails({ ...courseDetails, [key]: [...courseDetails[key], ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/add-course`,

        {
          courseDetails,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 201) {
        toast.success("Course added successfully!!");
        setCourseDetails(initialCourseDetails);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add course");
    }
  };

  useEffect(() => {
    setCourseDetails({ ...courseDetails, aboutCourse: "" });
  }, []);
  return (
    <div className="add-course accountdetails row card m-0 p-3 mt-3 mb-3">
      <div className="row m-0 p-0">
        <form
          action=""
          method="post"
          className="m-0 p-0 mt-4"
          onSubmit={handleSubmit}
        >
          {/* Course details */}
          <div className="row m-0 p-0 mt-5 mt-lg-0">
            {/* Course Title */}
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              Course Title
            </h4>
            {/* Course Title Input */}
            <div className="input-field col-lg-12 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="course"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Course Title
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="course"
                name="course"
                placeholder="Perfect Diet & Meal Plan-Complete Course"
                value={courseDetails.courseTitle}
                onChange={(e) =>
                  handleInputChange("courseTitle", e.target.value)
                }
              />
            </div>
            {/* Course Category */}
            <div className="input-field col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="courseCategory"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Course Category
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="courseCategory"
                name="courseCategory"
                placeholder="Featured, Health & Fitness"
                value={courseDetails.courseCategory}
                onChange={(e) =>
                  handleInputChange("courseCategory", e.target.value)
                }
              />
            </div>
            {/* Video Link */}
            <div className="input-field col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative ">
              <label
                htmlFor="videoLink"
                className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
              >
                Video Link
              </label>
              <input
                type="text"
                className="border border-1 rounded-2 p-2 ps-3 m-0"
                id="videoLink"
                name="videoLink"
                placeholder="https://www.youtube.com/watch?v=W4O98sbGpMc"
                value={courseDetails.videoLink}
                onChange={(e) => handleInputChange("videoLink", e.target.value)}
              />
            </div>
          </div>

          {/* Course Info- about course */}
          <div className="row m-0 p-0 mt-5 pt-4 mt-lg-0">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              About Course
            </h4>
            <div className="row m-0 p-0 mb-5">
              <ReactQuill
                theme="snow"
                value={courseDetails.aboutCourse} // Update to use courseDetails.aboutCourse
                onChange={(value) =>
                  setCourseDetails({ ...courseDetails, aboutCourse: value })
                }
                className="m-0 p-0"
              />
            </div>
          </div>

          {/* What will you learn */}
          <div className="row m-0 p-0 mt-5 pt-4 mt-lg-0">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              What will you learn
            </h4>
            {/* Learn Item Inputs */}
            {courseDetails.learnItems.map((item, index) => (
              <div
                key={index}
                className="input-field col-lg-12 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative"
              >
                <label
                  htmlFor={`whatWillYouLearn-${index}`}
                  className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                >
                  Title details
                </label>
                <input
                  type="text"
                  className="border border-1 rounded-2 p-2 ps-3 m-0"
                  id={`whatWillYouLearn-${index}`}
                  name={`whatWillYouLearn-${index}`}
                  placeholder="Understanding the fundamentals of healthy dieting (calories, protein, carbs, fat, vitamins & minerals)"
                  value={item}
                  onChange={(e) =>
                    handleArrayItemChange("learnItems", index, e.target.value)
                  }
                />
              </div>
            ))}
            {/* Add Learn Item Button */}
            <button
              type="button"
              className="addLearnBtn btn w-auto"
              onClick={() => handleAddItem("learnItems")}
            >
              +
            </button>
          </div>

          {/* Material Includes*/}
          <div className="row m-0 p-0 mt-5 pt-4 mt-lg-0">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              Materials Include
            </h4>
            {/* Materials include Item Inputs */}
            {courseDetails.materialIncludesItems.map((item, index) => (
              <div
                key={index}
                className="input-field col-lg-12 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative"
              >
                <label
                  htmlFor={`materialIncludesItem-${index}`}
                  className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                >
                  Title details
                </label>
                <input
                  type="text"
                  className="border border-1 rounded-2 p-2 ps-3 m-0"
                  id={`materialIncludesItem-${index}`}
                  name={`materialIncludesItem-${index}`}
                  placeholder="15.5 hours on-demand video"
                  value={item}
                  onChange={(e) =>
                    handleArrayItemChange(
                      "materialIncludesItems",
                      index,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            {/* Add Material Include Item Button */}
            <button
              type="button"
              className="addLearnBtn btn w-auto"
              onClick={() => handleAddItem("materialIncludesItems")}
            >
              +
            </button>
          </div>

          {/* Requirements*/}
          <div className="row m-0 p-0 mt-5 pt-4 mt-lg-0">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              Requirements
            </h4>
            {/* Requirements Item Inputs */}
            {courseDetails.requirementItems.map((item, index) => (
              <div
                key={index}
                className="input-field col-lg-12 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative"
              >
                <label
                  htmlFor={`requirementItem-${index}`}
                  className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                >
                  Title details
                </label>
                <input
                  type="text"
                  className="border border-1 rounded-2 p-2 ps-3 m-0"
                  id={`requirementItem-${index}`}
                  name={`requirementItem-${index}`}
                  placeholder="Mac or PC or Mobile"
                  value={item}
                  onChange={(e) =>
                    handleArrayItemChange(
                      "requirementItems",
                      index,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            {/* Add Requirement Item Button */}
            <button
              type="button"
              className="addLearnBtn btn w-auto"
              onClick={() => handleAddItem("requirementItems")}
            >
              +
            </button>
          </div>

          {/* Tags*/}
          <div className="row m-0 p-0 mt-5 pt-4 mt-lg-0">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              Tags
            </h4>
            <div className="row m-0 p-0">
              {/* Tags Item Inputs */}
              {courseDetails.tagItems.map((item, index) => (
                <div
                  key={index}
                  className="input-field col-lg-6 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative"
                >
                  <label
                    htmlFor={`tagItem-${index}`}
                    className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                  >
                    Title details
                  </label>
                  <input
                    type="text"
                    className="border  border-1 rounded-2 p-2 ps-3 m-0"
                    id={`tagItem-${index}`}
                    name={`tagItem-${index}`}
                    placeholder="3D"
                    value={item}
                    onChange={(e) =>
                      handleArrayItemChange("tagItems", index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            {/* Add Tag Item Button */}
            <button
              type="button"
              className="addLearnBtn btn w-auto"
              onClick={() => handleAddItem("tagItems")}
            >
              +
            </button>
          </div>

          {/* Audience*/}
          <div className="row m-0 p-0 mt-5 pt-4 mt-lg-0">
            <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3 mb-4">
              Audience
            </h4>
            {/* Audience Item Inputs */}
            {courseDetails.audienceItems.map((item, index) => (
              <div
                key={index}
                className="input-field col-lg-12 row m-0 p-0 pe-lg-3 mb-3 mt-3 position-relative"
              >
                <label
                  htmlFor={`audienceItem-${index}`}
                  className="m-0 p-0 text-secondary position-absolute w-auto ps-2 pe-2"
                >
                  Title details
                </label>
                <input
                  type="text"
                  className="border border-1 rounded-2 p-2 ps-3 m-0"
                  id={`audienceItem-${index}`}
                  name={`audienceItem-${index}`}
                  placeholder="Competent and confident with using a computer"
                  value={item}
                  onChange={(e) =>
                    handleArrayItemChange(
                      "audienceItems",
                      index,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            {/* Add Audience Item Button */}
            <button
              type="button"
              className="addLearnBtn btn w-auto"
              onClick={() => handleAddItem("audienceItems")}
            >
              +
            </button>
          </div>

          <div className="row m-0 p-0 justify-content-start">
            {/* Submit Button */}
            <button type="submit" className="btn mt-4 w-auto">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
