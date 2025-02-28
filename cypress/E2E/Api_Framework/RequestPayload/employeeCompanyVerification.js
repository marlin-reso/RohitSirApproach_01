/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test employee company verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidMobileNo = [
        { mobileNumber: '', email: 'dinesh.navghane@scoreme.in', description: 'Empty Mobile Number' },
        { mobileNumber: '123', email: 'dinesh.navghane@scoreme.in', description: 'Too Short Mobile Number' },
        { mobileNumber: '123456789012345', email: 'dinesh.navghane@scoreme.in', description: 'Too Long Mobile Number' },
        { mobileNumber: 'abcdefghij', email: 'dinesh.navghane@scoreme.in', description: 'Non-Numeric Mobile Number' },
        { mobileNumber: ' 9146463320', email: 'dinesh.navghane@scoreme.in', description: 'Leading space in mobile number' },
        { mobileNumber: '9146463320 ', email: 'dinesh.navghane@scoreme.in', description: 'Trailing space in mobile number' },
        { mobileNumber: '91464 63320', email: 'dinesh.navghane@scoreme.in', description: 'Between space in mobile number' },
        { mobileNumber: null, email: 'dinesh.navghane@scoreme.in',description: 'Null Mobile Number' },
        { mobileNumber: true, email: 'dinesh.navghane@scoreme.in', description: 'Mobile Number as Boolean True' },
        { mobileNumber: false, email: 'dinesh.navghane@scoreme.in', description: 'Mobile Number as Boolean False' },
        { mobileNumber: undefined, email: 'dinesh.navghane@scoreme.in', description: 'Mobile Number as Undefined' },
        { mobileNumber: '9146463320', email: null, description: 'Null Email' },
        { mobileNumber: '9146463320', email: '', description: 'Empty Email' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@', description: 'Invalid Email Missing Domain' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane.com', description: 'Invalid Email Missing @' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme', description: 'Invalid Email Missing TLD' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme@in', description: 'Invalid Email with Multiple @' },
        { mobileNumber: '9146463320', email: 'dinesh@scoreme', description: 'Email without domain extension' },
        { mobileNumber: '9146463320', email: 'dinesh@.com', description: 'Email with dot before domain' },
        { mobileNumber: '9146463320', email: true, description: 'Email as Boolean True' },
        { mobileNumber: '9146463320', email: false, description: 'Email as Boolean False' },
        { mobileNumber: '9146463320', email: undefined, description: 'Email as Undefined' },
        { mobileNumber: '9146463320', email: 1234567890, description: 'Email as Number' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIM153': 'Incorrect Mobile Number.',
        'EPI022': 'Payload is Incorrect.',
    };

    
    const filteredTestCases = testCases.filter(testCase => testCase.name === 'employee company verification');
    filteredTestCases.forEach((testCase) => {
        invalidMobileNo.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} email : ${invalidCase.email}, mobileNumber : ${invalidCase.mobileNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, email: invalidCase.email, mobileNumber: invalidCase.mobileNumber }; // Override Aadhaar number

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