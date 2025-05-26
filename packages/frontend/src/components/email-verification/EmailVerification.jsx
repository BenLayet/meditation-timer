import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./EmailVerification.css";

function EmailVerification({ vm }) {
  const { t } = useTranslation();
  const isLoading = vm.selectors.isLoading();
  const isPendingConnection = vm.selectors.isPendingConnection();
  const isVerificationLinkSent = vm.selectors.isVerificationLinkSent();
  const isExpired = vm.selectors.isExpired();
  const isRefreshable = vm.selectors.isRefreshable();
  const isResettable = vm.selectors.isResettable();
  const resetRequested = vm.dispatchers.resetRequested;
  const refreshRequested = vm.dispatchers.refreshRequested;
  const canVerificationLinkBeRequested =
    vm.dispatchers.canVerificationLinkBeRequested;

  return (
    <div className="email-verification-container">
      {isLoading && (
        <FontAwesomeIcon icon={faSpinner} spin className="status-spinner" />
      )}
      {isPendingConnection && <p>{t("emailVerificationPending")}</p>}
      {isVerificationLinkSent && <p>{t("emailVerificationSent")}</p>}
      {isExpired && <p>{t("emailVerificationExpired")}</p>}
      {isRefreshable && (
        <button className="main-action icon-button" onClick={refreshRequested}>
          <FontAwesomeIcon icon={faSync} />
          {t("refresh")}
        </button>
      )}
      {canVerificationLinkBeRequested && (
        <button
          className="main-action icon-button"
          onClick={verificationLinkRequested}
        >
          <FontAwesomeIcon icon={faSync} />
          {t("verificationLinkRequested")}
        </button>
      )}
      {isResettable && <a onClick={resetRequested}>{t("reset")}</a>}
    </div>
  );
}

export default EmailVerification;
