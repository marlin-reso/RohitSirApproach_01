/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Aadhaar Otp API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidAadhaarNumber = [
        { aadhaar_number: '695277717061', description: 'Not Exist' },
        { aadhaar_number: '410693835810', description: 'Aadhaar locked by the Aadhaar number holder.' },
        { aadhaar_number: '400914904759', description: 'Aadhaar number does not have a mobile number registered with it.' },
        { aadhaar_number: '', description: 'Blank Input Field.' },
        { aadhaar_number: '695277717', description: 'Incorrect Input.' },
        { aadhaar_number: '358723340926', description: 'Your aadhaar has been suspended or cancelled.' },
        { aadhaar_number: '69527771706', description: 'Too Short' },
        { aadhaar_number: '6952777170600', description: 'Too Long' },
        { aadhaar_number: '69527A71706B', description: 'Non-Numeric Characters' },
        { aadhaar_number: '69527-71706@', description: 'Special Characters' },
        { aadhaar_number: '', description: 'Empty String' },
        { aadhaar_number: '695277 717060', description: 'Whitespace Characters' },
        { aadhaar_number: '000000000000', description: 'All Zeros' },
        { aadhaar_number: '111111111111', description: 'All Same Digits' },
        { aadhaar_number: '123456789012', description: 'Sequential Numbers' },
        { aadhaar_number: '000695277717', description: 'Leading Zeros' },
        { aadhaar_number: '695277717060 ', description: 'Trailing Spaces' },
        { aadhaar_number: '695 277 717 060', description: 'Embedded Spaces' },
        { aadhaar_number: '6952777170\u200B60', description: 'Unicode Characters' },
        { aadhaar_number: '695277717060000000', description: 'Excessively Large Number' },
        { aadhaar_number: null, description: 'Null Value' },
        { aadhaar_number: undefined, description: 'undefined' },
        { aadhaar_number: Boolean, description: 'boolean' },
        { aadhaar_number: true, description: 'boolean true' },
        { aadhaar_number: false, description: 'boolean flase' },
    ];


    const errorCodeToMessage = {
        'EAE168': 'Aadhaar does not exist.',
        'EAN1391': 'Aadhaar locked by the Aadhaar number holder.',
        'EAN1229': 'Aadhaar number does not have a mobile number registered with it.',
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
        'SRC001': 'Successfully Completed.',
        'EAN1390': 'Your aadhaar has been suspended or cancelled.',
    };
    

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Aadhaar OTP Verification');
    filteredTestCases.forEach((testCase) => {
        invalidAadhaarNumber.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Aadhaar number : ${invalidCase.aadhaar_number}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, aadhaar_number: invalidCase.aadhaar_number }; 

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