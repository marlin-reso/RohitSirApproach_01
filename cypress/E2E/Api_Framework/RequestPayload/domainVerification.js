/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Domain verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidElectricityDetails = [
        {email: 'sanjay.giriscoreme.in',description: 'Missing "@" symbol' },
        {email: 'sanjay.giri@scoreme',description: 'Missing domain extension' },
        {email: '@scoreme.in',description: 'Missing Username' },
        {email: 'sanjay.giri@',description: 'Missing domain' },
        {email: ' sanjay.giri@scoreme.in',description: 'extra space before the email' },

        {email: 'sanjay.giri@ scoreme.in',description: 'Extra space after @' },
        {email: 'sanjay@giri@scoreme.in',description: 'Multiple "@" symbol' },
        {email: 'sanjay.gir!@scoreme.in',description: 'Special charector in username' },
        {email: ['sanjay.giri@scoreme.in'],description: 'Sending the request as Array' },
        {email: {email :'sanjay.giri@scoreme.in'},description: 'Sending the request as key-value pair' },
        {email: '',description: 'Blank email address' },
        {email: 'K@scoreme.in',description: 'Pass single charector as username' },
        {email: '12345678@scoreme.in',description: 'number as email address' },
        {email: '---------@scoreme.in',description: 'number as email address' },
        {email: '_________@scoreme.in',description: 'number as email address' },

        
        {email: null,description: 'Null email address' },
        {email: Boolean,description: 'Passing the boolean' },
        {email: true,description: 'Passing the boolean true' },
        {email: false,description: 'Passing the boolean false' },
        {email: undefined,description: 'Passing the boolean false' },
        
          
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'domain verification');
    filteredTestCases.forEach((testCase) => {
        invalidElectricityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, email : ${invalidCase.email}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, email: invalidCase.email}; 

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