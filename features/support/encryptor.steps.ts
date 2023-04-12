import { Server } from "../../src/infrastructure/webserver/server";
import { InMemorySecurityModelRepository } from "../../src/infrastructure/repositories/InMemorySecurityModelRepository";
import { StoreSecurityModel } from "../../src/domain/usecase/StoreSecurityModel";
import { Encrypt } from "../../src/domain/usecase/Encrypt";
import { Before, When, Then, Given } from "@cucumber/cucumber";
import chai from "chai";
const { expect } = chai;
import supertest from "supertest";

Before(async function () {
  // TODO app loader
  this.repository = new InMemorySecurityModelRepository();
  this.storeSecurityModel = new StoreSecurityModel(this.repository);
  this.encrypt = new Encrypt(this.repository);
  this.server = new Server(this.storeSecurityModel, this.encrypt);
  this.requestWithSupertest = supertest(this.server.expressApplication);
  this.securityModel = {
    name: "",
    engines: [],
  };
});

Given("A security model", function () {
  this.securityModel.name = "SecurityModelName";
  addCaesarEngineToSecurityModel(this, 3, 1);
  addRotorEngineToSecurityModel(this, "BDFHJLCPRTXVZNYEIWGAKMUSQO");
});

Given("The security model named {string}", function (name) {
  this.securityModel.name = name;
});

Given(
  "The Caesar engine with shift {int} and increment {int}",
  function (caesarShift, caesarIncrement) {
    addCaesarEngineToSecurityModel(this, caesarShift, caesarIncrement);
  }
);

Given("The Rotor engine with {string}", function (rotor) {
  addRotorEngineToSecurityModel(this, rotor);
});

Given(
  "I have pushed the security model defined by these previous engines",
  async function () {
    this.response = await callPostSecurityModelEndpoint(this);
  }
);

When("I push the security model", async function () {
  this.response = await callPostSecurityModelEndpoint(this);
});

When(
  "I encrypt the message {string} with that security model",
  async function (message: string) {
    this.response = await callPostEncryptEndpoint(this, message);
  }
);

Then(
  "I should obtain a response with status code {int}",
  function (statusCode: number) {
    expect(this.response.status).to.equal(statusCode);
  }
);

Then("The body of the response should be empty", function () {
  expect(this.response.headers["content-type"]).to.match(/json/);
  expect(this.response.body).to.deep.equal({});
});

Then(
  "The body of the response should be contain {string}",
  function (encryptedMessage) {
    expect(this.response.headers["content-type"]).to.match(/json/);
    expect(this.response.body).to.deep.equal({
      encrypted_message: encryptedMessage,
    });
  }
);

function addCaesarEngineToSecurityModel(
  world: any,
  caesarShift: number,
  caesarIncrement: number
) {
  world.securityModel.engines.push({
    name: "caesar",
    shift: caesarShift,
    increment: caesarIncrement,
  });
}

function addRotorEngineToSecurityModel(world: any, rotor: string) {
  world.securityModel.engines.push({
    name: "rotor",
    rotor,
  });
}

async function callPostSecurityModelEndpoint(world: any): Promise<any> {
  return await world.requestWithSupertest
    .post("/security-model")
    .send(world.securityModel)
    .set("Accept", "application/json");
}

async function callPostEncryptEndpoint(world: any, message: string) {
  return await world.requestWithSupertest
    .post("/encrypt")
    .send(makePostEncryptBody(world, message))
    .set("Accept", "application/json");
}

function makePostEncryptBody(world: any, message: string): any {
  return {
    security_model_name: world.securityModel.name,
    message,
  };
}
