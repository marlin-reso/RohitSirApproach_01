/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test ICMAI Membership Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidMembershipNumber = [
        { membershipNumber: '11790*', description: 'Special character at the end' },
        { membershipNumber: '11@790', description: 'Special character in the middle' },
        { membershipNumber: '11 790', description: 'Whitespace in the middle' },
        { membershipNumber: '117_90', description: 'Underscore in the middle' },
        { membershipNumber: 'A11790', description: 'Alphabetic character at the start' },
        { membershipNumber: '117/90', description: 'Slash in the middle' },
        { membershipNumber: 'ABCDE', description: 'All alphabetic characters' },
        { membershipNumber: '11!790', description: 'Special character in the middle' },
        { membershipNumber: '', description: 'Empty membership number' },
        { membershipNumber: undefined, description: 'Undefined membership number' },
        { membershipNumber: Boolean, description: 'Boolean membership number' },
        { membershipNumber: null, description: 'Null membership number' },
        { membershipNumber: true, description: 'Boolean true membership number' },
        { membershipNumber: false, description: 'Boolean false membership number' },
        { membershipNumber: '11790 ', description: 'Trailing space' },
        { membershipNumber: '11O90', description: 'Letter "O" instead of zero' },
        { membershipNumber: '1179O', description: 'Letter "O" at the end' },
        { membershipNumber: '11-790', description: 'Hyphen in the middle' },
        { membershipNumber: '1179011790', description: 'Too long membership number' },
        { membershipNumber: '11 790', description: 'Space in the middle' },
        { membershipNumber: '!11790', description: 'Special character at the start' },
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'ICMAI Membership Verification');
    filteredTestCases.forEach((testCase) => {
        invalidMembershipNumber.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Membership Number : ${invalidCase.membershipNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, membershipNumber: invalidCase.membershipNumber }; 

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