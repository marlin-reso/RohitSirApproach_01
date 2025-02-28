/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test pin code verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidPANNumbers = [
        { pinCode: '83101', description: 'Too Short' },             
        { pinCode: '8310123', description: 'Too Long' },            
        { pinCode: '83101A', description: 'Contains alphabetic character.' },      
        { pinCode: '83101-2', description: 'Special Characters' },    
        { pinCode: '831 012', description: 'Whitespace Characters' }, 
        { pinCode: '', description: 'Empty String' },                    
        { pinCode: '0831012', description: 'Leading zero in the 6-digit code.' },             
        { pinCode: '+831012', description: 'Leading special character.' }, 
        { pinCode: '000000', description: 'Invalid pin code (all zeros).' }, 
    //    { pinCode: '999999', description: 'Outside valid range of Indian pin codes.' }, 
        { pinCode: '123456', description: 'Pin code not mapped to any state.' },
        { pinCode: '000001', description: 'Edge case: Invalid but close to valid.' }, 
        { pinCode: '83101\n2', description: 'Contains newline character.' },   
        { pinCode: '83101\t2', description: 'Contains tab character.' }, 
        { pinCode: '8#31012', description: 'Contains non-standard symbol.' },      
        { pinCode: '831012 ', description: 'Trailing Spaces' },       
        { pinCode: ' 831012', description: 'Leading Spaces' },       
        { pinCode: '999001', description: 'Valid format but not an assigned pin code.' },
        { pinCode: undefined, description: 'undefined' },
        { pinCode: Boolean, description: 'boolean' },
        { pinCode: true, description: 'boolean true' },
        { pinCode: false, description: 'boolean flase' },
        { pinCode: null, description: 'Null Value' },                    
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'pin code verification');
    filteredTestCases.forEach((testCase) => {
        invalidPANNumbers.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} pinCode number : ${invalidCase.pinCode}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, pinCode: invalidCase.pinCode }; 

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