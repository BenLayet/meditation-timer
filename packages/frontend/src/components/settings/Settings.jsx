import React from "react";
import { useTranslation } from "react-i18next";
import MeditationSettings from "../meditation-settings/MeditationSettings.jsx";
import build from "../../../../../build.json";

function Settings({ vm }) {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column flex-fill">
      <div className="flex-fill">
        <div className="d-flex flex-column justify-content-between align-items-stretch p-2 border-bottom border-secondary-subtle">
          <label className="mb-2 fs-1 text-start">
            {t("meditationSettings")}
          </label>
          <div className="d-flex flex-column align-items-center mb-1 gap-1">
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
