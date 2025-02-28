/// <reference types="Cypress"/>
import testCases from "../testCases";

//Update Content
describe(`Test Shop And Establishment Data Fetch API of West Bengal`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidCertificateNumberState = [
        //Invalid Certificate Number
        { certificateNumber: 'SP03', state: 'WB', description: 'Too short (only 4 characters)' },
        { certificateNumber: 'SP03071N', state: 'WB', description: 'Too short (missing year and number section)' },
        { certificateNumber: 'SP03071N20200000012345', state: 'WB', description: 'Too long (extra characters beyond the valid length)' },
        { certificateNumber: 'SP03071N202000000*', state: 'WB', description: 'Special character at the end' },
        { certificateNumber: 'SP03@71N2020000001', state: 'WB', description: 'Special character in the middle' },
        { certificateNumber: 'SP03071N2020 00001', state: 'WB', description: 'Whitespace in the middle' },
        { certificateNumber: 'SP03071N2020_000001', state: 'WB', description: 'Underscore in the middle' },
        { certificateNumber: 'SP03071N2020-000001', state: 'WB', description: 'Hyphen in the middle' },
        { certificateNumber: 'SP03071N2020A00001', state: 'WB', description: 'Alphabetic character in numeric section' },
        { certificateNumber: 'SP03A71N2020000001', state: 'WB', description: 'Alphabetic character in code section' },
        { certificateNumber: 'SP03071N202000000A', state: 'WB', description: 'Alphabetic character at the end' },
        { certificateNumber: 'SP03071N20/0000001', state: 'WB', description: 'Slash in the middle' },
        { certificateNumber: ' SP03071N2020000001', state: 'WB', description: 'Leading space' },
        { certificateNumber: 'SP03071N2020000001 ', state: 'WB', description: 'Trailing space' },
        { certificateNumber: 'SP03 071N2020000001', state: 'WB', description: 'Space in the middle of code section' },
        { certificateNumber: 'SP03071N2020 000001', state: 'WB', description: 'Space in the middle of number section' },
        { certificateNumber: 'SP03071', state: 'WB', description: 'Missing year and number section' },
        { certificateNumber: 'SP03071N2020', state: 'WB', description: 'Missing number section' },
        { certificateNumber: '1234567890123456', state: 'WB', description: 'All numeric characters without prefix' },
        { certificateNumber: 'ABCDEFGHIJKLMNOP', state: 'WB', description: 'All alphabetic characters' },
        { certificateNumber: 'SP03071N1234567890', state: 'WB', description: 'Sequential digits in the numeric section' },
        { certificateNumber: 'SP03071N1111111111', state: 'WB', description: 'All same digits in the numeric section' },
        { certificateNumber: 'SP03071N202000000112', state: 'WB', description: 'Extra digits beyond valid length' },
        { certificateNumber: 'SP0#071N2020000001', state: 'WB', description: 'Special character in the prefix' },
        { certificateNumber: 'SP03!71N2020000001', state: 'WB', description: 'Special character in the middle of prefix' },
        { certificateNumber: 'SP030*1N2020000001', state: 'WB', description: 'Special character in the prefix code' },
        { certificateNumber: 'SP03071N2020000000', state: 'WB', description: 'Trailing zero in the numeric section' },
        { certificateNumber: '', state: 'WB', description: 'Empty certificate number' },
        { certificateNumber: 'SP03071N202000000@', state: 'WB', description: 'Special character at the end' },
        { certificateNumber: 'SP03071N2020000000', state: 'WB', description: 'Trailing zero in the certificate number' },
        { certificateNumber: 'SP0O071N2020000001', state: 'WB', description: 'Letter "O" instead of zero in the prefix' },
        { certificateNumber: 'SP03071N202OO0001', state: 'WB', description: 'Letter "O" instead of zero in the number section' },
        { certificateNumber: undefined, state: 'WB', description: 'undefined certificate number code' },
        { certificateNumber: Boolean, state: 'WB', description: 'Boolean certificate number code' },
        { certificateNumber: true, state: 'DL', description: 'bolean true certificate number' },
        { certificateNumber: false, state: 'DL', description: 'bolean false certificate number' },
        { certificateNumber: null, state: 'WB', description: 'Null certificate number code' }, //Unable To Process. Please Reach Out To Support.
        { certificateNumber: 1234567890, state: 'WB', description: 'Number certificate number code' },
    

        //Invalid State
        { certificateNumber: 'SP03071N2020000003', state: 'W@', description: 'Special character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'M#', description: 'Special character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'T$', description: 'Special character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'G%', description: 'Special character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'H&', description: 'Special character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: '1N', description: 'Numeric character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: '2P', description: 'Numeric character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: '3B', description: 'Numeric character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: '4D', description: 'Numeric character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: '5K', description: 'Numeric character in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'AB12', description: 'Alphanumeric state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'C1D2', description: 'Alphanumeric state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'X2Y3', description: 'Alphanumeric state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'P1Q2', description: 'Alphanumeric state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'M3N4', description: 'Alphanumeric state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'DELH', description: 'State code too long' },
        { certificateNumber: 'SP03071N2020000003', state: 'RAJAST', description: 'State code too long' },
        { certificateNumber: 'SP03071N2020000003', state: 'KARNA', description: 'State code too long' },
        { certificateNumber: 'SP03071N2020000003', state: 'TAMILN', description: 'State code too long' },
        { certificateNumber: 'SP03071N2020000003', state: 'UTTARA', description: 'State code too long' },
        { certificateNumber: 'SP03071N2020000003', state: 'A', description: 'Single character state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'M', description: 'Single character state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'T', description: 'Single character state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'G', description: 'Single character state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'P', description: 'Single character state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' W B', description: 'Embedded spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' M H', description: 'Embedded spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' T N', description: 'Embedded spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' G J', description: 'Embedded spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' U P', description: 'Embedded spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'W-B', description: 'Hyphen in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'M_H', description: 'Underscore in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'T-N', description: 'Hyphen in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'G_J', description: 'Underscore in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'U_P', description: 'Underscore in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' WB', description: 'Leading space in state code' },
        { certificateNumber: 'SP03071N2020000003', state: 'MH ', description: 'Trailing space in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' TN ', description: 'Leading and trailing spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' GJ ', description: 'Leading and trailing spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: ' UP ', description: 'Leading and trailing spaces in state code' },
        { certificateNumber: 'SP03071N2020000003', state: '', description: 'Empty state code' },
        { certificateNumber: 'SP03071N2020000003', state: undefined, description: 'undefined state code' },
        { certificateNumber: 'SP03071N2020000003', state: Boolean, description: 'Boolean state code' },
        { certificateNumber: 'SP03071N2020000003', state: 11, description: 'number state code' }, //Response blank
        { certificateNumber: 'SP03071N2020000003', state: null, description: 'Null state code' }, //null because if responce show blank
        { certificateNumber: '2014001086', state: true, description: 'bolean true state' },
        { certificateNumber: '2014001086', state: false, description: 'bolean false state' },
    

        //Both Invalid
        { certificateNumber: '', state: '', description: 'Both balnk' },
        { certificateNumber: 'SP03', state: 'X', description: 'Too short certificate number with single-character state code' },
        { certificateNumber: 'BP9', state: 'YZ', description: 'Very short certificate number with non-existent state code' },
        { certificateNumber: 'SP03071N202000000123456', state: 'ABC', description: 'Excessively long certificate number with long state code' },
        { certificateNumber: 'MP12345Z20210000012345', state: 'LMN', description: 'Too long certificate number and state code' },
        { certificateNumber: 'SP03071N202@000001', state: '@#', description: 'Special characters in certificate number and state code' },
        { certificateNumber: 'BP$8765X2023000009', state: '%^', description: 'Special characters in both fields' },
        { certificateNumber: ' SP03071N2020 00001', state: ' W B', description: 'Leading and embedded whitespace in both fields' },
        { certificateNumber: 'SP03071N2020 00001 ', state: ' M H ', description: 'Trailing and embedded whitespace in both fields' },
        { certificateNumber: '  ', state: ' ', description: 'Blank certificate number and state code' },
        { certificateNumber: 'SP03A71N2020_00001', state: 'XX', description: 'Alphabetic and special characters in certificate number with non-existent state code' },
        { certificateNumber: 'BP98_765X20230ABCD', state: '12', description: 'Mixed alphanumeric and special characters in both fields' },
        { certificateNumber: 'MP12345Z2021*001234', state: '??', description: 'Invalid characters in both fields' },
        { certificateNumber: 'SP0-3071N2020000001', state: 'QQ', description: 'Hyphenated certificate number with non-existent state code' },
        { certificateNumber: 'BP98+765X2023000009', state: 'RR', description: 'Certificate number with special character and non-existent state code' },
        { certificateNumber: 'SP03', state: 'XX', description: 'Too short certificate number with non-existent state code' },
        { certificateNumber: 'BP98765X202300000999999', state: 'GGG', description: 'Too long certificate number with excessively long state code' },
        { certificateNumber: 'Sp03a71N2020000001', state: 'ab', description: 'Mixed case certificate number with lowercase state code' },
        { certificateNumber: 'SP03071N202000000A', state: '1N', description: 'Alphabetic in numeric part of certificate number with numeric state code' },
        { certificateNumber: '***03071N2020000001', state: '**', description: 'Special characters in both fields only' },
        { certificateNumber: 'SP03071N2020000001234#', state: 'A$', description: 'Long certificate number with special character in state code' },
        { certificateNumber: 'BP98765X20230000099999', state: '!', description: 'Too long certificate number with special character in state code' },
        { certificateNumber: 'SP11111N2222222222', state: 'XX', description: 'Repeating digits in certificate number with non-existent state code' },
        { certificateNumber: 'BP12345X2023456789', state: 'XY', description: 'Sequential digits in certificate number with non-existent state code' },
        { certificateNumber: ' SP03071N2020 00001 ', state: ' X! ', description: 'Whitespace and special characters in both fields' },
        { certificateNumber: 'BP98765X2023 000 9', state: ' ! ', description: 'Embedded spaces and special characters in both fields' },
        { certificateNumber: undefined, state: undefined, description: 'undefined certificate number and state code' },
        { certificateNumber: Boolean, state: Boolean, description: 'Boolean certificate number and state code' },
        { certificateNumber: 201400108677, state: 11, description: 'number certificate number and state code' }, //Response body show blank
        { certificateNumber: null, state: null, description: 'Null Certificate number and state code' }, //Response blank
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

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Shop And Establishment Data Fetch of West Bengal');
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