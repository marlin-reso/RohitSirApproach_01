/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test PAN Verification V2 API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidNameDobPan = [
        // 1. Valid name and invalid dateOfBirth and Pan
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '32-Dec-2005', pan: 'BRFPN9124$', description: 'Valid name and invalid dateOfBirth with invalid day and Pan with special character' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-13-2005', pan: 'BRFPN912', description: 'Valid name and invalid dateOfBirth with invalid month and Pan too short' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '2005-Dec-12', pan: '1234', description: 'Valid name and invalid dateOfBirth in wrong format and Pan too short' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '', pan: '', description: 'Valid name and blank dateOfBirth and Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: null, pan: null, description: 'Valid name and null dateOfBirth and Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: undefined, pan: undefined, description: 'Valid name and undefined dateOfBirth and Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: true, pan: true, description: 'Valid name and boolean true dateOfBirth and Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: false, pan: false, description: 'Valid name and boolean false dateOfBirth and Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: Boolean, pan: Boolean, description: 'Valid name and boolean dateOfBirth and Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: 123456, pan: 123456, description: 'Valid name and number dateOfBirth and Pan' },

        // 2. Valid dateOfBirth and invalid name and Pan
        { name: 'RESURGENT INDIA LIM!', dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124$', description: 'Invalid name with special character and invalid Pan with special character' },
        { name: 'RESURGENT123', dateOfBirth: '12-Dec-2005', pan: 'BRFPN', description: 'Invalid name with numbers and invalid Pan too short' },
        { name: 'RESURGENT!@#$', dateOfBirth: '12-Dec-2005', pan: '123456', description: 'Invalid name with special characters and invalid Pan too short' },
        { name: '', dateOfBirth: '12-Dec-2005', pan: '', description: 'Blank name and valid dateOfBirth with blank Pan' },
        { name: null, dateOfBirth: '12-Dec-2005', pan: null, description: 'Null name and valid dateOfBirth with null Pan' },
        { name: undefined, dateOfBirth: '12-Dec-2005', pan: undefined, description: 'Undefined name and valid dateOfBirth with undefined Pan' },
        { name: true, dateOfBirth: '12-Dec-2005', pan: true, description: 'Boolean true name and valid dateOfBirth with boolean true Pan' },
        { name: false, dateOfBirth: '12-Dec-2005', pan: false, description: 'Boolean false name and valid dateOfBirth with boolean false Pan' },
        { name: Boolean, dateOfBirth: '12-Dec-2005', pan: Boolean, description: 'Boolean name and valid dateOfBirth with boolean false Pan' },
        { name: 123456, dateOfBirth: '12-Dec-2005', pan: 123456, description: 'number name and valid dateOfBirth with boolean false Pan' },

        // 3. Valid Pan and invalid dateOfBirth and name
        { name: '1234567890', dateOfBirth: '12-13-2005', pan: 'BRFPN9124H', description: 'Invalid name with numbers and invalid dateOfBirth with invalid month' },
        { name: '!@#$%^&*()', dateOfBirth: '2005-Dec-12', pan: 'BRFPN9124H', description: 'Invalid name with special characters and invalid dateOfBirth in wrong format' },
        { name: '', dateOfBirth: '', pan: 'BRFPN9124H', description: 'Blank name and dateOfBirth with valid Pan' },
        { name: null, dateOfBirth: null, pan: 'BRFPN9124H', description: 'Null name and dateOfBirth with valid Pan' },
        { name: undefined, dateOfBirth: undefined, pan: 'BRFPN9124H', description: 'Undefined name and dateOfBirth with valid Pan' },
        { name: true, dateOfBirth: true, pan: 'BRFPN9124H', description: 'Boolean true name and dateOfBirth with valid Pan' },
        { name: false, dateOfBirth: false, pan: 'BRFPN9124H', description: 'Boolean false name and dateOfBirth with valid Pan' },
        { name: Boolean, dateOfBirth: Boolean, pan: 'BRFPN9124H', description: 'Boolean name and dateOfBirth with valid Pan' },
        { name: 123456, dateOfBirth: 123456, pan: 'BRFPN9124H', description: 'Number name and dateOfBirth with valid Pan' },

        // 4. Valid name and dateOfBirth and invalid Pan
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124$', description: 'Valid name and dateOfBirth with invalid Pan with special character' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: 'BRFPN912', description: 'Valid name and dateOfBirth with invalid Pan too short' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: '1234', description: 'Valid name and dateOfBirth with invalid Pan too short' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: '', description: 'Valid name and dateOfBirth with blank Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: null, description: 'Valid name and dateOfBirth with null Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: undefined, description: 'Valid name and dateOfBirth with undefined Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: true, description: 'Valid name and dateOfBirth with boolean true Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: false, description: 'Valid name and dateOfBirth with boolean false Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: Boolean, description: 'Valid name and dateOfBirth with boolean Pan' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-Dec-2005', pan: 123456, description: 'Valid name and dateOfBirth with number Pan' },
    

        // 5. Valid name and Pan and invalid dateOfBirth
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '12-13-2005', pan: 'BRFPN9124H', description: 'Valid name and Pan with invalid dateOfBirth with invalid month' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '2005-Dec-12', pan: 'BRFPN9124H', description: 'Valid name and Pan with invalid dateOfBirth in wrong format' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '', pan: 'BRFPN9124H', description: 'Valid name and Pan with blank dateOfBirth' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: null, pan: 'BRFPN9124H', description: 'Valid name and Pan with null dateOfBirth' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: undefined, pan: 'BRFPN9124H', description: 'Valid name and Pan with undefined dateOfBirth' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: true, pan: 'BRFPN9124H', description: 'Valid name and Pan with boolean true dateOfBirth' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: false, pan: 'BRFPN9124H', description: 'Valid name and Pan with boolean false dateOfBirth' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: Boolean, pan: 'BRFPN9124H', description: 'Valid name and Pan with boolean dateOfBirth' },
        { name: 'RESURGENT INDIA LIMITED', dateOfBirth: 123456, pan: 'BRFPN9124H', description: 'Valid name and Pan with number dateOfBirth' },
    
        // 6. Valid dateOfBirth and Pan and invalid name
        { name: '!@#$%^&*()', dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Invalid name with special characters and valid dateOfBirth and Pan' },
        { name: '', dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Blank name and valid dateOfBirth and Pan' },
        { name: undefined, dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Undefined name and valid dateOfBirth and Pan' },
        { name: Boolean, dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Boolean name and valid dateOfBirth and Pan' },

        // 7. Invalid all name, dateOfBirth and Pan
        { name: 'RESURGENT!', dateOfBirth: '32-Dec-2005', pan: 'BRFPN9124$', description: 'Invalid name with special character and invalid dateOfBirth with invalid day and Pan with special character' },
        { name: '1234567890', dateOfBirth: '12-13-2005', pan: 'BRFPN912', description: 'Invalid name with numbers and invalid dateOfBirth with invalid month and Pan too short' },
        { name: '!@#$%^&*()', dateOfBirth: '2005-Dec-12', pan: '1234', description: 'Invalid name with special characters and invalid dateOfBirth in wrong format and Pan too short' },
        { name: '', dateOfBirth: '', pan: '', description: 'Blank name and dateOfBirth and Pan' },
        { name: null, dateOfBirth: null, pan: null, description: 'Null name and dateOfBirth and Pan' },
        { name: undefined, dateOfBirth: undefined, pan: undefined, description: 'Undefined name and dateOfBirth and Pan' },
        { name: true, dateOfBirth: true, pan: true, description: 'Boolean true name and dateOfBirth and Pan' },
        { name: false, dateOfBirth: false, pan: false, description: 'Boolean false name and dateOfBirth and Pan' },
        { name: Boolean, dateOfBirth: Boolean, pan: Boolean, description: 'Boolean name and dateOfBirth and Pan' },
        { name: 123456, dateOfBirth: 123456, pan: 123456, description: 'number name and dateOfBirth and Pan' },

        
        //The below data is invalid but it's work because of source
        // { name: null, dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Null name and valid dateOfBirth and Pan' },
        // { name: 123456, dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'number name and valid dateOfBirth and Pan' },
        // { name: true, dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Boolean true name and valid dateOfBirth and Pan' },
        // { name: false, dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Boolean false name and valid dateOfBirth and Pan' },
        // { name: 'RESURGENT!', dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Invalid name with special character and valid dateOfBirth and Pan' },
        // { name: '1234567890', dateOfBirth: '12-Dec-2005', pan: 'BRFPN9124H', description: 'Invalid name with numbers and valid dateOfBirth and Pan' },
        // { name: 'RESURGENT INDIA LIMITED', dateOfBirth: '32-Dec-2005', pan: 'BRFPN9124H', description: 'Valid name and Pan with invalid dateOfBirth with invalid day' },
        // { name: 'RESURGENT!', dateOfBirth: '32-Dec-2005', pan: 'BRFPN9124H', description: 'Invalid name with special character and invalid dateOfBirth with invalid day' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'PAN Verification V2');
    filteredTestCases.forEach((testCase) => {
        invalidNameDobPan.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, Name : ${invalidCase.name}, Date of birth : ${invalidCase.dateOfBirth}, Pan : ${invalidCase.pan}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, name: invalidCase.name, dateOfBirth: invalidCase.dateOfBirth, pan: invalidCase.pan }; 

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