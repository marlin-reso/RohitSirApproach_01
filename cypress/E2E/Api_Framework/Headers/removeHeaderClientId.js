/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's without key value pair of Client Id header`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            delete data.headers.clientId;

            apiData = data;
        });
    });

    testCases.forEach((testCase) => {
        it(`Verify ${testCase.name} API without key value pair of Client Id header`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = payLoad.requestData;

                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;
                // cy.log('Request Headers:', JSON.stringify(headers));
                cy.request({
                    method: 'POST',
                    url: apiUrl,
                    headers: headers,
                    body: requestData,
                    failOnStatusCode: false
                }).then((response) => {
                    cy.log('Response Body:', JSON.stringify(response.body));
                    expect(response.status).to.eq(412);

                    cy.log('Timestamp: ' + JSON.stringify(response.body.timestamp));
                    expect(response.body).to.have.property('status', 412);
                    expect(response.body).to.have.property('error', 'Precondition Failed');
                    expect(response.body).to.have.property('message', 'clientId as well as clientSecret are mandatory and the values can not be null or empty.');
                    expect(response.body).to.have.property('path', `/kyc/external${endpoint}`);        
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
});