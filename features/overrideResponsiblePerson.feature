Feature: Test override of Responsible person name and email address 
         as a one time modification

Scenario: Test override of Responsible Person when Get Responsible Person query 
          returns one or more results.

 Given OrElse website is up and running 
       and I have added a MOP
       and I am on the Review page

 When I query for responsible person
 Then I can see the list of responsible persons with their name and email address

 When I see a list of responsible persons on UI
 Then I can modify the responsible person name and email address by clicking 
      on one of them and typing on the pop up

 When I modify the responsible person name and address information
 Then I should be able to save it as a one time modification 
      and see the updated information on the UI

 When I click Send Email
 Then I should be able to send the email to the updated name and/or email address