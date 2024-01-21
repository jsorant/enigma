import { expect, test, describe } from "vitest";
import { SecurityModel } from "../../../src/domain/entities/SecurityModel";

describe("SecurityModel", () => {
  describe("Build", () => {
    test(`should not build without a name`, async () => {
      expect(() => SecurityModel.builder().build()).toThrowError(
        "[SecurityModel] A name must be provided"
      );
    });

    test(`should not build without any engines`, async () => {
      expect(() =>
        SecurityModel.builder().withName("Any name").build()
      ).toThrowError("[SecurityModel] At least one engine must be provided");
    });

    test(`should build`, async () => {
      expect(() => buildSecurityModel()).not.toThrow();
    });
  });

  test("should encrypt", () => {
    const securityModel = buildSecurityModel();

    expect(
      securityModel.encrypt("EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE")
    ).toEqual("MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ");
  });

  test("should decrypt", () => {
    const securityModel = buildSecurityModel();

    expect(
      securityModel.decrypt("MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ")
    ).toEqual("EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE");
  });

  function buildSecurityModel() {
    return SecurityModel.builder()
      .withName("enigma")
      .withCaesar(9, 3)
      .withRotor("BDFHTXVZNYEIWGAKMUSQOJLCPR")
      .withRotor("AJDKSIRUXBGZNPYFVOELHWTMCQ")
      .withRotor("TOWYHXUSPAIBRCJEKMFLGDQVZN")
      .build();
  }
});
