const emailService = {
  sendEmail: ({ to, subject, text }) => {
    console.log("Email sent to:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);
  },
};
let counter = 1;
const uuidService = {
  createUuid: () => `10000000-0000-1000-8000-${('0'+counter++).padStart(12,'0')}`,
};

const tokenService = {
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
  emailServiceProvider: () => emailService,
  tokenServiceProvider: () => tokenService,
  uuidServiceProvider: () => uuidService,
};
