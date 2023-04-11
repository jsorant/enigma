import { When, Then, Given } from "@cucumber/cucumber";
import axios from "axios";
import chai from "chai";
const { expect } = chai;

interface EnigmaSecurityModel {
  name: string;
  caesarShift: number;
  caesarIncrement: number;
  rotor1: string;
  rotor2: string;
  rotor3: string;
}

const securityModel: EnigmaSecurityModel = {
  name: "enigma",
  caesarShift: 4,
  caesarIncrement: 1,
  rotor1: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  rotor2: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  rotor3: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
};

const apiUrl = "TODO";

Given("An enigma security model", function () {
  this.securityModel = securityModel;
});

When("I push the enigma security model", async function () {
  this.response = await axios.post(
    `${apiUrl}/security-model`,
    this.securityModel
  );
});

Then("I should obtain a response with status code {string}", function (string) {
  expect(this.response.status).to.equal(200);
});

Then("The body of the response should be empty", function () {
  expect(this.response.data).to.deep.equal({});
  expect(this.response.data).to.be.empty;
});
