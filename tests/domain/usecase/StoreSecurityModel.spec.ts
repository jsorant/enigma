import { expect, test, describe, beforeEach } from "vitest";
import { mock, mockReset } from "vitest-mock-extended";
import {
  StoreSecurityModel,
  StoreSecurityModelInput,
} from "../../../src/domain/usecase/StoreSecurityModel";
import { SecurityModelRepository } from "../../../src/domain/ports/SecurityModelRepository";

describe("StoreSecurityModel", () => {
  const stubRepository = mock<SecurityModelRepository>();

  beforeEach(() => {
    mockReset(stubRepository);
  });

  describe("Build", () => {
    test(`should not build without a SecurityModelRepository`, async () => {
      expect(() => StoreSecurityModel.builder().build()).toThrowError(
        "[StoreSecurityModel] A SecurityModelRepository must be provided"
      );
    });

    test(`should build`, async () => {
      expect(() => buildStoreSecurityModel()).not.toThrow();
    });
  });

  test(`should store a security model`, async () => {
    const usecase = buildStoreSecurityModel();

    await usecase.execute(input());

    expect(stubRepository.save).toBeCalledTimes(1);
  });

  function buildStoreSecurityModel(): StoreSecurityModel {
    return StoreSecurityModel.builder()
      .withSecurityModelRepository(stubRepository)
      .build();
  }

  function input(): StoreSecurityModelInput {
    return {
      securityModelName: "enigma-1",
      engines: [
        {
          name: "Caesar",
          shift: 4,
          increment: 1,
        },
        {
          name: "Rotor",
          value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        },
        {
          name: "Rotor",
          value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        },
        {
          name: "Rotor",
          value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        },
      ],
    };
  }
});
