import { validateNewEmailActivation, validateStatusTransition } from "../validators/email-activation.validator.js";

export class EmailActivationRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }
  async createEmailActivation(emailActivation) {
    validateNewEmailActivation(emailActivation);
    const { uuid, email, status} = emailActivation;
    const row = await this.datasource`
      INSERT INTO email_activations (uuid, email, status)
            VALUES (${uuid}, ${email}, ${status})
    `;
  }
  async getEmailActivation(uuid) {
    const row = await this.datasource`
      SELECT uuid, email, status
      FROM email_activations
      WHERE uuid = ${uuid}
    `;
    return row.length === 0 ? null : row[0];
  }
  async updateEmailActivationStatus(uuid, status) {
    const existingActivation = await this.getEmailActivation(uuid);
    if (!existingActivation) {
      throw new Error(`Email activation with uuid ${uuid} not found`);
    }
    validateStatusTransition(existingActivation.status, status);
    await this.datasource`
      UPDATE email_activations
      SET status = ${status}
      WHERE uuid = ${uuid}
    `;
  }

}
