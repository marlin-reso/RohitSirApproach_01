/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Udyam OTP Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidData = [
        { registrationNumber: '', mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Empty Registration Number' },
        { registrationNumber: 'INVALID-REG-123', mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Invalid Format Registration Number' },
        { registrationNumber: '123', mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Too Short Registration Number' },
        { registrationNumber: 'UDYAM-HR-05-001879700000', mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Too Long Registration Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '', otpConsent: 'mobile', description: 'Empty Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '123', otpConsent: 'mobile', description: 'Too Short Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '123456789012345', otpConsent: 'mobile', description: 'Too Long Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: 'abcdefghij', otpConsent: 'mobile', description: 'Non-Numeric Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: '', description: 'Empty OTP Consent' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: 'INVALID', description: 'Invalid OTP Consent Value' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: null, description: 'Null OTP Consent' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: undefined, description: 'Undefined OTP Consent' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: true, description: 'Boolean True OTP Consent' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: false, description: 'Boolean False OTP Consent' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: 12345, description: 'Numeric OTP Consent' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: '12345', description: 'String OTP Consent' },
        { registrationNumber: null, mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Null Registration Number' },
        { registrationNumber: undefined, mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Undefined Registration Number' },
        { registrationNumber: true, mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Boolean True Registration Number' },
        { registrationNumber: false, mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Boolean False Registration Number' },
        { registrationNumber: 12345, mobileNumber: '8800155466', otpConsent: 'mobile', description: 'Numeric Registration Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: null, otpConsent: 'mobile', description: 'Null Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: undefined, otpConsent: 'mobile', description: 'Undefined Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: true, otpConsent: 'mobile', description: 'Boolean True Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: false, otpConsent: 'mobile', description: 'Boolean False Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: 12345, otpConsent: 'mobile', description: 'Numeric Mobile Number' },
        { registrationNumber: 'UDYAM-HR-05-0018797', mobileNumber: '8800155466', otpConsent: 'boolean', description: 'String OTP Consent as boolean' }
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EUR255': 'The entered mobile number and udyam number does not match or is incorrect.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Udyam OTP Verification');
    filteredTestCases.forEach((testCase) => {
        invalidData.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Regstration number: ${invalidCase.registrationnumber}, Mobile number : ${invalidCase.mobileNumber} and OTP Consent : ${invalidCase.otpConsent}`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, registrationnumber: invalidCase.registrationnumber, mobileNumber: invalidCase.mobileNumber, otpConsent: invalidCase.otpConsent }; 

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