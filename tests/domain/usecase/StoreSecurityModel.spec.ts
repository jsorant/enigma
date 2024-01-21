import { expect, test, describe } from "vitest";
import { mock } from "vitest-mock-extended";
import { StoreSecurityModel } from "../../../src/domain/usecase/StoreSecurityModel";
import { SecurityModelRepository } from "../../../src/domain/ports/SecurityModelRepository";
import { SecurityModel } from "../../../src/domain/entities/SecurityModel";

describe("StoreSecurityModel", () => {
  describe("Build", () => {
    const stubRepository = mock<SecurityModelRepository>();

    test(`should not build without a SecurityModelRepository`, async () => {
      expect(() => StoreSecurityModel.builder().build()).toThrowError(
        "[StoreSecurityModel] A SecurityModelRepository must be provided"
      );
    });

    test(`should not build without a SecurityModel`, async () => {
      expect(() =>
        StoreSecurityModel.builder()
          .withSecurityModelRepository(stubRepository)
          .build()
      ).toThrowError("[StoreSecurityModel] A SecurityModel must be provided");
    });

    test(`should build`, async () => {
      expect(() => buildStoreSecurityModel(stubRepository)).not.toThrow();
    });
  });

  test(`should store a security model`, async () => {
    const stubRepository = mock<SecurityModelRepository>();
    const usecase = buildStoreSecurityModel(stubRepository);

    await usecase.execute();

    expect(stubRepository.save).toBeCalledTimes(1);
  });

  function buildStoreSecurityModel(
    stubRepository: SecurityModelRepository
  ): StoreSecurityModel {
    return StoreSecurityModel.builder()
      .withSecurityModelRepository(stubRepository)
      .withSecurityModel(buildSecurityModel())
      .build();
  }

  function buildSecurityModel(): SecurityModel {
    return SecurityModel.builder()
      .withName("enigma-1")
      .withCaesar(4, 1)
      .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
      .withRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE")
      .withRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ")
      .build();
  }
});
