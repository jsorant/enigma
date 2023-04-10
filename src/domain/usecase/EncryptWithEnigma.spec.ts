import { stubInterface } from "ts-sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { EnigmaSecurityModelRepository } from "../ports/EnigmaSecurityModelRepository";
import { EnigmaSecurityModel } from "../entities/Enigma";
import { EncryptWithEnigma } from "./EncryptWithEnigma";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("EncryptWithEnigma", () => {
  const model1: EnigmaSecurityModel = {
    caesarShift: 4,
    rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  };

  it(`should encrypt using an enigma security model`, async () => {
    const stubRepository = stubInterface<EnigmaSecurityModelRepository>();
    stubRepository.get.resolves(model1);
    const usecase = new EncryptWithEnigma(stubRepository);
    const encryptedMessage = await usecase.execute("enigma-1", "AAA");
    expect(stubRepository.get).to.have.been.calledOnceWith("enigma-1");
    expect(encryptedMessage).to.equal("KQF");
  });

  it(`should throw if using an non existing enigma security model`, async () => {
    const stubRepository = stubInterface<EnigmaSecurityModelRepository>();
    stubRepository.get.resolves(undefined);
    const usecase = new EncryptWithEnigma(stubRepository);
    return expect(usecase.execute("enigma-1", "AAA")).to.be.rejectedWith(
      SecurityModelNotFound,
      "Security model 'enigma-1' not found"
    );
  });
});
