
/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test PNG Details API`, () => {
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
        //customer no. 
     //   { customerNo:'PD03GWL2269', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'Invalid customer number' },
        { customerNo:'03GWL2269', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'missing letters' },
    //    { customerNo:'pd03gwl2269', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'starts with lowercase letters' },
        { customerNo:'PD03GWL22@69', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'contains special characters ' },
        { customerNo:'PD 03 GWL 2269', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'includes spaces' },
        { customerNo:'PD03GWL22', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'too short' },
        { customerNo:'PD03GWL226987', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'too long' },
        { customerNo:'PD99GWL2269', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'contains an invalid region code' },
        { customerNo:'PD03GWL0000', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'contains only numbers' },
        { customerNo:'PD03GWLXXXX', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'contains only letters ' },
        { customerNo:'PD-03-GWL-2269', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'contains special characters like hyphen or underscore' },
        { customerNo:' ', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'empty string' },
        { customerNo:null, pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'Null' },
        { customerNo: true, pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'true boolean' },
        { customerNo:false, pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'false boolean' },
        { customerNo:'PD03GWL2269; DROP TABLE users', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'contains SQL code' },
        { customerNo:"PD03GWL2269<script>alert('XSS')</script>", pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'sql injection' },
    //    { customerNo:'\u0050\u0044\u0030\u0033\u0047\u0057\u004C\u0032\u0032\u0036\u0039', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'Unicode number' },
        { customerNo:'ṔĎ03ĜŴĹ2269', pngProvider: 'AGL', applicationId: 'Png_Testing ',   description: 'diacritical variations' },

        //pngProvider test case
        { customerNo:'PD03GWL2269', pngProvider: ' ', applicationId: 'Png_Testing ',   description: 'png provider empty string' },
        { customerNo:'PD03GWL2269', pngProvider: 'AGL!', applicationId: 'Png_Testing ',   description: 'png provider contains special characters' },
        { customerNo:'PD03GWL2269', pngProvider: 'AG L', applicationId: 'Png_Testing ',   description: 'png provider contains spaces' },
        { customerNo:'PD03GWL2269', pngProvider: 'AG', applicationId: 'Png_Testing ',   description: 'too short png provider' },
        { customerNo:'PD03GWL2269', pngProvider: 'AGLL', applicationId: 'Png_Testing ',   description: 'png provider too long' },
        { customerNo:'PD03GWL2269', pngProvider: 'XYZ', applicationId: 'Png_Testing ',   description: 'png is set to a non-existent provider' },
        { customerNo:'PD03GWL2269', pngProvider: 'AG1', applicationId: 'Png_Testing ',   description: 'png provider contains numbers' },
        { customerNo:'PD03GWL2269', pngProvider: 'AG$', applicationId: 'Png_Testing ',   description: 'png provider contains symbols' },
        { customerNo:'PD03GWL2269', pngProvider: null, applicationId: 'Png_Testing ',   description: 'png provider contains null' },
        { customerNo:'PD03GWL2269', pngProvider: true, applicationId: 'Png_Testing ',   description: 'png provider contains true' },
        { customerNo:'PD03GWL2269', pngProvider: false, applicationId: 'Png_Testing ',   description: 'png provider contains false' },
        { customerNo:'PD03GWL2269', pngProvider: 'AGL; DROP TABLE providers', applicationId: 'Png_Testing ', description: 'png contains SQL code' },
        { customerNo:'PD03GWL2269', pngProvider: 'AGL ', applicationId: 'Png_Testing ',   description: 'png provider trailing spaces' },
        { customerNo:'PD03GWL2269', pngProvider: ' AGL', applicationId: 'Png_Testing ',   description: 'png provider leading spaces' },
        { customerNo:'PD03GWL2269', pngProvider: 'AAA', applicationId: 'Png_Testing ',   description: 'png providert  same alphabet' },
    //    { customerNo:'PD03GWL2269', pngProvider: '\u0041\u0047\u004C', applicationId: 'Png_Testing ',   description: 'png unicode ' },

     
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };
    


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'png Details');
    filteredTestCases.forEach((testCase) => {
        invalidEpicNumber.forEach((invalidCase) => {                                                     
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo : ${invalidCase.customerNo}, pngProvider: ${invalidCase.pngProvider}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, customerNo: invalidCase.customerNo, pngProvider: invalidCase.pngProvider }; 

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