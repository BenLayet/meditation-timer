import { Statistics } from "../statistics/Statistics.jsx";
import { useTranslation } from "react-i18next";
import { Account } from "../account/Account.jsx";

export const AccountPage = ({ vm }) => {
  const { t } = useTranslation();
  return (
    <div className="text-center row justify-content-around">
      <div className="col-12 col-lg-7">
        <h1 className="mb-3">{t("statistics")}</h1>
        <Statistics vm={vm.children.statistics} />
      </div>
      <div className="col-12 col-lg-5">
        <h1 className="mb-3">{t("account")}</h1>
        <Account vm={vm.children.account} />
      </div>
    </div>
  );
};
