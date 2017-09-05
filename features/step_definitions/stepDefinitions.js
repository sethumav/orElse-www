var {defineSupportCode} = require('cucumber');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the Cucumber.js GitHub repository', function() {
    browser.get("https://localhost:5600")
        browser.get('https://angularjs.org');

        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css('[value="add"]')).click();

        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).to.eventually.equal(3);
        expect(todoList.get(2).getText()).to.eventually.equal('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(by.css('input')).click();
        var completedAmount = element.all(by.css('.done-true'));
        expect(completedAmount.count()).to.eventually.equal(2);
  });

  When('I click on {string}', function (text) {

  });

  Then('I should see {string}', function (text) {

  });
});
