export const languageCodes = {
  ENGLISH: "en",
  FRENCH: "fr",
};

export function validateLanguageCode(languageCode) {
  if (typeof languageCode !== "string") {
    throw new Error(
      `languageCode must be a string but was of type ${typeof languageCode}`,
    );
  }
  if (!Object.values(languageCodes).includes(languageCode)) {
    throw new Error(
      `languageCode must be in ${JSON.stringify(languageCodes)} but was "${languageCode}"`,
    );
  }
}
