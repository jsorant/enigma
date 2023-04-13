import { Then } from "@cucumber/cucumber";
import chai from "chai";
const { expect } = chai;

Then(
  "I should obtain a response with status code {int}",
  function (statusCode: number) {
    expect(this.response.status).to.equal(statusCode);
  }
);

Then("The body of the response should be empty", function () {
  verifyThatResponseHasJsonBody(this.response, {});
});

Then(
  "The body of the response should contain the error {string}",
  function (errorMessage) {
    verifyThatResponseHasJsonBody(this.response, {
      error: errorMessage,
    });
  }
);

export function verifyThatResponseHasJsonBody(
  response: any,
  expectedBody: any
): void {
  expect(response.headers["content-type"]).to.match(/json/);
  expect(response.body).to.deep.equal(expectedBody);
}
