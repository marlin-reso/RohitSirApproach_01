/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test ration card verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidrationCardNumbers = [
        { ipAddress: '237.251.252.189.1', description: 'Invalid IP Address Format' },             
        { ipAddress: 'abc.def.ghi.jkl', description: 'Non-Numeric Values' },            
        { ipAddress: '', description: 'Empty String' },      
        { ipAddress: '300.251.252.189', description: 'Out-of-Range Values' },    
        { ipAddress: '-237.251.252.189', description: 'Negative Numbers' }, 
        { ipAddress: '237.251.252.18@', description: 'Special Characters' },                    
        { ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', description: 'IPv6 Address Provided' },             
        { ipAddress: '  ', description: 'Whitespace Only' }, 
        { ipAddress: ' 237.251.252.189', description: 'Leading space' }, 
        { ipAddress: '237.251.252.189 ', description: 'Trailing space' },
        { ipAddress: '001.251.252.189', description: 'Excess Leading Zeros' }, 
        { ipAddress: 1234567, description: 'Completely Invalid Type' },   
        { ipAddress: '0.0.0.0', description: 'Minimum Value for Each Octet' }, 
        { ipAddress: '237.251.252.189.123456789012345678901234567890', description: 'Extremely Long Input' },      
        { ipAddress: '237.237.237.237', description: 'Duplicated Octets' },       
        { ipAddress: '237.251.252.189:7334', description: 'Mixed IPv4 and IPv6 Format' },
        { ipAddress: '237..251.252.189', description: 'IP Address with Extra Delimiters' },
        { ipAddress: '127.0.0.1', description: 'Localhost IP' },
        { ipAddress: '255.255.255.255', description: 'Broadcast IP' },
        { ipAddress: '10.0.0.1', description: 'Reserved IP Range' },
        { ipAddress: '1.0.0.1', description: 'Public IP Edge Case' },
        { ipAddress: undefined, description: 'undefined' },
        { ipAddress: Boolean, description: 'boolean' },
        { ipAddress: true, description: 'boolean true' },
        { ipAddress: false, description: 'boolean flase' },
        { ipAddress: null, description: 'Null Value' },                    
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'IP address verification');
    filteredTestCases.forEach((testCase) => {
        invalidrationCardNumbers.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} ipAddress number : ${invalidCase.ipAddress}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, ipAddress: invalidCase.ipAddress }; 

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