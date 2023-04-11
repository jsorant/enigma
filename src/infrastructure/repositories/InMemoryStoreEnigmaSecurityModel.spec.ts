import { EnigmaSecurityModel } from "../../domain/entities/Enigma";
import { InMemoryEnigmaSecurityModelRepository } from "./InMemoryEnigmaSecurityModelRepository";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
const { expect } = chai;
chai.use(chaiAsPromised);

describe("InMemoryStoreEnigmaSecurityModel", () => {
  const model1Name = "enigma-1";
  const model1: EnigmaSecurityModel = {
    caesarShift: 4,
    caesarIncrement: 1,
    rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  };

  const model2Name = "enigma-2";
  const model2: EnigmaSecurityModel = {
    caesarShift: 3,
    caesarIncrement: 2,
    rotor1Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    rotor2Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    rotor3Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  };

  it(`should store the enigma security model`, async () => {
    const repository = new InMemoryEnigmaSecurityModelRepository();
    return expect(repository.save(model1Name, model1)).to.be.fulfilled;
  });

  it(`should retrieve a stored enigma security model`, async () => {
    const repository = new InMemoryEnigmaSecurityModelRepository();
    await repository.save(model1Name, model1);
    const retrievedModel = await repository.get(model1Name);
    expect(retrievedModel).to.deep.equal(model1);
  });

  it(`should retrieve a stored enigma security model amongst others`, async () => {
    const repository = new InMemoryEnigmaSecurityModelRepository();
    await repository.save(model1Name, model1);
    await repository.save(model2Name, model2);
    const retrievedModel1 = await repository.get(model1Name);
    expect(retrievedModel1).to.deep.equal(model1);
    const retrievedModel2 = await repository.get(model2Name);
    expect(retrievedModel2).to.deep.equal(model2);
  });

  it(`should retrieve the last stored enigma security model with the same name`, async () => {
    const repository = new InMemoryEnigmaSecurityModelRepository();
    await repository.save(model1Name, model1);
    await repository.save(model1Name, model2);
    const retrievedModel = await repository.get(model1Name);
    expect(retrievedModel).to.deep.equal(model2);
  });

  it(`should throw when retrieving an non existing model`, async () => {
    const repository = new InMemoryEnigmaSecurityModelRepository();
    const retrievedModel = await repository.get("anyname");
    expect(retrievedModel).to.be.undefined;
  });
});
