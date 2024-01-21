import { InMemorySecurityModelRepository } from "../../../src/infrastructure/repositories/InMemorySecurityModelRepository";
import { expect, test, describe } from "vitest";
import { SecurityModel } from "../../../src/domain/entities/SecurityModel";
import {
  makeEnigmaFiveSecurityModel,
  makeEnigmaSixSecurityModel,
  makeEnigmaSixSecurityModelWithName,
} from "../../Fixtures";

describe("InMemorySecurityModelRepository", () => {
  const enigmaFive: SecurityModel = makeEnigmaFiveSecurityModel();
  const enigmaSix: SecurityModel = makeEnigmaSixSecurityModel();

  test(`should return undefined when retrieving an non existing model`, async () => {
    const repository = new InMemorySecurityModelRepository();

    const retrievedModel = await repository.getByName("anyname");

    expect(retrievedModel).toBeUndefined;
  });

  test(`should store a security model`, async () => {
    const repository = new InMemorySecurityModelRepository();

    await expect(repository.save(enigmaFive)).resolves.toBeUndefined();
  });

  test(`should retrieve a stored security model`, async () => {
    const repository = new InMemorySecurityModelRepository();
    await repository.save(enigmaFive);

    const retrievedModel = await repository.getByName(enigmaFive.name);

    expect(retrievedModel).toStrictEqual(enigmaFive);
  });

  test(`should retrieve a stored security model amongst others`, async () => {
    const repository = new InMemorySecurityModelRepository();
    await repository.save(enigmaFive);
    await repository.save(enigmaSix);

    const retrievedModel1 = await repository.getByName(enigmaFive.name);
    const retrievedModel2 = await repository.getByName(enigmaSix.name);

    expect(retrievedModel1).toStrictEqual(enigmaFive);
    expect(retrievedModel2).toStrictEqual(enigmaSix);
  });

  test(`should retrieve the last stored security model with the same name`, async () => {
    const repository = new InMemorySecurityModelRepository();
    await repository.save(enigmaFive);

    const anotherModelWithTheSameName = makeEnigmaSixSecurityModelWithName(
      enigmaFive.name
    );
    await repository.save(anotherModelWithTheSameName);

    const retrievedModel = await repository.getByName(enigmaFive.name);
    expect(retrievedModel).toStrictEqual(anotherModelWithTheSameName);
  });
});
