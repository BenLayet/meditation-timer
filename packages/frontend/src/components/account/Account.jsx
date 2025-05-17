import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLock,
  faUnlock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";

function Account({ vm }) {
  const { t } = useTranslation();
  const status = vm.selectors.status();
  const email = vm.selectors.email();
  const isLoading = vm.selectors.isLoading();
  const isEmailProvided = vm.selectors.isEmailProvided();
  const canUnlinkingBeRequested = vm.selectors.canUnlinkingBeRequested();
  const isResettable = vm.selectors.isResettable();
  const emailProvided = (e) => {
    e.preventDefault();
    vm.dispatchers.emailProvided({
      email: e.target.elements.email.value,
    });
  };
  const unlinkingRequested = vm.dispatchers.unlinkingRequested;
  const resetRequested = vm.dispatchers.resetRequested;

  return (
    <section className="account-section">
      {isEmailProvided ? (
        <div className="account-info">
          <dl>
            <dt>{t("emailKey")}</dt>
            <dd>{email}</dd>
            <dt>{t("statusKey")}</dt>
            <dd>
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="status-spinner"
                />
              ) : (
                t(`status_${status}`) || t("status_UNKNOWN")
              )}
            </dd>
          </dl>
          {isResettable && <a onClick={resetRequested}>{t("reset")}</a>}
          {canUnlinkingBeRequested && (
            <button onClick={unlinkingRequested} className="icon-button">
              <FontAwesomeIcon icon={faUnlock} />
              {t("unlinkEmail")}
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="form-explanation">{t("linkEmailDescription")}</div>
          <form onSubmit={emailProvided} className="compact">
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
              {t("linkEmail")}
            </button>
          </form>
        </>
      )}
    </section>
  );
}

export default Account;
