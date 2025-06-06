export const mailContextProviders = {
  mailContext: () => ({
    from: process.env["MAIL_FROM"],
    publicUrl: process.env["MAIL_PUBLIC_URL"],
  }),
};
