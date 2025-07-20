import React, { useState } from "react";
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
      <div className="settings-menu">
        <div className="settings-menu-item">
          <label className="settings-menu-item-label">{t("language")}</label>
          <div className="settings-menu-item-content">
            <LanguageSelection />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
