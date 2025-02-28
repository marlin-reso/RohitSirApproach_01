/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test reverse RC API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    //MA1YU2HHUF6K12744
    const invalidMobileNo = [
        { chassisNumber: '',  description: 'Empty chassis Number' },
        { chassisNumber: 'MA1YU2HHUF6K12',  description: 'Too Short chassis Number' },
        { chassisNumber: 'MA1YU2HHUF6K127441234',  description: 'Too Long chassis Number' },
        { chassisNumber: 'abcdefghij',  description: 'Non-Numeric chassis Number' },
        { chassisNumber: ' MA1YU2HHUF6K12744',  description: 'Leading space in chassis Number' },
        { chassisNumber: 'MA1YU2HHUF6K12744 ',  description: 'Trailing space in chassis Number' },
        { chassisNumber: 'XXMA1YU2HHUF6K12744 ',  description: 'Start with invalid series chassis Number' },
       
        { chassisNumber: 'MA1YU2H HUF6K12744',  description: 'Between space in chassis Number' },
        { chassisNumber: 'MA1YU2HH\tUF6K12744',  description: 'Between space in chassis Number' },
        { chassisNumber: 'MAAYUBHHUFFKABGDD',  description: 'chassis Number must be numeric' },
        { chassisNumber: 'MA1YU2HHUF6K12%$#744',  description: 'Special charector in mobile nuspember' },
        { chassisNumber: ' MA1YU2HHUF6K12744 ',  description: 'Both side White space in chassis Number' },
        { chassisNumber: '_MA1YU2HHUF6K12744',  description: 'Underscore in chassis Number' },
        { chassisNumber: 'MA1YU2HHUF6K12744444444',  description: 'Boundry value test in chassis Number' },
        { chassisNumber: 123456789012,  description: 'Both side White space in chassis Number' },
    
       //12345678901234567
        { chassisNumber: ['MA1YU2HHUF6K12744'],  description: 'Passing array in chassis Number' },
        { chassisNumber: {chassisNumber: 'MA1YU2HHUF6K12744'},  description: 'Json in chassis Number' },
        { chassisNumber: Boolean,  description: 'boolean in chassis Number' },
        { chassisNumber: null, description: 'Null chassis Number' },
        { chassisNumber: true,  description: 'chassis Number as Boolean True' },
        { chassisNumber: false,  description: 'chassis Number as Boolean False' },
        { chassisNumber: undefined,  description: 'chassis Number as Undefined' },
       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIM153': 'Incorrect chassis Number.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.'
    };

    
    const filteredTestCases = testCases.filter(testCase => testCase.name === 'reverse rc');
    filteredTestCases.forEach((testCase) => {
        invalidMobileNo.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} chassisNumber : ${invalidCase.chassisNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, chassisNumber: invalidCase.chassisNumber }; 

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