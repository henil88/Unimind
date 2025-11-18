import { uploadFile } from "@/store/slice/ChatSlice/uploadFileAction";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Fileupload = ({ file, setFile, promt }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.file || {});
  const toastId = "unique-error-toast";

  if (error && !toast.isActive(toastId)) {
    toast.error(error, { toastId });
  }

  const handleUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    else {
      setFile(selectedFile);
      console.log("File Name:", selectedFile.name);
      console.log("File Type:", selectedFile.type);
    }
  };

  const handleCustomClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {/* Hidden Input */}
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple={false}
        accept="
          .doc,.docx,
          .xls,.xlsx,
          .pdf,
          .txt,.md,.csv,.json,
          .js,.ts,.c,.cpp,.py,.java,.html,.css,
          .jpg,.jpeg,.png,.gif,.bmp,.webp
        "
        onChange={handleUpload}
      />

      {/* Custom Button/Text */}
      <div
        className="custom-button"
        onClick={handleCustomClick}
      >
        🔗 <strong>upload File & Images</strong>
      </div>

      {/* Show File Name */}
      {file && (
        <div className="text-[13px] px-2 flex gap-3 py-2">
          <p>
            <strong>File: </strong> {file.name.slice(0, 12) + "..."}
          </p>
        </div>
      )}
      {loading && (
        <div className="flex items-center gap-2 text-xs text-blue-500">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Uploading...
        </div>
      )}
    </div>
  );
};

export default Fileupload;
