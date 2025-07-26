import { Statistics } from "../statistics/Statistics.jsx";
import { useTranslation } from "react-i18next";
import { Account } from "../account/Account.jsx";
export const AccountPage = ({ vm }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-fill flex-column ">
      <div className="flex-grow flex-column justify-content-start">
        <h1>{t("statistics")}</h1>
        <Statistics vm={vm.children.statistics} />
      </div>
      <div>
        <h1>{t("account")}</h1>
        <Account vm={vm.children.account}></Account>
      </div>
    </div>
  );
};
