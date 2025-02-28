/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Udyog Aadhaar Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidUdyogAadhaar = [
        { udyogAadhaarNumber: 'BR22D000814', description: 'Too short, missing last digit' },
        { udyogAadhaarNumber: 'BR22D00081450', description: 'Too long, extra digit' },
        { udyogAadhaarNumber: 'BR22D0008!45', description: 'Special character in the middle' },
        { udyogAadhaarNumber: 'BR22 D0008145', description: 'Embedded space in number' },
        { udyogAadhaarNumber: 'BR22D0008 145', description: 'Space separating digits' },
        { udyogAadhaarNumber: 'BR22D00 08145', description: 'Space in middle' },
        { udyogAadhaarNumber: 'BR22D0008#45', description: 'Special character in number' },
        { udyogAadhaarNumber: 'BR22D000814-', description: 'Trailing hyphen' },
        { udyogAadhaarNumber: 'BR22D0008 145', description: 'Embedded space separating digits' },
        { udyogAadhaarNumber: 'BR22D0 008145', description: 'Space between D and numbers' },
        { udyogAadhaarNumber: 'BR22D00081@5', description: 'Special character in penultimate position' },
        { udyogAadhaarNumber: 'BR22D000814$', description: 'Special character at the end' },
        { udyogAadhaarNumber: 'BR22D0008/145', description: 'Slash in number' },
        { udyogAadhaarNumber: 'BR22D000814\\', description: 'Backslash in number' },
        { udyogAadhaarNumber: 'BR22D0008+145', description: 'Plus sign in number' },
        { udyogAadhaarNumber: 'BR22D000814%', description: 'Percent sign at the end' },
        { udyogAadhaarNumber: 'BR22D00081^45', description: 'Caret in number' },
        { udyogAadhaarNumber: 'BR22D000814&', description: 'Ampersand at the end' },
        { udyogAadhaarNumber: 'BR22D0008*145', description: 'Asterisk in number' },
        { udyogAadhaarNumber: 'BR22D000814(', description: 'Opening parenthesis at the end' },
        { udyogAadhaarNumber: 'BR22D000814)', description: 'Closing parenthesis at the end' },
        { udyogAadhaarNumber: 'BR22D0008=145', description: 'Equal sign in number' },
        { udyogAadhaarNumber: 'BR22D000814`', description: 'Backtick at the end' },
        { udyogAadhaarNumber: 'BR22D000814~', description: 'Tilde at the end' },
        { udyogAadhaarNumber: 'BR22D000814|', description: 'Pipe character at the end' },
        { udyogAadhaarNumber: 'BR22D0008_145', description: 'Underscore in number' },
        { udyogAadhaarNumber: 'BR22D000814.', description: 'Period at the end' },
        { udyogAadhaarNumber: 'BR22D000814,', description: 'Comma at the end' },
        { udyogAadhaarNumber: 'BR22D000814?', description: 'Question mark at the end' },
        { udyogAadhaarNumber: 'BR22D000814\'', description: 'Single quote at the end' },
        { udyogAadhaarNumber: 'BR22D000814"', description: 'Double quote at the end' },
        { udyogAadhaarNumber: 'BR22D000814<', description: 'Less-than sign at the end' },
        { udyogAadhaarNumber: 'BR22D000814>', description: 'Greater-than sign at the end' },
        { udyogAadhaarNumber: 'BR22D000814:', description: 'Colon at the end' },
        { udyogAadhaarNumber: 'BR22D000814;', description: 'Semicolon at the end' },
        { udyogAadhaarNumber: 'BR22D000814[', description: 'Opening square bracket at the end' },
        { udyogAadhaarNumber: 'BR22D000814]', description: 'Closing square bracket at the end' },
        { udyogAadhaarNumber: 'BR22D000814{', description: 'Opening curly brace at the end' },
        { udyogAadhaarNumber: 'BR22D000814}', description: 'Closing curly brace at the end' },
        { udyogAadhaarNumber: 'BR22D000814=', description: 'Equal sign at the end' },
        { udyogAadhaarNumber: 'BR22D000814&', description: 'Ampersand at the end' },
        { udyogAadhaarNumber: 'BR22D000814*', description: 'Asterisk at the end' },
        { udyogAadhaarNumber: 'BR22D000814+', description: 'Plus sign at the end' },
        { udyogAadhaarNumber: 'BR22D000814-', description: 'Hyphen at the end' },
        { udyogAadhaarNumber: 'BR22D000814_', description: 'Underscore at the end' },
        { udyogAadhaarNumber: 'BR22D000814!', description: 'Exclamation mark at the end' },
        { udyogAadhaarNumber: 'BR22D0008#145', description: 'Special character in the middle' },
        { udyogAadhaarNumber: 'BR22D000814$', description: 'Special character at the end' },
        { udyogAadhaarNumber: 'BR22D0008%145', description: 'Special character in the middle' },
        { udyogAadhaarNumber: 'BR22D000814', description: 'Missing last digit' },
        { udyogAadhaarNumber: 'BR22D00081450', description: 'Extra digit at the end' },
        { udyogAadhaarNumber: 'BR22D000814?', description: 'Question mark at the end' },
        { udyogAadhaarNumber: 'BR22D000814|', description: 'Vertical bar at the end' },
        { udyogAadhaarNumber: 'BR22D0008/145', description: 'Slash in the middle' },
        { udyogAadhaarNumber: 'BR22D000814/', description: 'Slash at the end' },
        { udyogAadhaarNumber: 'BR22D000814\\', description: 'Backslash at the end' },
        { udyogAadhaarNumber: 'BR22D0008140', description: 'Extra zero at the end' },
        { udyogAadhaarNumber: 'BR22D00081 45', description: 'Space separating digits' },
        { udyogAadhaarNumber: 'BR22D000814_', description: 'Underscore at the end' },
        { udyogAadhaarNumber: 'BR22D0008 145', description: 'Space in the middle' },
        { udyogAadhaarNumber: 'BR22D000814.', description: 'Period at the end' },
        { udyogAadhaarNumber: 'BR22D00081@5', description: 'Special character in the middle' },
        { udyogAadhaarNumber: 'BR22D0008&145', description: 'Ampersand in the middle' },
        { udyogAadhaarNumber: 'BR22D000814*', description: 'Asterisk at the end' },
        { udyogAadhaarNumber: 'BR22D000814^', description: 'Caret at the end' },
        { udyogAadhaarNumber: 1234567890123, description: 'Number instead of string' },
        { udyogAadhaarNumber: '', description: 'blank string' },
        { udyogAadhaarNumber: null, description: 'Null value' },
        { udyogAadhaarNumber: undefined, description: 'Undefined value' },
        { udyogAadhaarNumber: true, description: 'Boolean true' },
        { udyogAadhaarNumber: false, description: 'Boolean false' },
        { udyogAadhaarNumber: Boolean, description: 'Boolean' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Udyog Aadhaar Verification');
    filteredTestCases.forEach((testCase) => {
        invalidUdyogAadhaar.forEach((invalidCase) => {          
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Udyog Aadhaar Number : ${invalidCase.udyogAadhaarNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;         
                const requestData = { ...payLoad.requestData, udyogAadhaarNumber: invalidCase.udyogAadhaarNumber }; 

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