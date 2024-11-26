import React, { useRef } from "react";

const FileUploadWidget = ({ actionProvider }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
      // Call an action or backend API to handle the file
      actionProvider.handleFileUpload(files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
      <button
        onClick={handleClick}
        style={{
          padding: "8px 12px",
          border: "1px solid #007BFF",
          borderRadius: "4px",
          backgroundColor: "#007BFF",
          color: "white",
          cursor: "pointer",
        }}
      >
        Attach File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadWidget;
