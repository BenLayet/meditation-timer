
export class EmailActivationService {
  constructor(
    transactionService,
    emailActivationRepository,
    userRepository,
    emailService,
    tokenService,
    uuidService,
    mailFrom,
    apiProperties
  ) {
    this.transactionService = transactionService;
    this.emailActivationRepository = emailActivationRepository;
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.tokenService = tokenService;
    this.uuidService = uuidService;
    this.mailFrom = mailFrom;
    this.apiProperties = apiProperties;
  }
  async sendActivationEmail(email) {
    const uuid = await this.uuidService.createUuid();
    // Generate a signed token
    const activateToken = await this.tokenService.createShortLivedToken(
      { uuid, scope: [ACTIVATE_PERMISSION] }
    );
    const createUserToken = await  this.tokenService.createShortLivedToken(
      { uuid, scope: [CREATE_USER_PERMISSION] }
    );
    await this.emailActivationRepository.createEmailActivation({
      uuid,
      email,
      status: "PENDING_VERIFICATION"
    });    
    const subject = "Activate your account"; //TODO localize
    const {protocol, host, port, basePath} = this.apiProperties;
    const activationLink = `${protocol}://${host}:${port}${basePath}/email-activations/activate/${activateToken}`;
    const body = `Click to link your mail to your app: ${activationLink}`;
    const sender = this.mailFrom;
    const receipient = email;
    await this.emailService.sendEmail({sender, receipient, subject, body });
    return { createUserToken };
  }
  async activate(activateToken) {
    try {
      const  { uuid, scope }  = this.tokenService.verify(activateToken);
      if(!scope.includes(ACTIVATE_PERMISSION)){
        throw new Error(`Missing permission in token ${ACTIVATE_PERMISSION}`);
      }
      console.log(`Activating request uuid: ${uuid}`);
      await this.emailActivationRepository.updateEmailActivationStatus(
        uuid,
        "VERIFIED"
      );
      return { success: true, message: "Account activated successfully" };
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
      throw new Error("Invalid or expired activation token");
    }
  }
  async createUser(createUserToken) {
    try {
      const  { uuid, scope }  = this.tokenService.verify(createUserToken);
      if(!scope.includes(CREATE_USER_PERMISSION)){
        throw new Error(`Missing permission in token ${CREATE_USER_PERMISSION}`);
      }
      console.log(`Create user requested uuid: ${uuid}`);
      this.transactionService.executeInTransaction(async () => {
        const { status, email } =
          await this.emailActivationRepository.getEmailActivation(uuid);
        if (status === "VERIFIED") {
          await this.emailActivationRepository.updateEmailActivationStatus(
            uuid,
            "USER_ALREADY_CREATED"
          );
          const { userUuid } =
            await this.userRepository.createUser(email);
          const userToken = this.tokenService.createPermanentToken({ userUuid });
          return { success: true, userToken };
        } else {
          return { success: false, status };
        }
      });
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
      throw new Error("Invalid or expired status token");
    }
  }
}

const CREATE_USER_PERMISSION = "CREATE_USER";
const ACTIVATE_PERMISSION = "ACTIVATE";