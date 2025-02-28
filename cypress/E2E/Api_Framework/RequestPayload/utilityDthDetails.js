/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility DTH Details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidElectricityDetails = [
        //Invalid consumerNo and Valid dthProvider
        { consumerNo: '10552862', dthProvider: 'BHARAT', description: 'Too short consumerNo' },
        // { consumerNo: '1122007949700', dthProvider: 'BHARAT', description: 'Too long consumerNo' }, //under developement
        { consumerNo: '105528624A', dthProvider: 'BHARAT', description: 'Alphabetic character in consumerNo' },
        { consumerNo: '10552862@4', dthProvider: 'BHARAT', description: 'Special character in consumerNo' },
        { consumerNo: '10 5528624', dthProvider: 'BHARAT', description: 'Embedded space in consumerNo' },
        { consumerNo: '105528624 ', dthProvider: 'BHARAT', description: 'Trailing space in consumerNo' },
        { consumerNo: ' 105528624', dthProvider: 'BHARAT', description: 'Leading space in consumerNo' },
        { consumerNo: '1055 28624', dthProvider: 'BHARAT', description: 'Space in middle of consumerNo' },
        { consumerNo: '105528624#', dthProvider: 'BHARAT', description: 'Hash at the end of consumerNo' },
        { consumerNo: '105528624!', dthProvider: 'BHARAT', description: 'Exclamation mark in consumerNo' },
        { consumerNo: '105528.624', dthProvider: 'BHARAT', description: 'Period in consumerNo' },
        { consumerNo: '105528,624', dthProvider: 'BHARAT', description: 'Comma in consumerNo' },
        { consumerNo: '105528-624', dthProvider: 'BHARAT', description: 'Hyphen in consumerNo' },
        { consumerNo: '105528/624', dthProvider: 'BHARAT', description: 'Slash in consumerNo' },
        { consumerNo: '1055286\\24', dthProvider: 'BHARAT', description: 'Backslash in consumerNo' },
        { consumerNo: '105528_624', dthProvider: 'BHARAT', description: 'Underscore in consumerNo' },
        { consumerNo: '105528+624', dthProvider: 'BHARAT', description: 'Plus sign in consumerNo' },
        { consumerNo: '105528=624', dthProvider: 'BHARAT', description: 'Equal sign in consumerNo' },
        { consumerNo: '105528*624', dthProvider: 'BHARAT', description: 'Asterisk in consumerNo' },
        { consumerNo: '105528%624', dthProvider: 'BHARAT', description: 'Percent sign in consumerNo' },
        { consumerNo: '105528$624', dthProvider: 'BHARAT', description: 'Dollar sign in consumerNo' },
        { consumerNo: '105528^624', dthProvider: 'BHARAT', description: 'Caret in consumerNo' },
        { consumerNo: '105528&624', dthProvider: 'BHARAT', description: 'Ampersand in consumerNo' },
        { consumerNo: '1055286(24', dthProvider: 'BHARAT', description: 'Opening parenthesis in consumerNo' },
        { consumerNo: '105528)624', dthProvider: 'BHARAT', description: 'Closing parenthesis in consumerNo' },
        { consumerNo: '105528[624', dthProvider: 'BHARAT', description: 'Opening square bracket in consumerNo' },
        { consumerNo: '105528]624', dthProvider: 'BHARAT', description: 'Closing square bracket in consumerNo' },
        { consumerNo: '105528{624', dthProvider: 'BHARAT', description: 'Opening curly brace in consumerNo' },
        { consumerNo: '105528}624', dthProvider: 'BHARAT', description: 'Closing curly brace in consumerNo' },
        { consumerNo: null, dthProvider: 'BHARAT', description: 'Null consumerNo' },
        { consumerNo: '', dthProvider: 'BHARAT', description: 'Empty string for consumerNo' },
       // { consumerNo: undefined, dthProvider: 'BHARAT', description: 'Undefined consumerNo' },
        { consumerNo: true, dthProvider: 'BHARAT', description: 'Boolean true as consumerNo' },
        { consumerNo: false, dthProvider: 'BHARAT', description: 'Boolean false as consumerNo' },
        { consumerNo: Boolean, dthProvider: 'BHARAT', description: 'boolean data type' },


        //Valid consumerNo and Invalid dth provider
        { consumerNo: '105528624', dthProvider:  'B-HARAT', description: 'Hyphen in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'B@HARAT', description: 'Special character in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BH ARAT', description: 'Embedded space in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT ', description: 'Trailing space in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARA', description: 'Too short dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARATBHARAT', description: 'Too long dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT!', description: 'Exclamation mark in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT#', description: 'Hash in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT$', description: 'Dollar sign in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT%', description: 'Percent sign in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT^', description: 'Caret in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT&', description: 'Ampersand in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT*', description: 'Asterisk in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT_', description: 'Underscore in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT/', description: 'Slash in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT:', description: 'Colon in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT~', description: 'Tilde in dthProvider' },
        { consumerNo: '105528624', dthProvider:  'BHARAT`', description: 'Backtick in dthProvider' },
        { consumerNo: '105528624', dthProvider:  '', description: 'Empty string for dthProvider' },
        { consumerNo: '105528624', dthProvider:  undefined, description: 'Undefined dthProvider' },
        { consumerNo: '105528624', dthProvider:  true, description: 'Boolean true as dthProvider' },
        { consumerNo: '105528624', dthProvider:  false, description: 'Boolean false as dthProvider' },
        { consumerNo: '105528624', dthProvider:  Boolean, description: 'Boolean data type as dthProvider' },
        { consumerNo: '105528624', dthProvider:  null, description: 'Null dthProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'utility dth details');
    filteredTestCases.forEach((testCase) => {
        invalidElectricityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, Consumer No. : ${invalidCase.consumerNo} and DTH Provider : ${invalidCase.dthProvider}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, consumerNo: invalidCase.consumerNo,  dthProvider:  invalidCase.dthProvider}; 

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