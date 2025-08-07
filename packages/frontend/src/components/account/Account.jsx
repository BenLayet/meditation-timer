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
              <div className="row justify-content-center mb-3">
                <div className="col-10 col-sm-6 col-lg-4 col-xl-3">
                  <CreateAccountForm vm={vm.children.createAccountForm} />
                </div>
                <p className="text-info-subtle fs-6 m-0">
                  {t("alreadyHaveAccount")}{" "}
                  <a
                    onClick={vm.dispatchers.loginFormRequested}
                    className="clickable"
                  >
                    {t("thenLogin")}
                  </a>
                </p>
              </div>
              <div className="fs-5 d-flex flex-column">
                <p>{t("createAccountFor")}</p>
                <ul className="align-items-start d-flex flex-column text-start">
                  <li>{t("secureStats")}</li>
                  <li>{t("useMultipleDevices")}</li>
                  <li>{t("noEmailOrPasswordRequired")}</li>
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
              <div className="row justify-content-center mb-3">
                <div className="col-10 col-sm-8">
                  <LoginForm vm={vm.children.loginForm} />
                </div>
                <p className="text-info-subtle fs-6 m-0 text-center">
                  {t("noAccountYet")}{" "}
                  <a
                    onClick={vm.dispatchers.createAccountFormRequested}
                    className="clickable"
                  >
                    {t("thenCreateOne")}
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {isLoginVisible && (
        <>
          <div className="flex-column breathing-space">
            <p>
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
            <a target="_blank" href={`privacy-policy.${i18n.language}.html`}>
              {t("privacyPolicy")}
            </a>
          </p>
        </>
      )}
    </>
  );
};
