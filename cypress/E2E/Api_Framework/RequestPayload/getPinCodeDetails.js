/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Get pin code details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidPinCode = [

    { pinCode: '', description: 'Empty Pin Code' },
    { pinCode: '83A012', description: 'Pin Code with Letters' },
    { pinCode: '8310-12', description: 'Pin Code with Special Characters' },
    { pinCode: '831', description: 'Too Short Pin Code' },
    { pinCode: '831012345678', description: 'Too Long Pin Code' },
    { pinCode: ' 831012', description: 'Pin Code with Leading Spaces' },
    { pinCode: '831012 ', description: 'Pin Code with Trailing Spaces' },
    { pinCode: '831 012', description: 'Pin Code with Internal Spaces' },
    { pinCode: '8310AB', description: 'Pin Code contains letter' },
    { pinCode: '831@012', description: 'Pin Code contains special character' },
    { pinCode: '000000', description: 'Pin Code contains all zero' },
    { pinCode: '-831012', description: 'Pin Code contains negative values' },
    { pinCode: '111111', description: 'Pin Code contains repetitive numbers' },
    { pinCode: true, description: 'Pin Code contains boolean instead of string' },
    { pinCode: ["831012"], description: 'Pin Code contains array instead of string' },
    { pinCode: {"code": "831012"}, description: 'Pin Code contains object instead of string' },
    { pinCode: '999999', description: 'if this code is outside a valid range for a specific area' },
    { pinCode: '831012', description: 'if there’s a rule against reusing certain codes' },
    

    { pinCode: null, description: 'Code is known to be null' },
    { pinCode: false, description: 'Code is known to be false' },
    { pinCode: Boolean, description: 'Code is known to be Boolean' },
    { pinCode: undefined, description: 'Code is known to be undefined' },
  
    /*
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
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Get pin code details');
    filteredTestCases.forEach((testCase) => {
        invalidPinCode.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} PAN number : ${invalidCase.pinCode}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, pinCode: invalidCase.pinCode }; 

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