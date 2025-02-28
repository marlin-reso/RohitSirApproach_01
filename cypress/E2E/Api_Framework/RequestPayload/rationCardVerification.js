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
        { rationCardNumber: '0440', description: 'Too Short' },             
        { rationCardNumber: '0440000000020012', description: 'Too Long' },            
        { rationCardNumber: '044000000002A', description: 'Contains alphabetic character.' },      
        { rationCardNumber: '0440000000-02', description: 'Special Characters' },    
        { rationCardNumber: '0440 00000002', description: 'Whitespace Characters' }, 
        { rationCardNumber: '', description: 'Empty String' },                    
        { rationCardNumber: '0044000000002', description: 'Leading zero in the valid code.' },             
        { rationCardNumber: '+044000000002', description: 'Leading special character.' }, 
        { rationCardNumber: '000000000000', description: 'Invalid pin code (all zeros).' }, 
    //  { rationCardNumber: '999999', description: 'Outside valid range of Indian pin codes.' }, 
        { rationCardNumber: '12345678910', description: 'Pin code not mapped to any state.' },
        { rationCardNumber: '0440000000002', description: 'Edge case: Invalid but close to valid.' }, 
        { rationCardNumber: '044000000002\n2', description: 'Contains newline character.' },   
        { rationCardNumber: '044000000002\t2', description: 'Contains tab character.' }, 
        { rationCardNumber: '044#000000002', description: 'Contains non-standard symbol.' },      
        { rationCardNumber: '044000000002 ', description: 'Trailing Spaces' },       
        { rationCardNumber: ' 044000000002', description: 'Leading Spaces' },
        { rationCardNumber: '044000००००२', description: 'Input unicode char' },
        { rationCardNumber: '.044000000002', description: 'Input as a number with exponential notation' },
        { rationCardNumber: {rationCardNumber:'044000000002 '}, description: 'ration card number as JSON' },
        { rationCardNumber: '044 000 000 002', description: 'Numbers with Spaces' },
        { rationCardNumber: '044-000-000-002', description: 'Numbers with separators' },
        { rationCardNumber: '044000000002#', description: 'Numbers with extra characters' },
        { rationCardNumber: '999000000002', description: ' 044 for Tamil Nadu, provide a number starting with an invalid prefix' },
        { rationCardNumber: '٠٤٤٠٠٠٠٠٠٠٠٢', description: 'unexpected localized numeric formats' },
        { rationCardNumber: '______________', description: 'only underScore' },
        { rationCardNumber: undefined, description: 'undefined' },
        { rationCardNumber: Boolean, description: 'boolean' },
        { rationCardNumber: true, description: 'boolean true' },
        { rationCardNumber: false, description: 'boolean flase' },
        { rationCardNumber: null, description: 'Null Value' },                    
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'ration card verification');
    filteredTestCases.forEach((testCase) => {
        invalidrationCardNumbers.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} rationCardNumber number : ${invalidCase.rationCardNumber}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, rationCardNumber: invalidCase.rationCardNumber }; 

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