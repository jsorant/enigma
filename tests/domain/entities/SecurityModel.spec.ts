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
      expect(() =>
        SecurityModel.builder()
          .withName("Any name")
          .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
          .withCaesar(4, 1)
      ).not.toThrow();
    });
  });
});
