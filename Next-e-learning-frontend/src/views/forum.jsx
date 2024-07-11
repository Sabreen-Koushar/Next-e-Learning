import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VARIABLES from "../../environmentVariables";

import HotTodayQuestionTopic from "../components/forumHotTodayquestion";
import ForumQuestionItem from "../components/forumQuestionItem";

import successfulImg from "../assets/images/successfullPosted.svg";

const Forum = () => {
  const [isForumOpen, setIsForumOpen] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [questionDetails, setQuestionDetails] = useState({
    question: "",
    description: "",
    tags: "",
  });
  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/add-question`,
        { questionDetails },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        const successModal = document.getElementById("successfulModal");
        const bootstrapModal = new bootstrap.Modal(successModal);
        bootstrapModal.show();
        toast.success("Question Added Successfully");
        setQuestionDetails({
          question: "",
          description: "",
          tags: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add question");
    }
  };
  const handleViewForumQuestionList = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/view-Forum-QuestionList`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setQuestionList(response.data.data);
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to view Forum");
    }
  };
  const handleIsForumOpen = () => {
    setIsForumOpen(!isForumOpen);
  };
  const handleInputChange = (e) => {
    setQuestionDetails({ ...questionDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    handleViewForumQuestionList();
  }, [isForumOpen]);

  return (
    <div className="forum m-0 p-0 mt-5 pt-5 d-flex  justify-content-center ">
      <div className="container pt-5">
        <div className="row m-0 p-0">
          {isForumOpen ? (
            <div className="col-lg-8">
              <h2 className="m-0 p-0 col-lg-11" style={{ color: "#2F327D" }}>
                <span className="pe-2" style={{ color: "#00CBB8" }}>
                  Q & A
                </span>
                Discussions
              </h2>
              <div className="row m-0 p-0 mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-input rounded-pill  col-10"
                />
                <div className="col-2 pe-0">
                  <button className="search btn btn-transparent col-12 rounded-pill">
                    Search
                  </button>
                </div>
              </div>
              <div className="row m-0 p-0 mt-5 justify-content-between ">
                <div className="col-4 p-0">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>choose the category</option>
                    <option value="1">Trending</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <button
                  className="ask-question btn text-light w-auto"
                  onClick={handleIsForumOpen}
                >
                  Ask a Question
                </button>
              </div>

              <div className="row m-0 p-0 mt-3">
                {
                Array.isArray(questionList) &&
                  questionList.map((item) => (
                    <ForumQuestionItem item={item} key={item._id} />
                  ))
                }
              </div>
            </div>
          ) : (
            <div className="col-lg-8">
              <h2 className="m-0 p-0 col-lg-11" style={{ color: "#2F327D" }}>
                <span className="pe-2" style={{ color: "#00CBB8" }}>
                  Ask the
                </span>
                community a question
              </h2>
              <div className="card m-0 p-0 p-3 mt-4">
                <form
                  action="/add-question"
                  onSubmit={handleAddQuestion}
                  method="post"
                >
                  <div className="question-form col-lg-12 row m-0 p-0  mb-3 mt-3 position-relative ">
                    <label
                      htmlFor="question"
                      className="m-0 p-0 mb-2 text-secondary  w-auto pe-2 fs-5 fw-medium"
                    >
                      Your question
                    </label>
                    <input
                      type="text"
                      className="border border-1 rounded-2 p-2 ps-3 m-0"
                      id="question"
                      name="question"
                      placeholder="What would you like to know?"
                      onChange={handleInputChange}
                      value={questionDetails.question}
                      required
                    />
                    <p className="m-0 p-0 text-secondary mt-2">
                      Tip: write as if asking a friend, being as specific as
                      possible
                    </p>
                  </div>
                  <div className="question-form col-lg-12 row m-0 p-0  mb-3 mt-3 position-relative ">
                    <label
                      htmlFor="description"
                      className="m-0 p-0 mb-2 text-secondary  w-auto pe-2 fs-5 fw-medium"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="border border-1 rounded-2 p-2 ps-3 m-0 h-auto"
                      id="description"
                      name="description"
                      value={questionDetails.description}
                      placeholder="Include as much detail as possible to get most relevant answers"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="question-form col-lg-12 row m-0 p-0  mb-3 mt-3 position-relative ">
                    <label
                      htmlFor="tags"
                      className="m-0 p-0 mb-2 text-secondary  w-auto pe-2 fs-5 fw-medium"
                    >
                      Tags
                    </label>
                    <input
                      type="text"
                      className="border border-1 rounded-2 p-2 ps-3 m-0"
                      id="tags"
                      name="tags"
                      placeholder="Start Typing to add tags.."
                      onChange={handleInputChange}
                      value={questionDetails.tags}
                      required
                    />
                    <p className="m-0 p-0 text-secondary mt-2">
                      You can add up to 10 tags
                    </p>
                  </div>
                  <div className="row m-0 p-0 justify-content-end mt-3 mb-3">
                    <button
                      type="button"
                      className="btn btn-transparent w-auto border border-1 border-primary-subtle "
                      onClick={handleIsForumOpen}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn text-light w-auto ms-3"
                      style={{ backgroundColor: "#49BBBD" }}
                      onClick={handleAddQuestion}
                    >
                      Post question
                    </button>
                  </div>
                </form>
                {/* <!-- Successful Added question Modal --> */}
                <div
                  className="modal fade"
                  id="successfulModal"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">
                      <div className="modal-header border-bottom-0">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="row m-0 p-0 justify-content-center ">
                          <img
                            src={successfulImg}
                            alt=""
                            className=""
                            style={{ height: "150px", width: "150px" }}
                          />
                        </div>

                        <h3 className="m-0 p-0 text-center mt-3">
                          You successfully posted your question!
                        </h3>
                        <p className="m-0 p-0 text-secondary text-center mt-3 mb-3">
                          while you wait for the answers,feel free to browse
                          other questions
                        </p>
                      </div>
                      <div className="modal-footer border-top-0 justify-content-center ">
                        <button
                          type="button"
                          className="btn text-light"
                          data-bs-dismiss="modal"
                          style={{ backgroundColor: "#49BBBD" }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/**Hot Today section is start */}
          <div className="col-lg-4 mt-5 mt-lg-0 pb-4 pb-lg-0">
            <h2 className="m-0 p-0 col-lg-11" style={{ color: "#2F327D" }}>
              Hot
              <span className="ps-2" style={{ color: "#00CBB8" }}>
                today
              </span>
            </h2>
            <div className="row m-0 p-0 mt-3">
              <HotTodayQuestionTopic />
              <HotTodayQuestionTopic />
              <HotTodayQuestionTopic />
              <HotTodayQuestionTopic />
              <HotTodayQuestionTopic />
              <HotTodayQuestionTopic />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
