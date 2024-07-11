import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import noData from "../../assets/images/noDataSvg.svg";
import VARIABLES from "../../../environmentVariables";

const QuestionAnswer=()=>{
    return (
        <div className="row m-0 p-0">
        <h5
          className="m-0 p-0 pb-3 mb-5 mt-4 border border-1 border-top-0 border-start-0 border-end-0 "
          style={{ color: "rgb(0, 203, 184)" }}
        >
         Question and Answer
        </h5>
  
        <div className="content row m-0 p-0 justify-content-center align-items-center pt-5">
          <img src={noData} alt="No Data" />
          <p className="m-0 p-0 text-center">No data available in wishlist</p>
        </div>
      </div>
    )
}

export default QuestionAnswer;