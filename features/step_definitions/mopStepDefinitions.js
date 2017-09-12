
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
            // open add/edit mop dialog
            var btnOpenAddMobDialog = element(by.css('#btnOpenAddMopDialog'));
            btnOpenAddMobDialog.click();
            // fill in application and enviroment
            var elEnv = element(by.css('#inputAddMopDialogEnviroment')).sendKeys("prod");
            var elApp = element(by.css('#inputAddMopDialogApplication')).sendKeys("tcm");
            // click dialog add button
            var btnAddEditMopDialog = element(by.css('#btnAddEditMopDialog'));
            btnAddEditMopDialog.click();
            // clost the dialog
            var btnMopDialogClose = element(by.css('#btnMopDialogClose'));
            btnMopDialogClose.click();
            // wait a little bit
            browser.driver.sleep(2000);
            // click submit button on add mob page
            var btnSubmitMops = element(by.css('#btnSubmitMops'));
            btnSubmitMops.click();
          });
        
    
    
          Then('I should see a list of responsible person containing Daniel Yinanc', function (callback) {
            // browser.driver.sleep(5000);
            var elEmail = element(by.css('div.email'));         
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
      