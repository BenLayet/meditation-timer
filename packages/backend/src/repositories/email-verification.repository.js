import {
  validateNewEmailActivation,
  validateStatusTransition,
} from "../validators/email-activation.validator.js";


export class EmailActivationRepository {
  constructor(datasource, transactionService, uuidGenerator, logger) {
    this.datasource = datasource;
    this.transactionService = transactionService;
    this.uuidGenerator = uuidGenerator;
    this.logger = logger;
  }
  async createEmailActivation(emailActivation) {
    validateNewEmailActivation(emailActivation);
    const { email, status } = emailActivation;
    const uuid = await this.uuidGenerator.createUuid();
    this.logger.debug(
      `Creating email activation with uuid ${uuid}, email ${email}, status ${status}`
    );
    return insertEmailActivation(
      this.datasource,
      uuid,
      email,
      status
    );
  }
  async getEmailActivation(uuid) {
    const row = await selectEmailActivation(this.datasource, uuid);
    return row.length === 0 ? null : row[0];
  }
  async updateEmailActivationStatus(emailActivationUuid, newStatus) {
      this.logger.debug(`update status emailActivationUuid: ${emailActivationUuid}, newStatus: ${newStatus}`);
    return await this.transactionService.executeInTransaction(async (transaction) => {
      this.logger.debug(
        `Updating email activation with uuid ${emailActivationUuid}, new status=${newStatus}`
      );
      const {status:existingStatus} = await selectEmailActivation(transaction, emailActivationUuid);
      this.logger.debug(
        `Found email activation with uuid ${emailActivationUuid}, existing status=${existingStatus}`
      );
      if (!existingStatus) throw new Error(`Email activation with uuid ${emailActivationUuid} not found`);
      validateStatusTransition(existingStatus, newStatus);
      await updateEmailActivationStatus(transaction, emailActivationUuid, newStatus);
    });
  }

  async markAsUserCreated(emailActivationUuid) {
    return this.transactionService.executeInTransaction(async (transaction) => {
      const { status, email } = await selectEmailActivation(transaction, emailActivationUuid);
      if (status === "VERIFIED") {
        await updateEmailActivationStatus(transaction, emailActivationUuid, "USER_CREATED");
        this.logger.debug(
          `emailActivationUuid with uuid ${emailActivationUuid} updated to USER_CREATED`
        );
        const userUuid = await this.uuidGenerator.createUuid();
        await insertUserIfNecessary(transaction, email, userUuid);
        const {uuid} = await selectUserUuid(transaction, email);
        this.logger.debug(
          `User created with uuid ${uuid} for email ${email}`
        );
        return { success: true, userUuid:uuid };
      } else {
        return { success: false, status };
      }
    });
  }
}

const insertUserIfNecessary = async (datasource, email, uuid) => datasource`
        INSERT INTO users (uuid, email)
        VALUES (${uuid}, ${email})
        ON CONFLICT (email) DO NOTHING`;
const selectUserUuid = async (datasource, email) =>  (await datasource`
        SELECT uuid
        FROM users
        WHERE email = ${email}`)[0];
const selectEmailActivation = async (datasource, uuid) =>  (await datasource`
        SELECT uuid, email, status
        FROM email_activations
        WHERE uuid = ${uuid}`)[0];
const insertEmailActivation = async (
  datasource,
  uuid,
  email,
  status
) => (await datasource`
        INSERT INTO email_activations (uuid, email, status)
        VALUES (${uuid}, ${email}, ${status})
        RETURNING uuid, email, status`)[0];
const updateEmailActivationStatus = async (
  datasource,
  uuid,
  status
) => datasource`
        UPDATE email_activations
        SET status = ${status}
        WHERE uuid = ${uuid}`;
