/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Get tan verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidPinCode = [

        //MUMR10629D

    { tan: '', description: 'Empty tan Code' },
    { tan: 'MUM1810629', description: 'tan Code with Letters' },
    { tan: 'MUMR1_0629D', description: 'tan Code with Special Characters' },
    { tan: 'MUMR10629', description: 'Too Short tan Code' },
    { tan: 'MUMR10629D123', description: 'Too Long tan Code' },
    { tan: ' MUMR10629D', description: 'tan Code with Leading Spaces' },
    { tan: 'MUMR10629D ', description: 'tan Code with Trailing Spaces' },
    { tan: 'MUMR1 0629D', description: 'tan Code with Internal Spaces' },
    { tan: 'MUMR10629DAB', description: 'tan Code contains letter' },
    { tan: 'MUMR@10629D', description: 'tan Code contains special character' },
    { tan: '000000', description: 'tan Code contains all zero' },
    { tan: '-MUMR10629D', description: 'tan Code contains negative values' },
    { tan: 'MUMRMUMRMM', description: 'tan Code contains repetitive numbers' },
    { tan: true, description: 'tan Code contains boolean instead of string' },
    { tan: ["MUMR10629D"], description: 'tan Code contains array instead of string' },
    { tan: {tan: "MUMR10629D"}, description: 'tan Code contains object instead of string' },
    { tan: '999999', description: 'if this code is outside a valid range for a specific area' },
    { tan: 'MUMR10629D*', description: 'if there’s a rule against reusing certain codes' },
    

    { tan: true, description: 'Code is known to be true' },
    { tan: null, description: 'Code is known to be null' },
    { tan: false, description: 'Code is known to be false' },
    { tan: Boolean, description: 'Code is known to be Boolean' },
    { tan: undefined, description: 'Code is known to be undefined' },
  
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


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'tan verification');
    filteredTestCases.forEach((testCase) => {
        invalidPinCode.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} PAN number : ${invalidCase.tan}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, tan: invalidCase.tan }; 

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