import {
  validateNewEmailVerification,
  validateStatusTransition,
} from "../validators/email-verification.validator.js";
import { emailVerificationStatus } from "domain/src/components/email-verification/email-verification.state.js";
import { validateNotNullObject } from "../validators/not-null.validator.js";

export class EmailVerificationRepository {
  constructor(datasource, transactionService, uuidGenerator, logger) {
    this.datasource = datasource;
    this.transactionService = transactionService;
    this.uuidGenerator = uuidGenerator;
    this.logger = logger;
  }
  async createEmailVerification(emailVerification) {
    validateNewEmailVerification(emailVerification);
    const { email, status } = emailVerification;
    const uuid = await this.uuidGenerator.createUuid();
    this.logger.debug(
      `Creating email verification with uuid ${uuid}, email ${email}, status ${status}`
    );
    const row = await insertEmailVerification(this.datasource, uuid, email, status);
    return fromRow(row);
  }
  async getByUuid(uuid) {
    const row = await getEmailVerificationByUuid(this.datasource, uuid);
    if (!row || row.length === 0) {
      this.logger.debug(`No email verification found with uuid ${uuid}`);
      return null;
    }
    return fromRow(row);
  }
  async updateEmailVerificationStatus(emailVerificationUuid, newStatus) {
    this.logger.debug(
      `update status emailVerificationUuid: ${emailVerificationUuid}, newStatus: ${newStatus}`
    );
    return await this.transactionService.executeInTransaction(
      async (transaction) => {
        //TODO same level of abstraction
        this.logger.debug(
          `Updating email verification with uuid ${emailVerificationUuid}, new status=${newStatus}`
        );
        const emailVerification = await getEmailVerificationByUuid(
          transaction,
          emailVerificationUuid
        );
        validateNotNullObject({ emailVerification });
        const { status: existingStatus, email } = emailVerification;
        this.logger.debug(
          `Found email verification with uuid ${emailVerificationUuid}, existing status=${existingStatus}`
        );
        if (!existingStatus)
          throw new Error(
            `Email verification with uuid ${emailVerificationUuid} not found`
          );
        validateStatusTransition(existingStatus, newStatus);
        await updateEmailVerificationStatus(
          transaction,
          emailVerificationUuid,
          newStatus
        );
        if (newStatus === emailVerificationStatus.VERIFIED) {
          const newUuid = await this.uuidGenerator.createUuid();
          await insertUserIfNecessary(transaction, email, newUuid);
          const { uuid: userUuid } = await selectUserUuid(transaction, email);
          this.logger.debug(
            `User created with uuid ${userUuid} for email ${email}`
          );
          return { status: newStatus, userUuid };
        } else {
          this.logger.debug(
            `Email verification with uuid ${emailVerificationUuid} updated to ${newStatus}`
          );
          return { status: newStatus };
        }
      }
    );
  }
}

const insertUserIfNecessary = async (datasource, email, uuid) => datasource`
        INSERT INTO users (uuid, email)
        VALUES (${uuid}, ${email})
        ON CONFLICT (email) DO NOTHING`;
const selectUserUuid = async (datasource, email) =>
  (
    await datasource`
        SELECT uuid
        FROM users
        WHERE email = ${email}`
  )[0];
const getEmailVerificationByUuid = async (datasource, emailVerificationUuid) =>
  (
    await datasource`
        SELECT v.uuid, email, v.status, u.uuid as user_uuid
        FROM email_verifications v
        LEFT JOIN users u USING (email)
        WHERE v.uuid = ${emailVerificationUuid}`
  )[0];
const insertEmailVerification = async (datasource, emailVerificationUuid, email, status) =>
  (
    await datasource`
        INSERT INTO email_verifications (uuid, email, status)
        VALUES (${emailVerificationUuid}, ${email}, ${status})
        RETURNING uuid, email, status`
  )[0];
const updateEmailVerificationStatus = async (
  datasource,
  emailVerificationUuid,
  status
) => datasource`
        UPDATE email_verifications
        SET status = ${status}
        WHERE uuid = ${emailVerificationUuid}`;
const fromRow = (row) => ({
  emailVerificationUuid: row.uuid,
  email: row.email,
  status: row.status,
  userUuid: row.user_uuid,
});
