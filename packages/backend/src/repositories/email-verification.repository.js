import {
  emailVerificationStatus,
  validateEmailVerificationStatus,
  validateStatusTransition,
} from "domain/src/models/email-verification.model.js";
import {
  validateNotEmptyString,
  validateNotNullObject,
} from "domain/src/lib/assert/not-null.validator.js";
import { validateEmailFormat } from "domain/src/models/email.validator.js";

export class EmailVerificationRepository {
  constructor(datasource, transactionService, uuidGenerator, logger) {
    this.datasource = datasource;
    this.transactionService = transactionService;
    this.uuidGenerator = uuidGenerator;
    this.logger = logger;
  }
  async createEmailVerification(email) {
    validateEmailFormat(email);
    const uuid = await this.uuidGenerator.createUuid();
    const row = await insertEmailVerification(
      this.datasource,
      uuid,
      email,
      emailVerificationStatus.CREATED,
    );
    return fromRow(row);
  }
  async getByUuid(uuid) {
    validateNotEmptyString({ uuid });
    return getEmailVerificationByUuid(this.datasource, uuid);
  }
  async updateEmailVerificationStatus(emailVerificationUuid, newStatus) {
    validateNotEmptyString({ emailVerificationUuid });
    validateEmailVerificationStatus(newStatus);
    this.logger.debug(
      `update status emailVerificationUuid: ${emailVerificationUuid}, newStatus: ${newStatus}`,
    );
    return this.transactionService.executeInTransaction(async (transaction) => {
      //TODO same level of abstraction
      this.logger.debug(
        `Updating email verification with uuid ${emailVerificationUuid}, new status=${newStatus}`,
      );
      let emailVerification = await getEmailVerificationByUuid(
        transaction,
        emailVerificationUuid,
      );
      validateNotNullObject({ emailVerification });
      const { status: existingStatus, email } = emailVerification;
      this.logger.debug(
        `Found email verification with uuid ${emailVerificationUuid}, existing status=${existingStatus}`,
      );
      if (!existingStatus)
        throw new Error(
          `Email verification with uuid ${emailVerificationUuid} not found`,
        );
      validateStatusTransition(existingStatus, newStatus);
      await updateEmailVerificationStatus(
        transaction,
        emailVerificationUuid,
        newStatus,
      );
      this.logger.debug(
        `Email verification with uuid ${emailVerificationUuid} updated to ${newStatus}`,
      );
      emailVerification.status = newStatus;
      if (newStatus === emailVerificationStatus.VERIFIED) {
        const newUuid = await this.uuidGenerator.createUuid();
        await insertUserIfNecessary(transaction, email, newUuid);
        emailVerification.userUuid = await selectUserUuid(transaction, email);
        this.logger.debug(
          `User created with uuid ${emailVerification.userUuid} for email ${email}`,
        );
      }
      return emailVerification;
    });
  }
}

const insertUserIfNecessary = async (datasource, email, uuid) => datasource`
        INSERT INTO users (uuid, email)
        VALUES (${uuid}, ${email})
        ON CONFLICT (email) DO NOTHING`;
const selectUserUuid = async (datasource, email) =>
  await datasource`
        SELECT uuid
        FROM users
        WHERE email = ${email}`.then((rows) => rows[0]?.uuid);
const getEmailVerificationByUuid = async (datasource, emailVerificationUuid) =>
  await datasource`
        SELECT v.uuid, v.email, v.status, u.uuid as user_uuid
        FROM email_verifications v
        LEFT JOIN users u ON u.email = v.email
        WHERE v.uuid = ${emailVerificationUuid}`
    .then((rows) => rows[0])
    .then(fromRow);
const insertEmailVerification = async (
  datasource,
  emailVerificationUuid,
  email,
  status,
) =>
  await datasource`
        INSERT INTO email_verifications (uuid, email, status)
        VALUES (${emailVerificationUuid}, ${email}, ${status})
        RETURNING uuid, email, status`
    .then((rows) => rows[0])
    .then(fromRow);
const updateEmailVerificationStatus = async (
  datasource,
  emailVerificationUuid,
  status,
) => datasource`
        UPDATE email_verifications
        SET status = ${status}
        WHERE uuid = ${emailVerificationUuid}
`;
const fromRow = (row) =>
  !!row
    ? {
        uuid: row.uuid,
        email: row.email,
        status: row.status,
        userUuid: row.user_uuid,
      }
    : null;
