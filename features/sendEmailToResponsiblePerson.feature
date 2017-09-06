Feature: Send reminder email to responsible person
    As a user, I would like reminder emails to be sent to application 
production support when a new MOP is
    received.
Background:
    Given OrElse website is up and running

Scenario: Send a reminder email to identified responsible person
    Given A responsible person is already identified 
    When I press submit button
    Then An email is sent to that reponsible person 
    And email body and subject contain information gathered during search
