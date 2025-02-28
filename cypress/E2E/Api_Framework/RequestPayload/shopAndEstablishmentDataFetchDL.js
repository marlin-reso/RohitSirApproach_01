/// <reference types="Cypress"/>
import testCases from "../testCases";

//Update Content
describe(`Test Shop And Establishment Data Fetch API of Delhi`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidCertificateNumberState = [
    // Invalid Certificate Number
    { certificateNumber: '2014001086*', state: 'DL', description: 'Special character at the end' },
    { certificateNumber: '2014@001086', state: 'DL', description: 'Special character in the middle' },
    { certificateNumber: '201400 1086', state: 'DL', description: 'Whitespace in the middle' },
    { certificateNumber: '201400_1086', state: 'DL', description: 'Underscore in the middle' },
    { certificateNumber: '201400-1086', state: 'DL', description: 'Hyphen in the middle' },
    { certificateNumber: '2014001A86', state: 'DL', description: 'Alphabetic character in the middle' },
    { certificateNumber: 'A014001086', state: 'DL', description: 'Alphabetic character at the start' },
    { certificateNumber: '2014001086A', state: 'DL', description: 'Alphabetic character at the end' },
    { certificateNumber: '20140/1086', state: 'DL', description: 'Slash in the middle' },
    { certificateNumber: ' 2014001086', state: 'DL', description: 'Leading space' },
    { certificateNumber: '2014001086 ', state: 'DL', description: 'Trailing space' },
    { certificateNumber: '2014 001086', state: 'DL', description: 'Space in the middle of number' },
    { certificateNumber: 'ABCDEFGHIJ', state: 'DL', description: 'All alphabetic characters' },
    { certificateNumber: '20#4001086', state: 'DL', description: 'Special character in the prefix' },
    { certificateNumber: '2014!01086', state: 'DL', description: 'Special character in the middle' },
    { certificateNumber: '', state: 'DL', description: 'Empty certificate number' },
    { certificateNumber: '2014001086@', state: 'DL', description: 'Special character at the end' },
    { certificateNumber: '20O4001086', state: 'DL', description: 'Letter "O" instead of zero' },
    { certificateNumber: '20140010O6', state: 'DL', description: 'Letter "O" instead of zero in the middle' },
    { certificateNumber: undefined, state: 'DL', description: 'Undefined certificate number' },
    { certificateNumber: Boolean, state: 'DL', description: 'Boolean certificate number' },
    { certificateNumber: null, state: 'DL', description: 'Null certificate number' }, 
    { certificateNumber: true, state: 'DL', description: 'bolean true certificate number' },
    { certificateNumber: false, state: 'DL', description: 'bolean false certificate number' },


    // Invalid State
    { certificateNumber: '2014001086', state: 'D@', description: 'Special character in state code' },
    { certificateNumber: '2014001086', state: 'M#', description: 'Special character in state code' },
    { certificateNumber: '2014001086', state: 'T$', description: 'Special character in state code' },
    { certificateNumber: '2014001086', state: 'G%', description: 'Special character in state code' },
    { certificateNumber: '2014001086', state: 'H&', description: 'Special character in state code' },
    { certificateNumber: '2014001086', state: '1N', description: 'Numeric character in state code' },
    { certificateNumber: '2014001086', state: '2P', description: 'Numeric character in state code' },
    { certificateNumber: '2014001086', state: '3B', description: 'Numeric character in state code' },
    { certificateNumber: '2014001086', state: '4D', description: 'Numeric character in state code' },
    { certificateNumber: '2014001086', state: '5K', description: 'Numeric character in state code' },
    { certificateNumber: '2014001086', state: 'DL123', description: 'Too long alphanumeric state code' },
    { certificateNumber: '2014001086', state: 'C1D2', description: 'Alphanumeric state code' },
    { certificateNumber: '2014001086', state: 'P1Q2', description: 'Alphanumeric state code' },
    { certificateNumber: '2014001086', state: 'M3N4', description: 'Alphanumeric state code' },
    { certificateNumber: '2014001086', state: 'DELH', description: 'State code too long' },
    { certificateNumber: '2014001086', state: 'RAJAST', description: 'State code too long' },
    { certificateNumber: '2014001086', state: 'A', description: 'Single character state code' },
    { certificateNumber: '2014001086', state: 'W B', description: 'Embedded spaces in state code' },
    { certificateNumber: '2014001086', state: 'M_H', description: 'Underscore in state code' },
    { certificateNumber: '2014001086', state: 'T-N', description: 'Hyphen in state code' },
    { certificateNumber: '2014001086', state: ' WB', description: 'Leading space in state code' },
    { certificateNumber: '2014001086', state: 'MH ', description: 'Trailing space in state code' },
    { certificateNumber: '2014001086', state: ' TN ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: '2014001086', state: ' GJ ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: '2014001086', state: '', description: 'Empty state code' },
    { certificateNumber: '2014001086', state: undefined, description: 'Undefined state code' },
    { certificateNumber: '2014001086', state: Boolean, description: 'Boolean state code' },
    { certificateNumber: '2014001086', state: 11, description: 'Numeric state code' }, // Response blank
    { certificateNumber: '2014001086', state: null, description: 'Null state code' }, // Response blank
    { certificateNumber: '2014001086', state: true, description: 'bolean true state' },
    { certificateNumber: '2014001086', state: false, description: 'bolean false state' },


    // Both Invalid
    { certificateNumber: '', state: '', description: 'Both blank' },
    { certificateNumber: '2014', state: 'X', description: 'Too short certificate number with single-character state code' },
    { certificateNumber: '201', state: 'YZ', description: 'Very short certificate number with non-existent state code' },
    { certificateNumber: '201400108678901234567890', state: 'ABC', description: 'Excessively long certificate number with long state code' },
    { certificateNumber: '2014001086*', state: '@#', description: 'Special characters in certificate number and state code' },
    { certificateNumber: '2014001086', state: ' W B', description: 'Leading and embedded whitespace in both fields' },
    { certificateNumber: '2014001086 ', state: ' M H ', description: 'Trailing and embedded whitespace in both fields' },
    { certificateNumber: '2014 001086', state: ' GJ ', description: 'Embedded spaces and special characters in both fields' },
    { certificateNumber: '2014@001086', state: '@#', description: 'Special characters in both fields' },
    { certificateNumber: 'SP11111N2222222222', state: 'XX', description: 'Repeating digits in certificate number with non-existent state code' },
    { certificateNumber: '2014001086123', state: '!!', description: 'Too long certificate number with special character in state code' },
    { certificateNumber: '2014001086123', state: '!', description: 'Too long certificate number with special character in state code' },
    { certificateNumber: ' 2014001086', state: ' X! ', description: 'Whitespace and special characters in both fields' },
    { certificateNumber: '201400 1086', state: ' !! ', description: 'Embedded spaces and special characters in both fields' },
    { certificateNumber: undefined, state: undefined, description: 'Undefined certificate number and state code' },
    { certificateNumber: Boolean, state: Boolean, description: 'Boolean certificate number and state code' },
    { certificateNumber: true, state: true, description: 'Boolean true certificate number and state code' },
    { certificateNumber: false, state: false, description: 'Boolean false certificate number and state code' },
    { certificateNumber: true, state: false, description: 'Boolean true certificate number and state code false' },
    { certificateNumber: false, state: true, description: 'Boolean false certificate number and state code true' },
    { certificateNumber: null, state: null, description: 'Undefined certificate number and state code' },
    { certificateNumber: 1234567890, state: 11, description: 'Num certificate number and state code' },
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'        
    };

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Shop And Establishment Data Fetch of Delhi');
    filteredTestCases.forEach((testCase) => {
        invalidCertificateNumberState.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, Certificate Number : ${invalidCase.certificateNumber}  and State : ${invalidCase.state}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, certificateNumber: invalidCase.certificateNumber, state: invalidCase.state}; 

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