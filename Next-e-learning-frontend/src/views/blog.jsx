import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import {   Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import {Autoplay, Pagination } from "swiper/modules";

import RelatedBlogItem from "../components/relatedBlogItem";
import CourseItems from "../components/courseItem";


import heroImg from "../assets/images/blog-hero.png";
import blogListItemImg1 from "../assets/images/blog-list-item-1.png";
import blogListItemImg2 from "../assets/images/blog-list-item-2.png";
import blogListItemImg3 from "../assets/images/blog-list-item-3.png";
import blogListItemImg4 from "../assets/images/blog-list-item-4.png";


const Blog = () => {
  return (
    <div className="blog row m-0 p-0 mt-5 pt-lg-4 ">
      <div className="blog-hero m-0 p-0 pt-lg-3 pt-5 ps-lg-0 pe-lg-0 ps-2 pe-2 justify-content-center pb-5 pb-lg-0  ">
        <div className="container d-lg-flex">
          <div className="col-lg-6 p-lg-5 ps-lg-0">
            <p className="m-0 p-0 fs-4">
              By Themadbrains in
              <span style={{ color: "#49BBBD" }} className="fw-medium ps-2">
                inspiration
              </span>
            </p>
            <h2 className="m-0 p-0 mt-2">
              Why Swift UI Should Be on the Radar of Every Mobile Developer
            </h2>
            <p className="text-secondary mt-4">
              The world of mobile app development is evolving rapidly, and Swift
              UI is at the forefront of this evolution. With its declarative
              syntax and powerful features, Swift UI offers developers a more
              intuitive and efficient way to build modern, feature-rich apps for
              iOS and beyond. Whether you're a seasoned developer or just
              starting out. In this article, we'll explore why Swift UI should
              be on the radar of every mobile developer and how it can help you
              create better apps, faster.
            </p>
            <button className="btn text-light mt-4">Start Learning Now</button>
          </div>
          <div className="col-lg-6 p-lg-5 pe-lg-0 mt-lg-0 mt-5">
            <img
              src={heroImg}
              alt="blog-hero image"
              className="w-100 rounded-4"
            />
          </div>
        </div>
      </div>


      {/* course category list */}
      <div className="m-0 p-0 justify-content-center p-5 ps-lg-5 ps-0 pe-lg-5 pe-0">
        <div className="blog-list container ">
          <h4 className="m-0 p-0 text-lg-start text-center mb-5 mb-lg-0">Reading blog list</h4>
          <div className="row m-0 p-0 justify-content-between">
            <div className="col-lg-3 p-lg-4 mt-3 mb-3 ps-lg-0">
              <div
                className="blog-list-item rounded-3 overflow-hidden d-flex justify-content-center align-items-center"
                style={{ backgroundImage: `url(${blogListItemImg1})` }}
              >
                <div className="blog-list-item-title rounded-2 w-auto bg-light position-absolute pe-5 ps-5 p-2">
                  <h6 className="m-0 p-0">UX/UI</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 p-lg-4 mt-3 mb-3">
              <div
                className="blog-list-item rounded-3 overflow-hidden d-flex justify-content-center align-items-center"
                style={{ backgroundImage: `url(${blogListItemImg2})` }}
              >
                <div className="blog-list-item-title rounded-2 w-auto bg-light position-absolute pe-5 ps-5 p-2">
                  <h6 className="m-0 p-0">React</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 p-lg-4 mt-3 mb-3">
              <div
                className="blog-list-item rounded-3 overflow-hidden d-flex justify-content-center align-items-center"
                style={{ backgroundImage: `url(${blogListItemImg3})` }}
              >
                <div className="blog-list-item-title rounded-2 w-auto bg-light position-absolute pe-5 ps-5 p-2">
                  <h6 className="m-0 p-0">PHP</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 p-lg-4 mt-3 mb-3 pe-lg-0">
              <div
                className="blog-list-item rounded-3 overflow-hidden d-flex justify-content-center align-items-center"
                style={{ backgroundImage: `url(${blogListItemImg4})` }}
              >
                <div className="blog-list-item-title rounded-2 w-auto bg-light position-absolute pe-5 ps-5 p-2">
                  <h6 className="m-0 p-0">JavaScript</h6>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>

       {/* *progress course items */}
       <div className="realtedBlogRow m-0 p-0 justify-content-center ">
        <div className="container pt-5 pb-5">
          <div className="row m-0 p-0 justify-content-between ">
            <h4 className="m-0 p-0 w-auto mb-4">
              Related Blogs
            </h4>
            <Link
              className="w-auto text-decoration-none "
              style={{ color: "#49BBBD" }}
            >
              <p className="m-0 p-0 w-auto fw-medium ">See All</p>
            </Link>
          </div>
          <div className="row m-0 p-0">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                className: "swiper-pagination-top-spacing",
              }}
              modules={[Autoplay,Pagination]}
              breakpoints={{
                // When window width is <= 640px, show only 1 slide
                0: {
                  slidesPerView: 1,
                },
                // When window width is <= 768px, show 2 slides
                768: {
                  slidesPerView: 2,
                },
                1000: {
                    slidesPerView: 2,
                  },
              }}
              className="mySwiper"
            >
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedBlogItem />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <div className="courses-section py-5 d-flex flex-column align-items-center  ">
       
       <div className="container mt-5 mb-5">
         <div className="row m-0 p-0 justify-content-between mt-4 mb-4">
           <h5 className="m-0 p-0 w-auto">Marketing Articles</h5>
           <Link
             to="/courses"
             className="w-auto text-decoration-none fw-medium"
             style={{ color: "#49BBBD" }}
           >
             see all
           </Link>
         </div>
         <div className="row">
           <CourseItems />
           <CourseItems />
           <CourseItems />
           <CourseItems />
         </div>
       </div>
     </div>
    </div>
  );
};

export default Blog;
