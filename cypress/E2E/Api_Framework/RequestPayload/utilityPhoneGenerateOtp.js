/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - Phone Number Details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidMobileNo = [
        { mobileNumber: '', countryCode: '91', description: 'Empty Mobile Number' },
        { mobileNumber: '123', countryCode: '91', description: 'Too Short Mobile Number' },
        { mobileNumber: '123456789012345', countryCode: '91', description: 'Too Long Mobile Number' },
        { mobileNumber: 'abcdefghij', countryCode: '91', description: 'Non-Numeric Mobile Number' },
        { mobileNumber: '9146463320', countryCode: '', description: 'Empty Country Code' },
        { mobileNumber: '9146463320', countryCode: '999', description: 'Invalid Country Code' },
        { mobileNumber: '9146463320', countryCode: '91abc', description: 'Non-Numeric Country Code' },
        { mobileNumber: '9146463320', countryCode: '0', description: 'Invalid Country Code Single Digit' },
        { mobileNumber: '9146463320', countryCode: '1234', description: 'Too Long Country Code' },
        { mobileNumber: null, countryCode: '91', description: 'Null Mobile Number' },
        { mobileNumber: '9146463320', countryCode: null, description: 'Null Country Code' },
        { mobileNumber: undefined, countryCode: '91', description: 'Undefined Mobile Number' },
        { mobileNumber: '9146463320', countryCode: undefined, description: 'Undefined Country Code' },
        { mobileNumber: true, countryCode: '91', description: 'Boolean True Mobile Number' },
        { mobileNumber: '9146463320', countryCode: true, description: 'Boolean True Country Code' },
        { mobileNumber: false, countryCode: '91', description: 'Boolean False Mobile Number' },
        { mobileNumber: '9146463320', countryCode: false, description: 'Boolean False Country Code' },
        { mobileNumber: 1234567890, countryCode: '91', description: 'Numeric Mobile Number' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIM153': 'Incorrect Mobile Number.',
        'EPI022': 'Payload is Incorrect.',
    };

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Utility - Phone Number Details');
    filteredTestCases.forEach((testCase) => {
        invalidMobileNo.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} country code : ${invalidCase.countryCode} and mobile number : ${invalidCase.mobileNumber}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, countryCode: invalidCase.countryCode, mobileNumber: invalidCase.mobileNumber }; 

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