import { expect, test, describe, beforeEach } from "vitest";
import { SecurityModelRepository } from "../../src/domain/ports/SecurityModelRepository";
import { mock, mockReset } from "vitest-mock-extended";
import { ControllerResult } from "../../src/adapter/Controller";
import { DecryptController } from "../../src/adapter/DecryptController";
import { Decrypt } from "../../src/domain/usecase/Decrypt";
import { makeEnigmaSixSecurityModel } from "../Fixtures";

describe("DecryptController", () => {
  const stubRepository = mock<SecurityModelRepository>();
  let useCase: Decrypt;
  let sut: DecryptController;

  beforeEach(() => {
    mockReset(stubRepository);
    useCase = Decrypt.builder()
      .withSecurityModelRepository(stubRepository)
      .build();
    sut = DecryptController.buildWithUseCase(useCase);
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
      encrypted_message: "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ",
    };
  }

  function expectedValidCallResult(): ControllerResult {
    return {
      statusCode: 200,
      jsonResponseBody: {
        decrypted_message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      },
    };
  }
});
