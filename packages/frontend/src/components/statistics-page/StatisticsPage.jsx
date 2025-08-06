import { useTranslation } from "react-i18next";
import { Statistics } from "../statistics/Statistics.jsx";
import React from "react";

function StatisticsPage({ vm }) {
  const { t } = useTranslation();

  const goBackHomeClicked = () =>
    vm.dispatchers.navigationRequested({ page: "HOME" });

  const navigateToAccountClicked = () =>
    vm.dispatchers.navigationRequested({ page: "ACCOUNT" });

  const isAnonymous = vm.children.account.selectors.isAnonymous();
  return (
    <>
      <h1>{t("sessionCompleted")}</h1>
      <div className="flex-fill">
        <Statistics vm={vm.children.statistics} animated={true} />
      </div>
      {isAnonymous && (
        <p className="opacity-75 fs-5 mt-6">
          {t("createAccountToSecureStats_1")}{" "}
          <a href="#" onClick={navigateToAccountClicked}>
            {t("createAccountToSecureStats_2")}
          </a>{" "}
          {t("createAccountToSecureStats_3")}
        </p>
      )}
      <div>
        <a href="#" onClick={goBackHomeClicked}>
          {t("continue")}
        </a>
      </div>
    </>
  );
}

export default StatisticsPage;
