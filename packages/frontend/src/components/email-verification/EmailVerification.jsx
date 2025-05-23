import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./EmailVerification.css";

function EmailVerification({ vm }) {
  const { t } = useTranslation();
  const isLoading = vm.selectors.isLoading();
  const isNotRequestedYet = vm.selectors.isNotRequestedYet();
  const isRequested = vm.selectors.isRequested();
  const isExpired = vm.selectors.isExpired();
  const isRefreshable = vm.selectors.isRefreshable();
  const isResettable = vm.selectors.isResettable();
  const isRetryable = vm.selectors.isRetryable();
  const resetRequested = vm.dispatchers.resetRequested;
  const refreshRequested = vm.dispatchers.refreshRequested;
  const retryRequested = vm.dispatchers.retryRequested;

  return (
    <>
      {isLoading && (
        <FontAwesomeIcon icon={faSpinner} spin className="status-spinner" />
      )}
      {isNotRequestedYet && <p>{t("emailVerificationPending")}</p>}
      {isRequested && <p>{t("emailVerificationSent")}</p>}
      {isExpired && <p>{t("emailVerificationExpired")}</p>}
      {isRefreshable && (
        <button className="main-action icon-button" onClick={refreshRequested}>
          <FontAwesomeIcon icon={faSync} />
          {t("refresh")}
        </button>
      )}
      {isRetryable && (
        <button className="main-action icon-button" onClick={retryRequested}>
          <FontAwesomeIcon icon={faSync} />
          {t("retry")}
        </button>
      )}
      {isResettable && <a onClick={resetRequested}>{t("reset")}</a>}
    </>
  );
}

export default EmailVerification;
