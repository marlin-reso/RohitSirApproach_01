/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Import Export API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidfirmNameiecNumber = [
        //Invalid firmName and valid iecNumber
        { firmName: '', iecNumber: '0311073701', description: 'Empty firmName' },
        { firmName: 'Y@S', iecNumber: '0311073701', description: 'Special character @ in firmName' },
        { firmName: ' YAS', iecNumber: '0311073701', description: 'Leading space in firmName' },
        { firmName: 'YAS ', iecNumber: '0311073701', description: 'Trailing space in firmName' },
        { firmName: 'YAS  ', iecNumber: '0311073701', description: 'Multiple trailing spaces in firmName' },
        { firmName: ' YA S', iecNumber: '0311073701', description: 'Embedded spaces in firmName' },
        { firmName: 'Y&S', iecNumber: '0311073708', description: 'Special character & in firmName' },
        { firmName: 'Y#S', iecNumber: '0311073701', description: 'Special character # in firmName' },
        { firmName: 'Y$S', iecNumber: '0311073701', description: 'Special character $ in firmName' },
        { firmName: 'Y^S', iecNumber: '0311073701', description: 'Special character ^ in firmName' },
        { firmName: 'Y*S', iecNumber: '0311073701', description: 'Special character * in firmName' },
        { firmName: 'Y(S', iecNumber: '0311073701', description: 'Special character ( in firmName' },
        { firmName: 'Y)S', iecNumber: '0311073701', description: 'Special character ) in firmName' },
        { firmName: 'Y+S', iecNumber: '0311073701', description: 'Special character + in firmName' },
        { firmName: 'Y=S', iecNumber: '0311073701', description: 'Special character = in firmName' },
        { firmName: 'Y~S', iecNumber: '0311073701', description: 'Special character ~ in firmName' },
        { firmName: 'Y`S', iecNumber: '0311073701', description: 'Backtick in firmName' },
        { firmName: 'Y{S', iecNumber: '0311073701', description: 'Special character { in firmName' },
        { firmName: 'Y}S', iecNumber: '0311073701', description: 'Special character } in firmName' },
        { firmName: 'Y[S', iecNumber: '0311073701', description: 'Special character [ in firmName' },
        { firmName: 'Y]S', iecNumber: '0311073701', description: 'Special character ] in firmName' },
        { firmName: 'Y|S', iecNumber: '0311073701', description: 'Special character | in firmName' },
        { firmName: 'Y\\S', iecNumber: '0311073701', description: 'Backslash in firmName' },
        { firmName: 'Y:S', iecNumber: '0311073701', description: 'Colon in firmName' },
        { firmName: 'Y;S', iecNumber: '0311073701', description: 'Semicolon in firmName' },
        { firmName: 'Y"S', iecNumber: '0311073701', description: 'Double quote in firmName' },
        { firmName: 'Y\'S', iecNumber: '0311073701', description: 'Single quote in firmName' },
        { firmName: 'Y<S', iecNumber: '0311073701', description: 'Less-than sign in firmName' },
        { firmName: 'Y>S', iecNumber: '0311073701', description: 'Greater-than sign in firmName' },
        { firmName: 'Y,S', iecNumber: '0311073701', description: 'Comma in firmName' },
        { firmName: 'Y.S', iecNumber: '0311073701', description: 'Period in firmName' },
        { firmName: 'Y?S', iecNumber: '0311073701', description: 'Question mark in firmName' },
        { firmName: 'Y!S', iecNumber: '0311073701', description: 'Exclamation mark in firmName' },
        { firmName: 'Y@S', iecNumber: '0311073701', description: 'At sign in firmName' },
        { firmName: 'Y#S', iecNumber: '0311073701', description: 'Hash sign in firmName' },
        { firmName: 'Y^S', iecNumber: '0311073701', description: 'Caret in firmName' },
        { firmName: 'Y*S', iecNumber: '0311073701', description: 'Asterisk in firmName' },
        { firmName: 'Y(S', iecNumber: '0311073701', description: 'Opening parenthesis in firmName' },
        { firmName: 'Y)S', iecNumber: '0311073701', description: 'Closing parenthesis in firmName' },
        { firmName: undefined, iecNumber: '0311073701', description: 'Undefined firmName' },
        { firmName: 'Y\tS', iecNumber: '0311073701', description: 'Tab character in firmName' },
        { firmName: 'Y\nS', iecNumber: '0311073701', description: 'Newline character in firmName' },
        { firmName: Boolean, iecNumber: '0311073701', description: 'Boolean data type' },
        { firmName: null, iecNumber: '0311073701', description: 'Null firmName' },
        { firmName: true, iecNumber: '0311073701', description: 'Boolean true value for firmName' },
        { firmName: false, iecNumber: '0311073701', description: 'Boolean false value for firmName' },
        { firmName: 1, iecNumber: '0311073701', description: 'number firmName' },

        //Valid firmName and invalid iecNumber
        { firmName: 'YAS', iecNumber: '', description: 'Empty iecNumber' },
        { firmName: 'YAS', iecNumber: '031107370', description: 'Missing one digit in iecNumber' },
        { firmName: 'YAS', iecNumber: '03110737012', description: 'Extra digit in iecNumber' },
        { firmName: 'YAS', iecNumber: '03110737O1', description: 'Letter O instead of zero' },
        { firmName: 'YAS', iecNumber: ' 0311073701', description: 'Leading space in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701 ', description: 'Trailing space in iecNumber' },
        { firmName: 'YAS', iecNumber: '031107 3701', description: 'Embedded space in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701-', description: 'Trailing hyphen in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701/', description: 'Trailing slash in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701#', description: 'Hash sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701$', description: 'Dollar sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701%', description: 'Percent sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701^', description: 'Caret sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701&', description: 'Ampersand in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701*', description: 'Asterisk in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701(', description: 'Opening parenthesis in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701)', description: 'Closing parenthesis in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701+', description: 'Plus sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701=', description: 'Equal sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701~', description: 'Tilde in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701`', description: 'Backtick in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701[', description: 'Opening square bracket in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701]', description: 'Closing square bracket in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701{', description: 'Opening curly brace in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701}', description: 'Closing curly brace in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701|', description: 'Vertical bar in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701\\', description: 'Backslash in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701:', description: 'Colon in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701;', description: 'Semicolon in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701\'', description: 'Single quote in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701"', description: 'Double quote in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701<', description: 'Less-than sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701>', description: 'Greater-than sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701,', description: 'Comma in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701.', description: 'Period in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701?', description: 'Question mark in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701!', description: 'Exclamation mark in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701@', description: 'At sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701#', description: 'Hash sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701%', description: 'Percent sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701^', description: 'Caret sign in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701&', description: 'Ampersand in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701*', description: 'Asterisk in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701(', description: 'Opening parenthesis in iecNumber' },
        { firmName: 'YAS', iecNumber: '0311073701)', description: 'Closing parenthesis in iecNumber' },
        { firmName: 'YAS', iecNumber: undefined, description: 'Undefined iecNumber' },
        { firmName: 'YAS', iecNumber: Boolean, description: 'Boolean data type value for iecNumber' },
        { firmName: 'YAS', iecNumber: '03110\t73701', description: 'Tab character in iecNumber' },
        { firmName: 'YAS', iecNumber: '03110\n73701', description: 'Newline character in iecNumber' },
        { firmName: 'YAS', iecNumber: null, description: 'Null iecNumber' },
        { firmName: 'YAS', iecNumber: true, description: 'Boolean true value for iecNumber' },
        { firmName: 'YAS', iecNumber: false, description: 'Boolean false value for iecNumber' },


        //Invalid firmName and iecNumber both
        { firmName: '', iecNumber: '', description: 'Empty firmName and iecNumber' },
        { firmName: 'Y@S', iecNumber: '031107370', description: 'Special character in firmName and missing digit in iecNumber' },
        { firmName: ' YAS', iecNumber: '03110737012', description: 'Leading space in firmName and extra digit in iecNumber' },
        { firmName: 'YAS ', iecNumber: '03110737O1', description: 'Trailing space in firmName and letter O instead of zero' },
        { firmName: 'YA S', iecNumber: ' 0311073701', description: 'Embedded space in firmName and leading space in iecNumber' },
        { firmName: 'Y&S', iecNumber: '0311073701 ', description: 'Special character & in firmName and trailing space in iecNumber' },
        { firmName: 'Y#S', iecNumber: '031107 3701', description: 'Special character # in firmName and embedded space in iecNumber' },
        { firmName: 'Y$S', iecNumber: '0311073701-', description: 'Special character $ in firmName and trailing hyphen in iecNumber' },
        { firmName: 'Y%S', iecNumber: '0311073701/', description: 'Special character % in firmName and trailing slash in iecNumber' },
        { firmName: 'Y^S', iecNumber: '0311073701#', description: 'Special character ^ in firmName and hash sign in iecNumber' },
        { firmName: 'Y*S', iecNumber: '0311073701$', description: 'Special character * in firmName and dollar sign in iecNumber' },
        { firmName: 'Y(S', iecNumber: '0311073701%', description: 'Special character ( in firmName and percent sign in iecNumber' },
        { firmName: 'Y)S', iecNumber: '0311073701^', description: 'Special character ) in firmName and caret sign in iecNumber' },
        { firmName: 'Y_S', iecNumber: '0311073701&', description: 'Underscore in firmName and ampersand in iecNumber' },
        { firmName: 'Y+S', iecNumber: '0311073701*', description: 'Special character + in firmName and asterisk in iecNumber' },
        { firmName: 'Y=S', iecNumber: '0311073701(', description: 'Special character = in firmName and opening parenthesis in iecNumber' },
        { firmName: 'Y~S', iecNumber: '0311073701)', description: 'Special character ~ in firmName and closing parenthesis in iecNumber' },
        { firmName: 'Y`S', iecNumber: '0311073701+', description: 'Backtick in firmName and plus sign in iecNumber' },
        { firmName: 'Y{S', iecNumber: '0311073701=', description: 'Special character { in firmName and equal sign in iecNumber' },
        { firmName: 'Y}S', iecNumber: '0311073701~', description: 'Special character } in firmName and tilde in iecNumber' },
        { firmName: 'Y[S', iecNumber: '0311073701`', description: 'Special character [ in firmName and backtick in iecNumber' },
        { firmName: 'Y]S', iecNumber: '0311073701[', description: 'Special character ] in firmName and opening square bracket in iecNumber' },
        { firmName: 'Y|S', iecNumber: '0311073701]', description: 'Special character | in firmName and closing square bracket in iecNumber' },
        { firmName: 'Y\\S', iecNumber: '0311073701{', description: 'Backslash in firmName and opening curly brace in iecNumber' },
        { firmName: 'Y:S', iecNumber: '0311073701}', description: 'Colon in firmName and closing curly brace in iecNumber' },
        { firmName: 'Y;S', iecNumber: '0311073701|', description: 'Semicolon in firmName and vertical bar in iecNumber' },
        { firmName: 'Y"S', iecNumber: '0311073701\\', description: 'Double quote in firmName and backslash in iecNumber' },
        { firmName: 'Y\'S', iecNumber: '0311073701:', description: 'Single quote in firmName and colon in iecNumber' },
        { firmName: 'Y<S', iecNumber: '0311073701;', description: 'Less-than sign in firmName and semicolon in iecNumber' },
        { firmName: 'Y>S', iecNumber: '0311073701\'', description: 'Greater-than sign in firmName and single quote in iecNumber' },
        { firmName: 'Y,S', iecNumber: '0311073701"', description: 'Comma in firmName and double quote in iecNumber' },
        { firmName: 'Y.S', iecNumber: '0311073701<', description: 'Period in firmName and less-than sign in iecNumber' },
        { firmName: 'Y?S', iecNumber: '0311073701>', description: 'Question mark in firmName and greater-than sign in iecNumber' },
        { firmName: 'Y!S', iecNumber: '0311073701,', description: 'Exclamation mark in firmName and comma in iecNumber' },
        { firmName: 'Y@S', iecNumber: '0311073701.', description: 'At sign in firmName and period in iecNumber' },
        { firmName: 'Y#S', iecNumber: '0311073701?', description: 'Hash sign in firmName and question mark in iecNumber' },
        { firmName: 'Y^S', iecNumber: '0311073701@', description: 'Caret sign in firmName and at sign in iecNumber' },
        { firmName: 'Y*S', iecNumber: '0311073701$', description: 'Asterisk in firmName and dollar sign in iecNumber' },
        { firmName: 'Y(S', iecNumber: '0311073701%', description: 'Opening parenthesis in firmName and percent sign in iecNumber' },
        { firmName: 'Y)S', iecNumber: '0311073701^', description: 'Closing parenthesis in firmName and caret sign in iecNumber' },
        { firmName: undefined, iecNumber: undefined, description: 'Undefined firmName and iecNumber' },
        { firmName: Boolean, iecNumber: Boolean, description: 'Boolean datatype values for firmName and iecNumber' },
        { firmName: 'Y\tS', iecNumber: '03110\t73701', description: 'Tab character in firmName and iecNumber' },
        { firmName: 'Y\nS', iecNumber: '03110\n73701', description: 'Newline character in firmName and iecNumber' },
        { firmName: null, iecNumber: null, description: 'Null firmName and iecNumber' },
        { firmName: true, iecNumber: true, description: 'Boolean true values for firmName and iecNumber' },
        { firmName: false, iecNumber: false, description: 'Boolean false values for firmName and iecNumber' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Import Export Verification');
    filteredTestCases.forEach((testCase) => {
        invalidfirmNameiecNumber.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} firm name : ${invalidCase.firmName} and iec Number : ${invalidCase.iecNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;            
                const requestData = { ...payLoad.requestData, firmName: invalidCase.firmName, iecNumber: invalidCase.iecNumber }; 

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