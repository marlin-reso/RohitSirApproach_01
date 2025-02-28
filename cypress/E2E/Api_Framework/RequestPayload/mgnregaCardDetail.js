
/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Mgmnrega Card API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidEpicNumber = [
        { mgnregaCardNo:'01-001-005-001/1004', description: 'Invalid mgnregaCardNo' },
    //    { mgnregaCardNo:'\u0041\u004E\u002D\u0030\u0031\u002D\u0030\u0030\u0031\u002D\u0030\u0030\u0035\u002D\u0030\u0030\u0031\u002F\u0031\u0030\u0030\u0034',description: 'unicode mgnregaCardNo.'},
        { mgnregaCardNo:'01-001-005-001', description: 'Invalid missing the last section after the slash' },
        { mgnregaCardNo:'01-001-005-001/1004xyz', description: 'input contains extra characters at the end' },
        { mgnregaCardNo:'01_001_005_001/1004', description: 'The separators are underscores instead of hyphens.' },
        { mgnregaCardNo:'01-001A-005-001/1004', description: 'One of the sections contains a letter' },

        { mgnregaCardNo:' ', description: 'The input is an empty string' },
        { mgnregaCardNo:'010010050011004', description: 'The input is missing hyphens, making it a continuous string.' },
        { mgnregaCardNo:' 01-001-005-001/1004', description: 'Leading space' },
        { mgnregaCardNo:'01-001-005-001/1004 ', description: 'Trailing space' },
        { mgnregaCardNo:'01-001-005-001/#1004', description: 'The slash is followed by an invalid character (#)' },
        { mgnregaCardNo:'1-001-05-001/1004', description: 'Some sections do not follow the expected number of digits' },
        { mgnregaCardNo:'01-001-005/001-1004', description: 'The slash is placed in the wrong position' },

        { mgnregaCardNo:true, description: 'boolean true' },
        { mgnregaCardNo:false, description: 'boolean false' },
     
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Mgnrega Card Details');
    filteredTestCases.forEach((testCase) => {
        invalidEpicNumber.forEach((invalidCase) => {                                                     
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} mgnregaCardNo : ${invalidCase.mgnregaCardNo}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, mgnregaCardNo: invalidCase.mgnregaCardNo }; 

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