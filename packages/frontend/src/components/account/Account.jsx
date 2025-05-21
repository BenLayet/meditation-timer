import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLock,
  faUnlock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";
import EmailVerification from "../email-verification/EmailVerification";

function Account({ vm }) {
  const { t } = useTranslation();
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
    <section className="account-section flex-column">
      {isLoading && (
        <FontAwesomeIcon icon={faSpinner} spin className="status-spinner" />
      )}
      {canCreateAccount && (
        <>
          <div className="form-explanation">{t("linkEmailDescription")}</div>
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
        </>
      )}
      {isEmailVisible && (
        <>
          <div className="account-info flex-grow">
            <dl>
              <dt>{t("emailKey")}</dt>
              <dd>{email}</dd>
            </dl>
          </div>
          {isPendingVerification && (
            <EmailVerification vm={vm.children.emailVerification} />
          )}
          {canDisconnect && (
            <button onClick={disconnectRequested} className="icon-button">
              <FontAwesomeIcon icon={faUnlock} />
              {t("disconnect")}
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default Account;
