User requests to create an account with an email address. The system creates an account with status PENDING_VERIFICATION, and requests the verification of the email address.

```mermaid
sequenceDiagram
    actor User
    participant Account
    participant AccountEffect
    participant EmailVerification

    User ->> Account: createAccountRequested(email)
    Account ->> AccountEffect: createAccountRequested(email)
    AccountEffect -->> Account: accountCreated(email)
    Note over Account: STATUS: PENDING_VERIFICATION
    Account ->> EmailVerification: verificationRequested(email)
    Note over EmailVerification: Verification link is sent,<br> user clicks the link in the email, <br>and the verification is detected
    EmailVerification -->> Account: verificationSucceeded(userToken)
    Note over Account: STATUS: VERIFIED
```

The email verification process is create locally, then if online, the verification link is sent to the user.
The status of the email verification checked on a loop every 60 seconds.
When verified, the user token is returned to the account.
If verification expires before the user clicks the verification link, the email verification is deleted.

```mermaid
sequenceDiagram
    participant Account
    participant EmailVerification
    participant EmailVerificationEffect

    Account ->> EmailVerification: verificationRequested(email)
    EmailVerification ->> EmailVerificationEffect: createRequested(email)
    EmailVerificationEffect -->> EmailVerification: createSucceeded()
    Note over EmailVerification: STATUS: CREATED
    EmailVerification ->> EmailVerificationEffect: verificationLinkRequested(email)
    alt if offline
        EmailVerificationEffect -->> EmailVerification: verificationLinkFailed()
        Note over EmailVerificationEffect: when back online
        EmailVerificationEffect -->> EmailVerification: onlineDetected()
        Note over EmailVerification: because STATUS is CREATED
        EmailVerification ->> EmailVerificationEffect: verificationLinkRequested(email)
    end
    %% Note over EmailVerificationEffect: save retrieveToken in local storage
    EmailVerificationEffect -->> EmailVerification: verificationLinkSent()
    Note over EmailVerification: STATUS: VERIFICATION_LINK_SENT
    EmailVerification ->> EmailVerificationEffect: scheduleRefreshRequested()
    loop every 60 seconds until user has verified the email or the verification has expired
        Note over EmailVerificationEffect: Wait 60s
        EmailVerificationEffect ->> EmailVerification: refreshTimeUp()
        EmailVerification ->> EmailVerificationEffect: refreshRequested()
        EmailVerificationEffect -->> EmailVerification: refreshCompleted()
        Note over EmailVerification: STATUS: VERIFICATION_LINK_SENT
        EmailVerification ->> EmailVerificationEffect: scheduleRefreshRequested()
        Note over EmailVerificationEffect: loop every 60s

    end
    alt if use clicks the verification link
        EmailVerificationEffect ->> EmailVerification: refreshTimeUp()
        EmailVerification ->> EmailVerificationEffect: refreshRequested()
        EmailVerificationEffect -->> EmailVerification: refreshCompleted(userToken)
        Note over EmailVerification: STATUS: VERIFIED
        EmailVerification -->> Account: verificationSucceeded(userToken)
    else if verification link has expired
        EmailVerificationEffect ->> EmailVerification: refreshTimeUp()
        EmailVerification ->> EmailVerificationEffect: refreshRequested()
        EmailVerificationEffect -->> EmailVerification: refreshCompleted()
        Note over EmailVerification: STATUS: EXPIRED
        EmailVerification -->> Account: verificationFailed()

    end
```

EmailVerificationService synchronizes the local storage with the backend.

```mermaid
sequenceDiagram
    actor EmailEvents
    participant EmailVerificationEffect
    participant EmailVerificationService
    participant EmailVerificationStorage
    participant EmailVerificationApi

    EmailEvents ->> EmailVerificationEffect: createRequested(email)
    EmailVerificationEffect ->> EmailVerificationService: storeNewEmailVerification(email)
    Note over EmailVerificationService: status:CREATED
    EmailVerificationService ->> EmailVerificationStorage: save()
    EmailEvents ->> EmailVerificationEffect: verificationLinkRequested()
    EmailVerificationEffect ->> EmailVerificationService: sendVerificationLink()
    EmailVerificationService ->> EmailVerificationStorage: load()
    Note over EmailVerificationService: status:CREATED
    EmailVerificationService ->> EmailVerificationApi: sendVerificationLink(email)
    Note over EmailVerificationService: status:VERIFICATION_LINK_SENT + retrieveToken
    EmailVerificationService ->> EmailVerificationStorage: save()
    EmailEvents ->> EmailVerificationEffect: refreshRequested()
    EmailVerificationEffect ->> EmailVerificationService: refreshStoredEmailVerification()
    EmailVerificationService ->> EmailVerificationStorage: load()
    Note over EmailVerificationService: status:VERIFICATION_LINK_SENT + retrieveToken
    EmailVerificationService ->> EmailVerificationApi: retrieve(retrieveToken)
    alt if verification link is not clicked
        Note over EmailVerificationService: do nothing
    else if verification link is expired
        Note over EmailVerificationService: status:EXPIRED
        EmailVerificationService ->> EmailVerificationStorage: delete()
    else if verification link is clicked
        Note over EmailVerificationService: status:VERIFIED + userToken
        EmailVerificationService ->> EmailVerificationStorage: delete()
        EmailVerificationService -->> EmailVerificationEffect: return userToken
    end
    EmailEvents ->> EmailVerificationEffect: resetRequested(email)
    EmailVerificationEffect ->> EmailVerificationService: deleteStoredEmailVerification(email)
    EmailVerificationService ->> EmailVerificationStorage: delete()
```

On the backend, the email verification service handles the verification link sending and verification.

```mermaid
sequenceDiagram
    actor User
    actor App
    participant EmailVerificationService as EmailVerificationService <br> through API
    participant TokenService
    participant EmailService
    participant EmailVerificationRepository

    App ->> EmailVerificationService: sendVerificationLink(email)
    EmailVerificationService ->> TokenService: generate retrieveToken + verifyToken
    EmailVerificationService ->> EmailService: sendVerificationLink(email, verifyToken)
    Note over EmailVerificationService: status:VERIFICATION_LINK_SENT
    EmailVerificationService ->> EmailVerificationRepository: save()
    EmailVerificationService -->> App: retrieveToken
    User ->> EmailVerificationService: verify(verifyToken)
    EmailVerificationService ->> TokenService: verify(verifyToken)
    Note over EmailVerificationService: status:VERIFIED
    EmailVerificationService ->> EmailVerificationRepository: save()
    EmailVerificationRepository ->> EmailVerificationRepository: createUserIfNecessary()
    EmailVerificationRepository -->> EmailVerificationService: userUuid
    EmailVerificationService ->> TokenService: generate userToken
    App ->> EmailVerificationService: retrieve(retrieveToken)
    EmailVerificationService ->> TokenService: verify(retrieveToken)
    EmailVerificationService ->> EmailVerificationRepository: get and delete
    EmailVerificationService -->> App: userToken
```
