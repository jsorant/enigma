import { stubInterface } from "ts-sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";
import { makeTestCases } from "./Fixtures.spec";
import { Decrypt } from "./Decrypt";
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Decrypt", () => {
  makeTestCases().forEach((testCase) => {
    it(`should encrypt using a security model`, async () => {
      const stubRepository = stubInterface<SecurityModelRepository>();
      stubRepository.getByName.resolves(testCase.securityModel);
      const usecase = new Decrypt(stubRepository);
      const decryptResult = await usecase.execute({
        modelName: testCase.securityModel.name,
        encryptedMessage: testCase.encryptedMessage,
      });
      expect(stubRepository.getByName).to.have.been.calledOnceWith(
        testCase.securityModel.name
      );
      expect(decryptResult.decryptedMessage).to.equal(testCase.plainMessage);
    });
  });

  it(`should throw if using an non existing security model`, async () => {
    const stubRepository = stubInterface<SecurityModelRepository>();
    stubRepository.getByName.resolves(undefined);
    const usecase = new Decrypt(stubRepository);
    return expect(
      usecase.execute({
        modelName: "enigma-1",
        encryptedMessage: "AAA",
      })
    ).to.be.rejectedWith(
      SecurityModelNotFound,
      "Security model 'enigma-1' not found"
    );
  });
});
