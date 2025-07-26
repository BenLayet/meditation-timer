import NewMeditationPage from "../new-meditation-page/NewMeditationPage.jsx";
import MeditationSessionPage from "../meditation-session-page/MeditationSessionPage.jsx";
import StatisticsPage from "../statistics-page/StatisticsPage.jsx";
import React from "react";
import Settings from "../settings/Settings.jsx";
import NavBar from "../nav-bar/NavBar.jsx";
import { AccountPage } from "../account-page/AccountPage.jsx";

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
      <div className="app-body ">
        {page === "HOME" && (
          <NewMeditationPage vm={vm.children.newMeditation} />
        )}
        {page === "MEDITATION_SESSION" && (
          <MeditationSessionPage vm={vm.children.meditationSession} />
        )}
        {page === "STATISTICS" && <StatisticsPage vm={vm} />}
        {page === "ACCOUNT" && <AccountPage vm={vm} />}
        {page === "SETTINGS" && <Settings vm={vm} />}
      </div>
    </>
  );
};
