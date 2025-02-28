/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Initiate liveliness API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidAadhaarNumbers = [
        
        { fullName:' ',aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Blank fullName' },
        { fullName:'Rahul          Kumar',aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Too much white space between fullName' },
        { fullName:'AAAAAAAAA',aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Repeated charector in fullName' },
        { fullName:'1234',aadhaarNumber: '695277717060 ', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Numeric fullName' },
        { fullName:'K',aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Single char fullName' },
        { fullName:'@@@@@',aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Special char fullName' },
        { fullName:'---------',aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Only UnderScore as fullName' },
        { fullName:null,aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Null Value fullName' },
        { fullName:undefined,aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'undefined fullName' },
        { fullName:Boolean,aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'boolean fullName' },
        { fullName:true,aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'boolean true fullName' },
        { fullName:false,aadhaarNumber: '695277717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'boolean flase fullName' },
        // { fullName:' ',aadhaarNumber: 111122223333, redirectUrl:' ',geoLocation:' ',description: 'Excessively Large Number' } 

        { fullName:'ScoreMe',aadhaarNumber: '695277717061', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Not Exist' },
        { fullName:'ScoreMe',aadhaarNumber: '69527771706', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Too Short' },
        { fullName:'ScoreMe',aadhaarNumber: '6952777170600', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Too Long' },
        { fullName:'ScoreMe',aadhaarNumber: '69527A71706B', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Non-Numeric Characters' },
        { fullName:'ScoreMe',aadhaarNumber: '69527-71706@', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Special Characters' },
        { fullName:'ScoreMe',aadhaarNumber: '', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Empty String' },
        { fullName:'ScoreMe',aadhaarNumber: '695277 717060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Whitespace Characters' },
        { fullName:'ScoreMe',aadhaarNumber: '000000000000', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'All Zeros' },
        { fullName:'ScoreMe',aadhaarNumber: '111111111111', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'All Same Digits' },
        { fullName:'ScoreMe',aadhaarNumber: '123456789012', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Sequential Numbers' },
        { fullName:'ScoreMe',aadhaarNumber: '000695277717', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Leading Zeros' },
        { fullName:'ScoreMe',aadhaarNumber: '695277717060 ', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Trailing Spaces' },
        { fullName:'ScoreMe',aadhaarNumber: '695 277 717 060', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Embedded Spaces' },
        { fullName:'ScoreMe',aadhaarNumber: '6952777170\u200B60', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Unicode Characters' },
        { fullName:'ScoreMe',aadhaarNumber: '695277717060000000', redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Excessively Large Number' },
        { fullName:'ScoreMe',aadhaarNumber: null, redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'Null Value' },
        { fullName:'ScoreMe',aadhaarNumber: undefined, redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'undefined' },
        { fullName:'ScoreMe',aadhaarNumber: Boolean, redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'boolean' },
        { fullName:'ScoreMe',aadhaarNumber: true, redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'boolean true' },
        { fullName:'ScoreMe',aadhaarNumber: false, redirectUrl:'https://sm-quality.scoreme.in/#/layout/ekyc/liveliness-succes',geoLocation:'28.4141155,77.0878054',description: 'boolean flase' },

    ];

    const errorCodeToMessage = {
        'EAE168': 'Aadhaar does not exist.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'initiate liveliness');
    filteredTestCases.forEach((testCase) => {
        invalidAadhaarNumbers.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} fullName : ${invalidCase.fullName} Aadhaar number : ${invalidCase.aadhaarNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData,fullName: invalidCase.fullName,aadhaarNumber: invalidCase.aadhaarNumber };

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
