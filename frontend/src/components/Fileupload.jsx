import React, { useState, useRef } from "react";

const Fileupload = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
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
        className="xs:top-[50%] sm:top-[18%] ms:top-[21%] xl:top-[25%]"
        onClick={handleCustomClick}
        style={{
          cursor: "pointer",
          padding: "10px 10px",
          display: "inline-block",
          textAlign: "center",
          fontSize: "12px",
          borderRadius: "10px",
          backgroundColor: "#FEF3C6",
          position: "absolute",
        }}
      >
        🔗 <strong>upload File & Images</strong>
      </div>

      {/* Show File Name */}
      {file && (
        <div className="text-[13px] px-2 flex gap-3 py-2">
          <p>
            <strong>File: </strong> {file.name.slice(0, 12) + "..."}
          </p>
          <p>
            <strong>Type: </strong> {file.type}
          </p>
        </div>
      )}
    </div>
  );
};

export default Fileupload;
