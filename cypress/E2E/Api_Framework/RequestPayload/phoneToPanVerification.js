/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Phone to pan verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    //9876543210
    const invalidMobileNo = [
        { phoneNumber: '',  description: 'Empty Mobile Number' },
        { phoneNumber: '123',  description: 'Too Short Mobile Number' },
        { phoneNumber: '98765432101234',  description: 'Too Long Mobile Number' },
        { phoneNumber: 'abcdefghij',  description: 'Non-Numeric Mobile Number' },
        { phoneNumber: ' 9876543210',  description: 'Leading space in mobile number' },
        { phoneNumber: '9876543210 ',  description: 'Trailing space in mobile number' },
        { phoneNumber: '1876543210 ',  description: 'Start with invalid series mobile number' },
        { phoneNumber: '2876543210 ',  description: 'Start with invalid series mobile number' },
        { phoneNumber: '3876543210 ',  description: 'Start with invalid series mobile number' },
        { phoneNumber: '4876543210 ',  description: 'Start with invalid series mobile number' },
        { phoneNumber: '5876543210 ',  description: 'Start with invalid series mobile number' },
        { phoneNumber: '98765 43210',  description: 'Between space in mobile number' },
        { phoneNumber: '98765\t43210',  description: 'Between space in mobile number' },
        { phoneNumber: 'abcdefg123',  description: 'Mobile number must be numeric' },
        { phoneNumber: '9876@#%210',  description: 'Special charector in mobile nuspember' },
        { phoneNumber: ' 9876543210 ',  description: 'White sspace in mobile number' },
        { phoneNumber: '+91-9876543210',  description: 'country code in mobile number' },
      //  { phoneNumber: '9494949494',  description: 'repeated number in mobile number' },
     //   { phoneNumber: 9876543210,  description: 'Passing number in mobile number' },
        { phoneNumber: [9876543210],  description: 'Passing array in mobile number' },
        { phoneNumber: {phoneNumber: 9876543210},  description: 'Json in mobile number' },
        { phoneNumber: Boolean,  description: 'Between space in mobile number' },
        { phoneNumber: null, description: 'Null Mobile Number' },
        { phoneNumber: true,  description: 'Mobile Number as Boolean True' },
        { phoneNumber: false,  description: 'Mobile Number as Boolean False' },
        { phoneNumber: undefined,  description: 'Mobile Number as Undefined' },
       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIM153': 'Incorrect Mobile Number.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.'
    };

    
    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Phone to pan verification');
    filteredTestCases.forEach((testCase) => {
        invalidMobileNo.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} phoneNumber : ${invalidCase.phoneNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, phoneNumber: invalidCase.phoneNumber }; 

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