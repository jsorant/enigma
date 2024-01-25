import { expect, test, describe, beforeEach } from "vitest";
import { mock, mockReset } from "vitest-mock-extended";
import { SecurityModelRepository } from "../../../src/domain/ports/SecurityModelRepository";
import { SecurityModelNotFound } from "../../../src/domain/usecase/errors/SecurityModelNotFound";
import { makeTestCases } from "../../Fixtures";
import { Decrypt, DecryptInput } from "../../../src/domain/usecase/Decrypt";

describe("Decrypt", () => {
  const stubRepository = mock<SecurityModelRepository>();

  beforeEach(() => {
    mockReset(stubRepository);
  });

  describe("Build", () => {
    test("should build", () => {
      expect(() =>
        Decrypt.buildWithSecurityModelRepository(stubRepository)
      ).not.toThrow();
    });
  });

  describe("Execute", () => {
    let decrypt: Decrypt;

    beforeEach(() => {
      decrypt = Decrypt.buildWithSecurityModelRepository(stubRepository);
    });

    test(`should throw if using an non existing security model`, async () => {
      stubRepository.getByName.mockResolvedValueOnce(undefined);

      const input: DecryptInput = {
        securityModelName: "NOT EXISTING",
        messageToDecrypt: "Any message",
      };

      await expect(decrypt.execute(input)).rejects.toThrowError(
        SecurityModelNotFound
      );
      await expect(decrypt.execute(input)).rejects.toThrowError(
        "Security model 'NOT EXISTING' not found"
      );
    });

    makeTestCases().forEach((testCase) => {
      test(`should decrypt ${testCase.encryptedMessage} into ${testCase.plainMessage} using a security model ${testCase.securityModel.name}`, async () => {
        stubRepository.getByName.mockResolvedValueOnce(testCase.securityModel);

        const input: DecryptInput = {
          securityModelName: testCase.securityModel.name,
          messageToDecrypt: testCase.encryptedMessage,
        };

        const usecaseResult = await decrypt.execute(input);

        expect(stubRepository.getByName).toHaveBeenCalledOnce();
        expect(stubRepository.getByName).toHaveBeenCalledWith(
          testCase.securityModel.name
        );
        expect(usecaseResult.decryptedMessage).toEqual(testCase.plainMessage);
      });
    });
  });
});
