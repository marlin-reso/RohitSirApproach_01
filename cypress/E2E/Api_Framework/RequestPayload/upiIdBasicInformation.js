/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test UPI id basic information API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    //7887062652@axl
    const invalidMobileNo = [
        { upiId: '',name:'Giri',  description: 'Empty Mobile Number' },
        { upiId: '788706265@axl',name:'Giri',  description: 'Too Short Mobile Number' },
        { upiId: '78870626522@axl',name:'Giri',  description: 'Too Long Mobile Number' },
        { upiId: 'abcdefghij@axl',name:'Giri',  description: 'Non-Numeric Mobile Number' },
        { upiId: ' 7887062652@axl',name:'Giri',  description: 'Leading space in mobile number' },
        { upiId: '7887062652@axl ',name:'Giri',  description: 'Trailing space in mobile number' },
        { upiId: '1887062652@axl ',name:'Giri',  description: 'Start with invalid series mobile number' },
        { upiId: '2887062652@axl ', name:'Giri', description: 'Start with invalid series mobile number' },
        { upiId: '3887062652@axl ',name:'Giri',  description: 'Start with invalid series mobile number' },
        { upiId: '4887062652@axl ',name:'Giri',  description: 'Start with invalid series mobile number' },
        { upiId: '5887062652@axl ',name:'Giri',  description: 'Start with invalid series mobile number' },
        { upiId: '7887062652 @axl',name:'Giri',  description: 'Between space in mobile number' },
        { upiId: '78870\t62652@axl',name:'Giri',  description: 'Between space in mobile number' },
        { upiId: '78870ab2652@axl', name:'Giri', description: 'Mobile number must be numeric' },
        { upiId: '@7887062652@axl',name:'Giri',  description: 'Special charector in mobile number' },
        { upiId: ' 7887062652@axl ',name:'Giri',  description: 'Trailing space in mobile number' },
        { upiId: '+91-7887062652@axl',name:'Giri',  description: 'country code in mobile number' },
        { upiId: 'null@axl',name:'Giri',  description: 'null in mobile number' },
        { upiId: '7887@62652@axl',name:'Giri',  description: 'double @ in Mobile Number' },
        { upiId: '7887@axl',name:'Giri',  description: 'Too Short Mobile Number' },
        { upiId: '7887062652@',name:'Giri',  description: 'ignor upi extension in mobile number' },
        { upiId: '7887062652@null',name:'Giri',  description: 'null extension' },
        { upiId: '7887062652@123',name:'Giri',  description: 'numeric extension' },
        { upiId: '7887062652@ax!',name:'Giri',  description: 'Special charector in extension' },
        { upiId: '7887062652@ axl',name:'Giri',  description: 'Speace before extension' },
        { upiId: '8602105282@ybll',name:'Giri',  description: 'long extension' },
        { upiId: '8602105282@yblyblyblybl',name:'Giri',  description: 'Too long extension' },
        { upiId: '7887062652@@axl',name:'Giri',  description: 'Too Short Mobile Number' },
        { upiId: '7887062652@axl!',name:'Giri',  description: 'special charector ! in extension' },
        { upiId: ['8602105282@ybl','7887062652@axl'],name:'Giri',  description: 'Passing two array value as mobile number' },
        { upiId: ['8602105282@ybl'],name:'Giri',  description: 'Passing array as mobile number' },
        { upiId: {upiId: '8602105282@ybl'}, name:'Giri', description: 'Json as mobile number' },
        { upiId: Boolean, name:'Giri', description: 'Boolean upi id' },
        { upiId: null,name:'Giri', description: 'Null upi id' },
        { upiId: true, name:'Giri', description: 'Boolean true upi id' },
        { upiId: false,name:'Giri',  description: 'Boolean false upi id' },
        { upiId: undefined,name:'Giri',  description: 'Undefined upi id' },

        //Invalid test case of name
        { upiId: '7887062652@axl',name:null,  description: 'null as a name' },
        { upiId: '7887062652@axl',name:Boolean,  description: 'boolean as a name' },
        { upiId: '7887062652@axl',name:true,  description: 'boolean true as a name' },
        { upiId: '7887062652@axl',name:false,  description: 'boolean false as a name' },
        { upiId: '7887062652@axl',name:undefined,  description: 'undefined as a name' },
        { upiId: '7887062652@axl',name:1234,  description: 'number as a name' },
        { upiId: '7887062652@axl',name:'1234',  description: 'String number as a name' },
        { upiId: '7887062652@axl',name:' Giri',  description: 'Leading space in mobile number' },
        { upiId: '7887062652@axl',name:'AAAAAAA',  description: 'repeated charector as name' },
        { upiId: '7887062652@axl',name:'abcdef',  description: 'Sequential charector as a name' },
        { upiId: '7887062652@axl',name:'-------',  description: 'Dash - as a name' },
        { upiId: '7887062652@axl',name:'gi@#*i',  description: 'Special charector in name fiels' },
        { upiId: '7887062652@axl',name:'Gi         ri',  description: ' Extra space between the charector' },
        { upiId: '7887062652@axl',name:'********  Giri',  description: 'Start with special charector' },

    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIM153': 'Incorrect Mobile Number.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.'
    };

    
    const filteredTestCases = testCases.filter(testCase => testCase.name === 'upi id basic information');
    filteredTestCases.forEach((testCase) => {
        invalidMobileNo.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} upiId : ${invalidCase.upiId}, name : ${invalidCase.name}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, upiId: invalidCase.upiId, name: invalidCase.name }; 

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