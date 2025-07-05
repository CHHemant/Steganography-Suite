import React from "react";

function ResultDisplay({ downloadUrl, extractedMessage, error, type = "image" }) {
  return (
    <div style={{ marginTop: 20 }}>
      {downloadUrl && (
        <div>
          <p>Download your steganographic {type}:</p>
          <a href={downloadUrl} download={type === "image" ? "steg_image.png" : "steg_audio.wav"}>
            Download {type === "image" ? "Image" : "Audio"}
          </a>
        </div>
      )}
      {extractedMessage && (
        <div>
          <h4>Hidden Message:</h4>
          <pre>{extractedMessage}</pre>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default ResultDisplay;
