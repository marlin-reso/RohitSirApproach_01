/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test EPF Enterprise Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidEstablishmentName = [
        { establishmentName: '', description: 'Empty string for establishment name' },
        { establishmentName: undefined, description: 'Undefined establishment name' },
        { establishmentName: Boolean, description: 'Boolean for establishment name' },
        { establishmentName: 'ScoreMe$', description: 'Special character ($) in establishment name' },
        { establishmentName: 'ScoreMe#', description: 'Special character (#) in establishment name' },
        { establishmentName: 'ScoreMe@', description: 'Special character (@) in establishment name' },
        { establishmentName: 'ScoreMe^', description: 'Special character (^) in establishment name' },
        { establishmentName: 'ScoreMe&', description: 'Special character (&) in establishment name' },
        { establishmentName: 'ScoreMe*', description: 'Special character (*) in establishment name' },
        { establishmentName: 'ScoreMe(', description: 'Special character (() in establishment name' },
        { establishmentName: 'ScoreMe)', description: 'Special character ()) in establishment name' },
        { establishmentName: 'ScoreMe+', description: 'Special character (+) in establishment name' },
        { establishmentName: 'ScoreMe=', description: 'Special character (=) in establishment name' },
        { establishmentName: 'ScoreMe~', description: 'Special character (~) in establishment name' },
        { establishmentName: 'ScoreMe`', description: 'Special character (`) in establishment name' },
        { establishmentName: 'ScoreMe\\', description: 'Backslash in establishment name' },
        { establishmentName: 'ScoreMe|', description: 'Pipe character in establishment name' },    
        { establishmentName: 'ScoreMe<', description: 'Less-than sign in establishment name' },
        { establishmentName: 'ScoreMe>', description: 'Greater-than sign in establishment name' },
        { establishmentName: 'ScoreMe/', description: 'Forward slash in establishment name' },
        { establishmentName: 'ScoreMe?', description: 'Question mark in establishment name' },
        { establishmentName: 'ScoreMe.', description: 'Period in establishment name' },
        { establishmentName: 'ScoreMe,', description: 'Comma in establishment name' },
        { establishmentName: 'ScoreMe:', description: 'Colon in establishment name' },
        { establishmentName: 'ScoreMe;', description: 'Semicolon in establishment name' },
        { establishmentName: 'ScoreMe"', description: 'Double quote in establishment name' },
        { establishmentName: "ScoreMe'", description: 'Single quote in establishment name' },
        { establishmentName: 'ScoreMe-', description: 'Hyphen in establishment name' },
        { establishmentName: 'ScoreMe+', description: 'Plus sign in establishment name' },

        // { establishmentName: null, description: 'Null establishment name' },
        // { establishmentName: true, description: 'Boolean value for establishment name (true)' },
        // { establishmentName: false, description: 'Boolean value for establishment name (false)' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'EPF Enterprise Verification');
    filteredTestCases.forEach((testCase) => {
        invalidEstablishmentName.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Establishment Name : ${invalidCase.establishmentName}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, establishmentName: invalidCase.establishmentName }; 

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