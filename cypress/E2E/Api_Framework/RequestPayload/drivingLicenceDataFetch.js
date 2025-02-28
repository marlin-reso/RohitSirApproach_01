/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Driving License Details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidPassportNumber = [
        //Valid fileNumber and Invalid dateOfBirth Test Cases
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan-88', description: 'Too Short DOB (year too short)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan-198', description: 'Too Short DOB (missing one digit in year)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-January-1998', description: 'Too Long DOB (month spelled out)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-01-1998', description: 'Too Long DOB (numeric month)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13/Jan/1998', description: 'Non-Numeric Characters in DOB (slashes)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13*Jan*1998', description: 'Non-Numeric Characters in DOB (asterisks)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13#Jan#1998', description: 'Special Characters in DOB (hashes)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13@Jan@1998', description: 'Special Characters in DOB (ats)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '1998-01-13', description: 'Incorrect Date Format (ISO format)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13th-Jan-1998', description: 'Incorrect Date Format (ordinal day)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '1998/01/13', description: 'Incorrect Date Format (slashes)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: ' 13-Jan-1998', description: 'Leading Space in DOB' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan-1998 ', description: 'Trailing Space in DOB' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13- Jan-1998', description: 'Embedded Space in DOB (after day)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan- 1998', description: 'Embedded Space in DOB (before year)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '32-Jan-1998', description: 'Invalid Day (exceeds month days)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '00-Jan-1998', description: 'Invalid Day (zero day)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-13-1998', description: 'Invalid Month (exceeds 12)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-00-1998', description: 'Invalid Month (zero month)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13/Jan/1998', description: 'Incorrect Separators (slashes)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13*Jan*1998', description: 'Incorrect Separators (asterisks)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '1998-Jan-13', description: 'Mixed Date Format (year first)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: 'Jan-13-1998', description: 'Mixed Date Format (month first)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '01-Jan-1998', description: 'Leading Zero in Day' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-01-1998', description: 'Leading Zero in Month' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '1-Jan-1998', description: 'Single Digit Day without Zero' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-1-1998', description: 'Single Digit Month without Zero' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan-1998!', description: 'DOB with Special Character (exclamation mark)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan-1998@', description: 'DOB with Special Character (at sign)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '', description: 'Blank DOB' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: null, description: 'Null DOB' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jann-1998', description: 'Misspelled Month in DOB' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jn-1998', description: 'Incorrect Month Abbreviation in DOB' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '30-Feb-1998', description: 'Non-existent Date (February 30th)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '31-Apr-1998', description: 'Non-existent Date (April 31st)' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan-1998\u200B', description: 'DOB with Zero-width Space' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: '13-Jan\u200C-1998', description: 'DOB with Zero-width Non-Joiner' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: undefined, description: 'undefined' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: Boolean, description: 'boolean' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: true, description: 'boolean true' },
        { drivingLicenceNumber: "RJ1920160033462", dateOfBirth: false, description: 'boolean false' },


        //Invalid fileNumber and Valid dateOfBirth Test Cases
        { drivingLicenceNumber: 'RJ19201600334', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Just Short' },
        { drivingLicenceNumber: 'RJ192016003346299', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Just Long' },
        { drivingLicenceNumber: 'R!1920160033462', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Special Character in Middle' },
        { drivingLicenceNumber: 'RJ1920160033462!', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Special Character at End' },
        { drivingLicenceNumber: 'RJ19201600334629999', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Excessively Long Number' },
        { drivingLicenceNumber: 'RJ19201600334_62', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Underscore Character' },
        { drivingLicenceNumber: 'RJ192016 0033462', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Embedded Space' },
        { drivingLicenceNumber: 'RJ1920160033462@', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Special Character at End' },
        { drivingLicenceNumber: 'RJ1920160*033462', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Special Character in Middle' },
        { drivingLicenceNumber: 'RJ1920160033462\n', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Newline Character' },
        { drivingLicenceNumber: 'RJ1920160033462.', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Period at End' },
        { drivingLicenceNumber: 'RJ1920160033462-', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Hyphen at End' },
        { drivingLicenceNumber: '', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Empty String' },
        { drivingLicenceNumber: null, dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Null' },
        { drivingLicenceNumber: undefined, dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Undefined' },
        { drivingLicenceNumber: Boolean, dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Boolean' },
        { drivingLicenceNumber: true, dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Boolean True' },
        { drivingLicenceNumber: false, dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Boolean False' },
        { drivingLicenceNumber: 'RJ1920160033462$', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Special Character at End' },
        { drivingLicenceNumber: '1234567890123', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - All Numeric' },
        { drivingLicenceNumber: 'ABCDEF', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - All Alphabetic' },


        //Invalid both fileNumber and dateOfBirth Test Cases
        { drivingLicenceNumber: 'RJ19-2016-0033462', dateOfBirth: 'thirteenth-Feb-1998', description: 'Invalid drivingLicenceNumber with special characters and dateOfBirth with alphabetical day' },
        { drivingLicenceNumber: 'RJ192016003346XX', dateOfBirth: '10-Feb-199X', description: 'Valid drivingLicenceNumber but dateOfBirth has non-numeric year' },
        { drivingLicenceNumber: 'RJ19#20160033462', dateOfBirth: '10/Feb/1998', description: 'Invalid drivingLicenceNumber with special characters and dateOfBirth with incorrect format' },
        { drivingLicenceNumber: 'RJ19201600334#62', dateOfBirth: '10-02-1998', description: 'drivingLicenceNumber with special characters and dateOfBirth in numeric format' },
        { drivingLicenceNumber: ' RJ1920160033462', dateOfBirth: ' 10-Feb-1998', description: 'drivingLicenceNumber with leading space and dateOfBirth with leading space' },
        { drivingLicenceNumber: 'RJ1920160033462 ', dateOfBirth: '10-Feb-1998 ', description: 'drivingLicenceNumber with trailing space and dateOfBirth with trailing space' },
        { drivingLicenceNumber: 'RJ192016 0033462', dateOfBirth: '10 Feb 1998', description: 'drivingLicenceNumber with embedded space and dateOfBirth with space-separated date' },
        { drivingLicenceNumber: 'RJ1920\t160033462', dateOfBirth: '10-Feb-\t1998', description: 'drivingLicenceNumber with tab and dateOfBirth with tab character' },
        { drivingLicenceNumber: 'RJ19', dateOfBirth: '10-Feb-2099', description: 'drivingLicenceNumber too short and dateOfBirth in the future' },
        { drivingLicenceNumber: 'RJ192016003346200000', dateOfBirth: '10-Feb-1890', description: 'drivingLicenceNumber too long and dateOfBirth too old' },
        { drivingLicenceNumber: '1111111111111111', dateOfBirth: '01-01-1998', description: 'drivingLicenceNumber all same digits and dateOfBirth on New Year' },
        { drivingLicenceNumber: '1234567890123456', dateOfBirth: '12345678', description: 'drivingLicenceNumber sequential numbers and dateOfBirth as sequential digits' },
        { drivingLicenceNumber: 'RJ1920160033462\u200B', dateOfBirth: '10-Feb-199\u200B8', description: 'drivingLicenceNumber and dateOfBirth with zero-width space' },
        { drivingLicenceNumber: 'RJ19201600334620000000', dateOfBirth: '10-Feb-19999999', description: 'drivingLicenceNumber excessively large and dateOfBirth with large year' },
        { drivingLicenceNumber: '', dateOfBirth: '32-Feb-1998', description: 'Empty drivingLicenceNumber and invalid day in dateOfBirth' },
        { drivingLicenceNumber: null, dateOfBirth: '10-13-1998', description: 'Null drivingLicenceNumber and invalid month in dateOfBirth' },
        { drivingLicenceNumber: 'RJ1920160033462', dateOfBirth: '', description: 'Valid drivingLicenceNumber but empty dateOfBirth' },
        { drivingLicenceNumber: 'RJ1920160033462', dateOfBirth: null, description: 'Valid drivingLicenceNumber but null dateOfBirth' },
        { drivingLicenceNumber: 'RJ10A073192B217', dateOfBirth: '10-Feb-XX98', description: 'drivingLicenceNumber with mixed characters and dateOfBirth with non-numeric year' },
        { drivingLicenceNumber: 'RJ192016003346@2', dateOfBirth: '10-Feb-@98', description: 'drivingLicenceNumber with special characters and dateOfBirth with special character in year' },
        { drivingLicenceNumber: 'RJ1920160033462 ', dateOfBirth: '10-Feb-1998@', description: 'drivingLicenceNumber with trailing space and dateOfBirth with special character at end' },
        { drivingLicenceNumber: 'RJ19201600334\u200B62', dateOfBirth: '10-Feb-\u200B1998', description: 'drivingLicenceNumber and dateOfBirth with zero-width space' },
        { drivingLicenceNumber: ' RJ1920160033462', dateOfBirth: '10-Feb-1998 ', description: 'drivingLicenceNumber with leading space and dateOfBirth with trailing space' },
        { drivingLicenceNumber: 'RJ1920160033462 ', dateOfBirth: ' 10-Feb-1998', description: 'drivingLicenceNumber with trailing space and dateOfBirth with leading space' },
        { drivingLicenceNumber: '0000000000000000', dateOfBirth: '10-Feb-1890', description: 'drivingLicenceNumber all zeros and dateOfBirth too old' },
        { drivingLicenceNumber: 'RJ19201600$#62', dateOfBirth: '32-Feb-2099', description: 'drivingLicenceNumber with special characters and dateOfBirth with invalid day and future date' },
        { drivingLicenceNumber: undefined, dateOfBirth: undefined, description: 'undefined' },
        { drivingLicenceNumber: null, dateOfBirth: null, description: 'null value' },
        { drivingLicenceNumber: Boolean, dateOfBirth: Boolean, description: 'boolean' },
        { drivingLicenceNumber: false, dateOfBirth: false, description: 'boolean false' },
        { drivingLicenceNumber: true, dateOfBirth: true, description: 'boolean true' },

        { drivingLicenceNumber: 'RJ19 20160 033462', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Embedded Spaces' },
        { drivingLicenceNumber: 'RJ19 20160033 462', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Embedded Spaces' },
        { drivingLicenceNumber: 'RJ19 20160033   462', dateOfBirth: '10-Feb-1998', description: 'Invalid Driving Licence - Embedded Spaces' },

    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'ERR1230': 'Duplicate record found in Rejected Records.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.',
        'EIS042': 'Temporarily Blocked'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Driving License Details');
    filteredTestCases.forEach((testCase) => {
        invalidPassportNumber.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} File Number : ${invalidCase.drivingLicenceNumber} and DOB : ${invalidCase.dateOfBirth}`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, drivingLicenceNumber: invalidCase.drivingLicenceNumber, dateOfBirth: invalidCase.dateOfBirth}; 

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