import { CaesarEngine } from "../entities/engines/caesar/CaesarEngine";
import { RotorEngine } from "../entities/engines/rotor/RotorEngine";

export function makeTestCases(): Array<any> {
  return [
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
      plainMessage: "AAA",
      encryptedMessage: "KKK",
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
      plainMessage: "AAA",
      encryptedMessage: "KQF",
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
      encryptedMessage: "KFD",
      plainMessage: "AAA",
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
      plainMessage: "WEATHERREPORTWINDYTODAY",
      encryptedMessage: "ALWAURKQEQQWLRAWZHUYKVN",
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
      plainMessage: "EVERYONEISWELCOMEHERE",
      encryptedMessage: "PQSACVVTOISXFXCIAMQEM",
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
      plainMessage: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      encryptedMessage: "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV",
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
      plainMessage: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      encryptedMessage: "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ",
    },
  ];
}
