export const mailContextProviders = {
  mailContext: () => ({
    from: process.env["MAIL_FROM"],
  }),
};
