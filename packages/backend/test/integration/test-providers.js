import { serviceProviders } from "../../src/config/service.providers.js";
import { usecaseProviders } from "../../src/config/usecase.providers.js";
import { endpointHandlerProviders } from "../../src/config/endpoint-handler.providers.js";
import { pgMemDatasource } from "./pgmem.datasource.js";
import { TransactionService } from "../../src/repositories/transaction.service.js";

export const fakeUuidGenerator = {
  nextUuid: "10000000-0000-1000-8000-000000000001",
  createUuid: () => fakeUuidGenerator.nextUuid,
};

export const fakeTokenService = {
  createShortLivedToken: (payload) =>
    btoa(
      JSON.stringify({
        life: "short",
        payload,
      }),
    ),
  createPermanentToken: (payload) =>
    btoa(
      JSON.stringify({
        life: "long",
        payload,
      }),
    ),
  verify: (token) => {
    const decoded = atob(token);
    const { payload } = JSON.parse(decoded);
    return payload;
  },
};

export const fakeEmailSender = {
  sendEmail: (mail) => {
    fakeEmailSender.lastMail = mail;
    console.log(mail);
  },
};

const testServiceProviders = { ...serviceProviders };
testServiceProviders.uuidGenerator = () => fakeUuidGenerator;
testServiceProviders.tokenService = () => fakeTokenService;
testServiceProviders.emailSender = () => fakeEmailSender;

export const testProviders = {
  datasource: () => pgMemDatasource,
  transactionService: ({ datasource }) => new TransactionService(datasource),
  ...testServiceProviders,
  ...usecaseProviders,
  ...endpointHandlerProviders,
  logger: () => console,
};
