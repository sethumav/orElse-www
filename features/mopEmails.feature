Feature: Send reminder emails when Mop is received
    As a user, I would like reminder emails to be sent to application 
production support when a new MOP is
    received.

Scenario: Checking MOP sent emails
  Given Vendor uploaded a MOP
  When I visit application website
  And I enter changeRequestId
  Then I should see a list of sent reminder email addresses

Scenario: Vendor uploads a MOP
  Given Application website is up and running
  When Vendor uploads a Mop via frontEnd
  Then Application sends reminder emails to correct parties
