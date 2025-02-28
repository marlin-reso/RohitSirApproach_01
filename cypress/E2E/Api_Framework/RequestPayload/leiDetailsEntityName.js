/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test LEI Entity Name Search API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidentityName = [
        { entityName: 'XYZ ENTERPRISES', description: 'Entity registration is expired' },
        { entityName: '', description: 'Blank input field' },
        { entityName: '  ABC COMPANY  ', description: 'Entity name with leading and trailing spaces' },
        { entityName: 'DEF SERVICES LTD', description: 'Entity name is valid' },
        { entityName: 'JKL TECH SOLUTIONS', description: 'Entity name with numbers' },
        { entityName: 'MNO GLOBAL', description: 'Entity name too short' },
        { entityName: 'PQR INTERNATIONAL', description: 'Entity name too long' },
        { entityName: 'STU CONSULTANCY', description: 'Entity name with numbers and letters' },
        { entityName: 'VWX & CO.', description: 'Entity name with special characters' },
        { entityName: 'YZA CORPORATION', description: 'Entity name with uppercase letters' },
        { entityName: 'BCD GLOBAL ENTERPRISES', description: 'Entity name with lowercase letters' },
        { entityName: 'efg trading', description: 'Entity name with uppercase and lowercase letters' },
        { entityName: 'H I J K', description: 'Entity name with spaces' },
        { entityName: 'LMN-OPQ LIMITED', description: 'Entity name with hyphen' },
        { entityName: 'RST/UVWX LLC', description: 'Entity name with slash' },
        { entityName: 'YZ AB COMPANY', description: 'Entity name with mixed cases' },
        { entityName: undefined, description: 'Entity name is undefined' },
        { entityName: Boolean, description: 'Entity name is a boolean' },
        { entityName: null, description: 'Entity name is null' },
        { entityName: 'ScoreMe_', description: 'Underscore in entity name' },
        { entityName: 'ScoreMe%', description: 'Special character (%) in entity name' },
        { entityName: 12345, description: 'Entity name is number' },
        { entityName: true, description: 'Entity name is a boolean (true)' },
        { entityName: false, description: 'Entity name is a boolean (false)' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.', 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'LEI Details Entity Name Search');
    filteredTestCases.forEach((testCase) => {
        invalidentityName.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Entity Name : ${invalidCase.entityName}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, entityName: invalidCase.entityName }; 

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