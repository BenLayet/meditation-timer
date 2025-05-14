const emailService = {
  sendEmail: ({ to, subject, text }) => {
    console.log("Email sent to:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);
  },
};


const uuidService = datasource => ({
  createUuid: async () => {
    const rows = await datasource`SELECT nextval('fake_uuid') as counter;`;
    const {counter} = rows[0];
    return `10000000-0000-1000-8000-${(counter).padStart(12,'0')}`;
  },
});

export const tokenService = {
  createShortLivedToken: (payload) => JSON.stringify({
    life: "short",
    payload,
  }),
  createPermanentToken: (payload) => JSON.stringify({
    life: "long",
    payload,
  }),
  verify: (token) => JSON.parse(token).payload,
};

export const mockProviders = {
  emailService: () => emailService,
  tokenService: () => tokenService,
  uuidService: ({datasource}) => uuidService(datasource),
};
