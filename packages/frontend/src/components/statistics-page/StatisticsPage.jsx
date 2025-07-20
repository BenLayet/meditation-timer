import { useTranslation } from "react-i18next";
import { Statistics } from "../statistics/Statistics.jsx";
import React from "react";

function StatisticsPage({ vm }) {
  const { t } = useTranslation();

  const goBackHomeClicked = () =>
    vm.dispatchers.navigationRequested({ page: "HOME" });

  const navigateToAccountClicked = () =>
    vm.dispatchers.navigationRequested({ page: "ACCOUNT" });
  return (
    <>
      <div className="flex-grow">
        <Statistics vm={vm.children.statistics} />
        <p className="subtle">
          {t("createAccountToSecureStats_1")}{" "}
          <a href="#" onClick={navigateToAccountClicked}>
            {t("createAccountToSecureStats_2")}
          </a>{" "}
          {t("createAccountToSecureStats_3")}
        </p>
      </div>
      <div>
        <a href="#" onClick={goBackHomeClicked}>
          {t("continue")}
        </a>
      </div>
    </>
  );
}

export default StatisticsPage;
