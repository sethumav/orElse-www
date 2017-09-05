var {defineSupportCode} = require('cucumber');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

defineSupportCode(function({Given, When, Then}) {
    Given(/^I go to "([^"]*)"$/, function(site) {
      browser.get(site);
    });

    When(/^I add "([^"]*)" in the task field$/, function(task) {
      element(by.model('todoList.todoText')).sendKeys(task);
    });

    When(/^I click the add button$/, function() {
      var el = element(by.css('[value="add"]'));
      el.click();
    });

    Then(/^I should see my new task in the list$/, function(callback) {
      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).to.eventually.equal(3);
      expect(todoList.get(2).getText()).to.eventually.equal('Do not Be Awesome')
        .and.notify(callback);
    });
});
