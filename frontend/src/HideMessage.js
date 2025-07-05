import React, { useState } from "react";

function HideMessage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setDownloadUrl(null);

    if (!file || !message) {
      setError("Please select an image and enter a message.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);

    const res = await fetch("http://localhost:5000/hide", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
    } else {
      const err = await res.json();
      setError(err.error || "Error encoding message.");
    }
  };

  return (
    <div>
      <h2>Hide a Message in an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <br />
        <textarea
          rows={4}
          cols={50}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your secret message"
        />
        <br />
        <button type="submit">Hide Message</button>
      </form>
      {downloadUrl && (
        <div>
          <p>Download your steganographic image:</p>
          <a href={downloadUrl} download="steg_image.png">Download Image</a>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
export default HideMessage;
