/// <reference types="Cypress"/>
import testCases from "../testCases";

//Update Content
describe(`Test Shop And Establishment Data Fetch API of Jharkhand`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidCertificateNumberState = [
    // Invalid Certificate Number
    { certificateNumber: 'SEA2035700911204*', state: 'jh', description: 'Special character at the end' },
    { certificateNumber: 'SEA203@700911204', state: 'jh', description: 'Special character in the middle' },
    { certificateNumber: 'SEA2035 0911204', state: 'jh', description: 'Whitespace in the middle' },
    { certificateNumber: 'SEA2035_0911204', state: 'jh', description: 'Underscore in the middle' },
    { certificateNumber: 'SEA2035-0911204', state: 'jh', description: 'Hyphen in the middle' },
    { certificateNumber: 'SEA2035A0911204', state: 'jh', description: 'Alphabetic character in the middle' },
    { certificateNumber: 'ASEA203570091204', state: 'jh', description: 'Alphabetic character at the start' },
    { certificateNumber: 'SEA2035700911204A', state: 'jh', description: 'Alphabetic character at the end' },
    { certificateNumber: 'SEA2035/0911204', state: 'jh', description: 'Slash in the middle' },
    { certificateNumber: ' SEA2035700911204', state: 'jh', description: 'Leading space' },
    { certificateNumber: 'SEA2035700911204 ', state: 'jh', description: 'Trailing space' },
    { certificateNumber: 'SEA20 35700911204', state: 'jh', description: 'Space in the middle of number' },
    { certificateNumber: 'ABCDEFGHIJKLMNO', state: 'jh', description: 'All alphabetic characters' },
    { certificateNumber: 'S#A2035700911204', state: 'jh', description: 'Special character in the prefix' },
    { certificateNumber: 'SEA20!700911204', state: 'jh', description: 'Special character in the middle' },
    { certificateNumber: '', state: 'jh', description: 'Empty certificate number' },
    { certificateNumber: 'SEA2035700911204@', state: 'jh', description: 'Special character at the end' },
    { certificateNumber: 'SEAO035700911204', state: 'jh', description: 'Letter "O" instead of zero' },
    { certificateNumber: 'SEA2035O0911204', state: 'jh', description: 'Letter "O" instead of zero in the middle' },
    { certificateNumber: undefined, state: 'jh', description: 'Undefined certificate number' },
    { certificateNumber: Boolean, state: 'jh', description: 'Boolean certificate number' },
    { certificateNumber: true, state: 'jh', description: 'bolean true certificate number' },
    { certificateNumber: false, state: 'jh', description: 'bolean false certificate number' },
    { certificateNumber: null, state: 'jh', description: 'Null certificate number' },
    { certificateNumber: 2014001086, state: 'jh', description: 'Number certificate number' }, //It's a valid number


    // Invalid State
    { certificateNumber: 'SEA2035700911204', state: 'j@', description: 'Special character in state code' },
    { certificateNumber: 'SEA2035700911204', state: 'h#', description: 'Special character in state code' },
    { certificateNumber: 'SEA2035700911204', state: 't$', description: 'Special character in state code' },
    { certificateNumber: 'SEA2035700911204', state: 'g%', description: 'Special character in state code' },
    { certificateNumber: 'SEA2035700911204', state: 'h&', description: 'Special character in state code' },
    { certificateNumber: 'SEA2035700911204', state: '1n', description: 'Numeric character in state code' },
    { certificateNumber: 'SEA2035700911204', state: '2p', description: 'Numeric character in state code' },
    { certificateNumber: 'SEA2035700911204', state: '3b', description: 'Numeric character in state code' },
    { certificateNumber: 'SEA2035700911204', state: '4d', description: 'Numeric character in state code' },
    { certificateNumber: 'SEA2035700911204', state: '5k', description: 'Numeric character in state code' },
    { certificateNumber: 'SEA2035700911204', state: 'jh123', description: 'Too long alphanumeric state code' },
    { certificateNumber: 'SEA2035700911204', state: 'c1d2', description: 'Alphanumeric state code' },
    { certificateNumber: 'SEA2035700911204', state: 'p1q2', description: 'Alphanumeric state code' },
    { certificateNumber: 'SEA2035700911204', state: 'm3n4', description: 'Alphanumeric state code' },
    { certificateNumber: 'SEA2035700911204', state: 'jhar', description: 'State code too long' },
    { certificateNumber: 'SEA2035700911204', state: 'rajast', description: 'State code too long' },
    { certificateNumber: 'SEA2035700911204', state: 'a', description: 'Single character state code' },
    { certificateNumber: 'SEA2035700911204', state: 'w b', description: 'Embedded spaces in state code' },
    { certificateNumber: 'SEA2035700911204', state: 'm_h', description: 'Underscore in state code' },
    { certificateNumber: 'SEA2035700911204', state: 't-n', description: 'Hyphen in state code' },
    { certificateNumber: 'SEA2035700911204', state: ' wb', description: 'Leading space in state code' },
    { certificateNumber: 'SEA2035700911204', state: 'mh ', description: 'Trailing space in state code' },
    { certificateNumber: 'SEA2035700911204', state: ' tn ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: 'SEA2035700911204', state: ' gj ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: 'SEA2035700911204', state: '', description: 'Empty state code' },
    { certificateNumber: 'SEA2035700911204', state: undefined, description: 'Undefined state code' },
    { certificateNumber: 'SEA2035700911204', state: Boolean, description: 'Boolean state code' },
    { certificateNumber: 'SEA2035700911204', state: 11, description: 'Numeric state code' }, // Response blank
    { certificateNumber: 'SEA2035700911204', state: null, description: 'Null state code' }, // Response blank
    { certificateNumber: '2014001086', state: true, description: 'bolean true state' },
    { certificateNumber: '2014001086', state: false, description: 'bolean false state' },
    

    // Both Invalid
    { certificateNumber: '', state: '', description: 'Both blank' },
    { certificateNumber: 'SEA2', state: 'x', description: 'Too short certificate number with single-character state code' },
    { certificateNumber: 'SEA', state: 'yz', description: 'Very short certificate number with non-existent state code' },
    { certificateNumber: 'SEA2035700911204567890', state: 'abc', description: 'Excessively long certificate number with long state code' },
    { certificateNumber: 'SEA2035700911204*', state: '@#', description: 'Special characters in certificate number and state code' },
    { certificateNumber: 'SEA2035700911204', state: ' w b', description: 'Leading and embedded whitespace in both fields' },
    { certificateNumber: 'SEA2035700911204 ', state: ' m h ', description: 'Trailing and embedded whitespace in both fields' },
    { certificateNumber: 'SEA2035 0911204', state: ' gj ', description: 'Embedded spaces and special characters in both fields' },
    { certificateNumber: 'SEA203@700911204', state: '@#', description: 'Special characters in both fields' },
    { certificateNumber: 'SP11111N2222222222', state: 'xx', description: 'Repeating digits in certificate number with non-existent state code' },
    { certificateNumber: 'SEA2035700911204!', state: '!!', description: 'Special characters in both fields' },
    { certificateNumber: 'SEA2035700911204', state: '!', description: 'Special character in state code' },
    { certificateNumber: ' SEA2035700911204', state: ' x! ', description: 'Whitespace and special characters in both fields' },
    { certificateNumber: 'SEA2035 0911204', state: ' !! ', description: 'Embedded spaces and special characters in both fields' },
    { certificateNumber: undefined, state: undefined, description: 'Undefined certificate number and state code' },
    { certificateNumber: Boolean, state: Boolean, description: 'Boolean certificate number and state code' },
    { certificateNumber: null, state: null, description: 'Null certificate number and state code' }, // Response blank
    { certificateNumber: 1234567890123456, state: 11, description: 'Numeric certificate number and state code' }, // Response blank    // // { certificateNumber: null, state: null, description: 'Undefined certificate number and state code' },
    { certificateNumber: true, state: true, description: 'Boolean true certificate number and state code' },
    { certificateNumber: false, state: false, description: 'Boolean false certificate number and state code' },
    { certificateNumber: true, state: false, description: 'Boolean true certificate number and state code false' },
    { certificateNumber: false, state: true, description: 'Boolean false certificate number and state code' }
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'        
    };

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Shop And Establishment Data Fetch of Jharkhand');
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