/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test ESIC Employer Search API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidStateDistEmpNAme = [
        //1. Valid State and Invalid District and Employer Name
        { state: 'Madhya Pradesh', district: '', employerName: '', description: 'Valid State and empty district and employerName' },
        { state: 'Madhya Pradesh', district: 12345, employerName: 67890, description: 'Valid State and numeric district and employerName' },
        { state: 'Madhya Pradesh', district: null, employerName: null, description: 'Valid State and null district and employerName' },
        { state: 'Madhya Pradesh', district: undefined, employerName: undefined, description: 'Valid State and undefined district and employerName' },
        { state: 'Madhya Pradesh', district: true, employerName: false, description: 'Valid State and boolean district and employerName' },
        { state: 'Madhya Pradesh', district: false, employerName: true, description: 'Valid State and boolean false district and boolean true employerName' },
        { state: 'Madhya Pradesh', district: '123MainSt.', employerName: 'Company123!', description: 'Valid State and district with numbers and employerName with special characters' },
        { state: 'Madhya Pradesh', district: '\t', employerName: '\t', description: 'Valid State and tab character district and employerName' },
        { state: 'Madhya Pradesh', district: '\n', employerName: '\n', description: 'Valid State and newline character district and employerName' },
        { state: 'Madhya Pradesh', district: 'Bho\0pal', employerName: 't\0ata', description: 'Valid State and district with null character and employerName with null character' },


        //2. Valid District and Invalid State and Employer Name
        { state: '', district: 'Bhopal', employerName: '', description: 'Empty state, Valid district and empty employerName' },
        { state: 12345, district: 'Bhopal', employerName: 67890, description: 'Numeric state, Valid district and numeric employerName' },
        { state: null, district: 'Bhopal', employerName: null, description: 'Null state, Valid district and null employerName' },
        { state: undefined, district: 'Bhopal', employerName: undefined, description: 'Undefined state, Valid district and undefined employerName' },
        { state: true, district: 'Bhopal', employerName: false, description: 'Boolean state, Valid district and boolean employerName' },
        { state: false, district: 'Bhopal', employerName: true, description: 'Boolean false state, Valid district and boolean true employerName' },
        { state: '123MainSt.', district: 'Bhopal', employerName: 'Company123!', description: 'State with numbers, Valid district and employerName with special characters' },
        { state: '\t', district: 'Bhopal', employerName: '\t', description: 'Tab character state, Valid district and tab character employerName' },
        { state: '\n', district: 'Bhopal', employerName: '\n', description: 'Newline character state, Valid district and newline character employerName' },
        { state: 'Mad\0hya Pradesh', district: 'Bhopal', employerName: 'ta\0ta', description: 'State with null character, Valid district and employerName with null character' },


        //3. Valid Employer Name and Invalid State and District
        { state: '', district: '', employerName: 'tata', description: 'Empty state and district, Valid employerName' },
        { state: 12345, district: 67890, employerName: 'tata', description: 'Numeric state and district, Valid employerName' },
        { state: null, district: null, employerName: 'tata', description: 'Null state and district, Valid employerName' },
        { state: undefined, district: undefined, employerName: 'tata', description: 'Undefined state and district, Valid employerName' },
        { state: true, district: false, employerName: 'tata', description: 'Boolean state and district, Valid employerName' },
        { state: false, district: true, employerName: 'tata', description: 'Boolean false state and boolean true district, Valid employerName' },
        { state: '123MainSt.', district: 'Company123!', employerName: 'tata', description: 'State with numbers and district with special characters, Valid employerName' },
        { state: '\t', district: '\t', employerName: 'tata', description: 'Tab character state and district, Valid employerName' },
        { state: '\n', district: '\n', employerName: 'tata', description: 'Newline character state and district, Valid employerName' },
        { state: 'Mad\0hya Pradesh', district: 'Bho\0pal', employerName: 'tata', description: 'State with null character and district with null character, Valid employerName' },
        

        //4. Valid State and District and Invalid Employer Name
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: '', description: 'Valid State and district, empty employerName' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: 12345, description: 'Valid State and district, numeric employerName' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: null, description: 'Valid State and district, null employerName' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: undefined, description: 'Valid State and district, undefined employerName' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: false, description: 'Valid State and district, boolean false employerName' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: 'Company123!', description: 'Valid State and district, employerName with special characters' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: '\t', description: 'Valid State and district, tab character employerName' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: '\n', description: 'Valid State and district, newline character employerName' },
        { state: 'Madhya Pradesh', district: 'Bhopal', employerName: 'ta\0ta', description: 'Valid State and district, employerName with null character' },
        // { state: 'Madhya Pradesh', district: 'Bhopal', employerName: true, description: 'Valid State and district, boolean employerName' },


        //5. Valid State and Employer Name and Invalid District
        { state: 'Madhya Pradesh', district: '', employerName: 'tata', description: 'Valid State and employerName, empty district' },
        { state: 'Madhya Pradesh', district: 12345, employerName: 'tata', description: 'Valid State and employerName, numeric district' },
        { state: 'Madhya Pradesh', district: null, employerName: 'tata', description: 'Valid State and employerName, null district' },
        { state: 'Madhya Pradesh', district: undefined, employerName: 'tata', description: 'Valid State and employerName, undefined district' },
        { state: 'Madhya Pradesh', district: true, employerName: 'tata', description: 'Valid State and employerName, boolean district' },
        { state: 'Madhya Pradesh', district: false, employerName: 'tata', description: 'Valid State and employerName, boolean false district' },
        { state: 'Madhya Pradesh', district: 'Company123!', employerName: 'tata', description: 'Valid State and employerName, district with special characters' },
        { state: 'Madhya Pradesh', district: '\t', employerName: 'tata', description: 'Valid State and employerName, tab character district' },
        { state: 'Madhya Pradesh', district: '\n', employerName: 'tata', description: 'Valid State and employerName, newline character district' },
        { state: 'Madhya Pradesh', district: 'Bho\0pal', employerName: 'tata', description: 'Valid State and employerName, district with null character' },

        
        //6. Valid Employer Name and District and Invalid State
        { state: '', district: 'Bhopal', employerName: 'tata', description: 'Empty state, Valid district and employerName' },
        { state: 12345, district: 'Bhopal', employerName: 'tata', description: 'Numeric state, Valid district and employerName' },
        { state: null, district: 'Bhopal', employerName: 'tata', description: 'Null state, Valid district and employerName' },
        { state: undefined, district: 'Bhopal', employerName: 'tata', description: 'Undefined state, Valid district and employerName' },
        { state: true, district: 'Bhopal', employerName: 'tata', description: 'Boolean state, Valid district and employerName' },
        { state: false, district: 'Bhopal', employerName: 'tata', description: 'Boolean false state, Valid district and employerName' },
        { state: '123MainSt.', district: 'Bhopal', employerName: 'tata', description: 'State with numbers, Valid district and employerName' },
        { state: '\t', district: 'Bhopal', employerName: 'tata', description: 'Tab character state, Valid district and employerName' },
        { state: '\n', district: 'Bhopal', employerName: 'tata', description: 'Newline character state, Valid district and employerName' },
        { state: 'Mad\0hya Pradesh', district: 'Bhopal', employerName: 'tata', description: 'State with null character, Valid district and employerName' },
        

        //7. Invalid All State, District and Employer Name
        { state: '', district: '', employerName: '', description: 'Empty state, district and employerName' },
        { state: 12345, district: 67890, employerName: 111213, description: 'Numeric state, district and employerName' },
        { state: null, district: null, employerName: null, description: 'Null state, district and employerName' },
        { state: undefined, district: undefined, employerName: undefined, description: 'Undefined state, district and employerName' },
        { state: true, district: false, employerName: true, description: 'Boolean state, district and employerName' },
        { state: false, district: true, employerName: false, description: 'Boolean false state, boolean true district and boolean false employerName' },
        { state: '123MainSt.', district: 'Company123!', employerName: '123!', description: 'State with numbers, district and employerName with special characters' },
        { state: '\t', district: '\t', employerName: '\t', description: 'Tab character state, district and employerName' },
        { state: '\n', district: '\n', employerName: '\n', description: 'Newline character state, district and employerName' },
        { state: 'Mad\0hya Pradesh', district: 'Bho\0pal', employerName: 'ta\0ta', description: 'State, district and employerName with null character' },

    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EWC002': 'Incorrect UserName Or Password.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'ESIC Employer Search');
    filteredTestCases.forEach((testCase) => {
        invalidStateDistEmpNAme.forEach((invalidCase) => {                                                      
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} State : ${invalidCase.state}, District : ${invalidCase.district} and Employee Name : ${invalidCase.employerName}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, state: invalidCase.state, district: invalidCase.district, employerName: invalidCase.employerName }; 

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