/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Anti Money Laundering detail API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidMatchScoreName = [
        // 1. Valid matchScoreThreshold and Invalid name
        { matchScoreThreshold: '0.10', name: '', description: 'Empty name' },
        { matchScoreThreshold: '0.10', name: '!@#$%', description: 'Special characters name' },
        { matchScoreThreshold: '0.10', name: '   ', description: 'Whitespace name' },
        { matchScoreThreshold: '0.10', name: null, description: 'Null name' },
        { matchScoreThreshold: '0.10', name: undefined, description: 'Undefined name' },
        { matchScoreThreshold: '0.10', name: 'Lalu\0yadav', description: 'Name with null character' },
        { matchScoreThreshold: '0.10', name: 'Lalu\uD83D\uDE00yadav', description: 'Name with emoji' },

        //2. Valid name and Invalid matchScoreThreshold
        { matchScoreThreshold: '', name: 'Lalu yadav', description: 'Empty matchScoreThreshold' },
        { matchScoreThreshold: 'abc', name: 'Lalu yadav', description: 'Alphabetic matchScoreThreshold' },
        { matchScoreThreshold: '!@#$', name: 'Lalu yadav', description: 'Special characters matchScoreThreshold' },
        { matchScoreThreshold: '123abc', name: 'Lalu yadav', description: 'Alphanumeric matchScoreThreshold' },
        { matchScoreThreshold: '  ', name: 'Lalu yadav', description: 'Whitespace matchScoreThreshold' },
        { matchScoreThreshold: null, name: 'Lalu yadav', description: 'Null matchScoreThreshold' },
        { matchScoreThreshold: undefined, name: 'Lalu yadav', description: 'Undefined matchScoreThreshold' },
        { matchScoreThreshold: true, name: 'Lalu yadav', description: 'Boolean true matchScoreThreshold' },
        { matchScoreThreshold: false, name: 'Lalu yadav', description: 'Boolean false matchScoreThreshold' },
        { matchScoreThreshold: '-0.10', name: 'Lalu yadav', description: 'Negative matchScoreThreshold' },
        { matchScoreThreshold: '0.1a', name: 'Lalu yadav', description: 'matchScoreThreshold with trailing letter' },
        { matchScoreThreshold: '0.1 ', name: 'Lalu yadav', description: 'matchScoreThreshold with trailing space' },
        { matchScoreThreshold: ' 0.1', name: 'Lalu yadav', description: 'matchScoreThreshold with leading space' },
        { matchScoreThreshold: '\t0.10', name: 'Lalu yadav', description: 'matchScoreThreshold with tab' },
        { matchScoreThreshold: '\n0.10', name: 'Lalu yadav', description: 'matchScoreThreshold with newline' },
        { matchScoreThreshold: '\u200B0.10', name: 'Lalu yadav', description: 'matchScoreThreshold with zero-width space' },
        { matchScoreThreshold: '0.10%', name: 'Lalu yadav', description: 'matchScoreThreshold with percent symbol' },
        { matchScoreThreshold: '0.10&', name: 'Lalu yadav', description: 'matchScoreThreshold with ampersand' },
        { matchScoreThreshold: '0.10#', name: 'Lalu yadav', description: 'matchScoreThreshold with hash symbol' },

        //3. Invalid both matchScoreThreshold and name
        { matchScoreThreshold: '', name: '', description: 'Empty matchScoreThreshold and name' },
        { matchScoreThreshold: 'abc', name: '12345', description: 'Alphabetic matchScoreThreshold and numeric name' },
        { matchScoreThreshold: '!@#$', name: '!@#$%', description: 'Special characters in both fields' },
        { matchScoreThreshold: '123abc', name: 'Lalu123', description: 'Alphanumeric matchScoreThreshold and name' },
        { matchScoreThreshold: '  ', name: '   ', description: 'Whitespace in both fields' },
        { matchScoreThreshold: null, name: null, description: 'Null matchScoreThreshold and name' },
        { matchScoreThreshold: undefined, name: undefined, description: 'Undefined matchScoreThreshold and name' },
        { matchScoreThreshold: true, name: true, description: 'Boolean true matchScoreThreshold and name' },
        { matchScoreThreshold: false, name: false, description: 'Boolean false matchScoreThreshold and name' },
        { matchScoreThreshold: '-0.10', name: 'Lalu\tyadav', description: 'Negative matchScoreThreshold and name with tab character' },
        { matchScoreThreshold: '0.1a', name: 'Lalu\nyadav', description: 'matchScoreThreshold with trailing letter and name with newline character' },
        { matchScoreThreshold: '0.1 ', name: 'Lalu\u200Byadav', description: 'matchScoreThreshold with trailing space and name with zero-width space' },
        { matchScoreThreshold: ' 0.1', name: 'Lalu_yadav', description: 'matchScoreThreshold with leading space and name with underscore' },
        { matchScoreThreshold: '\t0.10', name: 'Lalu yadav!', description: 'matchScoreThreshold with tab and name with exclamation mark' },
        { matchScoreThreshold: '\n0.10', name: 'L@lu yadav', description: 'matchScoreThreshold with newline and name with @ symbol' },
        { matchScoreThreshold: '\u200B0.10', name: 'Lalu yadav%', description: 'matchScoreThreshold with zero-width space and name with percent symbol' },
        { matchScoreThreshold: '0.10%', name: 'Lalu yadav&', description: 'matchScoreThreshold with percent symbol and name with ampersand' },
        { matchScoreThreshold: '0.10&', name: 'Lalu\0yadav', description: 'matchScoreThreshold with ampersand and name with null character' },
        { matchScoreThreshold: '0.10#', name: 'Lalu\uD83D\uDE00yadav', description: 'matchScoreThreshold with hash symbol and name with emoji' },


        // { matchScoreThreshold: '0.10', name: true, description: 'Boolean true name' },
        // { matchScoreThreshold: '0.10', name: false, description: 'Boolean false name' },
        // { matchScoreThreshold: '0.10', name: 'Lalu_yadav', description: 'Name with underscore' },
        // { matchScoreThreshold: '0.10', name: 'Lalu yadav!', description: 'Name with exclamation mark' },
        // { matchScoreThreshold: '0.10', name: 'L@lu yadav', description: 'Name with @ symbol' },
        // { matchScoreThreshold: '0.10', name: 'Lalu yadav%', description: 'Name with percent symbol' },
        // { matchScoreThreshold: '0.10', name: 'Lalu yadav&', description: 'Name with ampersand' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Anti Money Laundering detail- Entity');
    filteredTestCases.forEach((testCase) => {
        invalidMatchScoreName.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Match Score Threshold : ${invalidCase.matchScoreThreshold} and Name : ${invalidCase.name}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, matchScoreThreshold: invalidCase.matchScoreThreshold, name: invalidCase.name }; 

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