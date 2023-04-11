import { stubInterface } from "ts-sinon";
import sinonChai from "sinon-chai";
import chai from "chai";
import {
  StoreSecurityModel,
  StoreSecurityModelInput,
} from "./StoreSecurityModel";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";

const { expect } = chai;
chai.use(sinonChai);

describe("StoreSecurityModel", () => {
  const input: StoreSecurityModelInput = {
    name: "enigma-1",
    engines: [
      {
        name: "caesar",
        shift: 4,
        increment: 1,
      },
      {
        name: "rotor",
        rotor: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      },
      {
        name: "rotor",
        rotor: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      },
      {
        name: "rotor",
        rotor: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      },
    ],
  };

  it(`should store a security model`, async () => {
    const stubRepository = stubInterface<SecurityModelRepository>();
    const usecase = new StoreSecurityModel(stubRepository);
    await usecase.execute(input);
    expect(stubRepository.save).to.have.been.calledOnce;
  });
});
