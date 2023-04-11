import { InMemorySecurityModelRepository } from "./InMemorySecurityModelRepository";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { SecurityModel } from "../../domain/entities/SecurityModel";
import { CaesarEngine } from "../../domain/entities/engines/Caesar";
import { RotorEngine } from "../../domain/entities/engines/Rotor";
const { expect } = chai;
chai.use(chaiAsPromised);

describe("InMemorySecurityModelRepository", () => {
  const securityModel1: SecurityModel = {
    name: "enigma-1",
    engines: [
      new CaesarEngine(4, 1),
      new RotorEngine("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
      new RotorEngine("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
      new RotorEngine("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
    ],
  };

  const securityModel2: SecurityModel = {
    name: "enigma-2",
    engines: [
      new CaesarEngine(3, 2),
      new RotorEngine("IRUXBLHWTMAJDKSCQGZNPYFVOE"),
      new RotorEngine("EKMFLGTOWYHXUSPAIBRCJDQVZN"),
      new RotorEngine("PRTXVZNYEIWGABDFHJLCKMUSQO"),
    ],
  };

  it(`should store a security model`, async () => {
    const repository = new InMemorySecurityModelRepository();
    return expect(repository.save(securityModel1)).to.be.fulfilled;
  });

  it(`should retrieve a stored security model`, async () => {
    const repository = new InMemorySecurityModelRepository();
    await repository.save(securityModel1);
    const retrievedModel = await repository.getByName(securityModel1.name);
    expect(retrievedModel).to.deep.equal(securityModel1);
  });

  it(`should retrieve a stored security model amongst others`, async () => {
    const repository = new InMemorySecurityModelRepository();
    await repository.save(securityModel1);
    await repository.save(securityModel2);
    const retrievedModel1 = await repository.getByName(securityModel1.name);
    expect(retrievedModel1).to.deep.equal(securityModel1);
    const retrievedModel2 = await repository.getByName(securityModel2.name);
    expect(retrievedModel2).to.deep.equal(securityModel2);
  });

  it(`should retrieve the last stored security model with the same name`, async () => {
    const repository = new InMemorySecurityModelRepository();
    await repository.save(securityModel1);
    const anotherModelWithTheSameName = cloneSecurityModelAndUpdateName(
      securityModel2,
      securityModel1.name
    );
    await repository.save(anotherModelWithTheSameName);
    const retrievedModel = await repository.getByName(securityModel1.name);
    expect(retrievedModel).to.deep.equal(anotherModelWithTheSameName);
  });

  it(`should throw when retrieving an non existing model`, async () => {
    const repository = new InMemorySecurityModelRepository();
    const retrievedModel = await repository.getByName("anyname");
    expect(retrievedModel).to.be.undefined;
  });
});

function cloneSecurityModelAndUpdateName(
  securityModel: SecurityModel,
  modelName: string
) {
  const clone = JSON.parse(JSON.stringify(securityModel));
  clone.name = modelName;
  return clone;
}
