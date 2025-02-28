/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test pan to cin API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidPANNumbers = [

        { pan: 'AADCR2224', description: 'Too Short PAN' },
    //    { pan: 'AADCR2224H', description: 'correct pan' },
    //    { pan: '\u0041\u0041\u0044\u0043\u0052\u0032\u0032\u0032\u0034\u0048', description: ' Unicode PAN' },
        { pan: 'ÁÂD̃ĊR̄2̇2̀2̇4̂Ȟ', description: 'Diacritical PAN' },
        { pan: "<script>alert('XSS')</script>", description: 'Cross-Site Scripting (XSS) vulnerabilities PAN' },
        { pan:  "' OR 1=1 --", description: ' SQL injection string PAN' },
        { pan: 'AADCR2224H'*10, description: 'Boundary Testing PAN' },
        { pan: '../../AADCR2224', description: 'Basic Directory Traversal Payload in PAN' },
        { pan: 'AADCR2224HAA', description: 'Too Long PAN' },
    //    { pan: 'ayipm8112b', description: 'PAN with Lowercase Letters' },
        { pan: 'AAA22224H', description: 'Missing Alphabet Characters' },
        { pan: 'AAAAAR22H', description: 'Missing Numeric Characters' },
        { pan: 'AADCR@2224H', description: 'PAN with Special Characters' },
        { pan: ' AADCR2224H', description: 'PAN with Leading Space' },
        { pan: 'AADCR2224H ', description: 'PAN with Trailing Space' },
        { pan: 'AAD CR2 224 H', description: 'PAN with Embedded Space' },
        { pan: '1234R2224H', description: 'Numeric Characters in Place of Letters' },
        { pan: 'AADCRABCDH', description: 'Alphabetic Characters in Place of Numbers' },
        { pan: 'AAAAA0001A', description: 'Repeated Characters' },
        { pan: '1111222233', description: 'Only Numeric Characters' },
        { pan: 'AADCRHHHHH', description: 'Only Alphabetic Characters' },
        { pan: 'AADCR2224H#', description: 'Special Character at the End' },
        { pan: 'AADCRZZZZZ', description: 'All Alphabetic Characters' },
        { pan: 'A', description: 'Single Character PAN' },
        { pan: 'AADCR  2224H', description: 'PAN with Extra Spaces' },
        { pan: '', description: 'Empty PAN' },
        { pan: 'AADCR*2224H', description: 'Non-Alphanumeric Characters in PAN' },        
    //    { pan: '\u0041\u0041\DCR2224H', description: 'Combination of Unicode and Characters' }, 
        { pan: 'ABCDE1234567890', description: 'Excessively Long Number' }, 
        { pan: undefined, description: 'undefined' },
        { pan: Boolean, description: 'boolean' },
        { pan: true, description: 'boolean true' },
        { pan: false, description: 'boolean flase' },
        { pan: null, description: 'Null pan' },
        { pan: 'null', description: 'null String pan' },
        { pan: 0, description: 'Zero pan number' }
                  
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.',
        'EUP007':'Unable To Process. Please Reach Out To Support.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'pan to cin');
    filteredTestCases.forEach((testCase) => {
        invalidPANNumbers.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}  Pan : ${invalidCase.pan}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData,  pan: invalidCase.pan}; 

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