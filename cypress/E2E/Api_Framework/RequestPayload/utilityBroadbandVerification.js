/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility Broadband verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidElectricityDetails = [
        //Invalid consumerNo and Valid broadbandProvider
        { consumerNo: '134444903', broadbandProvider: 'HATHWAY_BB', description: 'Too short consumerNo' },
        // { consumerNo: '1122007949700', broadbandProvider: 'HATHWAY_BB', description: 'Too long consumerNo' }, //under developement
        { consumerNo: '1344449032A', broadbandProvider: 'HATHWAY_BB', description: 'Alphabetic character in consumerNo' },
        { consumerNo: '13444490@2', broadbandProvider: 'HATHWAY_BB', description: 'Special character in consumerNo' },
        { consumerNo: '13 44449032', broadbandProvider: 'HATHWAY_BB', description: 'Embedded space in consumerNo' },
        { consumerNo: '1344449032 ', broadbandProvider: 'HATHWAY_BB', description: 'Trailing space in consumerNo' },
        { consumerNo: ' 1344449032', broadbandProvider: 'HATHWAY_BB', description: 'Leading space in consumerNo' },
        { consumerNo: '13444 49032', broadbandProvider: 'HATHWAY_BB', description: 'Space in middle of consumerNo' },
        { consumerNo: '1344449032#', broadbandProvider: 'HATHWAY_BB', description: 'Hash at the end of consumerNo' },
        { consumerNo: '1344449032!', broadbandProvider: 'HATHWAY_BB', description: 'Exclamation mark in consumerNo' },
        { consumerNo: '1344449.032', broadbandProvider: 'HATHWAY_BB', description: 'Period in consumerNo' },
        { consumerNo: '13444490,32', broadbandProvider: 'HATHWAY_BB', description: 'Comma in consumerNo' },
        { consumerNo: '1344449-032', broadbandProvider: 'HATHWAY_BB', description: 'Hyphen in consumerNo' },
        { consumerNo: '1344449/032', broadbandProvider: 'HATHWAY_BB', description: 'Slash in consumerNo' },
        { consumerNo: '13444490\\32', broadbandProvider: 'HATHWAY_BB', description: 'Backslash in consumerNo' },
        { consumerNo: '13444490_32', broadbandProvider: 'HATHWAY_BB', description: 'Underscore in consumerNo' },
        { consumerNo: '13444490+32', broadbandProvider: 'HATHWAY_BB', description: 'Plus sign in consumerNo' },
        { consumerNo: '13444490=32', broadbandProvider: 'HATHWAY_BB', description: 'Equal sign in consumerNo' },
        { consumerNo: '1344449*032', broadbandProvider: 'HATHWAY_BB', description: 'Asterisk in consumerNo' },
        { consumerNo: '1344449%032', broadbandProvider: 'HATHWAY_BB', description: 'Percent sign in consumerNo' },
        { consumerNo: '134444$9032', broadbandProvider: 'HATHWAY_BB', description: 'Dollar sign in consumerNo' },
        { consumerNo: '1344449^032', broadbandProvider: 'HATHWAY_BB', description: 'Caret in consumerNo' },
        { consumerNo: '1344449&032', broadbandProvider: 'HATHWAY_BB', description: 'Ampersand in consumerNo' },
        { consumerNo: '13444490(32', broadbandProvider: 'HATHWAY_BB', description: 'Opening parenthesis in consumerNo' },
        { consumerNo: '1344449)032', broadbandProvider: 'HATHWAY_BB', description: 'Closing parenthesis in consumerNo' },
        { consumerNo: '1344449[032', broadbandProvider: 'HATHWAY_BB', description: 'Opening square bracket in consumerNo' },
        { consumerNo: '1344449]032', broadbandProvider: 'HATHWAY_BB', description: 'Closing square bracket in consumerNo' },
        { consumerNo: '1344449{032', broadbandProvider: 'HATHWAY_BB', description: 'Opening curly brace in consumerNo' },
        { consumerNo: '1344449}032', broadbandProvider: 'HATHWAY_BB', description: 'Closing curly brace in consumerNo' },
        { consumerNo: null, broadbandProvider: 'HATHWAY_BB', description: 'Null consumerNo' },
        { consumerNo: '', broadbandProvider: 'HATHWAY_BB', description: 'Empty string for consumerNo' },
      //  { consumerNo: undefined, broadbandProvider: 'HATHWAY_BB', description: 'Undefined consumerNo' },
        { consumerNo: true, broadbandProvider: 'HATHWAY_BB', description: 'Boolean true as consumerNo' },
        { consumerNo: false, broadbandProvider: 'HATHWAY_BB', description: 'Boolean false as consumerNo' },
      //  { consumerNo: Boolean, broadbandProvider: 'HATHWAY_BB', description: 'boolean data type' },


        //Valid consumerNo and Invalid dth provider
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY-BB', description: 'Hyphen in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY@BB', description: 'Special character in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY BB', description: 'Embedded space in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB ', description: 'Trailing space in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY', description: 'Too short broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BBHATHWAY_BB', description: 'Too long broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB!', description: 'Exclamation mark in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB#', description: 'Hash in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB$', description: 'Dollar sign in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB%', description: 'Percent sign in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB^', description: 'Caret in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB&', description: 'Ampersand in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB*', description: 'Asterisk in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAYBB_', description: 'Underscore in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB/', description: 'Slash in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB:', description: 'Colon in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB~', description: 'Tilde in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  'HATHWAY_BB`', description: 'Backtick in broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  '', description: 'Empty string for broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  undefined, description: 'Undefined broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  true, description: 'Boolean true as broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  false, description: 'Boolean false as broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  Boolean, description: 'Boolean data type as broadbandProvider' },
        { consumerNo: '105528624', broadbandProvider:  null, description: 'Null broadbandProvider' }, //Issue
 
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'utility broadband verification');
    filteredTestCases.forEach((testCase) => {
        invalidElectricityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, Consumer No. : ${invalidCase.consumerNo} and DTH Provider : ${invalidCase.broadbandProvider}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, consumerNo: invalidCase.consumerNo,  broadbandProvider:  invalidCase.broadbandProvider}; 

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