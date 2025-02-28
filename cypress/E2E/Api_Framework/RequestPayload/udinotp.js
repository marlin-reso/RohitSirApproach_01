/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test UDIN OTP Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidMobEmailUdin = [
        { mobileNumber: '', email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Empty Mobile Number' },
        { mobileNumber: '123', email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Too Short Mobile Number' },
        { mobileNumber: '123456789012345', email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Too Long Mobile Number' },
        { mobileNumber: 'abcdefghij', email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Non-Numeric Mobile Number' },
        { mobileNumber: '9146463320', email: '', udin: '21220735AAAAAE5664', description: 'Empty Email' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@', udin: '21220735AAAAAE5664', description: 'Invalid Email Missing Domain' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane.com', udin: '21220735AAAAAE5664', description: 'Invalid Email Missing @' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme', udin: '21220735AAAAAE5664', description: 'Invalid Email Missing TLD' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme@in', udin: '21220735AAAAAE5664', description: 'Invalid Email with Multiple @' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: '', description: 'Empty UDIN' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE', description: 'Too Short UDIN' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664XX', description: 'Too Long UDIN' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5*64', description: 'UDIN with Special Characters' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: 'ABCDEFGHIJKL0123456', description: 'Non-Numeric and Non-Alphabetic UDIN' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: null, description: 'Null UDIN' },
        { mobileNumber: '9146463320', email: null, udin: '21220735AAAAAE5664', description: 'Null Email' },
        { mobileNumber: null, email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Null Mobile Number' },
        { mobileNumber: '9146463320', email: 'dinesh@scoreme', udin: '21220735AAAAAE5664', description: 'Email without domain extension' },
        { mobileNumber: '9146463320', email: 'dinesh@.com', udin: '21220735AAAAAE5664', description: 'Email with dot before domain' },
        { mobileNumber: true, email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Mobile Number as Boolean True' },
        { mobileNumber: false, email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Mobile Number as Boolean False' },
        { mobileNumber: undefined, email: 'dinesh.navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Mobile Number as Undefined' },
        { mobileNumber: '9146463320', email: true, udin: '21220735AAAAAE5664', description: 'Email as Boolean True' },
        { mobileNumber: '9146463320', email: false, udin: '21220735AAAAAE5664', description: 'Email as Boolean False' },
        { mobileNumber: '9146463320', email: undefined, udin: '21220735AAAAAE5664', description: 'Email as Undefined' },
        { mobileNumber: '9146463320', email: 1234567890, udin: '21220735AAAAAE5664', description: 'Email as Number' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: true, description: 'UDIN as Boolean True' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: false, description: 'UDIN as Boolean False' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: undefined, description: 'UDIN as Undefined' },
        { mobileNumber: '9146463320', email: 'dinesh.navghane@scoreme.in', udin: 1234567890, description: 'UDIN as Number' },

        // { mobileNumber: '9146463320', email: 'dinesh..navghane@scoreme.in', udin: '21220735AAAAAE5664', description: 'Invalid Email with Double Dot' },
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIU999': 'Invalid Udin Number.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'UDIN OTP Verification');
    filteredTestCases.forEach((testCase) => {
        invalidMobEmailUdin.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} mobile number: ${invalidCase.mobileNumber}, email : ${invalidCase.email} and Udin : ${invalidCase.udin}`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, mobileNumber: invalidCase.mobileNumber, email: invalidCase.email, udin: invalidCase.udin }; 

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