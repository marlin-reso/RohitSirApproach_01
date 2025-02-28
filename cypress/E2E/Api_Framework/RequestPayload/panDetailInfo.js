/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test PAN Details Info API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidPANNumbers = [
        { pan: 'ABCDE12345', description: 'Too Short' },             
        { pan: 'ABCDE1234567', description: 'Too Long' },            
        { pan: '1234ABCDE5', description: 'Incorrect Format' },      
        { pan: 'ABCDE@1234', description: 'Special Characters' },    
        { pan: 'ABCDE 1234F', description: 'Whitespace Characters' }, 
        { pan: '', description: 'Empty String' },                    
        { pan: '0000000000', description: 'All Zeros' },             
        { pan: 'AAAAA11111', description: 'All Same Alphabets' },    
        { pan: 'ABCDEFFFFF', description: 'All Same Alphabets - End' }, 
        { pan: 'ABCDE1234G', description: 'Ends with Non-Alphabetic' }, 
        { pan: 'ABCDE12345', description: 'Ends with Non-Alphabetic' },
        { pan: '1234567890', description: 'All Numeric Characters' },  
        { pan: 'ABCD1234E9', description: 'Alphabets in Middle' },   
        { pan: '1234@ABCDE', description: 'Special Character in Numeric' }, 
        { pan: 'AB CDE1234F', description: 'Embedded Spaces' },      
        { pan: 'ABCDE1234 ', description: 'Trailing Spaces' },       
        { pan: ' ABCDE1234F', description: 'Leading Spaces' },       
        { pan: 'ABCDE\u200B1234F', description: 'Unicode Characters' }, 
        { pan: 'ABCDE1234567890', description: 'Excessively Long Number' }, 
        { pan: undefined, description: 'undefined' },
        { pan: Boolean, description: 'boolean' },
        { pan: true, description: 'boolean true' },
        { pan: false, description: 'boolean flase' },
        { pan: null, description: 'Null Value' },                    
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'PAN Details Info');
    filteredTestCases.forEach((testCase) => {
        invalidPANNumbers.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} PAN number : ${invalidCase.pan}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, pan: invalidCase.pan }; 

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