import en from "./message-templates.en.js";
import { validateNotNull } from "domain/src/lib/assert/not-null.validator.js";

const templates = { en };
export class MessageBuilder {
  async buildMessage(languageCode, templateName, values) {
    const template = await loadTemplate(languageCode, templateName);
    const subject = replacePlaceholders(template.subject, values);
    const body = replacePlaceholders(template.body, values);
    return { subject, body };
  }
}
async function loadTemplate(languageCode, templateName) {
  const localizedTemplates = templates[languageCode] || templates["en"];
  const template = localizedTemplates[templateName];
  validateNotNull({ template }, { languageCode, templateName });
  return template;
}
const replacePlaceholders = (templateString, values) =>
  Object.entries(values).reduce(
    (str, [key, value]) => str.replace(new RegExp(`{{${key}}}`, "g"), value),
    templateString,
  );
