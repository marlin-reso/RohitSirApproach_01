/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Bullion Rates API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidcommodityType = [
        { commodityType: '', description: 'Both blank' },
        { commodityType: '0', description: 'Too short commodity type' },
        { commodityType: 'GOLD@', description: 'Special character in commodity type' },
        { commodityType: '1GOLD', description: 'Numeric character at the start' },
        { commodityType: undefined, description: 'Undefined commodity type' },
        { commodityType: Boolean, description: 'Boolean commodity type' },
        { commodityType: true, description: 'Boolean true commodity type' },
        { commodityType: false, description: 'Boolean false commodity type' },
        { commodityType: 12345, description: 'number commodity type' }    
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',	
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Bullion Rates');
    filteredTestCases.forEach((testCase) => {
        invalidcommodityType.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Commodity Type : ${invalidCase.commodityType}`, () => {   
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;           
                const requestData = { ...payLoad.requestData, commodityType: invalidCase.commodityType }; 

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