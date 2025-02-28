/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test phone basic information API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidMobileNo = [
        //Invalid Mobile number 
        { phoneNumber: '', countryCode:"91", description: 'Empty Mobile Number' },
        { phoneNumber: '123',countryCode:"91",  description: 'Too Short Mobile Number' },
        { phoneNumber: '941629453212345',countryCode:"91",  description: 'Too Long Mobile Number' },
        { phoneNumber: 'abcdefghij',countryCode:"91",  description: 'Non-Numeric Mobile Number' },
        { phoneNumber: ' 9416294532',countryCode:"91",  description: 'Leading space in mobile number' },
        { phoneNumber: '9416294532 ',countryCode:"91",  description: 'Trailing space in mobile number' },
        { phoneNumber: '94162 94532',countryCode:"91",  description: 'Between space in mobile number' },
        { phoneNumber: '94162\t94532',countryCode:"91", description: 'Between space in mobile number' },
        { phoneNumber: 'abcdefg123',countryCode:"91",  description: 'Mobile number must be numeric' },
        { phoneNumber: '9416@#$%532',countryCode:"91",  description: 'Special charector in mobile nuspember' },
        { phoneNumber: ' 9416294532 ',countryCode:"91",  description: 'White sspace in mobile number' },
        { phoneNumber: '+91-9416294532',countryCode:"91",  description: 'country code in mobile number' },
      //  { phoneNumber: '9494949494',countryCode:"91",  description: 'repeated number in mobile number' },
        { phoneNumber: {phoneNumber: 9416294532}, countryCode:"91", description: 'Json in mobile number' },
        { phoneNumber: Boolean, countryCode:"91", description: 'Between space in mobile number' },
        { phoneNumber: null, countryCode:"91",description: 'Null Mobile Number' },
        { phoneNumber: true, countryCode:"91", description: 'Mobile Number as Boolean True' },
        { phoneNumber: false,countryCode:"91",  description: 'Mobile Number as Boolean False' },
        { phoneNumber: undefined,countryCode:"91",  description: 'Mobile Number as Undefined' },

        //Invalid country code
        { phoneNumber: '9416294532',countryCode:" 91",  description: 'Leading space in country Code' },
        { phoneNumber: '9416294532',countryCode:"91 ",  description: 'Trailling space in countryCode' },
        { phoneNumber: '9416294532',countryCode:"!91",  description: 'Special charecter in country Code' },
        { phoneNumber: '9416294532',countryCode:"+91",  description: 'Plus sign in countryCode' },
        { phoneNumber: '9416294532',countryCode:"-91",  description: 'Minus sign in country Code' },
        { phoneNumber: '9416294532',countryCode:"091",  description: 'Zero in countryCode' },
        { phoneNumber: '9416294532',countryCode:"00",  description: 'only zero in country Code' },
        { phoneNumber: '9416294532',countryCode:"@1",  description: '@ special charecter in countryCode' },
        { phoneNumber: '9416294532',countryCode:"9 1",  description: 'white space in country Code' },
        { phoneNumber: '9416294532',countryCode:"9-1",  description: 'Contain a dash in countryCode' },
        { phoneNumber: '9416294532',countryCode:"+81",  description: 'Japan country Code' },
        { phoneNumber: '9416294532',countryCode:"",  description: 'Blank country Code' },
        { phoneNumber: '9416294532',countryCode:null,  description: 'null country Code' },
        { phoneNumber: '9416294532',countryCode:Boolean,  description: 'Boolean country Code' },
        { phoneNumber: '9416294532',countryCode:true,  description: 'boolean true country Code' },
        { phoneNumber: '9416294532',countryCode:false,  description: 'boolean false country Code' },
        { phoneNumber: '9416294532',countryCode:"9",  description: 'Single digit country Code' },
        { phoneNumber: '9416294532',countryCode:undefined,  description: 'undefined value in country Code' },
        { phoneNumber: '9416294532',countryCode:"9191",  description: 'Repeat code in countryCode' },
       
       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EIM153': 'Incorrect Mobile Number.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.'
    };

    
    const filteredTestCases = testCases.filter(testCase => testCase.name === 'phone basic information');
    filteredTestCases.forEach((testCase) => {
        invalidMobileNo.forEach((invalidCase) => {
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} phoneNumber : ${invalidCase.phoneNumber} countryCode : ${invalidCase.countryCode}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = { ...payLoad.requestData, phoneNumber: invalidCase.phoneNumber, countryCode: invalidCase.countryCode }; 

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