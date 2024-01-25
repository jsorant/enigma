import { expect, test, describe, beforeEach } from "vitest";
import { SecurityModelRepository } from "../../src/domain/ports/SecurityModelRepository";
import { mock, mockReset } from "vitest-mock-extended";
import { ControllerResult } from "../../src/adapter/Controller";
import { EncryptController } from "../../src/adapter/EncryptController";
import { Encrypt } from "../../src/domain/usecase/Encrypt";
import { makeEnigmaSixSecurityModel } from "../Fixtures";

describe("EncryptController", () => {
  const stubRepository = mock<SecurityModelRepository>();
  let useCase: Encrypt;
  let sut: EncryptController;

  beforeEach(() => {
    mockReset(stubRepository);
    useCase = Encrypt.buildWithSecurityModelRepository(stubRepository);

    sut = EncryptController.buildWithUseCase(useCase);
  });

  //TODO add body validation and AJV

  test(`should return 200 and a body containing the encrypted message on valid call`, async () => {
    stubRepository.getByName.mockResolvedValueOnce(
      makeEnigmaSixSecurityModel()
    );

    await expect(sut.execute(validBody())).resolves.toStrictEqual(
      expectedValidCallResult()
    );
  });

  function validBody(): any {
    return {
      security_model_name: "enigma-6",
      message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
    };
  }

  function expectedValidCallResult(): ControllerResult {
    return {
      statusCode: 200,
      jsonResponseBody: {
        encrypted_message: "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ",
      },
    };
  }
});
