Feature: Decrypt

  Scenario: Decrypt a message using a security model based on Enigma
    Given The security model named <name>
    And The Caesar engine with shift <shift> and increment <increment>
    And The Rotor engine with <rotor1>
    And The Rotor engine with <rotor2>
    And The Rotor engine with <rotor3>
    And I have pushed the security model defined by these previous engines
    When I decrypt the encrypted message <message> with that security model
    Then I should obtain a response with status code 200
    And The body of the response should be contain the decrypted message <output>

  Examples:
    | name       | shift | increment | rotor1                       | rotor2                       | rotor3                       | message                                      | output                                       |
    | "enigma-1" | 4     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "KQF"                                        | "AAA"                                        |   
    | "enigma-2" | 9     | 1         | "BDFHJLCPRTXVZNYEIWGAKMUSQO" | "AJDKSIRUXBLHWTMCQGZNPYFVOE" | "EKMFLGDQVZNTOWYHXUSPAIBRCJ" | "PQSACVVTOISXFXCIAMQEM"                      | "EVERYONEISWELCOMEHERE"                      |   
    | "enigma-3" | 9     | 3         | "BDFHTXVZNYEIWGAKMUSQOJLCPR" | "AJDKSIRUXBGZNPYFVOELHWTMCQ" | "TOWYHXUSPAIBRCJEKMFLGDQVZN" | "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ" | "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE" |   

  Scenario: Decrypt a message using a custom security model
    Given The security model named "custom"
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 3 and increment 1
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 1 and increment 2
    And I have pushed the security model defined by these previous engines
    When I decrypt the encrypted message "DIBNGAMLWH" with that security model
    Then I should obtain a response with status code 200
    And The body of the response should be contain the decrypted message "HELLOWORLD"

  Scenario: Decrypt the same message twice with the same security model should produce the same output
    Given The security model named "custom"
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 3 and increment 1
    And The Rotor engine with "NYEUSQOJXVZLCPBIWGAKMDFHRT"
    And The Caesar engine with shift 1 and increment 2
    And I have pushed the security model defined by these previous engines
    And I have decrypted the message "DIBNGAMLWH" with that security model
    When I decrypt the encrypted message "DIBNGAMLWH" with that security model
    Then I should obtain a response with status code 200
    And The body of the response should be contain the decrypted message "HELLOWORLD"

  Scenario: Decrypt a message using a non existing security model should return an error
    Given The security model named "non-existing"
    When I decrypt the encrypted message "ENCRYPTEDMESSAGE" with that security model
    Then I should obtain a response with status code 500
    And The body of the response should contain the error "Security model 'non-existing' not found"