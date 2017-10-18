// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  emailService: 'http://localhost:8080/v1/email/send',
  responsiblePersonService: {
    //url: 'http://localhost:8090/getResponsiblePersonByApplicationAndEnvironment',
    url: 'https://braintrustwsib.ddns.net/api/responsibleperson-microservice/getResponsiblePersonByApplicationAndEnvironment',    
    appParam: 'application',
    envParam: 'environment'
  },
  changeRequestService: {
    url: 'http://localhost:8080/v2/changeRequests/save'
  },
  changeRequestGetAllService: {
    url: 'http://localhost:8080/v2/changeRequests/get/all'
  },
  changeRequestGetAllMopService: {
    url: 'http://localhost:8080/v2/methodOfProcedures/get/changeRequestId'    
  }
};

