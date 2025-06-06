import { MessageBuilder } from "../service/message-builder.service.js";

export const messageBuilderProviders = {
  //MESSAGE BUILDER
  messageBuilder: () => new MessageBuilder(),
  mailFrom: () => process.env["MAIL_FROM"],
};
