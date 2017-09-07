exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to this directory.
  specs: [
    'features/searchResponsiblePerson.feature'
  ],

  baseURL: 'http://localhost:4200/',

  cucumberOpts: {
    strict: true,
    timeout: 10000,
    require: ['features/env.js', 'features/step_definitions/mopStepDefinitions.js'],
    tags: false,
    profile: false,
    'no-source': true
  }
};
