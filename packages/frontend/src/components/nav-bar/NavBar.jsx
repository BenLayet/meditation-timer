import React from "react";
import { useTranslation } from "react-i18next";
import { faGear, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ vm }) => {
  const { t, i18n } = useTranslation();
  const page = vm.selectors.currentPage();
  const navItemClicked = (page) => () =>
    vm.dispatchers.navigationRequested({ page });
  return (
    <nav className="navbar navbar-expand bg-body-tertiary flex-fill ">
      <div className="container-sm">
        <ul className="navbar-nav flex-fill">
          <li className="nav-item ">
            <a
              className={`nav-link ` + (page === "HOME" && "active")}
              aria-current="page"
              onClick={navItemClicked("HOME")}
            >
              <FontAwesomeIcon icon={faHome} />
            </a>
          </li>
          <li className="nav-item ms-auto">
            <a
              className={`nav-link ` + (page === "ACCOUNT" && "active")}
              aria-current="page"
              onClick={navItemClicked("ACCOUNT")}
            >
              <FontAwesomeIcon icon={faUser} />
            </a>
          </li>
          <li className="nav-item ">
            <a
              className={`nav-link ` + (page === "SETTINGS" && "active")}
              aria-current="page"
              onClick={navItemClicked("SETTINGS")}
            >
              <FontAwesomeIcon icon={faGear} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
