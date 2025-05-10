import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock, faUnlock} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";

function Account({ vm }) {
  const { t } = useTranslation();
  const isEmailProvided = vm.selectors.isEmailProvided();
  const email = vm.selectors.email();
  const isEmailValidated = vm.selectors.isEmailValidated();
  const isEmailPendingActivation = vm.selectors.isEmailPendingActivation();
  const emailProvided = (e) => {
    e.preventDefault();
    vm.dispatchers.emailProvided({
      email: e.target.elements.email.value,
    });
  };
  const unlinkEmailRequested = vm.dispatchers.unlinkEmailRequested;

  return (
    <section className="account-section">
      {isEmailProvided ? ( <div className="account-info">
          <dl>
              <dt>{t("emailKey")}</dt>
              <dd>{email}</dd>
              <dt>{t("statusKey")}</dt>
              <dd>
                {isEmailPendingActivation
                  ? t("pendingActivation")
                  : isEmailValidated
                  ? t("validated")
                  : t("unknown")}
              </dd>
          </dl>
          {isEmailValidated && (
            <button
              onClick={unlinkEmailRequested}
              className="icon-button"
            >
              <FontAwesomeIcon icon={faUnlock} />
              {t("disconnect")}
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
