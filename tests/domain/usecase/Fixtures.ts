import { SecurityModel } from "../../../src/domain/entities/SecurityModel";

export function makeTestCases(): Array<any> {
  return [
    {
      securityModel: SecurityModel.builder()
        .withName("enigma-0")
        .withCaesar(4, 0)
        .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
        .withRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE")
        .withRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ")
        .build(),
      plainMessage: "AAA",
      encryptedMessage: "KKK",
    },
    {
      securityModel: SecurityModel.builder()
        .withName("enigma-1")
        .withCaesar(4, 1)
        .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
        .withRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE")
        .withRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ")
        .build(),
      plainMessage: "AAA",
      encryptedMessage: "KQF",
    },
    {
      securityModel: SecurityModel.builder()
        .withName("enigma-2")
        .withCaesar(4, 2)
        .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
        .withRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE")
        .withRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ")
        .build(),
      plainMessage: "AAA",
      encryptedMessage: "KFD",
    },
    {
      securityModel: SecurityModel.builder()
        .withName("enigma-3")
        .withCaesar(7, 1)
        .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
        .withRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE")
        .withRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ")
        .build(),
      plainMessage: "WEATHERREPORTWINDYTODAY",
      encryptedMessage: "ALWAURKQEQQWLRAWZHUYKVN",
    },
    {
      securityModel: SecurityModel.builder()
        .withName("enigma-4")
        .withCaesar(9, 1)
        .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
        .withRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE")
        .withRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ")
        .build(),
      plainMessage: "EVERYONEISWELCOMEHERE",
      encryptedMessage: "PQSACVVTOISXFXCIAMQEM",
    },
    {
      securityModel: SecurityModel.builder()
        .withName("enigma-5")
        .withCaesar(9, 1)
        .withRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO")
        .withRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE")
        .withRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ")
        .build(),
      plainMessage: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      encryptedMessage: "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV",
    },
    {
      securityModel: SecurityModel.builder()
        .withName("enigma-6")
        .withCaesar(9, 3)
        .withRotor("BDFHTXVZNYEIWGAKMUSQOJLCPR")
        .withRotor("AJDKSIRUXBGZNPYFVOELHWTMCQ")
        .withRotor("TOWYHXUSPAIBRCJEKMFLGDQVZN")
        .build(),
      plainMessage: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      encryptedMessage: "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ",
    },
  ];
}
