Feature: Encrypt

  Scenario: Encrypt a message using a security model based on Enigma
    Given The security model named <name>
    And The Caesar engine with shift <shift> and increment <increment>
    And The Rotor engine with <rotor1>
    And The Rotor engine with <rotor2>
    And The Rotor engine with <rotor3>
    And I have pushed the security model defined by these previous engines
    When I encrypt the message <message> with that security model
    Then I should obtain a response with status code 200
    And The body of the response should be contain the encrypted message <output>

  Examples:
    | name       | shift | increment | rotor1                       | rotor2                       | rotor3                       | message                                      | output                                       |
    | "enigma-1" | 4     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "AAA"                                        | "KQF"                                        |   
    | "enigma-2" | 9     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "EVERYONEISWELCOMEHERE"                      | "PQSACVVTOISXFXCIAMQEM"                      |   
    | "enigma-3" | 9     | 3         | "BDFHTXVZNYEIWGAKMUSQOJLCPR" | "AJDKSIRUXBGZNPYFVOELHWTMCQ" | "TOWYHXUSPAIBRCJEKMFLGDQVZN" | "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE" | "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ" |   

  Scenario: Encrypt a message using a custom security model
    Given The security model named "custom"
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 3 and increment 1
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 1 and increment 2
    And I have pushed the security model defined by these previous engines
    When I encrypt the message "HELLOWORLD" with that security model
    Then I should obtain a response with status code 200
    And The body of the response should be contain the encrypted message "DIBNGAMLWH"

  Scenario: Encrypt the same message twice with the same security model should produce the same output
    Given The security model named "custom"
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 3 and increment 1
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 1 and increment 2
    And I have pushed the security model defined by these previous engines
    And I have encrypted the message "HELLOWORLD" with that security model
    When I encrypt the message "HELLOWORLD" with that security model
    Then I should obtain a response with status code 200
    And The body of the response should be contain the encrypted message "DIBNGAMLWH"

  Scenario: Encrypt a message using a non existing security model should return an error
    Given The security model named "non-existing"
    When I encrypt the message "MESSAGE" with that security model
    Then I should obtain a response with status code 500
    And The body of the response should contain the error "Security model 'non-existing' not found"
