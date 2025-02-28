/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test email verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidElectricityDetails = [
        {email: 'sanjay.giriscoreme.in', name:'sanjay giri', description: 'Missing "@" symbol' },
        {email: 'sanjay.giri@scoreme', name:'sanjay giri',description: 'Missing domain extension' },
        {email: '@scoreme.in', name:'sanjay giri',description: 'Missing Username' },
        {email: 'sanjay.giri@',description: 'Missing domain' },
        {email: ' sanjay.giri@scoreme.in', name:'sanjay giri',description: 'extra space before the email' },

        {email: 'sanjay.giri@ scoreme.in', name:'sanjay giri',description: 'Extra space after @' },
        {email: 'sanjay@giri@scoreme.in', name:'sanjay giri',description: 'Multiple "@" symbol' },
        {email: 'sanjay.gir!@scoreme.in', name:'sanjay giri',description: 'Special charector in username' },
        {email: ['sanjay.giri@scoreme.in'], name:'sanjay giri',description: 'Sending the request as Array' },
        {email: {email :'sanjay.giri@scoreme.in'}, name:'sanjay giri',description: 'Sending the request as key-value pair' },
        {email: '', name:'sanjay giri',description: 'Blank email address' },
        {email: 'K@scoreme.in', name:'sanjay giri',description: 'Pass single charector as username' },
        {email: '12345678@scoreme.in', name:'sanjay giri',description: 'number as email username' },
        {email: '---------@scoreme.in',name:'sanjay giri',description: 'Hyfun as email username' },
        {email: '_________@scoreme.in',name:'sanjay giri',description: 'underscore as email username' },
        {email: null,name:'sanjay giri',description: 'Null email address' },
        {email: Boolean,name:'sanjay giri',description: 'Passing the boolean' },
        {email: true,name:'sanjay giri',description: 'Passing the boolean true' },
        {email: false,name:'sanjay giri',description: 'Passing the boolean false' },
        {email: undefined,name:'sanjay giri',description: 'Passing the boolean false' },

        {email: 'sanjay.giri@scoreme.in',name:'',description: 'Blank name' },
        {email: 'sanjay.giri@scoreme.in',name:'1234567',description: 'Number as a name' },
        {email: 'sanjay.giri@scoreme.in',name:'sanjay**',description: 'special charector with username as a name' },
        {email: 'sanjay.giri@scoreme.in',name:'#',description: 'ONly special charector as a name' },
        {email: 'sanjay.giri@scoreme.in',name:'123sanjay giri',description: 'Number along with username' },
        {email: 'sanjay.giri@scoreme.in',name:'sanjay_giri',description: 'Underscore in name' },
        {email: 'sanjay.giri@scoreme.in',name:'sanjay.giri',description: 'Dot in name' },
        {email: 'sanjay.giri@scoreme.in',name:'s',description: 'Single charector as a name' },
        {email: 'sanjay.giri@scoreme.in',name:'@',description: '@ as a name' },
        {email: 'sanjay.giri@scoreme.in',name:'abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz',description: 'long name' },
        {email: 'sanjay.giri@scoreme.in',name: null,description: 'null as a name' },
        {email: 'sanjay.giri@scoreme.in',name:true,description: 'Boolean true as a name' },
        {email: 'sanjay.giri@scoreme.in',name: false,description: 'Boolean false as a name' },
        {email: 'sanjay.giri@scoreme.in',name:Boolean,description: ' Boolean as a name' },
        {email: 'sanjay.giri@scoreme.in',name:undefined,description: 'Undefined as a name' },
        
          
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'email verification');
    filteredTestCases.forEach((testCase) => {
        invalidElectricityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, email : ${invalidCase.email}, name : ${invalidCase.name}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, email: invalidCase.email, name: invalidCase.name}; 

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