/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test LEI Number Search API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidentityName = [
        { leiNumber: 'XYZ ENTERPRISES', description: 'Entity registration is expired' },
        { leiNumber: '', description: 'Blank input field' },
        { leiNumber: '  ABC COMPANY  ', description: 'Entity name with leading and trailing spaces' },
        { leiNumber: 'DEF SERVICES LTD', description: 'Entity name is valid' },
        { leiNumber: 'JKL TECH SOLUTIONS', description: 'Entity name with numbers' },
        { leiNumber: 'MNO GLOBAL', description: 'Entity name too short' },
        { leiNumber: 'PQR INTERNATIONAL', description: 'Entity name too long' },
        { leiNumber: 'STU CONSULTANCY', description: 'Entity name with numbers and letters' },
        { leiNumber: 'VWX & CO.', description: 'Entity name with special characters' },
        { leiNumber: 'YZA CORPORATION', description: 'Entity name with uppercase letters' },
        { leiNumber: 'BCD GLOBAL ENTERPRISES', description: 'Entity name with lowercase letters' },
        { leiNumber: 'efg trading', description: 'Entity name with uppercase and lowercase letters' },
        { leiNumber: 'H I J K', description: 'Entity name with spaces' },
        { leiNumber: 'LMN-OPQ LIMITED', description: 'Entity name with hyphen' },
        { leiNumber: 'RST/UVWX LLC', description: 'Entity name with slash' },
        { leiNumber: 'YZ AB COMPANY', description: 'Entity name with mixed cases' },
        { leiNumber: '123456', description: 'Entity name is a number' },
        { leiNumber: undefined, description: 'Entity name is undefined' },
        { leiNumber: Boolean, description: 'Entity name is boolean' },
        { leiNumber: null, description: 'Entity name is null' },
        { leiNumber: 'ScoreMe_', description: 'Underscore in entity name' },
        { leiNumber: 'ScoreMe%', description: 'Special character (%) in entity name' },
        { leiNumber: Boolean, description: 'Entity name is a boolean' },
        { leiNumber: 12345, description: 'Entity name is number' },    
        { leiNumber: true, description: 'Entity name is a boolean (true)' },
        { leiNumber: false, description: 'Entity name is a boolean (false)' },
];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.', 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'LEI Details Lei Number Search');
    filteredTestCases.forEach((testCase) => {
        invalidentityName.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Entity Name : ${invalidCase.leiNumber}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, leiNumber: invalidCase.leiNumber }; 

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