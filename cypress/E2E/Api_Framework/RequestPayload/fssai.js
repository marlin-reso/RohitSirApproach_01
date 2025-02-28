/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test fssai API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidLicenceNumber = [
        { licenceNumber: '10014012000268*', description: 'Special character at the end' },
        { licenceNumber: '10014@12000268', description: 'Special character in the middle' },
        { licenceNumber: '100140120 00268', description: 'Whitespace in the middle' },
        { licenceNumber: '100140120_00268', description: 'Underscore in the middle' },
        { licenceNumber: '100140120-00268', description: 'Hyphen in the middle' },
        { licenceNumber: '100140120A00268', description: 'Alphabetic character in the middle' },
        { licenceNumber: 'A10014012000268', description: 'Alphabetic character at the start' },
        { licenceNumber: '10014012000268A', description: 'Alphabetic character at the end' },
        { licenceNumber: '10014/12000268', description: 'Slash in the middle' },
        { licenceNumber: '1001 4012000268', description: 'Space in the middle of number' },
        { licenceNumber: 'ABCDEFGHIJKLMN', description: 'All alphabetic characters' },
        { licenceNumber: '10#014012000268', description: 'Special character in the prefix' },
        { licenceNumber: '100140120002!68', description: 'Special character in the middle' },
        { licenceNumber: '', description: 'Empty licence number' },
        { licenceNumber: '10014012000268@', description: 'Special character at the end' },
        { licenceNumber: '1001401200026O', description: 'Letter "O" instead of zero at the end' },
        { licenceNumber: undefined, description: 'Undefined licence number' },
        { licenceNumber: Boolean, description: 'Boolean data type licence number' },
        { licenceNumber: '1001401200026', description: 'Too short licence number' },
        { licenceNumber: '100140120002680', description: 'Too long licence number' },
        { licenceNumber: '1', description: 'Single character licence number' },
        { licenceNumber: '10014012000268 ', description: 'Trailing space' },
        { licenceNumber: ' 10014012000268', description: 'Leading space' },
        { licenceNumber: true, description: 'Boolean true licence number' },
        { licenceNumber: false, description: 'Boolean false licence number' },
        { licenceNumber: null, description: 'Null licence number' },
        // { licenceNumber: 10014012000268, description: 'Number datatype' }, 
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'FSSAI License Verification');
    filteredTestCases.forEach((testCase) => {
        invalidLicenceNumber.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} licenceNumber : ${invalidCase.licenceNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, licenceNumber: invalidCase.licenceNumber }; 

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