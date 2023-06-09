import { stubInterface } from "ts-sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { Encrypt } from "./Encrypt";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";
import { makeTestCases } from "./Fixtures.spec";
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Encrypt", () => {
  makeTestCases().forEach((testCase) => {
    it(`should encrypt ${testCase.plainMessage} into ${testCase.encryptedMessage} using a security model ${testCase.securityModel.name}`, async () => {
      const stubRepository = stubInterface<SecurityModelRepository>();
      stubRepository.getByName.resolves(testCase.securityModel);
      const usecase = new Encrypt(stubRepository);
      const usecaseResult = await usecase.execute({
        modelName: testCase.securityModel.name,
        message: testCase.plainMessage,
      });
      expect(stubRepository.getByName).to.have.been.calledOnceWith(
        testCase.securityModel.name
      );
      expect(usecaseResult.encryptedMessage).to.equal(
        testCase.encryptedMessage
      );
    });
  });

  it(`should throw if using an non existing security model`, async () => {
    const stubRepository = stubInterface<SecurityModelRepository>();
    stubRepository.getByName.resolves(undefined);
    const usecase = new Encrypt(stubRepository);
    return expect(
      usecase.execute({
        modelName: "enigma-1",
        message: "AAA",
      })
    ).to.be.rejectedWith(
      SecurityModelNotFound,
      "Security model 'enigma-1' not found"
    );
  });
});
