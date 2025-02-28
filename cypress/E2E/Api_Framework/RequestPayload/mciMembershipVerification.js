/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test MCI Membership Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidMCIDetails = [
        //1. Valid registrationNumber and invalid stateMedicalCouncil and yearOfInfo
        { registrationNumber: '10118', stateMedicalCouncil: '', yearOfInfo: '', description: 'Valid registrationNumber but blank stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 12345, yearOfInfo: 1960, description: 'Valid registrationNumber but stateMedicalCouncil as number and yearOfInfo as number' },
        { registrationNumber: '10118', stateMedicalCouncil: null, yearOfInfo: null, description: 'Valid registrationNumber but null stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: undefined, yearOfInfo: undefined, description: 'Valid registrationNumber but undefined stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: false, yearOfInfo: false, description: 'Valid registrationNumber but boolean false stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: true, yearOfInfo: true, description: 'Valid registrationNumber but boolean true stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: '12345', yearOfInfo: 'abcd', description: 'Valid registrationNumber but numeric string stateMedicalCouncil and non-numeric string yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay123', yearOfInfo: '19a0', description: 'Valid registrationNumber but stateMedicalCouncil with numbers and yearOfInfo with alphabet' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay@Medical', yearOfInfo: '19@0', description: 'Valid registrationNumber but stateMedicalCouncil and yearOfInfo with special characters' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council ', yearOfInfo: '1960 ', description: 'Valid registrationNumber but stateMedicalCouncil and yearOfInfo with trailing space' },
        { registrationNumber: '10118', stateMedicalCouncil: ' Bombay Medical Council', yearOfInfo: ' 1960', description: 'Valid registrationNumber but stateMedicalCouncil and yearOfInfo with leading space' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay\tMedical\tCouncil', yearOfInfo: '1960\t', description: 'Valid registrationNumber but stateMedicalCouncil and yearOfInfo with tab character' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council\u200B', yearOfInfo: '1960\u200B', description: 'Valid registrationNumber but stateMedicalCouncil and yearOfInfo with zero-width space' },
        { registrationNumber: '10118', stateMedicalCouncil: false, yearOfInfo: '1960', description: 'Valid registrationNumber but boolean false stateMedicalCouncil and valid yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: true, yearOfInfo: '1960', description: 'Valid registrationNumber but boolean true stateMedicalCouncil and valid yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: false, description: 'Valid registrationNumber and stateMedicalCouncil but boolean false yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: true, description: 'Valid registrationNumber and stateMedicalCouncil but boolean true yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: '', yearOfInfo: '1960', description: 'Valid registrationNumber but blank stateMedicalCouncil and valid yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '', description: 'Valid registrationNumber and stateMedicalCouncil but blank yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: null, yearOfInfo: '1960', description: 'Valid registrationNumber but null stateMedicalCouncil and valid yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: null, description: 'Valid registrationNumber and stateMedicalCouncil but null yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay@Medical', yearOfInfo: '', description: 'Valid registrationNumber but stateMedicalCouncil with special characters and blank yearOfInfo' },

        //2. Valid stateMedicalCouncil and invalid registrationNumber and yearOfInfo
        { registrationNumber: '', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '', description: 'Blank registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: undefined, stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: undefined, description: 'Undefined registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: 'abcde', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: 'abcd', description: 'Non-numeric string registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: '10@18', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '19@0', description: 'Special characters in registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: ' 10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: ' 1960', description: 'Leading space in registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: '10118 ', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960 ', description: 'Trailing space in registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: '1011\t8', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960\t', description: 'Tab character in registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: '10118\u200B', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960\u200B', description: 'Zero-width space in registrationNumber and yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: '', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Blank registrationNumber and valid stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '', description: 'Valid registrationNumber and stateMedicalCouncil but blank yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: null, description: 'Valid registrationNumber and stateMedicalCouncil but null yearOfInfo' },
        { registrationNumber: '10@18', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '', description: 'Special characters in registrationNumber and blank yearOfInfo but valid stateMedicalCouncil' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: undefined, description: 'Valid registrationNumber and stateMedicalCouncil but undefined yearOfInfo' },
        { registrationNumber: '1011\t8', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '', description: 'Tab character in registrationNumber and blank yearOfInfo but valid stateMedicalCouncil' },

        //3. Valid yearOfInfo and invalid stateMedicalCouncil and registrationNumber
        { registrationNumber: '', stateMedicalCouncil: '', yearOfInfo: '1960', description: 'Blank registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: 12345, stateMedicalCouncil: 12345, yearOfInfo: '1960', description: 'Numeric registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: null, stateMedicalCouncil: null, yearOfInfo: '1960', description: 'Null registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: undefined, stateMedicalCouncil: undefined, yearOfInfo: '1960', description: 'Undefined registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: false, stateMedicalCouncil: false, yearOfInfo: '1960', description: 'Boolean false registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: true, stateMedicalCouncil: true, yearOfInfo: '1960', description: 'Boolean true registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: 'abcde', stateMedicalCouncil: 'abcde', yearOfInfo: '1960', description: 'Non-numeric string registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: '10@18', stateMedicalCouncil: '10@18', yearOfInfo: '1960', description: 'Special characters in registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: ' 10118', stateMedicalCouncil: ' Bombay Medical Council', yearOfInfo: '1960', description: 'Leading space in registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: '10118 ', stateMedicalCouncil: 'Bombay Medical Council ', yearOfInfo: '1960', description: 'Trailing space in registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: '1011\t8', stateMedicalCouncil: 'Bombay\tMedical\tCouncil', yearOfInfo: '1960', description: 'Tab character in registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: '10118\u200B', stateMedicalCouncil: 'Bombay Medical Council\u200B', yearOfInfo: '1960', description: 'Zero-width space in registrationNumber and stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: '', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Blank registrationNumber and valid stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: '', yearOfInfo: '1960', description: 'Valid registrationNumber and blank stateMedicalCouncil and valid yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: null, yearOfInfo: '1960', description: 'Valid registrationNumber and null stateMedicalCouncil and valid yearOfInfo' },
        { registrationNumber: '10@18', stateMedicalCouncil: '', yearOfInfo: '1960', description: 'Special characters in registrationNumber and blank stateMedicalCouncil but valid yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: undefined, yearOfInfo: '1960', description: 'Valid registrationNumber and undefined stateMedicalCouncil and valid yearOfInfo' },
        { registrationNumber: '1011\t8', stateMedicalCouncil: '', yearOfInfo: '1960', description: 'Tab character in registrationNumber and blank stateMedicalCouncil but valid yearOfInfo' },

        //4. Valid registrationNumber and stateMedicalCouncil and invalid yearOfInfo
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '', description: 'Valid registrationNumber and stateMedicalCouncil but blank yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: 12345, description: 'Valid registrationNumber and stateMedicalCouncil but numeric yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: null, description: 'Valid registrationNumber and stateMedicalCouncil but null yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: undefined, description: 'Valid registrationNumber and stateMedicalCouncil but undefined yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: false, description: 'Valid registrationNumber and stateMedicalCouncil but boolean false yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: true, description: 'Valid registrationNumber and stateMedicalCouncil but boolean true yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: 'abcd', description: 'Valid registrationNumber and stateMedicalCouncil but non-numeric string yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '19@0', description: 'Valid registrationNumber and stateMedicalCouncil but special characters in yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: ' 1960', description: 'Valid registrationNumber and stateMedicalCouncil but leading space in yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960 ', description: 'Valid registrationNumber and stateMedicalCouncil but trailing space in yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960\t', description: 'Valid registrationNumber and stateMedicalCouncil but tab character in yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960\u200B', description: 'Valid registrationNumber and stateMedicalCouncil but zero-width space in yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: 'false', description: 'Valid registrationNumber and stateMedicalCouncil but string false in yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: 'true', description: 'Valid registrationNumber and stateMedicalCouncil but string true in yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '', description: 'Valid registrationNumber and stateMedicalCouncil but blank yearOfInfo' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '19!60', description: 'Valid registrationNumber and stateMedicalCouncil but yearOfInfo with special character' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '19a60', description: 'Valid registrationNumber and stateMedicalCouncil but yearOfInfo with alphabet' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960000000000000', description: 'Valid registrationNumber and stateMedicalCouncil but yearOfInfo excessively large' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960abcd', description: 'Valid registrationNumber and stateMedicalCouncil but yearOfInfo with alphabets' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '12345678', description: 'Valid registrationNumber and stateMedicalCouncil but yearOfInfo as sequential digits' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '12345', description: 'Valid registrationNumber and stateMedicalCouncil but yearOfInfo as number' },

        //5. Valid registrationNumber and yearOfInfo and invalid stateMedicalCouncil
        { registrationNumber: '10118', stateMedicalCouncil: '', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but empty stateMedicalCouncil' },
        { registrationNumber: '10118', stateMedicalCouncil: null, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but null stateMedicalCouncil' },
        { registrationNumber: '10118', stateMedicalCouncil: 12345, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is a number' },
        { registrationNumber: '10118', stateMedicalCouncil: true, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is boolean true' },
        { registrationNumber: '10118', stateMedicalCouncil: false, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is boolean false' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Invalid Council Name', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but invalid stateMedicalCouncil' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Invalid Name with Special Characters #@!', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil with special characters' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Invalid Name 123', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil with numbers' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Invalid Name with Trailing Spaces    ', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil with trailing spaces' },
        { registrationNumber: '10118', stateMedicalCouncil: ' Invalid Name with Leading Space', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil with leading space' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Invalid Name\nWith Newline', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil with newline character' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Invalid Name\tWith Tab', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil with tab character' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Invalid Name with Special @#!', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil with special characters' },
        { registrationNumber: '10118', stateMedicalCouncil: '12345678901234567890', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil too long' },
        { registrationNumber: '10118', stateMedicalCouncil: '   ', yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is whitespace' },
        { registrationNumber: '10118', stateMedicalCouncil: undefined, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is undefined' },
        { registrationNumber: '10118', stateMedicalCouncil: Boolean, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is a boolean' },
        { registrationNumber: '10118', stateMedicalCouncil: false, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is boolean false' },
        { registrationNumber: '10118', stateMedicalCouncil: true, yearOfInfo: '1960', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is boolean true' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Hello council', yearOfInfo: '2024', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is invalid and yearOfInfo is a future year' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Hello council', yearOfInfo: '00', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is invalid and yearOfInfo is too short' },
        { registrationNumber: '10118', stateMedicalCouncil: 'Hello council', yearOfInfo: 'abcd', description: 'Valid registrationNumber and yearOfInfo but stateMedicalCouncil is invalid and yearOfInfo is non-numeric' },

        //7. Invalid all registrationNumber, stateMedicalCouncil, and yearOfInfo
        { registrationNumber: '', stateMedicalCouncil: '', yearOfInfo: '', description: 'All fields are empty' },
        { registrationNumber: null, stateMedicalCouncil: null, yearOfInfo: null, description: 'All fields are null' },
        { registrationNumber: 12345, stateMedicalCouncil: 12345, yearOfInfo: 1960, description: 'All fields are numeric' },
        { registrationNumber: true, stateMedicalCouncil: true, yearOfInfo: true, description: 'All fields are boolean true' },
        { registrationNumber: false, stateMedicalCouncil: false, yearOfInfo: false, description: 'All fields are boolean false' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: 'Bombay Medical CouncilInvalid Council Name', yearOfInfo: 'invalid year', description: 'All fields are invalid' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: 'Bombay Medical Council1234', yearOfInfo: '99999', description: 'All fields are invalid with numbers' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: 'Bombay Medical Council@#!', yearOfInfo: 'abcd', description: 'All fields are invalid with special characters and non-numeric yearOfInfo' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: '   ', yearOfInfo: '00', description: 'All fields are invalid with whitespace and too short yearOfInfo' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: '  ', yearOfInfo: undefined, description: 'All fields are invalid with leading space and undefined yearOfInfo' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: 'Bombay Medical\Council', yearOfInfo: Boolean, description: 'All fields are invalid with newline character and boolean yearOfInfo' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: 'Invalid Name\tWith Tab', yearOfInfo: false, description: 'All fields are invalid with tab character and boolean false yearOfInfo' },
        { registrationNumber: undefined, stateMedicalCouncil: undefined, yearOfInfo: undefined, description: 'All fields are undefined' },
        { registrationNumber: Boolean, stateMedicalCouncil: Boolean, yearOfInfo: Boolean, description: 'All fields are boolean class' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: 'Invalid Council Name', yearOfInfo: 'abcd', description: 'All fields are invalid with non-numeric yearOfInfo' },
        { registrationNumber: 'Invalid Number', stateMedicalCouncil: 'Invalid Name\tWith Tab', yearOfInfo: 12345, description: 'All fields are invalid with tab character and numeric yearOfInfo' },
    

        { registrationNumber: false, stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Boolean false registrationNumber and valid stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: true, stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Boolean true registrationNumber and valid stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: null, stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Null registrationNumber and valid stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: false, stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Boolean false registrationNumber and valid stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: true, stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Boolean true registrationNumber and valid stateMedicalCouncil and yearOfInfo' },
        { registrationNumber: null, stateMedicalCouncil: 'Bombay Medical Council', yearOfInfo: '1960', description: 'Null registrationNumber and valid stateMedicalCouncil and yearOfInfo' },

    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'MCI Membership Verification');
    filteredTestCases.forEach((testCase) => {
        invalidMCIDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, Registration Number : ${invalidCase.registrationNumber}, State Medical Council : ${invalidCase.stateMedicalCouncil}, Year Of Info : ${invalidCase.yearOfInfo}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, registrationNumber: invalidCase.registrationNumber, stateMedicalCouncil: invalidCase.stateMedicalCouncil, yearOfInfo: invalidCase.yearOfInfo }; 

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