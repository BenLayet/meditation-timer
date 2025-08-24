import { useTranslation } from "react-i18next";

export function LanguageSelection() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="vstack gap-3">
      <input
        type="radio"
        id="language-en"
        name="language"
        value="en"
        checked={i18n.language === "en"}
        onChange={changeLanguage}
      />
      <label
        htmlFor="language-en"
        className="border border-primary p-2 rounded"
      >
        {t("english")}
      </label>
      <input
        type="radio"
        id="language-fr"
        name="language"
        value="fr"
        checked={i18n.language === "fr"}
        onChange={changeLanguage}
      />
      <label
        htmlFor="language-fr"
        className="border border-primary p-2 rounded"
      >
        {t("french")}
      </label>
    </div>
  );
}
