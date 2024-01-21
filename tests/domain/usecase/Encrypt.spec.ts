import { expect, test, describe } from "vitest";
import { mock } from "vitest-mock-extended";
import { SecurityModelRepository } from "../../../src/domain/ports/SecurityModelRepository";
import { Encrypt } from "../../../src/domain/usecase/Encrypt";
import { SecurityModelNotFound } from "../../../src/domain/usecase/errors/SecurityModelNotFound";
import { makeTestCases } from "../../Fixtures";

describe("Encrypt", () => {
  describe("Build", () => {
    const stubRepository = mock<SecurityModelRepository>();

    test("should not build without a security model repository", () => {
      expect(() => Encrypt.builder().build()).toThrowError(
        "[Encrypt] A SecurityModelRepository must be provided"
      );
    });

    test("should not build without a security model name", () => {
      expect(() =>
        Encrypt.builder().withSecurityModelRepository(stubRepository).build()
      ).toThrowError("[Encrypt] A security model name must be provided");
    });

    test("should not build without a message to encrypt", () => {
      expect(() =>
        Encrypt.builder()
          .withSecurityModelRepository(stubRepository)
          .withSecurityModelName("Any name")
          .build()
      ).toThrowError("[Encrypt] A message to encrypt must be provided");
    });

    test("should build", () => {
      expect(() =>
        Encrypt.builder()
          .withSecurityModelRepository(stubRepository)
          .withSecurityModelName("Any name")
          .withMessageToEncrypt("Any message")
          .build()
      ).not.toThrow();
    });
  });

  test(`should throw if using an non existing security model`, async () => {
    const stubRepository = mock<SecurityModelRepository>();
    stubRepository.getByName.mockResolvedValueOnce(undefined);

    const usecase = Encrypt.builder()
      .withSecurityModelRepository(stubRepository)
      .withSecurityModelName("NOT EXISTING")
      .withMessageToEncrypt("Any message")
      .build();

    await expect(usecase.execute()).rejects.toThrowError(SecurityModelNotFound);
    await expect(usecase.execute()).rejects.toThrowError(
      "Security model 'NOT EXISTING' not found"
    );
  });

  makeTestCases().forEach((testCase) => {
    test(`should encrypt ${testCase.plainMessage} into ${testCase.encryptedMessage} using a security model ${testCase.securityModel.name}`, async () => {
      const stubRepository = mock<SecurityModelRepository>();
      stubRepository.getByName.mockResolvedValueOnce(testCase.securityModel);

      const usecase = Encrypt.builder()
        .withSecurityModelRepository(stubRepository)
        .withSecurityModelName(testCase.securityModel.name)
        .withMessageToEncrypt(testCase.plainMessage)
        .build();

      const usecaseResult = await usecase.execute();

      expect(stubRepository.getByName).toHaveBeenCalledOnce();
      expect(stubRepository.getByName).toHaveBeenCalledWith(
        testCase.securityModel.name
      );
      expect(usecaseResult.encryptedMessage).toEqual(testCase.encryptedMessage);
    });
  });
});
