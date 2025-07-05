import React, { useState } from "react";

function ExtractMessage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!file) {
      setError("Please select an image file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/extract", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setMessage(data.message || "");
    } else {
      const err = await res.json();
      setError(err.error || "Error extracting message.");
    }
  };

  return (
    <div>
      <h2>Extract a Message from an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <br />
        <button type="submit">Extract Message</button>
      </form>
      {message && (
        <div>
          <h4>Hidden Message:</h4>
          <pre>{message}</pre>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
export default ExtractMessage;
