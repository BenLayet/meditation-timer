import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock, faSpinner } from "@fortawesome/free-solid-svg-icons";

export const CreateAccountForm = ({ vm }) => {
  const { t, i18n } = useTranslation();
  const isLoading = vm.selectors.isLoading();
  const hasLoginAlreadyExistsError = vm.selectors.hasLoginAlreadyExistsError();
  const hasLoginFormatError = vm.selectors.hasLoginFormatError();
  const areErrorsVisible = vm.selectors.areErrorsVisible();
  const isLoginInputMarkedAsError = vm.selectors.isLoginInputMarkedAsError();
  const isSubmitDisabled = vm.selectors.isSubmitDisabled();
  const isLoginInputDisabled = vm.selectors.isLoginInputDisabled();

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

  return (
    <form
      onSubmit={formSubmitted}
      className="d-flex flex-column align-items-stretch gap-2"
    >
      <input
        type="text"
        id="login"
        name="login"
        placeholder={t("newLoginPlaceholder")}
        onChange={loginInputChanged}
        minLength="3"
        pattern="[a-zA-Z0-9]+"
        required
        className={`form-control ${isLoginInputMarkedAsError ? "is-invalid" : ""}`}
        onBlur={vm.dispatchers.validationRequested}
        disabled={isLoginInputDisabled}
      />
      <button
        type="submit"
        className="btn btn-secondary"
        disabled={isSubmitDisabled}
      >
        <FontAwesomeIcon icon={faUserLock} />
        &nbsp;{t("createAccount")}
      </button>
      {areErrorsVisible && (
        <ul className="form-error fs-5 mb-0 text-danger-emphasis">
          {hasLoginFormatError && <li>{t("loginFormatError")}</li>}
          {hasLoginAlreadyExistsError && <li>{t("loginAlreadyExists")}</li>}
        </ul>
      )}
      {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
    </form>
  );
};
