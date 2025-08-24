import { useEffect, useState } from "react";

export const InspiringImage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true));
  }, []);
  return (
    <figure
      className={
        "flex-fill w-100 fade d-flex flex-column" +
        " " +
        (isVisible ? "show" : "pe-none")
      }
      style={{ transitionDuration: "6s" }}
    >
      <div
        className="mt-full-width-image-container border-1 border-primary border rounded-3"
        style={{ minHeight: "150px" }}
      >
        <div
          className="mt-full-width-image rounded-3"
          style={{ backgroundImage: "url('/suzuki-roshi.jpg')" }}
        ></div>
      </div>
      {children}
    </figure>
  );
};
