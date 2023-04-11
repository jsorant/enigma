Feature: Security models

  Scenario: Push a security model
    Given A security model
    When I push the security model
    Then I should obtain a response with status code 200
    And The body of the response should be empty

  Scenario: Encrypt a message using a security model
    Given The security model named <name>
    And The Caesar engine with shift <shift> and increment <increment>
    And The Rotor engine with <rotor1>
    And The Rotor engine with <rotor2>
    And The Rotor engine with <rotor3>
    And I have pushed the security model defined by these previous engines
    When I encrypt the message <message> with that security model
    Then I should obtain a response with status code 200
    And The body of the response should be contain <output>

  Examples:
    | name       | shift | increment | rotor1                       | rotor2                       | rotor3                       | message                                      | output                                       |
    | "enigma-1" | 4     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "AAA"                                        | "KQF"                                        |   
    | "enigma-2" | 9     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "EVERYONEISWELCOMEHERE"                      | "PQSACVVTOISXFXCIAMQEM"                    |   
    | "enigma-3" | 9     | 3         | "BDFHTXVZNYEIWGAKMUSQOJLCPR" | "AJDKSIRUXBGZNPYFVOELHWTMCQ" | "TOWYHXUSPAIBRCJEKMFLGDQVZN" | "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE" | "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ" |   

