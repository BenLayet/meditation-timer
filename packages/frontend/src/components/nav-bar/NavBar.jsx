import React from "react";
import {
  faGear,
  faGlobe,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LanguageSelection } from "../language-selection/LanguageSelection.jsx";

export default ({ vm }) => {
  const page = vm.selectors.currentPage();

  const navItemClicked = (page) => () =>
    vm.dispatchers.navigationRequested({ page });
  return (
    <nav className="navbar navbar-expand bg-body-tertiary flex-fill ">
      <div className="container-sm">
        <ul className="navbar-nav flex-fill">
          <li className="nav-item ">
            <button
              className={`nav-link ` + (page === "HOME" && "active")}
              aria-current="page"
              onClick={navItemClicked("HOME")}
            >
              <FontAwesomeIcon icon={faHome} />
            </button>
          </li>

          <li className="nav-item ms-auto dropdown">
            <button
              className={`nav-link cursor-pointer dropdown-toggle `}
              role="button"
              data-bs-toggle="dropdown"
            >
              <FontAwesomeIcon icon={faGlobe} className="me-1" />
            </button>
            <div className={`dropdown-menu dropdown-menu-end `}>
              <div className="px-3 py-2">
                <LanguageSelection />
              </div>
            </div>
          </li>
          <li className="nav-item">
            <button
              className={
                `nav-link cursor-pointer ` + (page === "ACCOUNT" && "active")
              }
              aria-current="page"
              onClick={navItemClicked("ACCOUNT")}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                `nav-link cursor-pointer ` + (page === "SETTINGS" && "active")
              }
              aria-current="page"
              onClick={navItemClicked("SETTINGS")}
            >
              <FontAwesomeIcon icon={faGear} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
