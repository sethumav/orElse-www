Feature: Search responsible persons using application and environment
    As a user, I would like reminder emails to be sent to application 
production support when a new MOP is
    received.

Scenario: Search for a responsible person using application and enverionment
  Given OrElse website is up and running
  When I enter application name as tcm and environment as prod
  Then I should see a list of responsible person containing Daniel Yinanc

Scenario: Search but not find a responsible person using application and environment
  Given OrElse website is up and running
  When I enter an application name that does not exist such as disneyland and environment as prod
  Then I should see an empty list of responsible person