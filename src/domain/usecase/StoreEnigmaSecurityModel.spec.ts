import { stubInterface } from "ts-sinon";
import sinonChai from "sinon-chai";
import chai from "chai";
import {
  StoreEnigmaSecurityModelInput,
  StoreEnigmaSecurityModel,
} from "./StoreEnigmaSecurityModel";
import { EnigmaSecurityModelRepository } from "../ports/EnigmaSecurityModelRepository";
const { expect } = chai;
chai.use(sinonChai);

describe("StoreEnigmaSecurityModel", () => {
  const input: StoreEnigmaSecurityModelInput = {
    name: "enigma-1",
    caesarShift: 4,
    rotor1Value: "ROTOR1",
    rotor2Value: "ROTOR2",
    rotor3Value: "ROTOR3",
  };

  it(`should store the enigma security model`, async () => {
    const stubRepository = stubInterface<EnigmaSecurityModelRepository>();
    const usecase = new StoreEnigmaSecurityModel(stubRepository);
    await usecase.execute(input);
    expect(stubRepository.save).to.have.been.calledOnce;
  });
});
