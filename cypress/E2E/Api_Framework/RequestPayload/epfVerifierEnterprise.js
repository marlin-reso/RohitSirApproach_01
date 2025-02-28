/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test EPF Verifier Enterprise API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidEstablishmentNameID = [
    // Valid establishmentName and invalid establishmentId
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: 'APHYD150509100!', description: 'Special character at the end' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: 'APHYD1505@091000', description: 'Special character in the middle' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: 'APHYD 1505091000', description: 'Whitespace in the middle' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: 'APHYD150_091000', description: 'Underscore in the middle' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: 'APHYD150509100', description: 'Short establishment id' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: 'APHYD15050910000', description: 'Long establishment id' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: '', description: 'Empty establishment id' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: undefined, description: 'Undefined establishment id' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: true, description: 'Boolean true establishment id' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: false, description: 'Boolean false establishment id' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: Boolean, description: 'Boolean establishment id' },
    { establishmentName: 'FASTCOLLAB SYSTEMS LIMITED', establishmentId: 12345, description: 'number establishment id' },

    // Invalid establishmentName and valid establishmentId
    { establishmentName: 'FASTCOLLAB SYSTEMS PRIVATE LIMIT!', establishmentId: 'APHYD1505091000', description: 'Special character at the end' },
    { establishmentName: 'FASTCOLLAB SYSTEMS PRI@ATE LIMITED', establishmentId: 'APHYD1505091000', description: 'Special character in the middle' },
    { establishmentName: 'FASTCOLLAB SYSTEMS PRIVATE LIMITED ', establishmentId: 'APHYD1505091000', description: 'Trailing space' },
    { establishmentName: ' FASTCOLLAB SYSTEMS PRIVATE LIMITED', establishmentId: 'APHYD1505091000', description: 'Leading space' },
    { establishmentName: 'FASTCOLLAB SYSTEMS PRIV@TE LIMITED', establishmentId: 'APHYD1505091000', description: 'Embedded special character' },
    { establishmentName: 'FASTCOLLAB SYSTEMS PRIVATE LTD', establishmentId: 'APHYD1505091000', description: 'Shortened name' },
    { establishmentName: 'FASTCOLLAB SYSTEMS PVT LIMITED', establishmentId: 'APHYD1505091000', description: 'Abbreviation in name' },
    { establishmentName: 'FASTCOLLAB SYS. PRIVATE LIMITED', establishmentId: 'APHYD1505091000', description: 'Abbreviated part of name' },
    { establishmentName: '', establishmentId: 'APHYD1505091000', description: 'Empty establishment name' },
    { establishmentName: undefined, establishmentId: 'APHYD1505091000', description: 'Undefined establishment name' },
    { establishmentName: true, establishmentId: 'APHYD1505091000', description: 'Boolean true establishment name' },
    { establishmentName: false, establishmentId: 'APHYD1505091000', description: 'Boolean false establishment name' },
    { establishmentName: Boolean, establishmentId: 'APHYD1505091000', description: 'Boolean establishment name' },
    { establishmentName: 12345, establishmentId: 'APHYD1505091000', description: 'number establishment name' },


    // Invalid both establishmentName and establishmentId
    { establishmentName: 'FASTCOLLAB SYSTEMS PRIVATE LIMIT!', establishmentId: 'APHYD150509100!', description: 'Special characters at the end of both fields' },
    { establishmentName: 'FASTCOLLAB SYSTEMS PRI@ATE LIMITED', establishmentId: 'APHYD1505@091000', description: 'Special characters in the middle of both fields' },
    { establishmentName: 'FASTCOLLAB SYSTEMS PRIVATE LIMITED ', establishmentId: 'APHYD1505091000 ', description: 'Trailing spaces in both fields' },
    { establishmentName: ' FASTCOLLAB SYSTEMS PRIVATE LIMITED', establishmentId: ' APHYD1505091000', description: 'Leading spaces in both fields' },
    { establishmentName: 'FASTCOLLAB SYS. PRIVATE LIMITED', establishmentId: 'APHYD150509100', description: 'Abbreviation in name and short id' },
    { establishmentName: 'FASTCOLLAB SYS PRIVATE LIMITED', establishmentId: '', description: 'Valid name with empty id' },
    { establishmentName: '', establishmentId: 'APHYD1505091000', description: 'Empty name with valid id' },
    { establishmentName: '', establishmentId: '', description: 'Both fields empty' },
    { establishmentName: undefined, establishmentId: undefined, description: 'Both fields undefined' },
    { establishmentName: true, establishmentId: true, description: 'Boolean true in both fields' },
    { establishmentName: false, establishmentId: false, description: 'Boolean false in both fields' },   
    { establishmentName: Boolean, establishmentId: Boolean, description: 'Boolean in both fields' },   
    { establishmentName: 12345, establishmentId: 12345, description: 'number in both fields' },   
 ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'EPF verifier Enterprise');
    filteredTestCases.forEach((testCase) => {
        invalidEstablishmentNameID.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Establishment Name : ${invalidCase.establishmentName} and Establishment Id : ${invalidCase.establishmentId}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, establishmentName: invalidCase.establishmentName, establishmentId: invalidCase.establishmentId }; 

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