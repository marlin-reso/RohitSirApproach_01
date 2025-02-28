/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's with invalid "applicationId" payload key as "applicationId1"`, () => {
    let apiData;
    const ignoredTestCases = [
        'Fetch all car details list',
        'All city and state name list'
    ];

    before(function() {
        cy.fixture('apiData').then((data) => {
            Object.entries(data.testCases).forEach(([key, testCase]) => {
                if (testCase.requestData && testCase.requestData.applicationId) {
                    testCase.requestData.applicationId1 = testCase.requestData.applicationId;
                    delete testCase.requestData.applicationId;
                }
            });
            apiData = data;
        });
    });

    testCases.forEach((testCase) => {
        if (ignoredTestCases.includes(testCase.name)) {
            it(`Skipping ${testCase.name} API with invalid "applicationId" payload key as "applicationId1"`, () => {
                cy.log(`Skipping test case: ${testCase.name}`);
            });
        } else {
            it.only(`Verify ${testCase.name} API with invalid "applicationId" payload key as "applicationId1"`, () => {
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
                        expect(response.status).to.eq(200);

                        cy.log('Reference Id: ' + JSON.stringify(response.body.referenceId));
                        expect(response.body).to.have.property('responseMessage', 'Payload is Incorrect.');
                        expect(response.body).to.have.property('responseCode', 'EPI022');
                    });
                } else {
                    cy.log("Payload not found for API: " + testCase.name);
                }
            });
        }
    });
});