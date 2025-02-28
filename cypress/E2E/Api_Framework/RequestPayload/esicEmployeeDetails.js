/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test ESIC Employee Details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidLogin = [
    // Invalid usernames
    { username: 'invalidUser', password: '8433156712Xyz!', description: 'Invalid username with non-numeric characters' },
    { username: '693236650', password: '8433156712Xyz!', description: 'Invalid username with less than required digits' },
    { username: '693236650512345', password: '8433156712Xyz!', description: 'Invalid username with more than required digits' },
    { username: '69323 66505', password: '8433156712Xyz!', description: 'Invalid username with embedded space' },
    { username: '69323\t66505', password: '8433156712Xyz!', description: 'Invalid username with tab character' },
    { username: '', password: '8433156712Xyz!', description: 'Empty username' },
    { username: null, password: '8433156712Xyz!', description: 'Null username' },
    { username: undefined, password: '8433156712Xyz!', description: 'Undefined username' },
    { username: true, password: '8433156712Xyz!', description: 'Boolean true as username' },
    { username: false, password: '8433156712Xyz!', description: 'Boolean false as username' },

    // Invalid passwords
    { username: '6932366505', password: 'invalidPass', description: 'Invalid password with no special characters' },
    { username: '6932366505', password: '8433', description: 'Invalid password with less than required characters' },
    { username: '6932366505', password: '8433156712Xyz!@#$%^&*()', description: 'Invalid password with more than required characters' },
    { username: '6932366505', password: '8433 156712Xyz!', description: 'Invalid password with embedded space' },
    { username: '6932366505', password: '8433\t156712Xyz!', description: 'Invalid password with tab character' },
    { username: '6932366505', password: '', description: 'Empty password' },
    { username: '6932366505', password: null, description: 'Null password' },
    { username: '6932366505', password: undefined, description: 'Undefined password' },
    { username: '6932366505', password: true, description: 'Boolean true as password' },
    { username: '6932366505', password: false, description: 'Boolean false as password' },

    // Invalid both username and password
    { username: '6932066505', password: '8433156712Xyz!', description: 'Invalid username and password' },
    { username: '693236650', password: '8433', description: 'Invalid username and password with less than required characters' },
    { username: '', password: '', description: 'Empty username and password' },
    { username: null, password: null, description: 'Null username and password' },
    { username: undefined, password: undefined, description: 'Undefined username and password' },
    { username: true, password: true, description: 'Boolean true as username and password' },
    { username: false, password: false, description: 'Boolean false as username and password' }
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EWC002': 'Incorrect UserName Or Password.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'ESIC Employee Details');
    filteredTestCases.forEach((testCase) => {
        invalidLogin.forEach((invalidCase) => {                                                      
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} ESIC Employee Details,  Username: ${invalidCase.username} and Password: ${invalidCase.password}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, username: invalidCase.username, password: invalidCase.password }; 

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