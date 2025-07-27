import React from "react";
import "./Settings.css";
import { useTranslation } from "react-i18next";
import { LanguageSelection } from "../language-selection/LanguageSelection.jsx";
import MeditationSettings from "../meditation-settings/MeditationSettings.jsx";
import build from "../../../../../build.json";

function Settings({ vm }) {
  const { t } = useTranslation();

  return (
    <div className="flex-column flex-fill">
      <div className="settings-menu flex-fill">
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
      <div className="fs-6 text-muted opacity-25">
        build #{build.version} {build.date}
      </div>
    </div>
  );
}

export default Settings;
