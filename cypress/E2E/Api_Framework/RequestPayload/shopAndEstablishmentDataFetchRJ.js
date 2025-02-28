/// <reference types="Cypress"/>
import testCases from "../testCases";

//Update Content
describe(`Test Shop And Establishment Data Fetch API of Rajasthan`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidCertificateNumberState = [
    // Invalid Certificate Number
    { certificateNumber: 'B26/2016@/0208470', state: 'rJ', description: 'Special character in the middle' },
    { certificateNumber: 'B26/2016/020847 0', state: 'rJ', description: 'Whitespace in the middle' },
    { certificateNumber: 'B26_2016/0208470', state: 'rJ', description: 'Underscore instead of slash' },
    { certificateNumber: 'B26-2016/0208470', state: 'rJ', description: 'Hyphen instead of slash' },
    { certificateNumber: 'B26/2016/02084A0', state: 'rJ', description: 'Alphabetic character in the identifier part' },
    { certificateNumber: '26B/2016/0208470', state: 'rJ', description: 'Prefix with alphabetic character not at the start' },
    { certificateNumber: '/2016/0208470', state: 'rJ', description: 'Missing prefix' },
    { certificateNumber: 'B26//2016/0208470', state: 'rJ', description: 'Extra slash in the prefix' },
    { certificateNumber: 'B26 2016/0208470', state: 'rJ', description: 'Missing slash between prefix and year' },
    { certificateNumber: 'B26/201/0208470', state: 'rJ', description: 'Year part too short' },
    { certificateNumber: 'B26/20160/0208470', state: 'rJ', description: 'Year part too long' },
    { certificateNumber: 'B26/2016/', state: 'rJ', description: 'Missing identifier part' },
    { certificateNumber: 'B26/2016/020847A0', state: 'rJ', description: 'Alphabetic character in the identifier' },
    { certificateNumber: 'B26//0208470', state: 'rJ', description: 'Missing year part' },
    { certificateNumber: 'B26/2016/020847 0', state: 'rJ', description: 'Whitespace in identifier part' },
    { certificateNumber: '2016/0208470', state: 'rJ', description: 'Missing prefix' },
    { certificateNumber: 'B26/2016//0208470', state: 'rJ', description: 'Double slashes in the format' },
    { certificateNumber: 'B26/201/0208470', state: 'rJ', description: 'Year part too short' },
    { certificateNumber: 'B26 2016/0208470', state: 'rJ', description: 'Whitespace instead of slash' },
    { certificateNumber: 'B26/2016/ ', state: 'rJ', description: 'Trailing whitespace after identifier' },
    { certificateNumber: '', state: 'rJ', description: 'Empty certificate number' },
    { certificateNumber: 'B26/2016/0208470@', state: 'rJ', description: 'Special character at the end' },
    { certificateNumber: 'B26/2O16/0208470', state: 'rJ', description: 'Letter "O" instead of zero in the year part' },
    { certificateNumber: 'B26/2016/02084O0', state: 'rJ', description: 'Letter "O" instead of zero in the identifier' },
    { certificateNumber: undefined, state: 'rJ', description: 'Undefined certificate number' },
    { certificateNumber: Boolean, state: 'rJ', description: 'Boolean certificate number' },
    { certificateNumber: true, state: 'DL', description: 'bolean true certificate number' },
    { certificateNumber: false, state: 'DL', description: 'bolean false certificate number' },
    { certificateNumber: null, state: 'rJ', description: 'Null certificate number' },

    
    // Invalid State
    { certificateNumber: 'B26/2016/0208470', state: 'R@', description: 'Special character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'm#', description: 'Special character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'p$', description: 'Special character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'x%', description: 'Special character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 't&', description: 'Special character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: '1r', description: 'Numeric character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 's2', description: 'Numeric character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: '3b', description: 'Numeric character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: '4k', description: 'Numeric character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: '5m', description: 'Numeric character in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'rJ12', description: 'Too long alphanumeric state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'a1b2', description: 'Alphanumeric state code too long' },
    { certificateNumber: 'B26/2016/0208470', state: 'x5y7', description: 'Alphanumeric state code too long' },
    { certificateNumber: 'B26/2016/0208470', state: 'DELH', description: 'State code too long' },
    { certificateNumber: 'B26/2016/0208470', state: 'RAJAST', description: 'State code too long' },
    { certificateNumber: 'B26/2016/0208470', state: 'a', description: 'Single character state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'W b', description: 'Embedded spaces in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'M_h', description: 'Underscore in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 't-n', description: 'Hyphen in state code' },
    { certificateNumber: 'B26/2016/0208470', state: ' wb', description: 'Leading space in state code' },
    { certificateNumber: 'B26/2016/0208470', state: 'mh ', description: 'Trailing space in state code' },
    { certificateNumber: 'B26/2016/0208470', state: ' tn ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: 'B26/2016/0208470', state: ' gj ', description: 'Leading and trailing spaces in state code' },
    { certificateNumber: 'B26/2016/0208470', state: '', description: 'Empty state code' },
    { certificateNumber: 'B26/2016/0208470', state: undefined, description: 'Undefined state code' },
    { certificateNumber: 'SEA2035700911204', state: Boolean, description: 'Boolean state code' },
    { certificateNumber: 'SEA2035700911204', state: 11, description: 'Numeric state code' }, // Response blank
    { certificateNumber: 'SEA2035700911204', state: null, description: 'Null state code' }, // Response blank
    { certificateNumber: '2014001086', state: true, description: 'bolean true state' },
    { certificateNumber: '2014001086', state: false, description: 'bolean false state' },
    

    // Both Invalid
    { certificateNumber: '', state: '', description: 'Both blank' },
    { certificateNumber: 'B26', state: 'X', description: 'Too short certificate number with single-character state code' },
    { certificateNumber: 'B2', state: 'YZ', description: 'Very short certificate number with non-existent state code' },
    { certificateNumber: 'B26/2016/0208470/999999999', state: 'ABC', description: 'Excessively long certificate number with long state code' },
    { certificateNumber: 'B26/2016/0208470*', state: '@#', description: 'Special characters in certificate number and state code' },
    { certificateNumber: 'B26/2016/0208470', state: ' w b', description: 'Leading and embedded whitespace in both fields' },
    { certificateNumber: 'B26/2016/0208470 ', state: ' m h ', description: 'Trailing and embedded whitespace in both fields' },
    { certificateNumber: 'B26 2016/0208470', state: ' g j ', description: 'Embedded spaces in both fields' },
    { certificateNumber: 'B26/2016@/0208470', state: '@#', description: 'Special characters in both fields' },
    { certificateNumber: 'SP1/111/2222222222', state: 'xx', description: 'Repeating digits in certificate number with non-existent state code' },
    { certificateNumber: 'B26/2016/0208470123', state: '!!', description: 'Too long certificate number with special character in state code' },
    { certificateNumber: 'B26/2016/0208470123', state: '!', description: 'Too long certificate number with single special character state code' },
    { certificateNumber: ' B26/2016/0208470', state: ' x! ', description: 'Whitespace and special characters in both fields' },
    { certificateNumber: 'B26/2016/02084 70', state: ' !! ', description: 'Embedded spaces and special characters in both fields' },
    { certificateNumber: undefined, state: undefined, description: 'Undefined certificate number and state code' },
    { certificateNumber: Boolean, state: Boolean, description: 'Boolean certificate number and state code' },
    { certificateNumber: null, state: null, description: 'Null certificate number and state code' }, // Response blank
    { certificateNumber: 1234567890123456, state: 11, description: 'Numeric certificate number and state code' }, // Response blank    // // { certificateNumber: null, state: null, description: 'Undefined certificate number and state code' },
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

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Shop And Establishment Data Fetch of Rajasthan');
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