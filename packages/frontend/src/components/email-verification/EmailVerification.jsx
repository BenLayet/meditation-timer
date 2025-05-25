import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./EmailVerification.css";

function EmailVerification({ vm }) {
  const { t } = useTranslation();
  const isLoading = vm.selectors.isLoading();
  const isPendingConnection = vm.selectors.isPendingConnection();
  const isActivationLinkSent = vm.selectors.isActivationLinkSent();
  const isExpired = vm.selectors.isExpired();
  const isRefreshable = vm.selectors.isRefreshable();
  const isResettable = vm.selectors.isResettable();
  const resetRequested = vm.dispatchers.resetRequested;
  const refreshRequested = vm.dispatchers.refreshRequested;
  const canActivationLinkBeRequested =
    vm.dispatchers.canActivationLinkBeRequested;

  return (
    <div className="email-verification-container">
      {isLoading && (
        <FontAwesomeIcon icon={faSpinner} spin className="status-spinner" />
      )}
      {isPendingConnection && <p>{t("emailVerificationPending")}</p>}
      {isActivationLinkSent && <p>{t("emailVerificationSent")}</p>}
      {isExpired && <p>{t("emailVerificationExpired")}</p>}
      {isRefreshable && (
        <button className="main-action icon-button" onClick={refreshRequested}>
          <FontAwesomeIcon icon={faSync} />
          {t("refresh")}
        </button>
      )}
      {canActivationLinkBeRequested && (
        <button
          className="main-action icon-button"
          onClick={activationLinkRequested}
        >
          <FontAwesomeIcon icon={faSync} />
          {t("activationLinkRequested")}
        </button>
      )}
      {isResettable && <a onClick={resetRequested}>{t("reset")}</a>}
    </div>
  );
}

export default EmailVerification;
