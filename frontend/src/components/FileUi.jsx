import React from "react";

const FileUi = ({ file }) => {
  if (!file) return null;
  const { name, size, type, preview } = file;

  // image preview
  if (type && type.startsWith && type.startsWith("image/") && preview) {
    return (
      <div className="rounded overflow-hidden">
        <img src={preview} alt={name} className="max-w-full max-h-48 object-contain rounded" />
        <div className="text-xs mt-1">{name}</div>
      </div>
    );
  }

  // pdf preview via iframe if preview available
  if ((type === "application/pdf" || (name && name.endsWith(".pdf"))) && preview) {
    return (
      <div className="w-full">
        <iframe src={preview} title={name} className="w-full h-48 border" />
        <div className="text-xs mt-1">{name}</div>
      </div>
    );
  }

  // fallback: metadata
  return (
    <div className="p-2 border rounded bg-gray-50">
      <div className="font-medium">{name}</div>
      {size != null && <div className="text-xs text-gray-500">{(size / 1024).toFixed(1)} KB</div>}
      {type && <div className="text-xs text-gray-500">{type}</div>}
    </div>
  );
};

export default FileUi;
