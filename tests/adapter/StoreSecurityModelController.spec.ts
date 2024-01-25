import { expect, test, describe, beforeEach } from "vitest";
import { StoreSecurityModel } from "../../src/domain/usecase/StoreSecurityModel";
import { StoreSecurityModelController } from "../../src/adapter/StoreSecurityModelController";
import { SecurityModelRepository } from "../../src/domain/ports/SecurityModelRepository";
import { mock, mockReset } from "vitest-mock-extended";
import { ControllerResult } from "../../src/adapter/Controller";

describe("StoreSecurityModelController", () => {
  const stubRepository = mock<SecurityModelRepository>();
  let useCase: StoreSecurityModel;
  let sut: StoreSecurityModelController;

  beforeEach(() => {
    mockReset(stubRepository);
    useCase =
      StoreSecurityModel.buildWithSecurityModelRepository(stubRepository);

    sut = StoreSecurityModelController.buildWithUseCase(useCase);
  });

  test(`should throw if an engine is not supported`, async () => {
    const body = bodyWithUnsupportedEngineName();

    await expect(sut.execute(body)).rejects.toThrowError(
      "Unsupported engine: 'UNSUPPORTED'"
    );
  });

  test(`should throw if caesar engine has no shift`, async () => {
    const body = bodyWithCaesarEngineWithoutShift();

    await expect(sut.execute(body)).rejects.toThrowError(
      "Caesar engine must have a shift"
    );
  });

  test(`should throw if caesar engine shift is not a number`, async () => {
    const body = bodyWithCaesarEngineShiftAsString();

    await expect(sut.execute(body)).rejects.toThrowError(
      "Caesar engine shift must be a number"
    );
  });

  //TODO add more validation and AJV

  test(`should return 200 and no body on valid call`, async () => {
    const body = validBody();

    await expect(sut.execute(body)).resolves.toStrictEqual(
      expectedValidCallResult()
    );
  });

  function bodyWithUnsupportedEngineName() {
    return {
      name: "Any name",
      engines: [
        {
          name: "UNSUPPORTED",
        },
      ],
    };
  }

  function bodyWithCaesarEngineWithoutShift() {
    return {
      name: "Any name",
      engines: [
        {
          name: "caesar",
        },
      ],
    };
  }

  function bodyWithCaesarEngineShiftAsString() {
    return {
      name: "Any name",
      engines: [
        {
          name: "caesar",
          shift: "4",
        },
      ],
    };
  }

  function validBody(): any {
    return {
      name: "Enigma",
      engines: [
        {
          name: "caesar",
          shift: 4,
          increment: 1,
        },
        {
          name: "rotor",
          value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        },
      ],
    };
  }

  function expectedValidCallResult(): ControllerResult {
    return {
      statusCode: 200,
      jsonResponseBody: {},
    };
  }
});
