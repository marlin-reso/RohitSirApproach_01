/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Udyam Registration API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidregistrationnumber = [
        { registrationnumber: 'udyam-gj-05-9999999', description: 'Non-existent registration number' },
        { registrationnumber: 'udyam-mh-01-1234567', description: 'Valid format but non-existent number' },
        { registrationnumber: 'udyam-gj-05-00412', description: 'Too Short (missing digits)' },
        { registrationnumber: 'udyam-gj-05-00412456789', description: 'Too Long (extra digits)' },
        { registrationnumber: 'udyam-gj-5-0041245', description: 'Missing leading zero in the code section' },
        { registrationnumber: 'udyam-gj-050041245', description: 'No hyphen between code and number' },
        { registrationnumber: 'udyam_gj_05_0041245', description: 'Underscores instead of hyphens' },
        { registrationnumber: 'udyam gj 05 0041245', description: 'Spaces instead of hyphens' },
        { registrationnumber: 'udym-gj-05-0041245', description: 'Typo in the prefix' },
        { registrationnumber: 'udyams-gj-05-0041245', description: 'Extra character in the prefix' },
        { registrationnumber: 'udyem-gj-05-0041245', description: 'Incorrect spelling of the prefix' },
        { registrationnumber: 'udyam-gj-05-00412AB', description: 'Alphanumeric digits in the registration number' },
        { registrationnumber: 'udyam-gj-05-0041*45', description: 'Special characters in the registration number' },
        { registrationnumber: 'udyam-g#-05-0041245', description: 'Special character in the prefix section' },
        { registrationnumber: 'udyam-gj-0*-0041245', description: 'Special character in the code section' },
        { registrationnumber: 'udyam-gj-05-004124%', description: 'Special character at the end of the registration number' },
        { registrationnumber: ' udyam-gj-05-0041245', description: 'Leading space' },
        { registrationnumber: 'udyam-gj-05-0041245 ', description: 'Trailing space' },
        { registrationnumber: 'udyam- gj-05-0041245', description: 'Space after prefix' },
        { registrationnumber: 'udyam-gj-05 -0041245', description: 'Space within the code section' },
        { registrationnumber: 'udyam -gj-05-0041245', description: 'Space after prefix with hyphen' },
        { registrationnumber: 'udyam-gj- 05-0041245', description: 'Space before code section' },
        { registrationnumber: 'udyam-gj-05-004 1245', description: 'Space within the number section' },
        { registrationnumber: 'udyam-gj-05-00412450', description: 'Trailing zero in the registration number' },
        { registrationnumber: 'udyam-zz-05-0041245', description: 'Non-existent region code' },
        { registrationnumber: 'udyam-gk-05-0041245', description: 'Typo in the region code' },
        { registrationnumber: 'udyam-g-05-0041245', description: 'Single letter region code' },
        { registrationnumber: 'udyam-g@-05-0041245', description: 'Special character in region code' },
        { registrationnumber: 'udyam-g1-05-0041245', description: 'Numeric digit in region code' },
        { registrationnumber: 'udyam-55-05-0041245', description: 'All numeric region code' },
        { registrationnumber: 'udyam-00-05-0041245', description: 'Numeric prefix instead of region code' },
        { registrationnumber: 'udyam-gj-xx-0041245', description: 'Alphabetic digits in the number section' },
        { registrationnumber: 'udyam-gj-00-0041245', description: 'Region code leading zero issue' },
        { registrationnumber: 'udyam-gj-05-0000000', description: 'All zeros in the registration number' },
        { registrationnumber: 'udyam-gj-05-1234567', description: 'Valid format but sequential digits' },
        { registrationnumber: 'udyam-gj-05-1111111', description: 'All same digits in the registration number' },
        { registrationnumber: '', description: 'Blank input' },
        { registrationnumber: 'UDYAM-AP-06-0000001', description: 'The Udyam Registration Number details are unavailable and needs to be updated by the user.' },
        { registrationnumber: 'UDYAM-AP-17-0014892', description: 'The Udyam Registration Number has been cancelled.'},
        { registrationnumber: null, description: 'null value' },
        { registrationnumber: undefined, description: 'undefined' },
        { registrationnumber: Boolean, description: 'boolean' },
        { registrationnumber: true, description: 'boolean false' },
        { registrationnumber: false, description: 'boolean true' },
        { registrationnumber: 695277717060, description: 'Excessively Large Number' }
    ];


    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EUN1183': 'The Udyam Registration Number details are unavailable and needs to be updated by the user.',
        'EUN1182': 'The Udyam Registration Number has been cancelled.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Udyam Registration');
    filteredTestCases.forEach((testCase) => {
        invalidregistrationnumber.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Udyam Registration number: ${invalidCase.registrationnumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, registrationnumber: invalidCase.registrationnumber }; 

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