import { Statistics } from "../statistics/Statistics.jsx";
import { useTranslation } from "react-i18next";
import { Account } from "../account/Account.jsx";

export const AccountPage = ({ vm }) => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="mb-3">{t("statistics")}</h1>
      <Statistics vm={vm.children.statistics} />
      <h1 className="mb-3">{t("account")}</h1>
      <Account vm={vm.children.account} />
    </div>
  );
};
