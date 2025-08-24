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
  const isLoginVisible = vm.selectors.isLoginVisible();
  const login = vm.selectors.login();
  const canDisconnect = vm.selectors.canDisconnect();

  return (
    <>
      {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
      {isConnectionRequired && (
        <p className="text-muted opacity-75 fs-5">{t("connectionRequired")}</p>
      )}
      {isAuthenticationPossible && (
        <div className="flex-column align-items-stretch gap-1">
          {isCreateAccountFormVisible && (
            <>
              <p className="text-info-subtle fs-6">
                {t("alreadyHaveAccount")}{" "}
                <a
                  onClick={vm.dispatchers.loginFormRequested}
                  role="button"
                  className="link-primary"
                >
                  {t("thenLogin")}
                </a>
              </p>
              <CreateAccountForm vm={vm.children.createAccountForm} />
              <div className="fs-5 d-flex flex-column">
                <p>{t("createAccountFor")}</p>
                <ul className="align-items-start d-flex flex-column text-start">
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
              <p className="text-info-subtle fs-6 text-center">
                {t("noAccountYet")}{" "}
                <a
                  onClick={vm.dispatchers.createAccountFormRequested}
                  role="button"
                  className="link-primary"
                >
                  {t("thenCreateOne")}
                </a>
              </p>
              <LoginForm vm={vm.children.loginForm} />
            </>
          )}
        </div>
      )}
      {isLoginVisible && (
        <>
          <div className="flex-column breathing-space">
            <p className="fs-2">
              {t("connectedAs")} '{login}'
            </p>
            {canDisconnect && (
              <button
                onClick={vm.dispatchers.disconnectRequested}
                className="btn btn-secondary"
              >
                <FontAwesomeIcon icon={faUnlock} />
                &nbsp;
                {t("disconnect")}
              </button>
            )}
          </div>
          <p className="text-muted fs-5 opacity-50 mb-0">
            <a
              target="_blank"
              className="link-primary"
              href={`privacy-policy.${i18n.language}.html`}
            >
              {t("privacyPolicy")}
            </a>
          </p>
        </>
      )}
    </>
  );
};
