import { useTranslation } from "react-i18next";

export function LanguageSelection() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="flex-column">
      <input
        type="radio"
        id="language-en"
        name="language"
        value="en"
        checked={i18n.language === "en"}
        onChange={changeLanguage}
      />
      <label htmlFor="language-en">{t("english")}</label>
      <input
        type="radio"
        id="language-fr"
        name="language"
        value="fr"
        checked={i18n.language === "fr"}
        onChange={changeLanguage}
      />
      <label htmlFor="language-fr">{t("french")}</label>
    </div>
  );
}
