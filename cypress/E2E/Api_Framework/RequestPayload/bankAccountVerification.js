/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Bank Account Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidBankAccountdetails = [
        //Invalid Account Number and Valid IFSC
        { accountNumber: '3467681826@', ifsc: 'SBIN0003267', description: 'Special character in account number' },
        { accountNumber: ' 34676818265', ifsc: 'SBIN0003267', description: 'Leading space in account number' },
        { accountNumber: '34676818265 ', ifsc: 'SBIN0003267', description: 'Trailing space in account number' },
        { accountNumber: '346768182 65', ifsc: 'SBIN0003267', description: 'Embedded space in account number' },
        { accountNumber: '34,676818265', ifsc: 'SBIN0003267', description: 'Comma in account number' },
        { accountNumber: '34676.818265', ifsc: 'SBIN0003267', description: 'Period in account number' },
        { accountNumber: '34676-818265', ifsc: 'SBIN0003267', description: 'Hyphen in account number' },
        { accountNumber: '34676_818265', ifsc: 'SBIN0003267', description: 'Underscore in account number' },
        { accountNumber: '34676@818265', ifsc: 'SBIN0003267', description: 'Special character in middle of account number' },
        { accountNumber: '34676818*265', ifsc: 'SBIN0003267', description: 'Asterisk in account number' },
        { accountNumber: '34676818/265', ifsc: 'SBIN0003267', description: 'Slash in account number' },
        { accountNumber: '34676818\\265', ifsc: 'SBIN0003267', description: 'Backslash in account number' },
        { accountNumber: '34676818#265', ifsc: 'SBIN0003267', description: 'Hash sign in account number' },
        { accountNumber: '34676818%265', ifsc: 'SBIN0003267', description: 'Percent sign in account number' },
        { accountNumber: '34676818&265', ifsc: 'SBIN0003267', description: 'Ampersand in account number' },
        { accountNumber: '34676818(265', ifsc: 'SBIN0003267', description: 'Opening parenthesis in account number' },
        { accountNumber: '34676818)265', ifsc: 'SBIN0003267', description: 'Closing parenthesis in account number' },
        { accountNumber: '34676818+265', ifsc: 'SBIN0003267', description: 'Plus sign in account number' },
        { accountNumber: '34676818=265', ifsc: 'SBIN0003267', description: 'Equal sign in account number' },
        { accountNumber: '34676818~265', ifsc: 'SBIN0003267', description: 'Tilde in account number' },
        { accountNumber: '34676818`265', ifsc: 'SBIN0003267', description: 'Backtick in account number' },
        { accountNumber: '34676818[265', ifsc: 'SBIN0003267', description: 'Opening square bracket in account number' },
        { accountNumber: '34676818]265', ifsc: 'SBIN0003267', description: 'Closing square bracket in account number' },
        { accountNumber: '34676818{265', ifsc: 'SBIN0003267', description: 'Opening curly brace in account number' },
        { accountNumber: '34676818}265', ifsc: 'SBIN0003267', description: 'Closing curly brace in account number' },
        { accountNumber: '34676818|265', ifsc: 'SBIN0003267', description: 'Vertical bar in account number' },
        { accountNumber: '34676818\\265', ifsc: 'SBIN0003267', description: 'Backslash in account number' },
        { accountNumber: '34676818:265', ifsc: 'SBIN0003267', description: 'Colon in account number' },
        { accountNumber: '34676818;265', ifsc: 'SBIN0003267', description: 'Semicolon in account number' },
        { accountNumber: '34676818\'265', ifsc: 'SBIN0003267', description: 'Single quote in account number' },
        { accountNumber: '34676818"265', ifsc: 'SBIN0003267', description: 'Double quote in account number' },
        { accountNumber: '34676818<265', ifsc: 'SBIN0003267', description: 'Less-than sign in account number' },
        { accountNumber: '34676818>265', ifsc: 'SBIN0003267', description: 'Greater-than sign in account number' },
        { accountNumber: '34676818?265', ifsc: 'SBIN0003267', description: 'Question mark in account number' },
        { accountNumber: '34676818@265', ifsc: 'SBIN0003267', description: 'At sign in account number' },
        { accountNumber: '34676818265 ', ifsc: 'SBIN0003267', description: 'Trailing space' },
        { accountNumber: ' 34676818265', ifsc: 'SBIN0003267', description: 'Leading space' },
        { accountNumber: '34676.818265', ifsc: 'SBIN0003267', description: 'Double periods at the end' },
        { accountNumber: '34676818265,,', ifsc: 'SBIN0003267', description: 'Double commas at the end' },
        { accountNumber: '34676818265!!', ifsc: 'SBIN0003267', description: 'Double exclamation marks at the end' },
        { accountNumber: null, ifsc: 'SBIN0003267', description: 'Null value for account number' },
        { accountNumber: '', ifsc: 'SBIN0003267', description: 'Empty string for account number' },
        { accountNumber: undefined, ifsc: 'SBIN0003267', description: 'Undefined account number' },
        { accountNumber: true, ifsc: 'SBIN0003267', description: 'Boolean true value for account number' },
        { accountNumber: false, ifsc: 'SBIN0003267', description: 'Boolean false value for account number' },
        { accountNumber: Boolean, ifsc: 'SBIN0003267', description: 'Boolean data type value for account number' },

        //Valid Account Number and Invalid IFSC
        { accountNumber: '34676818265', ifsc: 'SBIN00032', description: 'Missing digits in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN00032678', description: 'Extra digit in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN 003267', description: 'Space in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003267@', description: 'Special character at the end of IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN#003267', description: 'Special character in middle of IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003267 ', description: 'Trailing space in IFSC' },
        { accountNumber: '34676818265', ifsc: ' SBIN0003267', description: 'Leading space in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003 267', description: 'Embedded space in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003*267', description: 'Asterisk in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003/267', description: 'Slash in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003\\267', description: 'Backslash in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003#267', description: 'Hash sign in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003%267', description: 'Percent sign in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003&267', description: 'Ampersand in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003(267', description: 'Opening parenthesis in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003)267', description: 'Closing parenthesis in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003+267', description: 'Plus sign in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003=267', description: 'Equal sign in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003~267', description: 'Tilde in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003`267', description: 'Backtick in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003[267', description: 'Opening square bracket in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003]267', description: 'Closing square bracket in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003{267', description: 'Opening curly brace in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003}267', description: 'Closing curly brace in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003|267', description: 'Vertical bar in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003:267', description: 'Colon in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003;267', description: 'Semicolon in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003"267', description: 'Double quote in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003<267', description: 'Less-than sign in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003>267', description: 'Greater-than sign in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003?267', description: 'Question mark in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003@267', description: 'At sign in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN000326.', description: 'Trailing period in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN00032,,7', description: 'Double commas in IFSC' },
        { accountNumber: '34676818265', ifsc: 'SBIN0003267!!', description: 'Double exclamation marks at the end of IFSC' },
        { accountNumber: '34676818265', ifsc: null, description: 'Null value for IFSC' },
        { accountNumber: '34676818265', ifsc: '', description: 'Empty string for IFSC' },
        { accountNumber: '34676818265', ifsc: undefined, description: 'Undefined IFSC' },
        { accountNumber: '34676818265', ifsc: true, description: 'Boolean true value for IFSC' },
        { accountNumber: '34676818265', ifsc: false, description: 'Boolean false value for IFSC' },
        { accountNumber: '34676818265', ifsc: Boolean, description: 'Boolean data type value for IFSC' },

        //Invalid Account Number and Invalid IFSC
        { accountNumber: '3467681826', ifsc: 'SBIN00032', description: 'Missing digit in both account number and IFSC' },
        { accountNumber: '346768182656', ifsc: 'SBIN00032678', description: 'Extra digit in both account number and IFSC' },
        { accountNumber: '3467681826@', ifsc: 'SBIN 003267', description: 'Special character in account number, space in IFSC' },
        { accountNumber: ' 34676818265', ifsc: 'SBIN0003267 ', description: 'Leading space in account number, trailing space in IFSC' },
        { accountNumber: '34676818265 ', ifsc: ' SBIN0003267', description: 'Trailing space in account number, leading space in IFSC' },
        { accountNumber: '346768182 65', ifsc: 'SBIN0003 267', description: 'Embedded space in both account number and IFSC' },
        { accountNumber: '34,676818265', ifsc: 'SBIN#003267', description: 'Comma in account number, hash sign in IFSC' },
        { accountNumber: '34676.818265', ifsc: 'SBIN0003.267', description: 'Period in both account number and IFSC' },
        { accountNumber: '34676-818265', ifsc: 'SBIN0003-267', description: 'Hyphen in both account number and IFSC' },
        { accountNumber: '34676_818265', ifsc: 'SBIN0003_267', description: 'Underscore in both account number and IFSC' },
        { accountNumber: '34676@818265', ifsc: 'SBIN0003@267', description: 'Special character in middle of both account number and IFSC' },
        { accountNumber: 'A34676818265', ifsc: 'SBINA003267', description: 'Alphabetic character at start of account number, extra character in IFSC' },
        { accountNumber: '34676818265B', ifsc: 'SBIN0003267B', description: 'Alphabetic character at end of both account number and IFSC' },
        { accountNumber: '34676818*265', ifsc: 'SBIN0003*267', description: 'Asterisk in both account number and IFSC' },
        { accountNumber: '34676818/265', ifsc: 'SBIN0003/267', description: 'Slash in both account number and IFSC' },
        { accountNumber: '34676818\\265', ifsc: 'SBIN0003\\267', description: 'Backslash in both account number and IFSC' },
        { accountNumber: '34676818#265', ifsc: 'SBIN0003#267', description: 'Hash sign in both account number and IFSC' },
        { accountNumber: '34676818%265', ifsc: 'SBIN0003%267', description: 'Percent sign in both account number and IFSC' },
        { accountNumber: '34676818&265', ifsc: 'SBIN0003&267', description: 'Ampersand in both account number and IFSC' },
        { accountNumber: '34676818(265', ifsc: 'SBIN0003(267', description: 'Opening parenthesis in both account number and IFSC' },
        { accountNumber: '34676818)265', ifsc: 'SBIN0003)267', description: 'Closing parenthesis in both account number and IFSC' },
        { accountNumber: '34676818+265', ifsc: 'SBIN0003+267', description: 'Plus sign in both account number and IFSC' },
        { accountNumber: '34676818=265', ifsc: 'SBIN0003=267', description: 'Equal sign in both account number and IFSC' },
        { accountNumber: '34676818~265', ifsc: 'SBIN0003~267', description: 'Tilde in both account number and IFSC' },
        { accountNumber: '34676818`265', ifsc: 'SBIN0003`267', description: 'Backtick in both account number and IFSC' },
        { accountNumber: '34676818[265', ifsc: 'SBIN0003[267', description: 'Opening square bracket in both account number and IFSC' },
        { accountNumber: '34676818]265', ifsc: 'SBIN0003]267', description: 'Closing square bracket in both account number and IFSC' },
        { accountNumber: '34676818{265', ifsc: 'SBIN0003{267', description: 'Opening curly brace in both account number and IFSC' },
        { accountNumber: '34676818}265', ifsc: 'SBIN0003}267', description: 'Closing curly brace in both account number and IFSC' },
        { accountNumber: '34676818|265', ifsc: 'SBIN0003|267', description: 'Vertical bar in both account number and IFSC' },
        { accountNumber: '34676818\\265', ifsc: 'SBIN0003\\267', description: 'Backslash in both account number and IFSC' },
        { accountNumber: '34676818:265', ifsc: 'SBIN0003:267', description: 'Colon in both account number and IFSC' },
        { accountNumber: '34676818;265', ifsc: 'SBIN0003;267', description: 'Semicolon in both account number and IFSC' },
        { accountNumber: '34676818\'265', ifsc: 'SBIN0003\'267', description: 'Single quote in both account number and IFSC' },
        { accountNumber: '34676818"265', ifsc: 'SBIN0003"267', description: 'Double quote in both account number and IFSC' },
        { accountNumber: '34676818<265', ifsc: 'SBIN0003<267', description: 'Less-than sign in both account number and IFSC' },
        { accountNumber: '34676818>265', ifsc: 'SBIN0003>267', description: 'Greater-than sign in both account number and IFSC' },
        { accountNumber: '34676818?265', ifsc: 'SBIN0003?267', description: 'Question mark in both account number and IFSC' },
        { accountNumber: '34676818@265', ifsc: 'SBIN0003@267', description: 'At sign in both account number and IFSC' },
        { accountNumber: '34676818265 ', ifsc: 'SBIN000326.', description: 'Trailing space in account number, period in IFSC' },
        { accountNumber: ' 34676818265', ifsc: 'SBIN00032,,7', description: 'Leading space in account number, double commas in IFSC' },
        { accountNumber: '34676.818265', ifsc: 'SBIN0003267!!', description: 'Periods in account number, double exclamation marks in IFSC' },
        { accountNumber: null, ifsc: null, description: 'Null values for both account number and IFSC' },
        { accountNumber: '', ifsc: '', description: 'Empty strings for both account number and IFSC' },
        { accountNumber: undefined, ifsc: undefined, description: 'Undefined values for both account number and IFSC' },
        { accountNumber: true, ifsc: true, description: 'Boolean true values for both account number and IFSC' },
        { accountNumber: false, ifsc: false, description: 'Boolean false values for both account number and IFSC' },
        { accountNumber: Boolean, ifsc: Boolean, description: 'Boolean data type values for both account number and IFSC' },    

        { accountNumber:'1105202303', ifsc:'KKBK0003544', description: 'Account is blocked.'},
        { accountNumber:'035805001483', ifsc:'ICIC0000358', description: 'Failed at bank. Cannot validate.'},
        { accountNumber:'717901010050396', ifsc:'UBIN0571792', description: 'Failed at bank. Cannot validate.'},
        { accountNumber:'34676818265', ifsc:'BOMN0003267', description: 'Incorrect IFSC Code'},
        { accountNumber:'770111100000362', ifsc:'UNIB0CH7701', description: 'Verification attempt failed.'},
        { accountNumber:'00000035002591229', ifsc:'SBIN0017610', description: 'Invalid Account. Given account is an NRE account.'},
    ];


    const errorCodeToMessage = {
        'EAB162': 'Account is blocked.',
        'EBF017': 'Blank Input Field.', //Not usage in this api
        'EVB1359': 'Failed at bank. Cannot validate.',
        'EIM1358': 'IMPS mode failed. Cannot validate.',
        'EAN093': 'Incorrect Account Number.',
        'EIC065': 'Incorrect IFSC Code',
        'EIP018': 'Incorrect Input.', //Not usage in this api
        'ENA161': 'Invalid Account. Given account is an NRE account.',
        'EPI022': 'Payload is Incorrect.',
        'EVA1355': 'Verification attempt failed.',
        'ENI004': 'No Information Found.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Bank Account Verification');
    filteredTestCases.forEach((testCase) => {
        invalidBankAccountdetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Account number : ${invalidCase.accountNumber} and IFSC : ${invalidCase.ifsc}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, accountNumber: invalidCase.accountNumber, ifsc: invalidCase.ifsc}; 

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