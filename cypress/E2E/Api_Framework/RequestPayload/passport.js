/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Passport API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidPassportNumber = [
        //Valid fileNumber and Invalid dateOfBirth Test Cases
        { fileNumber: 'BO1070731920217', dateOfBirth: '13-Jan-88', description: 'Too Short DOB (year too short)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-Jan-198', description: 'Too Short DOB (missing one digit in year)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13-January-1988', description: 'Too Long DOB (month spelled out)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-01-1988', description: 'Too Long DOB (numeric month)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13/Jan/1988', description: 'Non-Numeric Characters in DOB (slashes)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13*Jan*1988', description: 'Non-Numeric Characters in DOB (asterisks)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13#Jan#1988', description: 'Special Characters in DOB (hashes)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13@Jan@1988', description: 'Special Characters in DOB (ats)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '1988-01-13', description: 'Incorrect Date Format (ISO format)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13th-Jan-1988', description: 'Incorrect Date Format (ordinal day)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '1988/01/13', description: 'Incorrect Date Format (slashes)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: ' 13-Jan-1988', description: 'Leading Space in DOB' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-Jan-1988 ', description: 'Trailing Space in DOB' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13- Jan-1988', description: 'Embedded Space in DOB (after day)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-Jan- 1988', description: 'Embedded Space in DOB (before year)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '32-Jan-1988', description: 'Invalid Day (exceeds month days)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '00-Jan-1988', description: 'Invalid Day (zero day)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13-13-1988', description: 'Invalid Month (exceeds 12)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-00-1988', description: 'Invalid Month (zero month)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13/Jan/1988', description: 'Incorrect Separators (slashes)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13*Jan*1988', description: 'Incorrect Separators (asterisks)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '1988-Jan-13', description: 'Mixed Date Format (year first)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: 'Jan-13-1988', description: 'Mixed Date Format (month first)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '01-Jan-1988', description: 'Leading Zero in Day' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-01-1988', description: 'Leading Zero in Month' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '1-Jan-1988', description: 'Single Digit Day without Zero' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-1-1988', description: 'Single Digit Month without Zero' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13-Jan-1988!', description: 'DOB with Special Character (exclamation mark)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-Jan-1988@', description: 'DOB with Special Character (at sign)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '', description: 'Blank DOB' },
        { fileNumber: 'MA1071561191918', dateOfBirth: null, description: 'Null DOB' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13-Jann-1988', description: 'Misspelled Month in DOB' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-Jn-1988', description: 'Incorrect Month Abbreviation in DOB' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '30-Feb-1988', description: 'Non-existent Date (February 30th)' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '31-Apr-1988', description: 'Non-existent Date (April 31st)' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13-Jan-1988\u200B', description: 'DOB with Zero-width Space' },
        { fileNumber: 'MA1071561191918', dateOfBirth: '13-Jan\u200C-1988', description: 'DOB with Zero-width Non-Joiner' },
        { fileNumber: 'MA1071561191918', dateOfBirth: undefined, description: 'undefined' },
        { fileNumber: 'MA1071561191918', dateOfBirth: Boolean, description: 'boolean' },
        { fileNumber: 'MA1071561191918', dateOfBirth: true, description: 'boolean true' },
        { fileNumber: 'MA1071561191918', dateOfBirth: false, description: 'boolean false' },


        // //Invalid fileNumber and Valid dateOfBirth Test Cases
        { fileNumber: 'BO107073192', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Just Short' },
        { fileNumber: 'BO107073192021799', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Just Long' },
        { fileNumber: 'B!1070731920217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Special Character in Middle' },
        { fileNumber: 'BO1070731920217!', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Special Character at End' },
        { fileNumber: 'BO10707319202170000', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Excessively Long Number' },
        { fileNumber: 'BO1070731920_217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Underscore Character' },
        { fileNumber: 'BO1070731 920217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Embedded Space' },
        { fileNumber: 'BO1070731920217@', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Special Character at End' },
        { fileNumber: 'BO1070731*20217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Special Character in Middle' },
        { fileNumber: 'BO10 70731920217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Embedded Spaces' },
        { fileNumber: 'BO1070731920217\n', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Newline Character' },
        { fileNumber: 'BO1070731920217.', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Period at End' },
        { fileNumber: 'BO1070731920217-', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Hyphen at End' },
        { fileNumber: 'BO1070731920217~', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Tilde at End' },
        { fileNumber: 'BO1070731920217`', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Backtick at End' },
        { fileNumber: 'BO1070731920217$', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Dollar Sign at End' },
        { fileNumber: 'BO1070731920217%', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Percent Sign at End' },
        { fileNumber: 'BO1070731920217^', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Caret at End' },
        { fileNumber: 'BO1070731920217&', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Ampersand at End' },
        { fileNumber: 'BO1070731920217*', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Asterisk at End' },
        { fileNumber: 'BO1070731920217(', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Parenthesis at End' },
        { fileNumber: 'BO1070731920217)', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Closing Parenthesis at End' },
        { fileNumber: 'BO1070731920217#', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Hash Symbol at End' },
        { fileNumber: 'BO1070731920217|', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Pipe Character' },
        { fileNumber: 'BO1070731920217\\', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Backslash' },
        { fileNumber: 'BO1070731920217/', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Forward Slash' },
        { fileNumber: 'BO1070731920217=', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Equal Sign' },
        { fileNumber: 'BO1070731920217+', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Plus Sign' },
        { fileNumber: 'BO1070731920217;', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Semicolon' },
        { fileNumber: 'BO1070731920217:', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Colon' },
        { fileNumber: 'BO1070731920217<', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Less Than' },
        { fileNumber: 'BO1070731920217>', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Greater Than' },
        { fileNumber: 'BO1070731920217?', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Question Mark' },
        { fileNumber: 'BO1070731920217"', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Double Quote' },
        { fileNumber: 'BO1070731920217\'', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Single Quote' },
        { fileNumber: 'BO1070731920217[', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Opening Bracket' },
        { fileNumber: 'BO1070731920217]', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Closing Bracket' },
        { fileNumber: 'BO1070731920217{', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Opening Curly Brace' },
        { fileNumber: 'BO1070731920217}', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Closing Curly Brace' },
        { fileNumber: 'BO1070731920217%', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Percent Sign at End' },
        { fileNumber: '123456789012', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - All Numbers' },
        { fileNumber: 'ABCDEFGHIJKL', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - All Letters' },
        { fileNumber: 'BO10707319202178', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - One Extra Digit' },
        { fileNumber: 'BO10707319202170', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - One Less Digit' },
        { fileNumber: 'BO10707319202ABC', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Mixed Letters and Numbers' },
        { fileNumber: 'BO1070731920XYZ1', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Mixed Letters and Numbers' },
        { fileNumber: 'BO10707319ABCD21', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Letters in the Middle' },
        { fileNumber: 'BO1070731920!@#$', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Mixed Special Characters' },
        { fileNumber: 'BO1070731920217 ', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Trailing Space' },
        { fileNumber: ' BO1070731920217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Leading Space' },
        { fileNumber: 'BO10707319202 17', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Space in Middle' },
        { fileNumber: 'BO1070731920\t217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Tab in Middle' },
        { fileNumber: 'BO1070731920217\n', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Newline at End' },
        { fileNumber: 'BO1070731920\n217', dateOfBirth: '13-Jan-1988', description: 'Invalid Passport - Newline in Middle' },
        { fileNumber: undefined, dateOfBirth: '13-Jan-1988', description: 'undefined' },
        { fileNumber: "", dateOfBirth: '13-Jan-1988', description: 'blank string' },
        { fileNumber: Boolean, dateOfBirth: '13-Jan-1988', description: 'boolean' },
        { fileNumber: 695277717060, dateOfBirth: '13-Jan-1988', description: 'number' },
        { fileNumber: null, dateOfBirth: '13-Jan-1988', description: 'null value' },
        { fileNumber: true, dateOfBirth: '13-Jan-1988', description: 'boolean true' },
        { fileNumber: false, dateOfBirth: '13-Jan-1988', description: 'boolean false' },


        //Invalid both fileNumber and dateOfBirth Test Cases
        { fileNumber: 'BO10A073192B217', dateOfBirth: 'thirteenth-Jan-1988', description: 'Invalid fileNumber with non-numeric characters and dateOfBirth with alphabetical day' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '13-Jan-XX88', description: 'Valid fileNumber but dateOfBirth has non-numeric year' },
        { fileNumber: 'BO1070-731920@17', dateOfBirth: '13/Jan/1988', description: 'Invalid fileNumber with special characters and dateOfBirth with incorrect format' },
        { fileNumber: 'BO10#70731$92017', dateOfBirth: '30-07-1992', description: 'fileNumber with special characters and dateOfBirth in numeric format' },
        { fileNumber: ' BO1070731920217', dateOfBirth: ' 13-Jan-1988', description: 'fileNumber with leading space and dateOfBirth with leading space' },
        { fileNumber: 'BO1070731920217 ', dateOfBirth: '13-Jan-1988 ', description: 'fileNumber with trailing space and dateOfBirth with trailing space' },
        { fileNumber: 'BO107073 1920217', dateOfBirth: '30 Jul 1992', description: 'fileNumber with embedded space and dateOfBirth with space-separated month' },
        { fileNumber: 'BO1070\t731920217', dateOfBirth: '30-Jul-\t1992', description: 'fileNumber with tab and dateOfBirth with tab character' },
        { fileNumber: 'BO107', dateOfBirth: '30-Jul-2099', description: 'fileNumber too short and dateOfBirth in the future' },
        { fileNumber: 'BO1070731920217123456', dateOfBirth: '30-Jul-1890', description: 'fileNumber too long and dateOfBirth too old' },
        { fileNumber: '1111111111111111', dateOfBirth: '01-01-1991', description: 'fileNumber all same digits and dateOfBirth on New Year' },
        { fileNumber: '1234567890123456', dateOfBirth: '12345678', description: 'fileNumber sequential numbers and dateOfBirth as sequential digits' },
        { fileNumber: 'BO1070731920\u200B217', dateOfBirth: '30-Jul-199\u200B2', description: 'fileNumber and dateOfBirth with zero-width space' },
        { fileNumber: 'BO1070731920217000000000', dateOfBirth: '30-Jul-19999999', description: 'fileNumber excessively large and dateOfBirth with large year' },
        { fileNumber: '', dateOfBirth: '32-Jul-1992', description: 'Empty fileNumber and invalid day in dateOfBirth' },
        { fileNumber: null, dateOfBirth: '30-13-1992', description: 'Null fileNumber and invalid month in dateOfBirth' },
        { fileNumber: 'BO1070731920217', dateOfBirth: '', description: 'Valid fileNumber but empty dateOfBirth' },
        { fileNumber: 'BO1070731920217', dateOfBirth: null, description: 'Valid fileNumber but null dateOfBirth' },
        { fileNumber: 'BO10A073192B217', dateOfBirth: '13-Jan-XX88', description: 'fileNumber with mixed characters and dateOfBirth with non-numeric year' },
        { fileNumber: 'BO1070-731920@17', dateOfBirth: '13-Jan-@88', description: 'fileNumber with special characters and dateOfBirth with special character in year' },
        { fileNumber: 'BO1070731920217 ', dateOfBirth: '13-Jan-1988@', description: 'fileNumber with trailing space and dateOfBirth with special character at end' },
        { fileNumber: 'BO1070731920\u200B217', dateOfBirth: '13-Jan-\u200B1988', description: 'fileNumber and dateOfBirth with zero-width space' },
        { fileNumber: ' BO1070731920217', dateOfBirth: '13-Jan-1988 ', description: 'fileNumber with leading space and dateOfBirth with trailing space' },
        { fileNumber: 'BO1070731920217 ', dateOfBirth: ' 13-Jan-1988', description: 'fileNumber with trailing space and dateOfBirth with leading space' },
        { fileNumber: '0000000000000000', dateOfBirth: '30-Jul-1890', description: 'fileNumber all zeros and dateOfBirth too old' },
        { fileNumber: 'BO1070731920$#17', dateOfBirth: '32-Jul-2099', description: 'fileNumber with special characters and dateOfBirth with invalid day and future date' },
        { fileNumber: undefined, dateOfBirth: undefined, description: 'undefined' },
        { fileNumber: null, dateOfBirth: null, description: 'null value' },
        { fileNumber: Boolean, dateOfBirth: Boolean, description: 'boolean' },
        { fileNumber: false, dateOfBirth: false, description: 'boolean false' },
        { fileNumber: true, dateOfBirth: true, description: 'boolean true' },
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Passport');
    filteredTestCases.forEach((testCase) => {
        invalidPassportNumber.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} File Number : ${invalidCase.fileNumber} and DOB : ${invalidCase.dateOfBirth}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, fileNumber: invalidCase.fileNumber, dateOfBirth: invalidCase.dateOfBirth}; 

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