import React, { useState } from "react";
import HideMessage from "./HideMessage";
import ExtractMessage from "./ExtractMessage";

function App() {
  const [tab, setTab] = useState("hide");
  return (
    <div style={{ padding: 30, maxWidth: 700 }}>
      <h1>Steganography Suite</h1>
      <div>
        <button onClick={() => setTab("hide")}>Hide Message</button>
        <button onClick={() => setTab("extract")}>Extract Message</button>
      </div>
      {tab === "hide" ? <HideMessage /> : <ExtractMessage />}
    </div>
  );
}
export default App;
