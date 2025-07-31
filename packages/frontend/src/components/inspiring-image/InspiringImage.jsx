import "./InspiringImage.css";
import { useEffect, useState } from "react";

export const InspiringImage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true));
  }, []);
  return (
    <div
      className={
        "flex-fill w-100 dignified-fade-in d-flex flex-column" +
        " " +
        (isVisible ? "visible" : "hidden")
      }
    >
      <div className="inspiring-image w-100 flex-fill "> </div>
      {children}
    </div>
  );
};
