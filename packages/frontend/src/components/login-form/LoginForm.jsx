import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUserLock } from "@fortawesome/free-solid-svg-icons";

export const LoginForm = ({ vm }) => {
  const { t, i18n } = useTranslation();

  const hasLoginNotFoundError = vm.selectors.hasLoginNotFoundError();
  const hasIncorrectPasswordError = vm.selectors.hasIncorrectPasswordError();

  const isProcessing = vm.selectors.isProcessing();
  const hasLoginFormatError = vm.selectors.hasLoginFormatError();
  const hasPasswordFormatError = vm.selectors.hasPasswordFormatError();
  const hasServerUnreachableError = vm.selectors.hasServerUnreachableError();
  const isLoginInputMarkedAsError = vm.selectors.isLoginInputMarkedAsError();
  const isPasswordInputMarkedAsError =
    vm.selectors.isPasswordInputMarkedAsError();
  const isSubmitDisabled = vm.selectors.isSubmitDisabled();
  const isLoginInputDisabled = vm.selectors.isLoginInputDisabled();
  const isPasswordInputDisabled = vm.selectors.isPasswordInputDisabled();

  const formSubmitted = (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    vm.dispatchers.formSubmitted();
  };
  const loginInputChanged = (e) => {
    vm.dispatchers.loginInputChanged({
      loginInputValue: e.target.value,
    });
  };
  const passwordInputChanged = (e) => {
    vm.dispatchers.passwordInputChanged({
      passwordInputValue: e.target.value,
    });
  };

  return (
    <form onSubmit={formSubmitted}>
      <div className="row justify-content-center mb-3">
        <div className="col-10 col-sm-6 d-flex flex-column align-items-stretch gap-2">
          <input
            type="text"
            id="login"
            name="login"
            placeholder={t("yourLoginPlaceholder")}
            onChange={loginInputChanged}
            required
            className={`form-control ${isLoginInputMarkedAsError ? "is-invalid" : ""}`}
            onBlur={vm.dispatchers.loginInputCompleted}
            disabled={isLoginInputDisabled}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder={t("passwordPlaceholder")}
            onChange={passwordInputChanged}
            required
            className={`form-control ${isPasswordInputMarkedAsError ? "is-invalid" : ""}`}
            onBlur={vm.dispatchers.passwordInputCompleted}
            disabled={isPasswordInputDisabled}
          />
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={isSubmitDisabled}
          >
            <FontAwesomeIcon icon={faUserLock} />
            &nbsp;{t("login")}
          </button>
        </div>
      </div>
      <ul
        className="form-error fs-6 mb-0 text-danger-emphasis list-unstyled"
        style={{ minHeight: "2rem" }}
      >
        {hasLoginFormatError && <li>{t("loginFormatError")}</li>}
        {hasPasswordFormatError && <li>{t("passwordFormatError")}</li>}
        {hasLoginNotFoundError && <li>{t("loginNotFoundError")}</li>}
        {hasIncorrectPasswordError && <li>{t("incorrectPasswordError")}</li>}
        {hasServerUnreachableError && <li>{t("serverUnreachableError")}</li>}
      </ul>
      {isProcessing && <FontAwesomeIcon icon={faSpinner} spin />}
    </form>
  );
};
