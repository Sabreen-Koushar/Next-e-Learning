import AboutUsImg1 from "../assets/images/about-us-img-1.jpg";
const AboutUs = () => {
  return (
    <div className="aboutUs row m-0 p-0 mt-5 pt-lg-5">
      <div className="hero d-flex flex-column  align-items-center justify-content-center">
        <h1 className="text-light text-center m-0 p-0 mb-3">Our Story</h1>
        <p className="m-0 p-0 text-light text-center fs-5">
          Make learning and teaching more effective with active participation
          and student collaboration
        </p>
      </div>

      <div className="m-0 p-0 d-flex justify-content-center ">
        <div className="container">
          <div className="row m-0 p-0 align-items-center">
            <div className="col-12 col-lg-6 p-lg-5 mt-5 mt-lg-0 rounded-5 overflow-hidden ">
              <img
                src={AboutUsImg1}
                alt="about us Image-1"
                className="rounded-4 w-100"
              />
            </div>
            <div className="col-12 col-lg-6 p-lg-2 ps-lg-0 mt-lg-0 mt-4 p-3">
              <h2 className="m-0 p-0" style={{ color: "#2F327D" }}>
                Back
                <span className="" style={{ color: "#00CBB8" }}>
                  ground
                </span>
              </h2>
              <p className="m-0 p-0 text-secondary fs-6 mt-4">
                The idea of creating an online platform for teachers to share
                their knowledge and resources was born out of Our team consists
                of passionate individuals who are deeply committed to making
                learning fun and engaging Our team consists of passionate
                individuals who are deeply committed to making the world a
                better place Our team consists of experienced educators who have
                a passion for sharing their knowledge to the next Our team is
                composed of experienced educators who have a passion for
                creating innovative educational tools The idea of creating an
                online platform for students to learn, collaborate and grow
                together in a supportive environment came into existence as we
                strived to bridge the gap between theory and practice.
              </p>
              <h2 className="m-0 p-0 mt-5" style={{ color: "#00CBBB" }}>
                Mission <span style={{ color: "#000" }}>&</span>
                <span className="ms-2" style={{ color: "#2F327D" }}>
                  Vision
                </span>
              </h2>
              <p className="m-0 p-0 mt-4 text-secondary">
                Our mission is to make learning accessible, enjoyable and
                rewarding by providing a community where people can come
                together to learn, collaborate and grow. We aim at building a
                digital ecosystem that fosters inclusivity, diversity and
                creativity.
              </p>
            </div>
          </div>
          <div className="row m-0 p-0 mt-5 mb-5">
            <h2 className="m-0 p-0 text-center" style={{ color: "#2F327D" }}>
              Things that
              <span className="ms-2" style={{ color: "#00CBB8" }}>
                make us proud
              </span>
            </h2>
            <p className="m-0 p-0 pt-2 text-secondary text-center fs-5">
              Choose your learning level
            </p>
            <div className="row m-0 p-0 mt-lg-5 mb-lg-5 mt-4">
              <div className="col-lg-6 mt-3 mt-lg-0 mb-3 mb-lg-0 d-flex align-items-center">
                <div
                  className="icon d-flex justify-content-center align-items-center w-auto rounded-circle"
                  style={{ backgroundColor: 'rgba(73,187,189,0.3)' }}
                >
                  <i className="bi bi-controller fs-2" style={{ color: "#49BBBD" }}></i>
                </div>
                <div className="w-auto ms-4">
                  <h4 className="m-0 p-0 w-auto">Beginner</h4>
                  <p className="m-0 p-0 mt-2  text-secondary w-auto">
                    with analytics tools, to help you share with current and
                    future clients
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mt-3 mt-lg-0 mb-3 mb-lg-0 d-flex align-items-center">
                <div
                  className="icon d-flex justify-content-center align-items-center w-auto rounded-circle"
                  style={{ backgroundColor: 'rgba(73,187,189,0.3)' }}
                >
                  <i className="bi bi-controller fs-2" style={{ color: "#49BBBD" }}></i>
                </div>
                <div className="w-auto ms-4">
                  <h4 className="m-0 p-0 w-auto">Intermediate</h4>
                  <p className="m-0 p-0 mt-2  text-secondary w-auto">
                   Total collections, quoting, enrollment, and reporting in italian and english
                  </p>
                </div>
              </div>
            </div>
            <div className="row m-0 p-0 mt-lg-5 mb-lg-5">
              <div className="col-lg-6 mt-3 mt-lg-0 mb-3 mb-lg-0 d-flex align-items-center">
                <div
                  className="icon d-flex justify-content-center align-items-center w-auto rounded-circle"
                  style={{ backgroundColor: 'rgba(73,187,189,0.3)' }}
                >
                  <i className="bi bi-controller fs-2" style={{ color: "#49BBBD" }}></i>
                </div>
                <div className="w-auto ms-4">
                  <h4 className="m-0 p-0 w-auto">Advanced</h4>
                  <p className="m-0 p-0 mt-2  text-secondary w-auto">
                    All services for our team of industry experts, personal training.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mt-3 mt-lg-0 mb-3 mb-lg-0 d-flex align-items-center">
                <div
                  className="icon d-flex justify-content-center align-items-center w-auto rounded-circle"
                  style={{ backgroundColor: 'rgba(73,187,189,0.3)' }}
                >
                  <i className="bi bi-controller fs-2" style={{ color: "#49BBBD" }}></i>
                </div>
                <div className="w-auto ms-4">
                  <h4 className="m-0 p-0 w-auto">Mastery</h4>
                  <p className="m-0 p-0 mt-2  text-secondary w-auto">
                    We can help you set up and manager your groups if you are become our partner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
