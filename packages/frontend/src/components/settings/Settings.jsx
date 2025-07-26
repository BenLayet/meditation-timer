import React, { useState } from "react";
import "./Settings.css";
import { useTranslation } from "react-i18next";
import { LanguageSelection } from "../language-selection/LanguageSelection.jsx";
import MeditationSettings from "../meditation-settings/MeditationSettings.jsx";

function Settings({ vm }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="settings-menu">
        <div className="settings-menu-item">
          <label className="settings-menu-item-label">{t("language")}</label>
          <div className="settings-menu-item-content">
            <LanguageSelection />
          </div>
        </div>
        <div className="settings-menu-item">
          <label className="settings-menu-item-label">
            {t("meditationSettings")}
          </label>
          <div className="settings-menu-item-content">
            <MeditationSettings vm={vm.children.meditationSettings} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
