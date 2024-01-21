import { expect, test, describe } from "vitest";
import { mock } from "vitest-mock-extended";
import { SecurityModelRepository } from "../../../src/domain/ports/SecurityModelRepository";
import { SecurityModelNotFound } from "../../../src/domain/usecase/errors/SecurityModelNotFound";
import { makeTestCases } from "./Fixtures";
import { Decrypt } from "../../../src/domain/usecase/Decrypt";

describe("Decrypt", () => {
  describe("Build", () => {
    const stubRepository = mock<SecurityModelRepository>();

    test("should not build without a security model repository", () => {
      expect(() => Decrypt.builder().build()).toThrowError(
        "[Decrypt] A SecurityModelRepository must be provided"
      );
    });

    test("should not build without a security model name", () => {
      expect(() =>
        Decrypt.builder().withSecurityModelRepository(stubRepository).build()
      ).toThrowError("[Decrypt] A security model name must be provided");
    });

    test("should not build without a message to encrypt", () => {
      expect(() =>
        Decrypt.builder()
          .withSecurityModelRepository(stubRepository)
          .withSecurityModelName("Any name")
          .build()
      ).toThrowError("[Decrypt] A message to decrypt must be provided");
    });

    test("should build", () => {
      expect(() =>
        Decrypt.builder()
          .withSecurityModelRepository(stubRepository)
          .withSecurityModelName("Any name")
          .withMessageToDecrypt("Any message")
          .build()
      ).not.toThrow();
    });
  });

  test(`should throw if using an non existing security model`, async () => {
    const stubRepository = mock<SecurityModelRepository>();
    stubRepository.getByName.mockResolvedValueOnce(undefined);

    const usecase = Decrypt.builder()
      .withSecurityModelRepository(stubRepository)
      .withSecurityModelName("NOT EXISTING")
      .withMessageToDecrypt("Any message")
      .build();

    await expect(usecase.execute()).rejects.toThrowError(SecurityModelNotFound);
    await expect(usecase.execute()).rejects.toThrowError(
      "Security model 'NOT EXISTING' not found"
    );
  });

  makeTestCases().forEach((testCase) => {
    test(`should decrypt ${testCase.encryptedMessage} into ${testCase.plainMessage} using a security model ${testCase.securityModel.name}`, async () => {
      const stubRepository = mock<SecurityModelRepository>();
      stubRepository.getByName.mockResolvedValueOnce(testCase.securityModel);

      const usecase = Decrypt.builder()
        .withSecurityModelRepository(stubRepository)
        .withSecurityModelName(testCase.securityModel.name)
        .withMessageToDecrypt(testCase.encryptedMessage)
        .build();

      const usecaseResult = await usecase.execute();

      expect(stubRepository.getByName).toHaveBeenCalledOnce();
      expect(stubRepository.getByName).toHaveBeenCalledWith(
        testCase.securityModel.name
      );
      expect(usecaseResult.decryptedMessage).toEqual(testCase.plainMessage);
    });
  });
});
