// /// <reference types="Cypress"/>
// import testCases from "../testCases";

// describe(`Test API's responce payload properties`, () => {
//     let apiData;

//     before(function() {
//         cy.fixture('apiData').then((data) => {
//             apiData = data;
//         });
//     });

//     testCases.forEach((testCase) => {
//         it(`Verify ${testCase.name} api responce payload properties`, () => {
//             const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
//             if (payLoad) {
//                 const apiName = payLoad.apiName;
//                 const endpoint = payLoad.endpoint;
//                 const requestData = payLoad.requestData;

//                 const apiUrl = `${apiData.baseUrl}${endpoint}`;
//                 const headers = apiData.headers;

//                 // cy.log(`Testing API: ${apiName}`);
//                 // cy.log(`API Endpoint: ${apiUrl}`);

//         cy.request({
//             method: 'POST',
//             url: apiUrl,
//             headers: headers,
//             body: requestData
//         }).then((response) => {
//             cy.log('Response Body:', JSON.stringify(response.body));
//             expect(response.status).to.eq(200);

//             cy.log('Reference ID: ' + response.body.referenceId);
//             expect(response.body).to.have.property('responseMessage', 'Successfully Completed.');
//             expect(response.body).to.have.property('responseCode', "SRC001");

//             cy.log('Response Key-Value Pairs:');
//             Object.entries(response.body).forEach(([key, value]) => {
//                 cy.log(`${key}: ${JSON.stringify(value)}`);
//             });

//             cy.log('Response Data Types:');
//             // Object.entries(response.body).forEach(([key, value]) => {
//             Object.entries(response.body.data).forEach(([key, value]) => {
//                 cy.log(`${key}: ${typeof value}`);
//             });

            
//             if (testCase.name === 'Aadhaar Verifier') {
//                 expect(response.body).to.have.property('data');
//                 expect(response.body.data).to.have.property('aadhaarNumber');
//                 expect(response.body.data).to.have.property('gender');
//                 expect(response.body.data).to.have.property('mobileNumber');
//                 expect(response.body.data).to.have.property('maskedMobileNumber');
//                 expect(response.body.data).to.have.property('ageBand');
//                 expect(response.body.data).to.have.property('dateOfBirth');
//                 expect(response.body.data).to.have.property('state');
//                 expect(response.body).to.have.property('referenceId');
//                 expect(response.body).to.have.property('responseMessage');
//                 expect(response.body).to.have.property('responseCode');
//             } else if (testCase.name === 'Udyam Registration') {
//                 expect(response.body.data).to.have.property('unitDetails');
//             } else {
//                 cy.log('Test case not found')
//             }

//         });
//         } else {
//             cy.log("Payload not found for API: " + testCase.name);
//         }
//         });
//     });
// });