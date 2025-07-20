import MeditationSettingsPage from "../meditation-settings-page/MeditationSettingsPage.jsx";
import MeditationSessionPage from "../meditation-session-page/MeditationSessionPage.jsx";
import StatisticsPage from "../statistics-page/StatisticsPage.jsx";
import Account from "../account/Account.jsx";
import React from "react";
import Settings from "../settings/Settings.jsx";
import NavBar from "../nav-bar/NavBar.jsx";

const FULL_SCREEN_PAGES = ["MEDITATION_SESSION", "STATISTICS"];

export default ({ vm }) => {
  //selectors
  const page = vm.selectors.currentPage();
  return (
    <>
      {!FULL_SCREEN_PAGES.includes(page) && (
        <div className="app-header">
          <NavBar vm={vm} />
        </div>
      )}
      <div className="app-body">
        {page === "HOME" && (
          <MeditationSettingsPage vm={vm.children.meditationSettings} />
        )}
        {page === "MEDITATION_SESSION" && (
          <MeditationSessionPage vm={vm.children.meditationSession} />
        )}
        {page === "STATISTICS" && <StatisticsPage vm={vm} />}
        {page === "ACCOUNT" && <Account vm={vm.children.account} />}
        {page === "SETTINGS" && <Settings vm={vm} />}
      </div>
    </>
  );
};
