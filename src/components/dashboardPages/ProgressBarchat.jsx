import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update progress state every 1 second
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10; // Increment progress by 10%
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <ProgressBar
        animated
        now={progress}
        label={`${progress}%`}
        style={{
          height: "14px",
          width: "90%",
          borderRadius: "20px",
          marginRight: "8px",
        }}
      />
      <p>Capacity: 40 MW</p>
    </div>
  );
};

export default App;
