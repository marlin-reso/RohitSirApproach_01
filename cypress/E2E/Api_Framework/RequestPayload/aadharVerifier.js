/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Aadhar Number API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidAadhaarNumbers = [
        { aadhaarNumber: '695277717061', description: 'Not Exist' },
        { aadhaarNumber: '69527771706', description: 'Too Short' },
        { aadhaarNumber: '6952777170600', description: 'Too Long' },
        { aadhaarNumber: '69527A71706B', description: 'Non-Numeric Characters' },
        { aadhaarNumber: '69527-71706@', description: 'Special Characters' },
        { aadhaarNumber: '', description: 'Empty String' },
        { aadhaarNumber: '695277 717060', description: 'Whitespace Characters' },
        { aadhaarNumber: '000000000000', description: 'All Zeros' },
        { aadhaarNumber: '111111111111', description: 'All Same Digits' },
        { aadhaarNumber: '123456789012', description: 'Sequential Numbers' },
        { aadhaarNumber: '000695277717', description: 'Leading Zeros' },
        { aadhaarNumber: '695277717060 ', description: 'Trailing Spaces' },
        { aadhaarNumber: '695 277 717 060', description: 'Embedded Spaces' },
        { aadhaarNumber: '6952777170\u200B60', description: 'Unicode Characters' },
        { aadhaarNumber: '695277717060000000', description: 'Excessively Large Number' },
        { aadhaarNumber: null, description: 'Null Value' },
        { aadhaarNumber: undefined, description: 'undefined' },
        { aadhaarNumber: Boolean, description: 'boolean' },
        { aadhaarNumber: true, description: 'boolean true' },
        { aadhaarNumber: false, description: 'boolean flase' },
        // { aadhaarNumber: 111122223333, description: 'Excessively Large Number' } 
    ];

    const errorCodeToMessage = {
        'EAE168': 'Aadhaar does not exist.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Aadhaar Verifier');
    filteredTestCases.forEach((testCase) => {
        invalidAadhaarNumbers.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Aadhaar number : ${invalidCase.aadhaarNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, aadhaarNumber: invalidCase.aadhaarNumber }; // Override Aadhaar number

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

                    cy.log('Reference ID: ' + response.body.referenceId);

                    const expectedErrorMessage = errorCodeToMessage[response.body.responseCode];
                    expect(response.body.responseMessage).to.eq(expectedErrorMessage);
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
  });  
});