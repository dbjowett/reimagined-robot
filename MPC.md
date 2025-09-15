# MPC 2 of 3 Escrow Wallet using ZkLogin - Feasibiliy Assessment

### Purpose:

- Assess the use of ZkLogin as a means of authentication to release & refund funds.

### Actors

- Escrow Contract - will hold funds and track approvals or denials and execute the contract
- Users (3 participants: Sender, Receiver, Arbiter)
  - Each user:
    1. logs in via ZkLogin
    2. receives an ephemeral key
    3. generates a proof which links it to the zkLogin Address.

### Main Idea

- Use a simple on-chain contract to track approval
- Each participating actor must sign their approval transaction
- Once 2 or more of the 3 actors have approved, the contract executes the action

### Flow

1. Sender deposits funds into an escrow contract
2. Users authenticate with ZkLogin and submit approvals (either release or refund).
3. Once the threshold of the contract (ie. >=2 actors) has been satisfied, the contract executes.
4. If the deadline suggested in the contract passes, the funds are returned (unless specified otherwise)

### Why ZKLogin

- Simple login UI for users who are familiar with OAuth login (Login with Google, Login with Facebook, Kakao etc)
- User doesn't have to remember key phrase (hard to remember, easy to lose, difficult for non-English speakers)
- Limit approvals to only users who have used ZkLogin

### Feasibility

- Using ZkLogin and a simple escrow smart contract, the logic needed is minimal, the method is secure, and familiar to most users of the internet due to using OAuth.
- The contract only needs to track simple things (participants, approvals, deadlines, etc)

### Conclusion

Using ZkLogin creates a familiar, user-friendly experience which lends itself to users being comfortable and trusting of the service. For the development, the SDK and the ZkLogin is relatively easy to use and designed to support many providers. For the blockchain, the escrow contracts remain simple, and do not need to track complicated logic. This approach balances ease of use, simplicity, and security.
