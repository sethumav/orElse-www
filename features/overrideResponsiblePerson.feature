Feature: Override of Responsible person name and email address as a one time modification

Scenario: Search for a responsible person using application and environment 
 Given OrElse website is up and running. I have added a MOP and I am on Review page
 When I query for responsible person using application and environment
 Then I should see a list of responsible persons with their name and email address

Scenario: Override of Responsible Person by modifying name and/or email address and save
 Given OrElse website is up and running. Search query returned one or more responsible persons.
 When I click on one responsible person
 Then I should be able to modify the name and email address by clicking and overriding on a pop-up
 And I should be able to click save on edit pop-up and see updated info on the UI

Scenario: Send the email to the updated name and email of Responsible person
 When I click Send Email after overriding the information
 Then I should be able to send the email to the updated name and/or email address