/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test PAN basic info API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidPANNumbers = [
        { pan: 'BDDPJ5343', description: 'Too Short' },             
        { pan: 'BDDPJ5343N678', description: 'Too Long' },            
        { pan: '1234ABCDE5', description: 'Incorrect Format' },      
        { pan: 'BDDP@5343N', description: 'Special Characters' },    
        { pan: 'BDDP J5343N', description: 'Whitespace Characters' }, 
        { pan: '', description: 'Empty String' },                    
        { pan: '0000000000', description: 'All Zeros' },             
        { pan: 'AAAAA11111', description: 'All Same Alphabets' },    
        { pan: 'ABCDEFFFFF', description: 'All Same Alphabets - End' }, 
        { pan: 'BDDPJ53437', description: 'Ends with Non-Alphabetic' },
        { pan: '1234567890', description: 'All Numeric Characters' },  
        { pan: 'ABCD1234E9', description: 'Alphabets in Middle' },   
        { pan: '1234@ABCDE', description: 'Special Character in Numeric' }, 
        { pan: 'BD DPJ5343N', description: 'Embedded Spaces' },      
        { pan: 'BDDPJ5343N ', description: 'Trailing Spaces' },       
        { pan: ' BDDPJ5343N', description: 'Leading Spaces' },       
    //    { pan: '\u0042\u0044\u0044\u0050\u004A\u0035\u0033\u0034\u0033\u004E', description: 'Unicode Characters' }, 
        { pan: 'ABCDE1234567890', description: 'Excessively Long Number' }, 
        { pan: undefined, description: 'undefined' },
        { pan: Boolean, description: 'boolean' },
        { pan: true, description: 'boolean true' },
        { pan: false, description: 'boolean flase' },
        { pan: null, description: 'Null Value' }, 
        { pan: '😊BDDPJ5343N', description: 'Leading Spaces' },
        { pan: 'BDDPJ5343漢字', description: 'Leading Spaces' },
        //BDDPJ5343N
        //\uD83D\uDC80
        //user😊
        //漢字
        
        

          /*

          { pinCode: ["831012"], description: 'Pin Code contains array instead of string' },
    { pinCode: {"code": "831012"}, description: 'Pin Code contains object instead of string' },
     { ifscCode: null, description: 'IFSC Code is known to be null' },
        { ifscCode: false, description: 'IFSC Code is known to be false' },
        { ifscCode: Boolean, description: 'IFSC Code is known to be Boolean' },
        { ifscCode: 'SBIN0 001234', description: 'Space between IFSC Code' },
    */
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.',
        'EPP1555':'The provided PAN is not associated with an individual.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'PAN basic info');
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
                cy.log('Request Headers:', JSON.stringify(headers));
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