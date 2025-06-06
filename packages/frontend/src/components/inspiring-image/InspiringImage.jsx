import "./InspiringImage.css";
import { useEffect, useState } from "react";

export const InspiringImage = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true));
  }, []);
  return (
    <div
      className={
        "inspiring-image" +
        " flex-grow " +
        "dignified-fade-in " +
        (isVisible ? "visible" : "hidden")
      }
    >
      {" "}
    </div>
  );
};
