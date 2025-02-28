/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test EPFO Retail Data Fetch API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidUANPwd = [
        { uanNumber: '000000000000', password: 'WrongPassword', description: 'Invalid UAN and Password' },
        { uanNumber: '101788500569', password: 'WrongPassword', description: 'Valid UAN and Invalid Password' },
        { uanNumber: '000000000000', password: 'Dinesh@1999', description: 'Invalid UAN and Valid Password' },
        { uanNumber: '', password: '', description: 'Empty UAN and Password' },
        { uanNumber: '101788500569', password: '', description: 'Valid UAN and Empty Password' },
        { uanNumber: '', password: 'Dinesh@1999', description: 'Empty UAN and Valid Password' },
        { uanNumber: null, password: 'Dinesh@1999', description: 'Null UAN and Valid Password' },
        // { uanNumber: '101788500569', password: null, description: 'Valid UAN and Null Password' },
        { uanNumber: undefined, password: 'Dinesh@1999', description: 'Undefined UAN and Valid Password' },
        { uanNumber: '101788500569', password: undefined, description: 'Valid UAN and Undefined Password' },
        { uanNumber: true, password: 'Dinesh@1999', description: 'Boolean True UAN and Valid Password' },
        // { uanNumber: '101788500569', password: true, description: 'Valid UAN and Boolean True Password' },
        { uanNumber: false, password: 'Dinesh@1999', description: 'Boolean False UAN and Valid Password' },
        // { uanNumber: '101788500569', password: false, description: 'Valid UAN and Boolean False Password' },
        { uanNumber: 1234567890, password: 'Dinesh@1999', description: 'Number UAN and Valid Password' },
        { uanNumber: '101788500569', password: 1234567890, description: 'Valid UAN and Number Password' },   
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIC240': 'Incorrect credentials.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
        'EPE417': 'Your password has expired. Please reset using forgot password.',
        'EWC002': 'Incorrect UserName Or Password.',
    };

    
    const filteredTestCases = testCases.filter(testCase => testCase.name === 'EPFO Retail Data Fetch');
    filteredTestCases.forEach((testCase) => {
        invalidUANPwd.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} uan number : ${invalidCase.uanNumber} and password : ${invalidCase.password}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, uanNumber: invalidCase.uanNumber,  password: invalidCase.password}; 

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