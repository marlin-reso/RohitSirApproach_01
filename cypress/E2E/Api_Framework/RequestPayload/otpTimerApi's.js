/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's with valid data`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const otpApproachApis = [
        "Aadhaar OTP Verification",
        "Utility - Phone Number Details",
        "Udyam OTP Verification"
    ];

    // Filter test cases to include only those in the otpApproachApis array
    const filteredTestCases = testCases.filter(testCase => otpApproachApis.includes(testCase.name));

    filteredTestCases.forEach((testCase) => {
        it(`Verify ${testCase.name} API with valid data`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = payLoad.requestData;

                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;

                for (let i = 1; i <= 5; i++) {
                    cy.request({
                        method: 'POST',
                        url: apiUrl,
                        headers: headers,
                        body: requestData,
                        failOnStatusCode: false  
                    }).then((response) => {
                        cy.log('Response Body:', JSON.stringify(response.body));

                        if (i === 5) {
                            // On the 5th request, expect a rate limiting error
                            expect(response.status).to.eq(200); // Adjust status code if different for rate limiting
                            const errorMessagePattern = /OTP already sent\. Please try after \d+ (min|Sec)\./;
                            expect(response.body).to.have.property('responseMessage').and.to.match(errorMessagePattern);
                            expect(response.body).to.have.property('responseCode', 'EAS517');
                        }
                    });

                    // Adding delay to simulate the passage of time between requests
                    cy.wait(1000);
                }
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
});