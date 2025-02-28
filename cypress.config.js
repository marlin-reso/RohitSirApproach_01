const { log } = require("console");
const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'Api_Test_Result',
    charts: true,
    inlineAssets: true,
    reportPageTitle: 'Api Test Report',
    overwrite: false,
    html: true,
    inlineAssets: true,
    json: true,
    embeddedScreenshots: true,
    code: false,
    autoOpen: true,
  },
  e2e: {
    specPattern: 'cypress/E2E/*/*/*.js',
    setupNodeEvents(on, config) {
    //  mochawesome(on);
      require('./cypress/plugins/index.js')(on, config);


      require('cypress-mochawesome-reporter/plugin')(on);

      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        logToFile({ filename, message }) {
          const fs = require('fs');
          fs.appendFileSync(filename, message + '\n');
          return null;
        },
      });

      return config;
    },
    projectId: "7dvyik",
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 10000,
  },
});


// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
//   reporterOptions: {
//     reportDir: 'cypress/reports',
//     reportFilename: 'Api Test Result',
//     charts: true,
//     inlineAssets: true,
//     reportPageTitle: 'Api Test Report',
//     overwrite: false,
//     html: true,
//     inlineAssets: true,
//     json: true,
//     embeddedScreenshots: true,
//     code: false,
//     autoOpen: true,
//   },
//   e2e: {
//     specPattern: 'cypress/E2E/*.js',
//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on);
//       return config;  
//       on('task', {
//         log(message) {
//           console.log(message);
//           return null;
//         },
//         logToFile({ filename, message }) {
//           const fs = require('fs');
//           fs.appendFileSync(filename, message + '\n');
//           return null;
//         }
//       }); 
//     },
//     projectId: "7dvyik",
//     retries: {
//       runMode: 2,  
//       openMode: 0, 
//     },
//   },
// });


