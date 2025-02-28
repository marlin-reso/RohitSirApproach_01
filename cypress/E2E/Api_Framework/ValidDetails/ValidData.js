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
        "EPFO Passbook Details",
        "EPFO Retail Data Fetch",
        "Utility - Phone Number Details",
        "Udyam OTP Verification"
    ];

    const otpApproachEmailMobileApis = [
        "UDIN OTP Verification",
    ];    

    testCases.forEach((testCase) => {
        it(`Verify ${testCase.name} API with valid data`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = payLoad.requestData;

                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;

                cy.request({
                    method: 'POST',
                    url: apiUrl,
                    headers: headers,
                    body: requestData,
                    failOnStatusCode: false
                }).then((response) => {
                    cy.log('Response Body:', JSON.stringify(response.body));
                    if (otpApproachApis.includes(apiName)) {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.have.property('responseMessage', 'OTP successfully sent to mobile number.');
                        expect(response.body).to.have.property('responseCode', "SOS174");
                    } else if(otpApproachEmailMobileApis.includes(apiName)){
                        expect(response.status).to.eq(200);
                        expect(response.body).to.have.property('responseMessage', 'OTP successfully sent to both Mobile Number and Email Id.');
                        expect(response.body).to.have.property('responseCode', "EOS950");
                    } else {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.have.property('responseMessage', 'Successfully Completed.');
                        expect(response.body).to.have.property('responseCode', "SRC001");
                    }
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
});