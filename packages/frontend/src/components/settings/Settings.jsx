import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Settings.css";
import { useTranslation } from "react-i18next";
import Account from "../account/Account.jsx";
import { LanguageSelection } from "../language-selection/LanguageSelection.jsx";

function Settings({ vm }) {
  const { t } = useTranslation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  const hideMenu = () => {
    setMenuVisible(false);
  };

  return (
    <>
      {isMenuVisible && <div className="backdrop" onClick={hideMenu}></div>}
      <div className="settings-container">
        <FontAwesomeIcon
          onClick={toggleMenu}
          className="settings-button"
          icon={faBars}
          style={{ fontSize: "24px" }}
        />
        {isMenuVisible && (
          <div className="settings-menu">
            <div className="settings-menu-item">
              <label className="settings-menu-item-label">
                {t("language")}
              </label>
              <div className="settings-menu-item-content">
                <LanguageSelection />
              </div>
            </div>
            <div className="settings-menu-item">
              <label className="settings-menu-item-label">{t("account")}</label>
              <div className="settings-menu-item-content">
                <Account vm={vm.children.account} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Settings;
