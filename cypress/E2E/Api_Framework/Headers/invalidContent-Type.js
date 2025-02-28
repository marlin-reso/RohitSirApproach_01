/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's with invalid header "Content-Type" as "abcd"`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            data.headers["Content-Type"] = "abcd"; 

            apiData = data;
        });
    });

    testCases.forEach((testCase) => {
        it(`Verify ${testCase.name} API with invalid header "Content-Type" as "abcd"`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = payLoad.requestData;

                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;
                cy.log('Request Headers:', JSON.stringify(headers));
                cy.request({
                    method: 'POST',
                    url: apiUrl,
                    headers: headers,
                    body: requestData,
                    failOnStatusCode: false
                }).then((response) => {
                    cy.log('Response Body:', JSON.stringify(response.body));
                    expect(response.status).to.eq(415);

                    cy.log('Timestamp: ' + JSON.stringify(response.body.timestamp));
                    expect(response.body).to.have.property('status', 415);
                    expect(response.body).to.have.property('error', 'Unsupported Media Type');
                    expect(response.body).to.have.property('message', `Invalid mime type "abcd": does not contain '/'`);
                    expect(response.body).to.have.property('path', `/kyc/external${endpoint}`);        
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
});