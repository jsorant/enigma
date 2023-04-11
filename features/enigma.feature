Feature: Enigma

  Scenario: Push Enigma security model
    Given An enigma security model
    When I push the enigma security model
    Then I should obtain a response with status code "200"
    And The body of the response should be empty
