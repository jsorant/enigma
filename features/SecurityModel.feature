Feature: Security model

  Scenario: Push a security model
    Given A security model
    When I push the security model
    Then I should obtain a response with status code 200
    And The body of the response should be empty

  Scenario: Push a security model with an unsupported engine should return an error
    Given A security model with an unsupported engine named "unsupported-engine"
    When I push the security model
    Then I should obtain a response with status code 500
    And The body of the response should contain the error "Unsupported engine: 'unsupported-engine'"
