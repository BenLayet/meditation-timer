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
        "inspiring-image w-100" +
        " flex-fill " +
        "dignified-fade-in " +
        (isVisible ? "visible" : "hidden")
      }
    >
      {" "}
    </div>
  );
};
