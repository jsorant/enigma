Feature: Encryptor

  Scenario: Decrypt a message using a security model 
    Given The security model named <name>
    And The Caesar shift <shift>
    And The Caesar increment <increment>
    And The first rotor <rotor1>
    And The second rotor <rotor2>
    And The third rotor <rotor3>
    And I have pushed the security model defined by these previous values
    When I decrypt the encrypted message <encrypted> with that security model
    Then I should obtain a response with status code "200"
    And The body of the response should be contain <output>

  Examples:
    | name       | shift | increment | rotor1                       | rotor2                       | rotor3                       | encrypted                                    | output                                       |
    | "enigma-1" | 4     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "KQF"                                        | "AAA"                                        |   
    | "enigma-2" | 7     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "ALWAURKQEQQWLRAWZHUYKVN"                    | "WEATHERREPORTWINDYTODAY"                    |   
    | "enigma-3" | 9     | 1         | "BDFHTXVZNYEIWGAKMUSQOJLCPR" | "AJDKSIRUXBGZNPYFVOELHWTMCQ" | "TOWYHXUSPAIBRCJEKMFLGDQVZN" | "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV" | "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE" |   
