Feature: Enigma

  Scenario: Push Enigma security model
    Given The security model named <name>
    And The Caesar shift <shift>
    And The first rotor <rotor1>
    And The second rotor <rotor2>
    And The third rotor <rotor3>
    When I push the security model defined by these values
    Then I should obtain a response with status code "200"
    And The body of the response should be empty

  Examples:
    | name | shift | rotor1 | rotor2 | rotor3 |
    | "enigma-1" | 4 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" |
    | "enigma-2" | 7 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | 
    | "enigma-3" | 9 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" |    
    | "enigma-4" | 9 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" |   


  Scenario: Encrypt a message using Enigma 
    Given The security model named <name>
    And The Caesar shift <shift>
    And The first rotor <rotor1>
    And The second rotor <rotor2>
    And The third rotor <rotor3>
    And I have pushed the security model defined by these values
    When I encrypt the message <message> with that security model
    Then I should obtain a response with status code "200"
    And The body of the response should be contain <output>

  Examples:
    | message | shift | rotor1 | rotor2 | rotor3 | output |
    |    "AAA" | 4 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "KQF" |   
    |    "WEATHERREPORTWINDYTODAY" | 7 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "ALWAURKQEQQWLRAWZHUYKVN" |   
    |    "EVERYONEISWELCOMEHERE" | 9 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "PQSACVVTOISXFXCIAMQEM" |   
    |    "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE" | 9 | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV" |   

