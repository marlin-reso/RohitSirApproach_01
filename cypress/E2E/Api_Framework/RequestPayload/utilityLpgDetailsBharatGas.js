
/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test LPG Details Bharat Gas API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

/*
 "lpgId": "10000000027087128",
    "lpgProvider": "BHARAT_GAS",
    "svNumber":"4060227067",
    "applicationId":"testing
    10000000027087128
*/
    const invalidEpicNumber = [
        //invalid lpgID 
        { lpgId:'1000000002708712#', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'Special char  # in LPG ID' },
        { lpgId:'1000000002707128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'missing numbers' },
      //  { lpgId: 10000000027087128, lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'LPG Id as a number' },
        { lpgId:'1000000002708@7128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains special characters @' },
        { lpgId:'100 000 0002 7087 128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'includes spaces' },
        { lpgId:'10000000027087', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'too short' },
        { lpgId:'10000000027087128123', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'too long' },
        { lpgId:' 10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains Leading space in LPG id' },
        { lpgId:'10000000027087128 ', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains Trailling space in LPG id' },
        { lpgId:['10000000027087128'], lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains Array in LPG id' },
        { lpgId:'100000000abc87128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains  letters in LPG id'},
        { lpgId:'1000-0000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains special characters like hyphen or underscore' },
        { lpgId:'1.0000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains Leading point in LPG id' },
        { lpgId:'10000000027087128.0', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains Trailling point in LPG id' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains Leading space in LPG id' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'contains Trailling space in LPG id' },
        { lpgId:' ', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'empty string' },
        { lpgId:null, lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'Null' },
        { lpgId: true, lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'true boolean' },
        { lpgId:false, lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'false boolean' },
        { lpgId:Boolean, lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'boolean' },
     
        //Invalid lpg provider
        { lpgId:'10000000027087128', lpgProvider: ' ',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider empty string' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS!',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains special characters' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains spaces' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'too short png provider' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GASGAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'png provider too long' },
        { lpgId:'10000000027087128', lpgProvider: 'INDANE_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg is set to different provider' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS1',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains numbers' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT-GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains hyphen' },
        { lpgId:'10000000027087128', lpgProvider: null,  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains null' },
        { lpgId:'10000000027087128', lpgProvider: true,  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains true' },
        { lpgId:'10000000027087128', lpgProvider: false,  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains false' },
        { lpgId:'10000000027087128', lpgProvider: Boolean,  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider contains boolean' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT__GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ', description: 'lpg contains Extra underscore' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS ',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider trailing spaces' },
        { lpgId:'10000000027087128', lpgProvider: ' BHARAT_GAS',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider leading spaces' },
        { lpgId:'10000000027087128', lpgProvider: 'BBBBBBBBBB',  svNumber:'4060227067',applicationId: 'Lpg_Testing ',   description: 'png providert  same alphabet' },
   
        //Invalid svNumber
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'',applicationId: 'Lpg_Testing ',   description: 'svNumber empty string' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067#',applicationId: 'Lpg_Testing ',   description: 'svNumber contains special characters' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060 227067',applicationId: 'Lpg_Testing ',   description: 'svNumber contains spaces' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'40602270',applicationId: 'Lpg_Testing ',   description: 'too short svNumber' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067777',applicationId: 'Lpg_Testing ',   description: 'svNumber too long' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067.0',applicationId: 'Lpg_Testing ',   description: 'svNumber is set to point value' },
      //  { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:4060227067,applicationId: 'Lpg_Testing ',   description: 'svNumber as numbers' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'40602-27067',applicationId: 'Lpg_Testing ',   description: 'svNumber contains hyphen' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:null,applicationId: 'Lpg_Testing ',   description: 'svNumber contains null' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:true,applicationId: 'Lpg_Testing ',   description: 'svNumber contains boolean true' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:false,applicationId: 'Lpg_Testing ',   description: 'svNumber contains boolaen false' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:Boolean,applicationId: 'Lpg_Testing ',   description: 'svNumber contains boolean' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:['4060227067'],applicationId: 'Lpg_Testing ', description: 'svNumber contains Array' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:' 4060227067',applicationId: 'Lpg_Testing ',   description: 'lpg provider trailing spaces' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4060227067 ',applicationId: 'Lpg_Testing ',   description: 'lpg provider leading spaces' },
        { lpgId:'10000000027087128', lpgProvider: 'BHARAT_GAS',  svNumber:'4444444444',applicationId: 'Lpg_Testing ',   description: 'svNumber provide  same Number' },
    
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };
    


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Utility lpg details bharat gas');
    filteredTestCases.forEach((testCase) => {
        invalidEpicNumber.forEach((invalidCase) => {                                                     
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} lpgId : ${invalidCase.lpgId}, lpgProvider: ${invalidCase.lpgProvider}, svNumber: ${invalidCase.svNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, lpgId: invalidCase.lpgId, lpgProvider: invalidCase.lpgProvider, svNumber: invalidCase.svNumber }; 

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