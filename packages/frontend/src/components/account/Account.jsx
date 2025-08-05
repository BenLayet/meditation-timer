import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { CreateAccountForm } from "../create-account-form/CreateAccountForm.jsx";
import { LoginForm } from "../login-form/LoginForm.jsx";

export const Account = ({ vm }) => {
  const { t, i18n } = useTranslation();
  const isLoading = vm.selectors.isLoading();
  const isConnectionRequired = vm.selectors.isConnectionRequired();
  const isAuthenticationPossible = vm.selectors.isAuthenticationPossible();
  const isCreateAccountFormVisible = vm.selectors.isCreateAccountFormVisible();
  const isLoginFormVisible = vm.selectors.isLoginFormVisible();
  const isPseudoVisible = vm.selectors.isPseudoVisible();
  const login = vm.selectors.login();
  const canDisconnect = vm.selectors.canDisconnect();

  return (
    <>
      {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
      {isConnectionRequired && (
        <p className="text-muted opacity-75 fs-5">{t("connectionRequired")}</p>
      )}
      {isAuthenticationPossible && (
        <div className="flex-column breathing-space">
          {isCreateAccountFormVisible && (
            <>
              <CreateAccountForm vm={vm.children.createAccountForm} />
              <p className="text-info-subtle fs-6 m-0">
                {t("alreadyHaveAccount")}{" "}
                <a
                  onClick={vm.dispatchers.loginFormRequested}
                  className="clickable"
                >
                  {t("thenLogin")}
                </a>
              </p>
              <div className="fs-5">
                <p>{t("createAccountFor")}</p>
                <ul className="align-items-start d-flex flex-column">
                  <li>{t("secureStats")}</li>
                  <li>{t("useMultipleDevices")}</li>
                </ul>
              </div>
              <p className="fs-5 m-0">
                {t("agreement")}{" "}
                <a
                  target="_blank"
                  href={`privacy-policy.${i18n.language}.html`}
                >
                  {t("privacyPolicy")}
                </a>
              </p>
            </>
          )}
          {isLoginFormVisible && (
            <>
              <LoginForm vm={vm.children.loginForm} />

              <p className="text-info-subtle fs-6 m-0">
                {t("noAccountYet")}{" "}
                <a
                  onClick={vm.dispatchers.createAccountFormRequested}
                  className="clickable"
                >
                  {t("thenCreateOne")}
                </a>
              </p>
            </>
          )}
        </div>
      )}
      {isPseudoVisible && (
        <>
          <div className="flex-column breathing-space">
            <div>{login}</div>
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
          <p className="text-muted fs-5 opacity-50 mb-0">
            <a target="_blank" href={`privacy-policy.${i18n.language}.html`}>
              {t("privacyPolicy")}
            </a>
          </p>
        </>
      )}
    </>
  );
};
