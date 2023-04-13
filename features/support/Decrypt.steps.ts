import { When, Then, Given } from "@cucumber/cucumber";
import { verifyThatResponseHasJsonBody } from "./Common.steps";

Given(
  "I have decrypted the message {string} with that security model",
  async function (encryptedMessage) {
    this.response = await callPostDecryptEndpoint(this, encryptedMessage);
  }
);

When(
  "I decrypt the encrypted message {string} with that security model",
  async function (encryptedMessage) {
    this.response = await callPostDecryptEndpoint(this, encryptedMessage);
  }
);

Then(
  "The body of the response should be contain the decrypted message {string}",
  function (decryptedMessage) {
    verifyThatResponseHasJsonBody(this.response, {
      decrypted_message: decryptedMessage,
    });
  }
);

async function callPostDecryptEndpoint(world: any, encryptedMessage: string) {
  return await world.requestWithSupertest
    .post("/decrypt")
    .send(makePostDecryptBody(world, encryptedMessage))
    .set("Accept", "application/json");
}

function makePostDecryptBody(world: any, encryptedMessage: string): any {
  return {
    security_model_name: world.securityModel.name,
    encrypted_message: encryptedMessage,
  };
}
