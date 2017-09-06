
      var {defineSupportCode} = require('cucumber');
      
      var chai = require('chai');
      var chaiAsPromised = require('chai-as-promised');
      
      chai.use(chaiAsPromised);
      var expect = chai.expect;
      var site= "http://localhost:4200";

      defineSupportCode(function({Given, When, Then}) {
        Given('OrElse website is up and running', function () {
            browser.get("http://localhost:4200/")
        });      
    
     
          When('I enter application name as tcm and environment as prod', function () {
            var elEnv = element(by.css('#md-input-5')).sendKeys("prod");
            var elApp = element(by.css('#md-input-7')).sendKeys("tcm");
            var elClickAdd = element(by.css('body > app-root > div > ng-component > div.buttonContainer > button'));
            elClickAdd.click();
            var elClickSubmit = element(by.xpath('//*[@id="submiMopBtn"]'));
            elClickSubmit.click();
          });
        
    
    
          Then('I should see a list of responsible person containing Daniel Yinanc', function (callback) {
            var elEmail = element(by.css('body > app-root > div > ng-component > div.mobDataTableContainer.mat-elevation-z8 > md-table > md-row > md-cell.mat-cell.cdk-column-respPerson.mat-column-respPerson > div > div.email'));         
            expect(elEmail.getText()).to.eventually.equal("daniel yinanc <daniel_yinanc@wsib.on.ca>").and.notify(callback);
          });


       
            When('I enter an application name that does not exist such as disneyland and environment as prod', function () {
                // Write code here that turns the phrase above into concrete actions
                //callback(null, 'pending');
            });
            

            Then('I should see an empty list of responsible person', function () {
                // Write code here that turns the phrase above into concrete actions
                //callback(null, 'pending');
            });

 
              Given('A responsible person is already identified', function () {
                // Write code here that turns the phrase above into concrete actions
                //callback(null, 'pending');
              });
            
      
              When('I press submit button', function () {
                // Write code here that turns the phrase above into concrete actions
                //callback(null, 'pending');
              });
            
      
              Then('An email is sent to that reponsible person', function () {
                // Write code here that turns the phrase above into concrete actions
                //callback(null, 'pending');
              });
            
     
              Then('email body and subject contain information gathered during search', function () {
                // Write code here that turns the phrase above into concrete actions
                //callback(null, 'pending');
              });
     
      });
      