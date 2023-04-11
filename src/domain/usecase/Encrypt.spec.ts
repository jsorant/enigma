import { stubInterface } from "ts-sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { Encrypt } from "./Encrypt";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";
import { CaesarEngine } from "../entities/engines/Caesar";
import { RotorEngine } from "../entities/engines/Rotor";
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Encrypt", () => {
  [
    {
      securityModel: {
        name: "enigma-0",
        engines: [
          new CaesarEngine(4, 0),
          new RotorEngine("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
          new RotorEngine("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
          new RotorEngine("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        ],
      },
      message: "AAA",
      expectedOutput: "KKK",
    },
    {
      securityModel: {
        name: "enigma-1",
        engines: [
          new CaesarEngine(4, 1),
          new RotorEngine("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
          new RotorEngine("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
          new RotorEngine("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        ],
      },
      message: "AAA",
      expectedOutput: "KQF",
    },
    {
      securityModel: {
        name: "enigma-2",
        engines: [
          new CaesarEngine(4, 2),
          new RotorEngine("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
          new RotorEngine("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
          new RotorEngine("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        ],
      },
      expectedOutput: "KFD",
      message: "AAA",
    },
    {
      securityModel: {
        name: "enigma-3",
        engines: [
          new CaesarEngine(7, 1),
          new RotorEngine("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
          new RotorEngine("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
          new RotorEngine("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        ],
      },
      message: "WEATHERREPORTWINDYTODAY",
      expectedOutput: "ALWAURKQEQQWLRAWZHUYKVN",
    },
    {
      securityModel: {
        name: "enigma-4",
        engines: [
          new CaesarEngine(9, 1),
          new RotorEngine("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
          new RotorEngine("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
          new RotorEngine("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        ],
      },
      message: "EVERYONEISWELCOMEHERE",
      expectedOutput: "PQSACVVTOISXFXCIAMQEM",
    },
    {
      securityModel: {
        name: "enigma-5",
        engines: [
          new CaesarEngine(9, 1),
          new RotorEngine("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
          new RotorEngine("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
          new RotorEngine("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        ],
      },
      message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      expectedOutput: "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV",
    },
    {
      securityModel: {
        name: "enigma-6",
        engines: [
          new CaesarEngine(9, 3),
          new RotorEngine("BDFHTXVZNYEIWGAKMUSQOJLCPR"),
          new RotorEngine("AJDKSIRUXBGZNPYFVOELHWTMCQ"),
          new RotorEngine("TOWYHXUSPAIBRCJEKMFLGDQVZN"),
        ],
      },
      message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      expectedOutput: "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ",
    },
  ].forEach((testCase) => {
    it(`should encrypt using a security model`, async () => {
      const stubRepository = stubInterface<SecurityModelRepository>();
      stubRepository.getByName.resolves(testCase.securityModel);
      const usecase = new Encrypt(stubRepository);
      const encryptedMessage = await usecase.execute(
        testCase.securityModel.name,
        testCase.message
      );
      expect(stubRepository.getByName).to.have.been.calledOnceWith(
        testCase.securityModel.name
      );
      expect(encryptedMessage).to.equal(testCase.expectedOutput);
    });
  });

  it(`should throw if using an non existing security model`, async () => {
    const stubRepository = stubInterface<SecurityModelRepository>();
    stubRepository.getByName.resolves(undefined);
    const usecase = new Encrypt(stubRepository);
    return expect(usecase.execute("enigma-1", "AAA")).to.be.rejectedWith(
      SecurityModelNotFound,
      "Security model 'enigma-1' not found"
    );
  });
});
