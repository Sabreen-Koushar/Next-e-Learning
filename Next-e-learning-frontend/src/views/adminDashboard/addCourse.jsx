import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddCourse = () => {
  const [value, setValue] = useState("");
  return (
    <div className="row m-0 p-0">
      <div className="row m-0 p-0">
        <h4 className="m-0 p-0 border border-1 border-top-0 border-start-0 border-end-0 pb-3">
          Generals
        </h4>
      </div>
      <h4 className="m-0 p-0">Description</h4>
      <div className="row m-0 p-0">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="m-0 p-0"
        />
      </div>
    </div>
  );
};

export default AddCourse;
