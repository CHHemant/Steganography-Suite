import React from "react";

function FileUpload({ label, accept, onChange }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <label>
        {label}
        <input
          type="file"
          accept={accept}
          style={{ display: "block", marginTop: 5 }}
          onChange={e => onChange(e.target.files[0])}
        />
      </label>
    </div>
  );
}

export default FileUpload;
