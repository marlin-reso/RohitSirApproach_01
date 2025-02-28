/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test ICSI API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidMembershipNumberType = [
        //Invalid membershipNumber and Valid memberType
        { membershipNumber: 1, memberType: 'FCS', description: 'Membership number as number' },
        { membershipNumber: '5438*', memberType: 'FCS', description: 'Special character at the end' },
        { membershipNumber: '54@38', memberType: 'FCS', description: 'Special character in the middle' },
        { membershipNumber: '543 8', memberType: 'FCS', description: 'Whitespace in the middle' },
        { membershipNumber: '543_8', memberType: 'FCS', description: 'Underscore in the middle' },
        { membershipNumber: 'A5438', memberType: 'FCS', description: 'Alphabetic character at the start' },
        { membershipNumber: '543/8', memberType: 'FCS', description: 'Slash in the middle' },
        { membershipNumber: ' 5438', memberType: 'FCS', description: 'Leading space' },
        { membershipNumber: 'ABCDE', memberType: 'FCS', description: 'All alphabetic characters' },
        { membershipNumber: '54!38', memberType: 'FCS', description: 'Special character in the middle' },
        { membershipNumber: '', memberType: 'FCS', description: 'Empty membership number' },
        { membershipNumber: undefined, memberType: 'FCS', description: 'Undefined membership number' },
        { membershipNumber: Boolean, memberType: 'FCS', description: 'Boolean membership number' },
        { membershipNumber: null, memberType: 'FCS', description: 'Null membership number' },
        { membershipNumber: true, memberType: 'FCS', description: 'Boolean true membership number' },
        { membershipNumber: false, memberType: 'FCS', description: 'Boolean false membership number' },

        //Invalid memberType and Valid membershipNumber
        { membershipNumber: '5438', memberType: 'F@', description: 'Special character in member type' },
        { membershipNumber: '5438', memberType: '4F', description: 'Numeric character in member type' },
        { membershipNumber: '5438', memberType: 'F1C2', description: 'Alphanumeric member type' },
        { membershipNumber: '5438', memberType: 'F', description: 'Single character member type' },
        { membershipNumber: '5438', memberType: 'F S', description: 'Embedded spaces in member type' },
        { membershipNumber: '5438', memberType: 'F_S', description: 'Underscore in member type' },
        { membershipNumber: '5438', memberType: 'FCS ', description: 'Trailing space in member type' },
        { membershipNumber: '5438', memberType: '', description: 'Empty member type' },
        { membershipNumber: '5438', memberType: undefined, description: 'Undefined member type' },
        { membershipNumber: '5438', memberType: Boolean, description: 'Boolean member type' },
        { membershipNumber: '5438', memberType: null, description: 'Null member type' },
        { membershipNumber: '5438', memberType: true, description: 'Boolean true member type' },
        { membershipNumber: '5438', memberType: false, description: 'Boolean flase member type' },

        //Invalid Both membershipNumber and memberType
        { membershipNumber: '', memberType: '', description: 'Both blank' },
        { membershipNumber: '543', memberType: 'F', description: 'Too short membership number with single-character member type' },
        { membershipNumber: '54', memberType: 'FC', description: 'Very short membership number with invalid member type' },
        { membershipNumber: '5438@', memberType: 'F@', description: 'Special characters in both fields' },
        { membershipNumber: '543/8', memberType: 'F#', description: 'Slash in membership number and special character in member type' },
        { membershipNumber: '5438 ', memberType: ' F S', description: 'Trailing space in membership number and leading space in member type' },
        { membershipNumber: '54O38', memberType: 'F1S2', description: 'Letter "O" instead of zero in membership number and alphanumeric member type' },
        { membershipNumber: 'ABCDE', memberType: 'FULL', description: 'All alphabetic characters in membership number and too long member type' },
        { membershipNumber: undefined, memberType: undefined, description: 'Undefined membership number and member type' },
        { membershipNumber: Boolean, memberType: Boolean, description: 'Boolean membership number and member type' },
        { membershipNumber: true, memberType: Boolean, description: 'Boolean true membership number and member type' },
        { membershipNumber: false, memberType: Boolean, description: 'Boolean false membership number and member type' },
        { membershipNumber: null, memberType: null, description: 'Null membership number and member type' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'ICSI Membership Verification FCS');
    filteredTestCases.forEach((testCase) => {
        invalidMembershipNumberType.forEach((invalidCase) => {                                                    
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Membership Number : ${invalidCase.membershipNumber} and Member Type : ${invalidCase.memberType}`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, membershipNumber: invalidCase.membershipNumber,  memberType: invalidCase.memberType}; 

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