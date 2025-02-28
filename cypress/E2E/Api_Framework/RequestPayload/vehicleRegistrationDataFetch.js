/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Vehicle Registration Data Fetch API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const vehicleRegistrationData = [
        { rc_regn_no: 'HR12X0086', description: 'Not Exist' },
        { rc_regn_no: '1234AB5678', description: 'Numeric and alphabetic mix without separator' },
        { rc_regn_no: 'HR12X_0086', description: 'Underscore in rc_regn_no' },
        { rc_regn_no: 'HR 12 X 0086', description: 'Spaces between segments' },
        { rc_regn_no: 'HR12X008@', description: 'Special character at the end' },
        { rc_regn_no: 'HR12X', description: 'Incomplete rc_regn_no, missing digits' },
        { rc_regn_no: 'HR12X008600', description: 'Extra digits at the end' },
        { rc_regn_no: 'HR12X0O86', description: 'Letter O instead of digit 0' },
        { rc_regn_no: 'HR12X008G', description: 'Alphabetic character in numeric part' },
        { rc_regn_no: 'HR12X008*', description: 'Asterisk in rc_regn_no' },
        { rc_regn_no: 'HR-12X-0086', description: 'Hyphens between segments' },
        { rc_regn_no: 'HR12X0086!', description: 'Exclamation mark at the end' },
        { rc_regn_no: 'HR12X/0086', description: 'Slash in rc_regn_no' },
        { rc_regn_no: 'HR12X0086#', description: 'Hash sign at the end' },
        { rc_regn_no: 'HR12 X0086', description: 'Space in middle segment' },
        { rc_regn_no: 'HR12-X0086', description: 'Hyphen between segments' },
        { rc_regn_no: 'HR12X0086$', description: 'Dollar sign at the end' },
        { rc_regn_no: 'HR12X0086%', description: 'Percent sign at the end' },
        { rc_regn_no: 'HR12X0086^', description: 'Caret sign at the end' },
        { rc_regn_no: 'HR12X0086&', description: 'Ampersand at the end' },
        { rc_regn_no: 'HR12X0086*', description: 'Asterisk at the end' },
        { rc_regn_no: 'HR12X0086(', description: 'Opening parenthesis at the end' },
        { rc_regn_no: 'HR12X0086)', description: 'Closing parenthesis at the end' },
        { rc_regn_no: 'HR12X0086+', description: 'Plus sign at the end' },
        { rc_regn_no: 'HR12X0086=', description: 'Equal sign at the end' },
        { rc_regn_no: 'HR12X0086~', description: 'Tilde at the end' },
        { rc_regn_no: 'HR12X0086`', description: 'Backtick at the end' },
        { rc_regn_no: 'HR12X0086[', description: 'Opening square bracket at the end' },
        { rc_regn_no: 'HR12X0086]', description: 'Closing square bracket at the end' },
        { rc_regn_no: 'HR12X0086{', description: 'Opening curly brace at the end' },
        { rc_regn_no: 'HR12X0086}', description: 'Closing curly brace at the end' },
        { rc_regn_no: 'HR12X0086|', description: 'Vertical bar at the end' },
        { rc_regn_no: 'HR12X0086\\', description: 'Backslash at the end' },
        { rc_regn_no: 'HR12X0086:', description: 'Colon at the end' },
        { rc_regn_no: 'HR12X0086;', description: 'Semicolon at the end' },
        { rc_regn_no: 'HR12X0086\'', description: 'Single quote at the end' },
        { rc_regn_no: 'HR12X0086"', description: 'Double quote at the end' },
        { rc_regn_no: 'HR12X0086<', description: 'Less-than sign at the end' },
        { rc_regn_no: 'HR12X0086>', description: 'Greater-than sign at the end' },
        { rc_regn_no: 'HR12X0086?', description: 'Question mark at the end' },
        { rc_regn_no: 'HR12X0086@', description: 'At sign at the end' },
        { rc_regn_no: 'HR12X0086 ', description: 'Trailing space' },
        { rc_regn_no: ' HR12X0086', description: 'Leading space' },
        { rc_regn_no: 'HR12X0086..', description: 'Double periods at the end' },
        { rc_regn_no: 'HR12X0086,,', description: 'Double commas at the end' },
        { rc_regn_no: 'HR12X0086!!', description: 'Double exclamation marks at the end' },
        { rc_regn_no: null, description: 'Null value for rc_regn_no' },
        { rc_regn_no: '', description: 'Empty string for rc_regn_no' },
        { rc_regn_no: undefined, description: 'Undefined rc_regn_no' },
        { rc_regn_no: true, description: 'Boolean true value for rc_regn_no' },
        { rc_regn_no: false, description: 'Boolean false value for rc_regn_no' },
        { rc_regn_no: Boolean, description: 'Boolean data type for rc_regn_no' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Vehicle Registration Data Fetch');
    filteredTestCases.forEach((testCase) => {
        vehicleRegistrationData.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Vehicle Registration Number: ${invalidCase.rc_regn_no}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, rc_regn_no: invalidCase.rc_regn_no }; 

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