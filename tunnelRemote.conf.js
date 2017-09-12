var browserstack = require('browserstack-local');

exports.config = {
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  // Spec patterns are relative to this directory.
  specs: [
    'features/searchResponsiblePerson.feature'
  ],
   cucumberOpts: {
      strict: true,
      timeout: 10000,
      require: ['features/env.js', 'features/step_definitions/mopStepDefinitions.js'],
      tags: false,
      profile: false,
      'no-source': true
    },

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  'capabilities': {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    'build': 'OrElse',
    'name': 'CircleCI',
    'browserName': 'chrome',
    'browserstack.local': true,
    'browserstack.debug': 'true'
  },

  // Code to start browserstack local before start of test
  beforeLaunch: function(){
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.capabilities['browserstack.key'] }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function(){
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(resolve);
    });
  }
};
