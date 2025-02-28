/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Pan to Udyam info API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidEpicNumber = [
        { pan: 'AAYCS1423', applicatrionId: 'KYC-Automation',description: 'Too Short PAN' },
    //    { pan: '\u0041\u0041\u0059\u0043\u0053\u0031\u0034\u0032\u0033\u0051',applicatrionId: 'KYC-Automation', description: ' Unicode PAN' },
        { pan: 'ÁÀŶĆŚ1423Q',applicatrionId: 'KYC-Automation', description: 'Diacritical PAN' },
        { pan: "<script>alert('XSS')</script>",applicatrionId: 'KYC-Automation', description: 'Cross-Site Scripting (XSS) vulnerabilities PAN' },
        { pan:  "' OR 1=1 --",applicatrionId: 'KYC-Automation', description: ' SQL injection string PAN' },
        { pan: 'AADCR2224HAA',applicatrionId: 'KYC-Automation', description: 'Too Long PAN' },
    //    { pan: 'aaycs1423q',applicatrionId: 'KYC-Automation', description: 'PAN with Lowercase Letters' },
        { pan: 'AADCR@2224H',applicatrionId: 'KYC-Automation', description: 'PAN with Special Characters' },
        { pan: ' AAYCS1423Q',applicatrionId: 'KYC-Automation', description: 'PAN with Leading Space' },
        { pan: 'AAYCS1423Q ',applicatrionId: 'KYC-Automation', description: 'PAN with Trailing Space' },
        { pan: 'AAYCS 1423Q',applicatrionId: 'KYC-Automation', description: 'PAN with Embedded Space' },
        { pan: 'AAAAA1111A',applicatrionId: 'KYC-Automation', description: 'Repeated Characters' },
        { pan: '1111222233',applicatrionId: 'KYC-Automation', description: 'Only Numeric Characters' },
        { pan: 'AADCRHHHHH',applicatrionId: 'KYC-Automation', description: 'Only Alphabetic Characters' },
        { pan: 'AADCR2224H#',applicatrionId: 'KYC-Automation', description: 'Special Character at the End' },
        { pan: 'AA',applicatrionId: 'KYC-Automation', description: 'Single Character PAN' },
        { pan: '',applicatrionId: 'KYC-Automation', description: 'Empty PAN' },
        { pan: 'AADCR*2224H',applicatrionId: 'KYC-Automation', description: 'Non-Alphanumeric Characters in PAN' },         
        { pan: undefined,applicatrionId: 'KYC-Automation', description: 'undefined' },
        { pan: Boolean,applicatrionId: 'KYC-Automation', description: 'boolean' },
        { pan: true,applicatrionId: 'KYC-Automation', description: 'boolean true' },
        { pan: false,applicatrionId: 'KYC-Automation', description: 'boolean flase' },
        { pan: null,applicatrionId: 'KYC-Automation', description: 'Null pan' },
        { pan: 'null',applicatrionId: 'KYC-Automation', description: 'null String pan' },

         
    ];
    

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Pan to udyam Info');
    filteredTestCases.forEach((testCase) => {
        invalidEpicNumber.forEach((invalidCase) => {                                                     
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} pan : ${invalidCase.pan}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, pan: invalidCase.pan }; 

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