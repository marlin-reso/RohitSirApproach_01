/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test CA Membership API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidCAMembership = [
        { membershipNumber: '', description: 'Empty string' },
        { membershipNumber: ' ', description: 'Single space' },
        { membershipNumber: '12345', description: 'Too short' },
        { membershipNumber: '12345678901234567890', description: 'Too long' },
        { membershipNumber: 'ABCDE', description: 'All letters' },
        { membershipNumber: '12345A', description: 'Ends with letter' },
        { membershipNumber: 'A12345', description: 'Starts with letter' },
        { membershipNumber: '123 456', description: 'Embedded space' },
        { membershipNumber: '123-456', description: 'Hyphen' },
        { membershipNumber: '123_456', description: 'Underscore' },
        { membershipNumber: '123.456', description: 'Period' },
        { membershipNumber: '123/456', description: 'Slash' },
        { membershipNumber: '123\\456', description: 'Backslash' },
        { membershipNumber: '123+456', description: 'Plus sign' },
        { membershipNumber: '123*456', description: 'Asterisk' },
        { membershipNumber: '123#456', description: 'Hash' },
        { membershipNumber: '123@456', description: 'At symbol' },
        { membershipNumber: '123!456', description: 'Exclamation mark' },
        { membershipNumber: '123$456', description: 'Dollar sign' },
        { membershipNumber: '123%456', description: 'Percent sign' },
        { membershipNumber: '123^456', description: 'Caret' },
        { membershipNumber: '123&456', description: 'Ampersand' },
        { membershipNumber: '123(456', description: 'Opening parenthesis' },
        { membershipNumber: '123)456', description: 'Closing parenthesis' },
        { membershipNumber: '123456!', description: 'Trailing exclamation' },
        { membershipNumber: '!123456', description: 'Leading exclamation' },
        { membershipNumber: '123456 ', description: 'Trailing space' },
        { membershipNumber: ' 123456', description: 'Leading space' },
        { membershipNumber: '123456#', description: 'Trailing hash' },
        { membershipNumber: '#123456', description: 'Leading hash' },
        { membershipNumber: '12*34*56', description: 'Multiple asterisks' },
        { membershipNumber: '12+34+56', description: 'Multiple plus signs' },
        { membershipNumber: '12/34/56', description: 'Multiple slashes' },
        { membershipNumber: '12.34.56', description: 'Multiple periods' },
        { membershipNumber: '12-34-56', description: 'Multiple hyphens' },
        { membershipNumber: '12_34_56', description: 'Multiple underscores' },
        { membershipNumber: '12\\34\\56', description: 'Multiple backslashes' },
        { membershipNumber: '12#34#56', description: 'Multiple hashes' },
        { membershipNumber: '12@34@56', description: 'Multiple at symbols' },
        { membershipNumber: '12&34&56', description: 'Multiple ampersands' },
        { membershipNumber: '12%34%56', description: 'Multiple percent signs' },
        { membershipNumber: '12^34^56', description: 'Multiple carets' },
        { membershipNumber: '12$34$56', description: 'Multiple dollar signs' },
        { membershipNumber: '12!34!56', description: 'Multiple exclamations' },
        { membershipNumber: '12(34)56', description: 'Parentheses' },
        { membershipNumber: '12[34]56', description: 'Square brackets' },
        { membershipNumber: '12{34}56', description: 'Curly braces' },
        { membershipNumber: '1234567890A', description: 'Exceeds length with letter' },
        { membershipNumber: 'A1234567890', description: 'Exceeds length with leading letter' },
        { membershipNumber: null, description: 'Null value' },
        { membershipNumber: undefined, description: 'Undefined value' },
        { membershipNumber: true, description: 'Boolean true' },
        { membershipNumber: false, description: 'Boolean false' },
        { membershipNumber: '1234567890%', description: 'Ends with special character' },
        { membershipNumber: '%1234567890', description: 'Starts with special character' },
        { membershipNumber: '001309', description: 'No iformation num' }
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'CA Membership Verification');
    filteredTestCases.forEach((testCase) => {
        invalidCAMembership.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} CA Menbership : ${invalidCase.membershipNumber}`, () => {
    
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