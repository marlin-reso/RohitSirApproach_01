/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test ESIC Employer Details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidEsicCode = [
        { esicCode: ' 81310098820010911 ', description: 'ESIC code with leading and trailing spaces' },
        { esicCode: '813100', description: 'ESIC code too short' },
        { esicCode: '8131009882001091181310098820010911', description: 'ESIC code too long' },
        { esicCode: '81310O98820010911', description: 'ESIC code with letter O instead of zero' },
        { esicCode: '81310_98820010911', description: 'ESIC code with underscore' },
        { esicCode: '81310-98820010911', description: 'ESIC code with hyphen' },
        { esicCode: '81310%98820010911', description: 'ESIC code with percent sign' },
        { esicCode: '81310@98820010911', description: 'ESIC code with at symbol' },
        { esicCode: '81310#98820010911', description: 'ESIC code with hash symbol' },
        { esicCode: ' 81310098820010911 ', description: 'Whitespace at both ends of ESIC code' },
        { esicCode: ' 81310098820010911', description: 'Whitespace at the beginning of ESIC code' },
        { esicCode: '81310098820010911 ', description: 'Whitespace at the end of ESIC code' },
        { esicCode: '813100 98820010911', description: 'Double whitespace in ESIC code' },
        { esicCode: '813100\b98820010911', description: 'Backspace character in ESIC code' },    
        { esicCode: '', description: 'Blank input field' },
        { esicCode: undefined, description: 'ESIC Code name is undefined' },
        { esicCode: true, description: 'ESIC Code is a boolean (true)' },
        { esicCode: false, description: 'ESIC Code is a boolean (false)' },
        { esicCode: null, description: 'ESIC Code is null' },
        { esicCode: 'ScoreMe_', description: 'Underscore in ESIC Code' },
        { esicCode: 'ScoreMe%', description: 'Special character (%) in ESIC Code' },
        { esicCode: 12345, description: 'ESIC Code is number' },    
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'ESIC Employer Details');
    filteredTestCases.forEach((testCase) => {
        invalidEsicCode.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} ESIC Code : ${invalidCase.esicCode}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, esicCode: invalidCase.esicCode }; 

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