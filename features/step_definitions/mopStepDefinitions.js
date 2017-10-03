      var {defineSupportCode} = require('cucumber');

      var chai = require('chai');
      var chaiAsPromised = require('chai-as-promised');
      const webdriver = require('selenium-webdriver')

      chai.use(chaiAsPromised);
      var expect = chai.expect;
      var site= "http://localhost:4200/addmob";
      var EC = protractor.ExpectedConditions;

      var email="";

      defineSupportCode(function({Given, When, Then}) {
        Given('OrElse website is up and running', function () {
            browser.get("http://localhost:4200/addmob")
            browser.waitForAngular();
        });


          When('I enter application name as tcm and environment as prod', function (callback) {
              // open add/edit mop dialog
              var btnOpenAddMobDialog = element(by.css('#btnOpenAddMopDialog'));
              btnOpenAddMobDialog.click();
              // fill in application and environment
              var elEnv = element(by.cssContainingText('option', 'prod')).click();
              var elApp = element(by.css('#inputAddMopDialogApplication')).sendKeys("tcm");

              var btnAddEditMopDialog = element(by.css('#btnAddEditMopDialog'));
              browser.wait(EC.visibilityOf(element(by.css('#btnAddEditMopDialog'))), 5000, "btnAddEditMopDialog element is not visible").then(function() {
                btnAddEditMopDialog.click();  
              });           
            
             var elEmail = element(by.css('div.email'));
          
              // close the dialog
              var btnMopDialogClose = element(by.css('#btnMopDialogClose'));
              var btnSubmitMops = element(by.css('#btnSubmitMops'));
              btnMopDialogClose.click().then(function(){
                browser.wait(EC.stalenessOf(btnMopDialogClose), 60000).then(function() {
                  btnSubmitMops.click().then(function(){
                    console.log("submit clicked");
                    callback();
                  });
              });
            });
          });



          Then('I should see a list of responsible person containing Daniel Yinanc', function (callback) {
            console.log("Inside Then");
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
