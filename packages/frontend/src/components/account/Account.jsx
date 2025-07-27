import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLock,
  faUnlock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";
import EmailVerification from "../email-verification/EmailVerification";

export const Account = ({ vm }) => {
  const { t, i18n } = useTranslation();
  const isLoading = vm.selectors.isLoading();
  const canCreateAccount = vm.selectors.canCreateAccount();
  const isPendingVerification = vm.selectors.isPendingVerification();
  const email = vm.selectors.email();
  const isEmailVisible = vm.selectors.isEmailVisible();
  const canDisconnect = vm.selectors.canDisconnect();
  const createAccountRequested = (e) => {
    e.preventDefault();
    vm.dispatchers.createAccountRequested({
      email: e.target.elements.email.value,
    });
  };
  const disconnectRequested = vm.dispatchers.disconnectRequested;

  return (
    <>
      {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
      {canCreateAccount && (
        <div className="flex-column breathing-space">
          <div className="form-explanation">
            <p>{t("createAccountFor")}</p>
            <ul>
              <li>{t("secureStats")}</li>
              <li>{t("useMultipleDevices")}</li>
            </ul>
          </div>
          <form onSubmit={createAccountRequested} className="compact">
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t("emailPlaceholder")}
              required
              className="form-input"
            />
            <button type="submit" className="icon-button">
              <FontAwesomeIcon icon={faUserLock} />
              {t("createAccount")}
            </button>
          </form>
          <p className="subtle">{t("agreement")}</p>
        </div>
      )}
      {isEmailVisible && (
        <div className="flex-column breathing-space">
          <div>{email}</div>
          {isPendingVerification && (
            <EmailVerification vm={vm.children.emailVerification} />
          )}
          {canDisconnect && (
            <button
              onClick={disconnectRequested}
              className="icon-button fs-5 opacity-75"
            >
              <FontAwesomeIcon icon={faUnlock} />
              {t("disconnect")}
            </button>
          )}
        </div>
      )}
      <p className="text-muted fs-5 opacity-50 mb-0">
        <a target="_blank" href={`privacy-policy.${i18n.language}.html`}>
          {t("privacyPolicy")}
        </a>
      </p>
    </>
  );
};
