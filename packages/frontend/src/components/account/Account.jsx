import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock, faUnlock} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";

function Account({ vm }) {
  const { t } = useTranslation();
  const status = vm.selectors.status();
  const email = vm.selectors.email();
  const hasError = vm.selectors.hasError();
  const errorMessage = vm.selectors.errorMessage();
  const isLoading = vm.selectors.isLoading();
  const isEmailProvided = vm.selectors.isEmailProvided();
  const canUnlinkingBeRequested = vm.selectors.canUnlinkingBeRequested();
  const emailProvided = (e) => {
    e.preventDefault();
    vm.dispatchers.emailProvided({
      email: e.target.elements.email.value,
    });
  };
  const unlinkingRequested = vm.dispatchers.unlinkingRequested;

  return (
    <section className="account-section">
      {isEmailProvided ? ( <div className="account-info">
          <dl>
              <dt>{t("emailKey")}</dt>
              <dd>{email}</dd>
              <dt>{t("statusKey")}</dt>
              <dd>
                {t(`status_${status}`) || t("status_UNKNOWN")}
                {hasError && (
                  <p className="error">
                    {errorMessage}
                  </p>
                )}
              </dd>
          </dl>
          {canUnlinkingBeRequested && (
            <button
              onClick={unlinkingRequested}
              className="icon-button"
            >
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
