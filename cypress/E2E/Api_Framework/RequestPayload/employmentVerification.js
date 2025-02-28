/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test employee verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidMobileNo = [
        { mobileNumber: '',  description: 'Empty Mobile Number' },
        { mobileNumber: '123',  description: 'Too Short Mobile Number' },
        { mobileNumber: '941629453212345',  description: 'Too Long Mobile Number' },
        { mobileNumber: 'abcdefghij',  description: 'Non-Numeric Mobile Number' },
        { mobileNumber: ' 9416294532',  description: 'Leading space in mobile number' },
        { mobileNumber: '9416294532 ',  description: 'Trailing space in mobile number' },
        { mobileNumber: '1416294532 ',  description: 'Start with invalid series mobile number' },
        { mobileNumber: '2416294532 ',  description: 'Start with invalid series mobile number' },
        { mobileNumber: '3416294532 ',  description: 'Start with invalid series mobile number' },
        { mobileNumber: '4416294532 ',  description: 'Start with invalid series mobile number' },
        { mobileNumber: '5416294532 ',  description: 'Start with invalid series mobile number' },
        { mobileNumber: '94162 94532',  description: 'Between space in mobile number' },
        { mobileNumber: '94162\t94532',  description: 'Between space in mobile number' },
        { mobileNumber: 'abcdefg123',  description: 'Mobile number must be numeric' },
        { mobileNumber: '9416@#$%532',  description: 'Special charector in mobile nuspember' },
        { mobileNumber: ' 9416294532 ',  description: 'White sspace in mobile number' },
        { mobileNumber: '+91-9416294532',  description: 'country code in mobile number' },
        { mobileNumber: '9494949494',  description: 'repeated number in mobile number' },
        { mobileNumber: {mobileNumber: 9416294532},  description: 'Json in mobile number' },
        { mobileNumber: Boolean,  description: 'Between space in mobile number' },
        { mobileNumber: null, description: 'Null Mobile Number' },
        { mobileNumber: true,  description: 'Mobile Number as Boolean True' },
        { mobileNumber: false,  description: 'Mobile Number as Boolean False' },
        { mobileNumber: undefined,  description: 'Mobile Number as Undefined' },
       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIM153': 'Incorrect Mobile Number.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.'
    };

    
    const filteredTestCases = testCases.filter(testCase => testCase.name === 'employment verification');
    filteredTestCases.forEach((testCase) => {
        invalidMobileNo.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} mobileNumber : ${invalidCase.mobileNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, mobileNumber: invalidCase.mobileNumber }; 

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