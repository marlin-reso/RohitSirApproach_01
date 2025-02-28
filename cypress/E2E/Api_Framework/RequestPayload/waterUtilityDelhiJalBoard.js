/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - Delhi jal board API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        { customerNo: '047293100',waterProvider: 'djb', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'djb', description: 'Too long customerNo' }, //under developement
        { customerNo: '0472931000A',waterProvider: 'djb', description: 'Alphabetic character in customerNo' },
        { customerNo: '047293100@',waterProvider: 'djb', description: 'Special character in customerNo' },
        { customerNo: '04 72931000',waterProvider: 'djb', description: 'Embedded space in customerNo' },
        { customerNo: '0472931000 ',waterProvider: 'djb', description: 'Trailing space in customerNo' },
        { customerNo: ' 0472931000',waterProvider: 'djb', description: 'Leading space in customerNo' },
        { customerNo: '04729 31000',waterProvider: 'djb', description: 'Space in middle of customerNo' },
        { customerNo: '0472931000#',waterProvider: 'djb', description: 'Hash at the end of customerNo' },
        { customerNo: '0472931000!',waterProvider: 'djb', description: 'Exclamation mark in customerNo' },
        { customerNo: '0472931.000',waterProvider: 'djb', description: 'Period in customerNo' },
        { customerNo: '0472931,000',waterProvider: 'djb', description: 'Comma in customerNo' },
        { customerNo: '0472931-000',waterProvider: 'djb', description: 'Hyphen in customerNo' },
        { customerNo: '0472931/000',waterProvider: 'djb', description: 'Slash in customerNo' },
        { customerNo: '0472931\\000',waterProvider: 'djb', description: 'Backslash in customerNo' },
        { customerNo: '0472931_000',waterProvider: 'djb', description: 'Underscore in customerNo' },
        { customerNo: '0472931?000',waterProvider: 'djb', description: 'Question mark in customerNo' },
        { customerNo: ['0472931000'],waterProvider: 'djb', description: 'Array in customerNO' },
        { customerNo: null,waterProvider: 'djb', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'djb', description: 'Empty string for customerNo' },
        { customerNo: undefined,waterProvider: 'djb', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'djb', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'djb', description: 'Boolean false as customerNo' },
         { customerNo: Boolean,waterProvider: 'djb', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: '0472931000',waterProvider: 'dj-b', description: 'Hyphen in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'dj@b', description: 'Special character in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'd jb', description: 'Embedded space in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'dj b', description: 'Trailing space in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'dj', description: 'Too short waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djbdjb', description: 'Too long waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb!', description: 'Exclamation mark in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb#', description: 'Hash in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb$', description: 'Dollar sign in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb%', description: 'Percent sign in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb^', description: 'Caret in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb&', description: 'Ampersand in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb*', description: 'Asterisk in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb(', description: 'Opening parenthesis in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb)', description: 'Closing parenthesis in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb_', description: 'Underscore in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb+', description: 'Plus sign in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb=', description: 'Equal sign in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb{', description: 'Opening curly brace in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb}', description: 'Closing curly brace in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb[', description: 'Opening square bracket in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb]', description: 'Closing square bracket in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb|', description: 'Vertical bar in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb\\', description: 'Backslash in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb/', description: 'Slash in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb:', description: 'Colon in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb;', description: 'Semicolon in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb\'', description: 'Single quote in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb"', description: 'Double quote in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb<', description: 'Less-than sign in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb>', description: 'Greater-than sign in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb?', description: 'Question mark in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb.', description: 'Period in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb,', description: 'Comma in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb~', description: 'Tilde in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb`', description: 'Backtick in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'djb ', description: 'Trailing space in waterProvider' },
        { customerNo: '0472931000',waterProvider: ' djb', description: 'Leading space in waterProvider' },
        { customerNo: '0472931000',waterProvider: 'd1jb', description: 'Numeric character in waterProvider' },
        { customerNo: '0472931000',waterProvider: '', description: 'Empty string for waterProvider' },
        { customerNo: '0472931000',waterProvider: ['djb'], description: 'Array in waterProvider' },
        { customerNo: '0472931000',waterProvider: undefined, description: 'Undefined waterProvider' },
        { customerNo: '0472931000',waterProvider: true, description: 'Boolean true as waterProvider' },
        { customerNo: '0472931000',waterProvider: false, description: 'Boolean false as waterProvider' },
        { customerNo: '0472931000',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        { customerNo: '0472931000',waterProvider: null, description: 'Null waterProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Delhi jal board');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Consumer No. : ${invalidCase.customerNo} and waterProvider : ${invalidCase.waterProvider}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, customerNo: invalidCase.customerNo, waterProvider: invalidCase.waterProvider}; 

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