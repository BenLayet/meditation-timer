import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "./Settings.css";
import { useTranslation } from "react-i18next";
import Account from "../account/Account.jsx";

function Settings({ vm }) {
  const { t, i18n } = useTranslation();
  const [isMenuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  const hideMenu = () => {
    setMenuVisible(false);
  };
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      {isMenuVisible && <div className="backdrop" onClick={hideMenu}></div>}
      <div className="settings-container">
        <FontAwesomeIcon
          onClick={toggleMenu}
          className="settings-button"
          icon={faGear}
          style={{ fontSize: "24px" }}
        />

        {isMenuVisible && (
          <div className="settings-menu">
            <div className="settings-menu-item">
              <label className="settings-menu-item-label">
                {t("language")}
              </label>
              <div className="settings-menu-item-content">
                <div className="settings-menu-item-option">
                  <input
                    type="radio"
                    id="language-en"
                    name="language"
                    value="en"
                    checked={i18n.language === "en"}
                    onChange={changeLanguage}
                  />
                  <label htmlFor="language-en">{t("english")}</label>
                </div>
                <div className="settings-menu-item-option">
                  <input
                    type="radio"
                    id="language-fr"
                    name="language"
                    value="fr"
                    checked={i18n.language === "fr"}
                    onChange={changeLanguage}
                  />
                  <label htmlFor="language-fr">{t("french")}</label>
                </div>
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
