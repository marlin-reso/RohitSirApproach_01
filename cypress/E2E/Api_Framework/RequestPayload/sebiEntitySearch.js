/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test SEBI Entity Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidEntityName = [
        { entityName: 'Hello FINANCIAL SERVICES (IFSC) PRIVATE LIMITED', description: 'Not Exist' },
        { entityName: '', description: 'Empty entityName' },
        { entityName: true, description: 'Boolean true entityName' },
        { entityName: false, description: 'Boolean false entityName' },
        { entityName: 12345, description: 'Numeric entityName' },
        { entityName: 'Hello FINANCIAL SERVICES (IFSC) PRIVATE LIMITED@', description: 'Trailing special character @' },
        { entityName: null, description: 'Null entityName' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'SEBI Entity Verification');
    filteredTestCases.forEach((testCase) => {
        invalidEntityName.forEach((invalidCase) => {                                                      
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} entityName : ${invalidCase.entityName}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, entityName: invalidCase.entityName }; 

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