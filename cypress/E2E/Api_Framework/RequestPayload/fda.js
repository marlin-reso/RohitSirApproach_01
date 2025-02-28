/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test FDA License API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidLicenseNumberStateCode = [
        //Invalid licenseNumber and valid stateCode
        { licenseNumber: '', stateCode: 'MH', description: 'Empty licenseNumber' },
        { licenseNumber: '123', stateCode: 'MH', description: 'Too short licenseNumber' },
        { licenseNumber: 'ABCDE', stateCode: 'MH', description: 'Alphabetic licenseNumber' },
        { licenseNumber: '90026@', stateCode: 'MH', description: 'Special character in licenseNumber' },
        { licenseNumber: '90026 ', stateCode: 'MH', description: 'Trailing space in licenseNumber' },
        { licenseNumber: ' 90026', stateCode: 'MH', description: 'Leading space in licenseNumber' },
        { licenseNumber: '90026#', stateCode: 'MH', description: 'Special character at the end of licenseNumber' },
        { licenseNumber: '90026/789', stateCode: 'MH', description: 'Slash in licenseNumber' },
        { licenseNumber: null, stateCode: 'MH', description: 'Null licenseNumber' },
        { licenseNumber: undefined, stateCode: 'MH', description: 'Undefined licenseNumber' },
        { licenseNumber: true, stateCode: 'MH', description: 'Boolean true licenseNumber' },
        { licenseNumber: false, stateCode: 'MH', description: 'Boolean false licenseNumber' },
        { licenseNumber: 12345, stateCode: 'MH', description: 'number licenseNumber' },
    
        //Valid licenseNumber and invalid stateCode
        { licenseNumber: '90026', stateCode: '', description: 'Empty stateCode' },
        { licenseNumber: '90026', stateCode: 'M123', description: 'Numeric characters in stateCode' },
        { licenseNumber: '90026', stateCode: 'M#', description: 'Special character in stateCode' },
        { licenseNumber: '90026', stateCode: ' M', description: 'Leading space in stateCode' },
        { licenseNumber: '90026', stateCode: 'M ', description: 'Trailing space in stateCode' },
        { licenseNumber: '90026', stateCode: 'MH!', description: 'Exclamation mark in stateCode' },
        { licenseNumber: '90026', stateCode: 'M-H', description: 'Hyphen in stateCode' },
        { licenseNumber: '90026', stateCode: null, description: 'Null stateCode' },
        { licenseNumber: '90026', stateCode: undefined, description: 'Undefined stateCode' },
        { licenseNumber: '90026', stateCode: true, description: 'Boolean true stateCode' },
        { licenseNumber: '90026', stateCode: false, description: 'Boolean false stateCode' },
        { licenseNumber: '90026', stateCode: 123, description: 'Numeric stateCode' },
    
        //Invalid licenseNumber and stateCode both
        { licenseNumber: '', stateCode: '', description: 'Empty licenseNumber and stateCode' },
        { licenseNumber: '123', stateCode: 'M123', description: 'Too short licenseNumber, numeric characters in stateCode' },
        { licenseNumber: 'ABCDE', stateCode: 'M#', description: 'Alphabetic licenseNumber, special character in stateCode' },
        { licenseNumber: '90026@', stateCode: ' M', description: 'Special character in licenseNumber, leading space in stateCode' },
        { licenseNumber: '90026 ', stateCode: 'M ', description: 'Trailing space in licenseNumber and stateCode' },
        { licenseNumber: ' 90026', stateCode: 'MH!', description: 'Leading space in licenseNumber, exclamation mark in stateCode' },
        { licenseNumber: '90026#', stateCode: 'M-H', description: 'Special character at the end of licenseNumber, hyphen in stateCode' },
        { licenseNumber: '90026/789', stateCode: 'M_H', description: 'Slash in licenseNumber, underscore in stateCode' },
        { licenseNumber: null, stateCode: null, description: 'Null licenseNumber and stateCode' },
        { licenseNumber: undefined, stateCode: undefined, description: 'Undefined licenseNumber and stateCode' },
        { licenseNumber: true, stateCode: false, description: 'Boolean true licenseNumber and false stateCode' },
        { licenseNumber: false, stateCode: true, description: 'Boolean false licenseNumber and true stateCode' },
        { licenseNumber: 12345, stateCode: 123, description: 'Number licenseNumber and numeric stateCode' },
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'FDA License Verification');
    filteredTestCases.forEach((testCase) => {

        invalidLicenseNumberStateCode.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} licenseNumber : ${invalidCase.licenseNumber} and State : ${invalidCase.stateCode}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, licenseNumber: invalidCase.licenseNumber, stateCode: invalidCase.stateCode }; 

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