/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Get ifsc details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidifscCode = [
        { ifscCode: '', description: 'Empty IFSC Code' },
        { ifscCode: 'SBIN0#00387', description: 'IFSC Code with Special Characters' },
        { ifscCode: 'SBIN00003', description: 'Too Short IFSC Code' },
        { ifscCode: 'SBIN000038712', description: 'Too Long IFSC Code' },
        { ifscCode: 'SBIB0000387', description: 'IFSC Code with Invalid Format' },
        { ifscCode: 'SB1N0000387', description: 'IFSC Code digits in the bank code' },
        { ifscCode: 'SBIN00003A7', description: 'IFSC Code with letters in the branch code' },
        { ifscCode: ' SBIN0001234 ', description: 'IFSC Code with spaces around the code' },
        { ifscCode: 'SBIN0000000', description: 'IFSC code must be numeric and not all zeros' },
        { ifscCode: true, description: 'boolean  true instead of string' },
        { ifscCode: ["SBIN0001234"], description: 'IFSC Code with array instead of string' },
        { ifscCode: {"code": "SBIN0001234"}, description: 'IFSC Code with object instead of string' },
        { ifscCode: 'SBIN9999999', description: 'IFSC Code is known to be invalid' },

        { ifscCode: null, description: 'IFSC Code is known to be null' },
        { ifscCode: false, description: 'IFSC Code is known to be false' },
        { ifscCode: Boolean, description: 'IFSC Code is known to be Boolean' },
        { ifscCode: 'SBIN0 001234', description: 'Space between IFSC Code' },
        { ifscCode: undefined, description: 'IFSC Code is known to be undefined' },
      //  { ifscCode: 'SBIN0001234', description: 'branch code should not be all zeros' },
           
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'ifsc Code Verification');
    filteredTestCases.forEach((testCase) => {
        invalidifscCode.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} ifscCode number : ${invalidCase.ifscCode}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, ifscCode: invalidCase.ifscCode }; 

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