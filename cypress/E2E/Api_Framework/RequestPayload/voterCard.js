/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Voter Card API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidEpicNumber = [
        { epicNumber: 'CHM1234567', description: 'Non-existent EPIC Number' },
        { epicNumber: 'CHM1765 833', description: 'Non-existent EPIC Number with Space' },
        { epicNumber: 'CHM1765@833', description: 'Non-existent EPIC Number with Special Character' },
        { epicNumber: 'CHM17658', description: 'Too Short EPIC Number' },
        { epicNumber: 'CHM17658333333', description: 'Too Long EPIC Number' },
        { epicNumber: 'CHM17A5833', description: 'Invalid Character in EPIC Number (Alpha in Middle)' },
        { epicNumber: 'CHM17*5833', description: 'Invalid Character in EPIC Number (Special Character in Middle)' },
        { epicNumber: '', description: 'Empty EPIC Number' },
        { epicNumber: null, description: 'Null EPIC Number' },
        { epicNumber: ' CHM1765833', description: 'Leading Space in EPIC Number' },
        { epicNumber: 'CHM1065833 ', description: 'Trailing Space in EPIC Number' },
        { epicNumber: 'CHM 1765833', description: 'Embedded Space in EPIC Number' },
        { epicNumber: 'CHM1 765833', description: 'Embedded Space in EPIC Number (Middle)' },
        { epicNumber: 'CHM1765-833', description: 'Special Character in EPIC Number (Hyphen)' },
        { epicNumber: 'CHM1765_833', description: 'Special Character in EPIC Number (Underscore)' },
        { epicNumber: 'CHM1111111', description: 'EPIC Number with All Same Digits' },
        { epicNumber: 'CHM1234567', description: 'EPIC Number with Sequential Digits' },
        { epicNumber: 'chm1760833', description: 'Lowercase EPIC Number' },
        { epicNumber: 'CHM1705833'.toLowerCase(), description: 'EPIC Number in Lowercase Function' },
        { epicNumber: 'ChM1760833', description: 'Mixed Case EPIC Number' },
        { epicNumber: '1HM1765833', description: 'Numeric Prefix in EPIC Number' },
        { epicNumber: 'CHM1@65833', description: 'Prefix with Special Character' },
        { epicNumber: 'CHMCHM5833', description: 'Repeated Character Prefix in EPIC Number' },
        { epicNumber: 'CHMMMM5833', description: 'Repeated Single Character in Prefix' },
        { epicNumber: 'CHM17G5833', description: 'Invalid Letter in Numeric Part' },
        { epicNumber: 'CHM17!5833', description: 'Special Character in Numeric Part' },
        { epicNumber: 'C1M1765833', description: 'Misplaced Numeric in Alpha Prefix' },
        { epicNumber: 'CHM1765A33', description: 'Alpha Character in Numeric Part' },
        { epicNumber: 'CHM1765833\u200B', description: 'EPIC Number with Zero-width Space' },
        { epicNumber: 'CHM1765\u200C833', description: 'EPIC Number with Zero-width Non-Joiner' },
        { epicNumber: 'CHM/1765833', description: 'Slash in EPIC Number' },
        { epicNumber: 'CHM1765/833', description: 'Slash in Numeric Part' },
        { epicNumber: '000CHM1765', description: 'Leading Zeros in EPIC Number' },
        { epicNumber: 'CHM1765000', description: 'Trailing Zeros in EPIC Number' },
        { epicNumber: 'CHM 176 5833', description: 'EPIC Number with Embedded Spaces' },
        { epicNumber: 'CHM176\u200C5833', description: 'EPIC Number with Unicode Characters' },
        { epicNumber: 'CHM1765-833', description: 'Misformatted EPIC Number (Hyphen)' },
        { epicNumber: 'CHM1765_833', description: 'Misformatted EPIC Number (Underscore)' },
        { epicNumber: 'CHM176 5833', description: 'EPIC Number with Mixed Format (Space and Digits)' },
        { epicNumber: 'CHM176-5833', description: 'EPIC Number with Mixed Format (Hyphen)' },
        { epicNumber: undefined, description: 'undefined' },
        { epicNumber: Boolean, description: 'boolean' },
        { epicNumber: true, description: 'boolean true' },
        { epicNumber: false, description: 'boolean false' },
        { epicNumber: 695277717060, description: 'Excessively Large Number' }        
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Voter Card Verification');
    filteredTestCases.forEach((testCase) => {
        invalidEpicNumber.forEach((invalidCase) => {                                                     
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Voter Card Number : ${invalidCase.epicNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, epicNumber: invalidCase.epicNumber }; 

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