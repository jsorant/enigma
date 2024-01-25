import { expect, test, describe, beforeEach } from "vitest";
import { mock, mockReset } from "vitest-mock-extended";
import { SecurityModelRepository } from "../../../src/domain/ports/SecurityModelRepository";
import { Encrypt, EncryptInput } from "../../../src/domain/usecase/Encrypt";
import { SecurityModelNotFound } from "../../../src/domain/usecase/errors/SecurityModelNotFound";
import { makeTestCases } from "../../Fixtures";

describe("Encrypt", () => {
  const stubRepository = mock<SecurityModelRepository>();

  beforeEach(() => {
    mockReset(stubRepository);
  });

  describe("Build", () => {
    test("should build", () => {
      expect(() =>
        Encrypt.buildWithSecurityModelRepository(stubRepository)
      ).not.toThrow();
    });
  });

  describe("Execute", () => {
    let encrypt: Encrypt;

    beforeEach(() => {
      encrypt = Encrypt.buildWithSecurityModelRepository(stubRepository);
    });

    test(`should throw if using an non existing security model`, async () => {
      stubRepository.getByName.mockResolvedValueOnce(undefined);

      const input: EncryptInput = {
        securityModelName: "NOT EXISTING",
        messageToEncrypt: "Any message",
      };

      await expect(encrypt.execute(input)).rejects.toThrowError(
        SecurityModelNotFound
      );
      await expect(encrypt.execute(input)).rejects.toThrowError(
        "Security model 'NOT EXISTING' not found"
      );
    });

    makeTestCases().forEach((testCase) => {
      test(`should encrypt ${testCase.plainMessage} into ${testCase.encryptedMessage} using a security model ${testCase.securityModel.name}`, async () => {
        stubRepository.getByName.mockResolvedValueOnce(testCase.securityModel);

        const input: EncryptInput = {
          securityModelName: testCase.securityModel.name,
          messageToEncrypt: testCase.plainMessage,
        };

        const usecaseResult = await encrypt.execute(input);

        expect(stubRepository.getByName).toHaveBeenCalledOnce();
        expect(stubRepository.getByName).toHaveBeenCalledWith(
          testCase.securityModel.name
        );
        expect(usecaseResult.encryptedMessage).toEqual(
          testCase.encryptedMessage
        );
      });
    });
  });
});
