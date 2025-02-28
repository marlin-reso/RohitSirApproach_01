/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's with invalid value of applicationId`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            Object.values(data.testCases).forEach(testCase => {
                testCase.requestData.applicationId = '🥺';
            });
            apiData = data;
        });
    });

    testCases.forEach((testCase) => {
        it.skip(`Verify ${testCase.name} API with invalid value of as emoji add in applicationId`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = payLoad.requestData;

                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;
                cy.log('Request Headers:', JSON.stringify(requestData));
                cy.request({
                    method: 'POST',
                    url: apiUrl,
                    headers: headers,
                    body: requestData,
                    failOnStatusCode: false
                }).then((response) => {
                    cy.log('Response Body:', JSON.stringify(response.body));
                    // expect(response.status).to.eq(200);

                    // cy.log('Reference Id: ' + JSON.stringify(response.body.referenceId));
                    // expect(response.body).to.have.property('responseMessage', 'Payload is Incorrect.');
                    // expect(response.body).to.have.property('responseCode', 'EPI022');
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
});