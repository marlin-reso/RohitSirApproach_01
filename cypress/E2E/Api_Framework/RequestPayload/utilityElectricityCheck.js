/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - Electricity Details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidElectricityDetails = [
        //Invalid consumerNo and Valid electricityProvider
        { consumerNo: '112200794', electricityProvider: 'NBPDCL', description: 'Too short consumerNo' },
        // { consumerNo: '1122007949700', electricityProvider: 'NBPDCL', description: 'Too long consumerNo' }, //under developement
        { consumerNo: '1122007949A', electricityProvider: 'NBPDCL', description: 'Alphabetic character in consumerNo' },
        { consumerNo: '112200794@7', electricityProvider: 'NBPDCL', description: 'Special character in consumerNo' },
        { consumerNo: '11 220079497', electricityProvider: 'NBPDCL', description: 'Embedded space in consumerNo' },
        { consumerNo: '11220079497 ', electricityProvider: 'NBPDCL', description: 'Trailing space in consumerNo' },
        { consumerNo: ' 11220079497', electricityProvider: 'NBPDCL', description: 'Leading space in consumerNo' },
        { consumerNo: '11220 079497', electricityProvider: 'NBPDCL', description: 'Space in middle of consumerNo' },
        { consumerNo: '11220079497#', electricityProvider: 'NBPDCL', description: 'Hash at the end of consumerNo' },
        { consumerNo: '11220079497!', electricityProvider: 'NBPDCL', description: 'Exclamation mark in consumerNo' },
        { consumerNo: '1122007.497', electricityProvider: 'NBPDCL', description: 'Period in consumerNo' },
        { consumerNo: '1122007,497', electricityProvider: 'NBPDCL', description: 'Comma in consumerNo' },
        { consumerNo: '1122007-497', electricityProvider: 'NBPDCL', description: 'Hyphen in consumerNo' },
        { consumerNo: '1122007/497', electricityProvider: 'NBPDCL', description: 'Slash in consumerNo' },
        { consumerNo: '1122007\\497', electricityProvider: 'NBPDCL', description: 'Backslash in consumerNo' },
        { consumerNo: '1122007_497', electricityProvider: 'NBPDCL', description: 'Underscore in consumerNo' },
        { consumerNo: '1122007+497', electricityProvider: 'NBPDCL', description: 'Plus sign in consumerNo' },
        { consumerNo: '1122007=497', electricityProvider: 'NBPDCL', description: 'Equal sign in consumerNo' },
        { consumerNo: '1122007*497', electricityProvider: 'NBPDCL', description: 'Asterisk in consumerNo' },
        { consumerNo: '1122007%497', electricityProvider: 'NBPDCL', description: 'Percent sign in consumerNo' },
        { consumerNo: '1122007$497', electricityProvider: 'NBPDCL', description: 'Dollar sign in consumerNo' },
        { consumerNo: '1122007^497', electricityProvider: 'NBPDCL', description: 'Caret in consumerNo' },
        { consumerNo: '1122007&497', electricityProvider: 'NBPDCL', description: 'Ampersand in consumerNo' },
        { consumerNo: '1122007(497', electricityProvider: 'NBPDCL', description: 'Opening parenthesis in consumerNo' },
        { consumerNo: '1122007)497', electricityProvider: 'NBPDCL', description: 'Closing parenthesis in consumerNo' },
        { consumerNo: '1122007[497', electricityProvider: 'NBPDCL', description: 'Opening square bracket in consumerNo' },
        { consumerNo: '1122007]497', electricityProvider: 'NBPDCL', description: 'Closing square bracket in consumerNo' },
        { consumerNo: '1122007{497', electricityProvider: 'NBPDCL', description: 'Opening curly brace in consumerNo' },
        { consumerNo: '1122007}497', electricityProvider: 'NBPDCL', description: 'Closing curly brace in consumerNo' },
        { consumerNo: '1122007<497', electricityProvider: 'NBPDCL', description: 'Less-than sign in consumerNo' },
        { consumerNo: '1122007>497', electricityProvider: 'NBPDCL', description: 'Greater-than sign in consumerNo' },
        { consumerNo: '1122007?497', electricityProvider: 'NBPDCL', description: 'Question mark in consumerNo' },
        { consumerNo: '1122007@497', electricityProvider: 'NBPDCL', description: 'At sign in consumerNo' },
        { consumerNo: '1122007:497', electricityProvider: 'NBPDCL', description: 'Colon in consumerNo' },
        { consumerNo: '1122007;497', electricityProvider: 'NBPDCL', description: 'Semicolon in consumerNo' },
        { consumerNo: '1122007`497', electricityProvider: 'NBPDCL', description: 'Backtick in consumerNo' },
        { consumerNo: '1122007~497', electricityProvider: 'NBPDCL', description: 'Tilde in consumerNo' },
        { consumerNo: '1122007|497', electricityProvider: 'NBPDCL', description: 'Vertical bar in consumerNo' },
        { consumerNo: '1122007\'497', electricityProvider: 'NBPDCL', description: 'Single quote in consumerNo' },
        { consumerNo: '1122007"497', electricityProvider: 'NBPDCL', description: 'Double quote in consumerNo' },
        { consumerNo: null, electricityProvider: 'NBPDCL', description: 'Null consumerNo' },
        { consumerNo: '', electricityProvider: 'NBPDCL', description: 'Empty string for consumerNo' },
        { consumerNo: undefined, electricityProvider: 'NBPDCL', description: 'Undefined consumerNo' },
        { consumerNo: true, electricityProvider: 'NBPDCL', description: 'Boolean true as consumerNo' },
        { consumerNo: false, electricityProvider: 'NBPDCL', description: 'Boolean false as consumerNo' },
        { consumerNo: ' 11220079497', electricityProvider: 'NBPDCL', description: 'Leading space in consumerNo' },
        { consumerNo: '11220079497 ', electricityProvider: 'NBPDCL', description: 'Trailing space in consumerNo' },
        { consumerNo: '11220 079497', electricityProvider: 'NBPDCL', description: 'Space in middle of consumerNo' },
        { consumerNo: '11-220079497', electricityProvider: 'NBPDCL', description: 'Hyphen in consumerNo' },
        { consumerNo: '1122/0079497', electricityProvider: 'NBPDCL', description: 'Slash in consumerNo' },
        { consumerNo: Boolean, electricityProvider: 'NBPDCL', description: 'boolean data type' },


        //Valid consumerNo and Invalid electricityProvider
        { consumerNo: '11220079497', electricityProvider: 'N-PDCL', description: 'Hyphen in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'N@PDCL', description: 'Special character in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NP DCL', description: 'Embedded space in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDC L', description: 'Trailing space in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDC', description: 'Too short electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCLTOOLONG', description: 'Too long electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL!', description: 'Exclamation mark in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL#', description: 'Hash in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL$', description: 'Dollar sign in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL%', description: 'Percent sign in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL^', description: 'Caret in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL&', description: 'Ampersand in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL*', description: 'Asterisk in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL(', description: 'Opening parenthesis in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL)', description: 'Closing parenthesis in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL_', description: 'Underscore in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL+', description: 'Plus sign in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL=', description: 'Equal sign in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL{', description: 'Opening curly brace in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL}', description: 'Closing curly brace in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL[', description: 'Opening square bracket in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL]', description: 'Closing square bracket in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL|', description: 'Vertical bar in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL\\', description: 'Backslash in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL/', description: 'Slash in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL:', description: 'Colon in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL;', description: 'Semicolon in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL\'', description: 'Single quote in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL"', description: 'Double quote in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL<', description: 'Less-than sign in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL>', description: 'Greater-than sign in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL?', description: 'Question mark in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL.', description: 'Period in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL,', description: 'Comma in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL~', description: 'Tilde in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL`', description: 'Backtick in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL ', description: 'Trailing space in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: ' NPDCL', description: 'Leading space in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NP1DCL', description: 'Numeric character in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NP@DCL', description: 'Special character in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NP-DCL', description: 'Hyphen in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NP_DCL', description: 'Underscore in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NP DCL', description: 'Space in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL++', description: 'Double plus signs in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL**', description: 'Double asterisks in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NPDCL!!', description: 'Double exclamation marks in electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: '', description: 'Empty string for electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: undefined, description: 'Undefined electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: true, description: 'Boolean true as electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: false, description: 'Boolean false as electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: Boolean, description: 'Boolean data type as electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: null, description: 'Null electricityProvider' }, //Issue


        //Invalid consumerNo and Invalid electricityProvider
        { consumerNo: '1122007 497', electricityProvider: 'N-PDCL', description: 'Space in consumerNo, hyphen in electricityProvider' },
        { consumerNo: '112200794@7', electricityProvider: 'N@PDCL', description: 'Special character in consumerNo and electricityProvider' },
        { consumerNo: '11220079497', electricityProvider: 'NP DCL', description: 'Valid consumerNo, embedded space in electricityProvider' },
        { consumerNo: '1122007949', electricityProvider: 'NPDC L', description: 'Too short consumerNo, trailing space in electricityProvider' },
        { consumerNo: '1122007949700', electricityProvider: 'NPDC', description: 'Too long consumerNo, too short electricityProvider' },
        { consumerNo: '1122007949A', electricityProvider: 'NPDCLTOOLONG', description: 'Alphabetic character in consumerNo, too long electricityProvider' },
        { consumerNo: '112200794@7', electricityProvider: 'NPDCL!', description: 'Special character in consumerNo and electricityProvider' },
        { consumerNo: '11220 079497', electricityProvider: 'NPDCL#', description: 'Space in consumerNo, hash in electricityProvider' },
        { consumerNo: '11220079497 ', electricityProvider: 'NPDCL$', description: 'Trailing space in consumerNo, dollar sign in electricityProvider' },
        { consumerNo: ' 11220079497', electricityProvider: 'NPDCL%', description: 'Leading space in consumerNo, percent sign in electricityProvider' },
        { consumerNo: '1122007949$', electricityProvider: 'NPDCL^', description: 'Dollar sign in consumerNo, caret in electricityProvider' },
        { consumerNo: '1122007949^', electricityProvider: 'NPDCL&', description: 'Caret in consumerNo, ampersand in electricityProvider' },
        { consumerNo: '1122007949&', electricityProvider: 'NPDCL*', description: 'Ampersand in consumerNo, asterisk in electricityProvider' },
        { consumerNo: '1122007949*', electricityProvider: 'NPDCL(', description: 'Asterisk in consumerNo, opening parenthesis in electricityProvider' },
        { consumerNo: '1122007949(', electricityProvider: 'NPDCL)', description: 'Opening parenthesis in consumerNo, closing parenthesis in electricityProvider' },
        { consumerNo: '1122007949)', electricityProvider: 'NPDCL_', description: 'Closing parenthesis in consumerNo, underscore in electricityProvider' },
        { consumerNo: '1122007949_', electricityProvider: 'NPDCL+', description: 'Underscore in consumerNo, plus sign in electricityProvider' },
        { consumerNo: '1122007949+', electricityProvider: 'NPDCL=', description: 'Plus sign in consumerNo, equal sign in electricityProvider' },
        { consumerNo: '1122007949=', electricityProvider: 'NPDCL{', description: 'Equal sign in consumerNo, opening curly brace in electricityProvider' },
        { consumerNo: '1122007949{', electricityProvider: 'NPDCL}', description: 'Opening curly brace in consumerNo, closing curly brace in electricityProvider' },
        { consumerNo: '1122007949}', electricityProvider: 'NPDCL[', description: 'Closing curly brace in consumerNo, opening square bracket in electricityProvider' },
        { consumerNo: '1122007949[', electricityProvider: 'NPDCL]', description: 'Opening square bracket in consumerNo, closing square bracket in electricityProvider' },
        { consumerNo: '1122007949]', electricityProvider: 'NPDCL|', description: 'Closing square bracket in consumerNo, vertical bar in electricityProvider' },
        { consumerNo: '1122007949|', electricityProvider: 'NPDCL\\', description: 'Vertical bar in consumerNo, backslash in electricityProvider' },
        { consumerNo: '1122007949\\', electricityProvider: 'NPDCL/', description: 'Backslash in consumerNo, slash in electricityProvider' },
        { consumerNo: '1122007949/', electricityProvider: 'NPDCL:', description: 'Slash in consumerNo, colon in electricityProvider' },
        { consumerNo: '1122007949:', electricityProvider: 'NPDCL;', description: 'Colon in consumerNo, semicolon in electricityProvider' },
        { consumerNo: '1122007949;', electricityProvider: 'NPDCL\'', description: 'Semicolon in consumerNo, single quote in electricityProvider' },
        { consumerNo: '1122007949\'', electricityProvider: 'NPDCL"', description: 'Single quote in consumerNo, double quote in electricityProvider' },
        { consumerNo: '1122007949"', electricityProvider: 'NPDCL<', description: 'Double quote in consumerNo, less-than sign in electricityProvider' },
        { consumerNo: '1122007949<', electricityProvider: 'NPDCL>', description: 'Less-than sign in consumerNo, greater-than sign in electricityProvider' },
        { consumerNo: '1122007949>', electricityProvider: 'NPDCL?', description: 'Greater-than sign in consumerNo, question mark in electricityProvider' },
        { consumerNo: '1122007949?', electricityProvider: 'NPDCL.', description: 'Question mark in consumerNo, period in electricityProvider' },
        { consumerNo: '1122007949.', electricityProvider: 'NPDCL,', description: 'Period in consumerNo, comma in electricityProvider' },
        { consumerNo: '1122007949,', electricityProvider: 'NPDCL~', description: 'Comma in consumerNo, tilde in electricityProvider' },
        { consumerNo: '1122007949~', electricityProvider: 'NPDCL`', description: 'Tilde in consumerNo, backtick in electricityProvider' },
        { consumerNo: '1122007949`', electricityProvider: 'NPDCL ', description: 'Backtick in consumerNo, trailing space in electricityProvider' },
        { consumerNo: '1122007949 ', electricityProvider: ' NPDCL', description: 'Trailing space in consumerNo, leading space in electricityProvider' },
        { consumerNo: ' 1122007949', electricityProvider: 'NP1DCL', description: 'Leading space in consumerNo, numeric character in electricityProvider' },
        { consumerNo: '1122007949 ', electricityProvider: 'NP@DCL', description: 'Trailing space in consumerNo, special character in electricityProvider' },
        { consumerNo: '1122007949-', electricityProvider: 'NP-DCL', description: 'Hyphen in consumerNo and electricityProvider' },
        { consumerNo: '1122007949_', electricityProvider: 'NP_DCL', description: 'Underscore in consumerNo and electricityProvider' },
        { consumerNo: '1122007949 ', electricityProvider: 'NP DCL', description: 'Space in consumerNo and electricityProvider' },
        { consumerNo: '1122007949++', electricityProvider: 'NPDCL++', description: 'Double plus signs in consumerNo and electricityProvider' },
        { consumerNo: '1122007949**', electricityProvider: 'NPDCL**', description: 'Double asterisks in consumerNo and electricityProvider' },
        { consumerNo: '1122007949!!', electricityProvider: 'NPDCL!!', description: 'Double exclamation marks in consumerNo and electricityProvider' },
        { consumerNo: '', electricityProvider: '', description: 'Empty string for consumerNo and electricityProvider' },
        { consumerNo: undefined, electricityProvider: undefined, description: 'Undefined consumerNo and electricityProvider' },
        { consumerNo: true, electricityProvider: true, description: 'Boolean true as consumerNo and electricityProvider' },
        { consumerNo: false, electricityProvider: false, description: 'Boolean false as consumerNo and electricityProvider' },
        { consumerNo: Boolean, electricityProvider: Boolean, description: 'Boolean data type as consumerNo and electricityProvider' },
        { consumerNo: null, electricityProvider: null, description: 'Null consumerNo and electricityProvider' }, //Issue

        { consumerNo: '11220079497', electricityProvider: 'DGVCL', description: 'No record found' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Utility Electricity Check');
    filteredTestCases.forEach((testCase) => {
        invalidElectricityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Utility - Electricity Details, Consumer No. : ${invalidCase.consumerNo} and Electricity Provider : ${invalidCase.electricityProvider}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, consumerNo: invalidCase.consumerNo,  electricityProvider: invalidCase.electricityProvider}; 

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