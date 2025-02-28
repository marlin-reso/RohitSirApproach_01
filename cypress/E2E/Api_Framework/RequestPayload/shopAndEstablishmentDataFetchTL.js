/// <reference types="Cypress"/>
import testCases from "../testCases";

//Update Content
describe(`Test Shop And Establishment Data Fetch API of Telangana`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidCertificateNumberState = [
    // Invalid Certificate Number
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016*', state: 'TL', description: 'Special character at the end' },
    { certificateNumber: 'SER/HYD/ALO/03@12599/2016', state: 'TL', description: 'Special character in the middle' },
    { certificateNumber: 'SER/HYD/ALO 03/12599/2016', state: 'TL', description: 'Whitespace in the middle' },
    { certificateNumber: 'SER/HYD/ALO_03/12599/2016', state: 'TL', description: 'Underscore in the middle' },
    { certificateNumber: 'SER/HYD/ALO-03/12599/2016', state: 'TL', description: 'Hyphen in the middle' },
    { certificateNumber: 'SER/HYD/ALO/03/12A99/2016', state: 'TL', description: 'Alphabetic character in the middle' },
    { certificateNumber: 'AER/HYD/ALO/03/12599/2016', state: 'TL', description: 'Alphabetic character at the start' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016A', state: 'TL', description: 'Alphabetic character at the end' },
    { certificateNumber: 'SER/HYD/ALO/03/1259/2016', state: 'TL', description: 'Missing digit' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/201', state: 'TL', description: 'Missing year digit' },
    { certificateNumber: 'SER/HYD/ALO//03/12599/2016', state: 'TL', description: 'Missing segment' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/20/16', state: 'TL', description: 'Extra slash in the middle' },
    { certificateNumber: '  SER/HYD/ALO/03/12599/2016', state: 'TL', description: 'Leading space' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016 ', state: 'TL', description: 'Trailing space' },
    { certificateNumber: 'SER/HYD/ALO/03/12599 2016', state: 'TL', description: 'Space in the middle of number' },
    { certificateNumber: 'SERHYDALO03125992016', state: 'TL', description: 'All characters without slashes' },
    { certificateNumber: 'SER/HYD/ALO/03/12599#2016', state: 'TL', description: 'Special character in the year' },
    { certificateNumber: '', state: 'TL', description: 'Empty certificate number' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/20160', state: 'TL', description: 'Extra digit at the end' },
    { certificateNumber: 'SER/HYD/ALO/03/12/2016', state: 'TL', description: 'Too short, missing part of the number' },
    { certificateNumber: 'SER/HYD/ALO/03//12599/2016', state: 'TL', description: 'Double slash in the middle' },
    { certificateNumber: undefined, state: 'TL', description: 'Undefined certificate number' },
    { certificateNumber: Boolean, state: 'TL', description: 'Boolean certificate number' },
    { certificateNumber: true, state: 'TL', description: 'bolean true certificate number' },
    { certificateNumber: false, state: 'TL', description: 'bolean false certificate number' },
    { certificateNumber: null, state: 'TL', description: 'Null certificate number' }, 
    { certificateNumber: 2014001086, state: 'TL', description: 'Number certificate number' }, //It's a valid number


    // Invalid State
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'T@', description: 'Special character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'M#', description: 'Special character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'T$', description: 'Special character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'G%', description: 'Special character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'H&', description: 'Special character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: '1N', description: 'Numeric character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: '2P', description: 'Numeric character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: '3B', description: 'Numeric character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: '4D', description: 'Numeric character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: '5K', description: 'Numeric character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'TL123', description: 'Too long alphanumeric state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'C1D2', description: 'Alphanumeric state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'P1Q2', description: 'Alphanumeric state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'M3N4', description: 'Alphanumeric state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'TELNG', description: 'State code too long' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'A', description: 'Single character state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'W B', description: 'Embedded spaces in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'M_H', description: 'Underscore in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'T-N', description: 'Hyphen in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: ' WB', description: 'Leading space in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: 'MH ', description: 'Trailing space in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: ' TN ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: ' GJ ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: '', description: 'Empty state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: undefined, description: 'Undefined state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: Boolean, description: 'Boolean state code' },        
    { certificateNumber: '2014001086', state: 11, description: 'Numeric state code' }, // Response blank
    { certificateNumber: '2014001086', state: null, description: 'Null state code' }, // Response blank
    { certificateNumber: '2014001086', state: true, description: 'bolean true state' },
    { certificateNumber: '2014001086', state: false, description: 'bolean false state' },



    // Both Invalid
    { certificateNumber: '', state: '', description: 'Both blank' },
    { certificateNumber: 'SER/', state: 'X', description: 'Too short certificate number with single-character state code' },
    { certificateNumber: 'SER/HY', state: 'YZ', description: 'Very short certificate number with non-existent state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/201678901234567890', state: 'ABC', description: 'Excessively long certificate number with long state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016*', state: '@#', description: 'Special characters in certificate number and state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016', state: ' W B', description: 'Leading and embedded whitespace in both fields' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016 ', state: ' M H ', description: 'Trailing and embedded whitespace in both fields' },
    { certificateNumber: 'SER/HYD/ALO 03/12599/2016', state: ' GJ ', description: 'Embedded spaces and special characters in both fields' },
    { certificateNumber: 'SER/HYD/ALO/03@12599/2016', state: '@#', description: 'Special characters in both fields' },
    { certificateNumber: 'SER11111N2222222222', state: 'XX', description: 'Repeating digits in certificate number with non-existent state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016123', state: '!!', description: 'Too long certificate number with special character in state code' },
    { certificateNumber: 'SER/HYD/ALO/03/12599/2016123', state: '!', description: 'Too long certificate number with special character in state code' },
    { certificateNumber: '  SER/HYD/ALO/03/12599/2016', state: ' X! ', description: 'Whitespace and special characters in both fields' },
    { certificateNumber: 'SER/HYD/ALO 03/12599/2016', state: ' !! ', description: 'Embedded spaces and special characters in both fields' },
    { certificateNumber: undefined, state: undefined, description: 'Undefined certificate number and state code' },
    { certificateNumber: Boolean, state: Boolean, description: 'Boolean certificate number and state code' },
    { certificateNumber: null, state: null, description: 'Undefined certificate number and state code' },
    { certificateNumber: 1234567890, state: 11, description: 'Num certificate number and state code' },
    { certificateNumber: true, state: true, description: 'Boolean true certificate number and state code' },
    { certificateNumber: false, state: false, description: 'Boolean false certificate number and state code' },
    { certificateNumber: true, state: false, description: 'Boolean true certificate number and state code false' },
    { certificateNumber: false, state: true, description: 'Boolean false certificate number and state code true' },
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'        
    };

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Shop And Establishment Data Fetch of Telangana');
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