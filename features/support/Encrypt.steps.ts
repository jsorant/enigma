import { When, Then, Given } from "@cucumber/cucumber";
import { verifyThatResponseHasJsonBody } from "./Common.steps";

Given(
  "I have encrypted the message {string} with that security model",
  async function (message) {
    this.response = await callPostEncryptEndpoint(this, message);
  }
);

When(
  "I encrypt the message {string} with that security model",
  async function (message: string) {
    this.response = await callPostEncryptEndpoint(this, message);
  }
);

Then(
  "The body of the response should be contain the encrypted message {string}",
  function (encryptedMessage) {
    verifyThatResponseHasJsonBody(this.response, {
      encrypted_message: encryptedMessage,
    });
  }
);

async function callPostEncryptEndpoint(world: any, message: string) {
  return await world.applicationWrapper.post(
    "/encrypt",
    makePostEncryptBody(world, message)
  );
}

function makePostEncryptBody(world: any, message: string): any {
  return {
    security_model_name: world.securityModel.name,
    message,
  };
}
