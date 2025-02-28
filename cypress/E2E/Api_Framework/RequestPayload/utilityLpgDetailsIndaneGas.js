
/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test LPG details Indane Gas API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

/*
 "customerNo": "PD03GWL2269",
    "pngProvider": "AGL",
    "applicationId":"Png_Testing"
*/
    const invalidEpicNumber = [
       
        //Invalid lpgId
        { lpgId:'7000000021745012#', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'Special char  # in LPG ID' },
        { lpgId:'700000002145012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'missing numbers' },
     //   { lpgId: 7000000021745012, lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'LPG Id as a number' },
        { lpgId:'7000000021745@012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains special characters @' },
        { lpgId:'700000002 1745012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'includes spaces' },
        { lpgId:'70000000217450', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'too short' },
        { lpgId:'700000002174501222', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'too long' },
        { lpgId:' 7000000021745012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains Leading space in LPG id' },
        { lpgId:'7000000021745012 ', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains Trailling space in LPG id' },
        { lpgId:['7000000021745012'], lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains Array in LPG id' },
        { lpgId:'70000000abc45012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains  letters in LPG id'},
        { lpgId:'700-0000021745012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains special characters like hyphen or underscore' },
        { lpgId:'7.000000021745012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains Leading point in LPG id' },
        { lpgId:'700000002174501.2', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains Trailling point in LPG id' },
       // { lpgId:'7000000021745012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains Leading space in LPG id' },
       // { lpgId:'7000000021745012', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'contains Trailling space in LPG id' },
        { lpgId:' ', lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'empty string' },
        { lpgId:null, lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'Null' },
        { lpgId: true, lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'true boolean' },
        { lpgId:false, lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'false boolean' },
        { lpgId:Boolean, lpgProvider: 'INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'boolean' },
     
        //Invalid lpg provider
        { lpgId:'7000000021745012', lpgProvider: ' ',  applicationId: 'Lpg_Testing ',   description: 'lpg provider empty string' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE_GAS!',  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains special characters' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE GAS',  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains spaces' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE',  applicationId: 'Lpg_Testing ',   description: 'too short png provider' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE_GASGAS',  applicationId: 'Lpg_Testing ',   description: 'png provider too long' },
        { lpgId:'7000000021745012', lpgProvider: 'BHARAT_GAS',  applicationId: 'Lpg_Testing ',   description: 'lpg is set to different provider' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE_GAS1',  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains numbers' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE-GAS',  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains hyphen' },
        { lpgId:'7000000021745012', lpgProvider: null,  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains null' },
        { lpgId:'7000000021745012', lpgProvider: true,  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains true' },
        { lpgId:'7000000021745012', lpgProvider: false,  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains false' },
        { lpgId:'7000000021745012', lpgProvider: Boolean,  applicationId: 'Lpg_Testing ',   description: 'lpg provider contains boolean' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE__GAS',  applicationId: 'Lpg_Testing ', description: 'lpg contains Extra underscore' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANE_GAS ',  applicationId: 'Lpg_Testing ',   description: 'lpg provider trailing spaces' },
        { lpgId:'7000000021745012', lpgProvider: ' INDANE_GAS',  applicationId: 'Lpg_Testing ',   description: 'lpg provider leading spaces' },
        { lpgId:'7000000021745012', lpgProvider: 'INDANEINDANE',  applicationId: 'Lpg_Testing ',   description: 'png providert  same alphabet' },
        { lpgId:'7000000021745012', lpgProvider: ['INDANE_GAS'],  applicationId: 'Lpg_Testing ',   description: 'lpg provider As a Array' },
       
   
     
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };
    


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Utility lpg details indane gas');
    filteredTestCases.forEach((testCase) => {
        invalidEpicNumber.forEach((invalidCase) => {                                                     
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo : ${invalidCase.lpgId}, pngProvider: ${invalidCase.lpgProvider}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, lpgId: invalidCase.lpgId, pngProvider: invalidCase.lpgProvider }; 

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