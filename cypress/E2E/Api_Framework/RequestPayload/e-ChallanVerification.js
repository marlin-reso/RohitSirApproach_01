/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test e-Challan Verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    /*
    "rcNumber":"UP55M7064",
    "chassisNumber":"ME11CK01AC2033778",
    "engineNumber":"1CK1033789"

    */

    const invalidMCIDetails = [
        //1. Valid rcNumber and invalid chassisNumber and engineNumber
        { rcNumber: 'UP55M7064', chassisNumber: '', engineNumber: '', description: 'Valid rcNumber but blank chassisNumber and engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 12345, engineNumber: '1CK1033789', description: 'Valid rcNumber but chassisNumber as number and engineNumber as number' },
        { rcNumber: 'UP55M7064', chassisNumber: null, engineNumber: null, description: 'Valid rcNumber but null chassisNumber and engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: undefined, engineNumber: undefined, description: 'Valid rcNumber but undefined chassisNumber and engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: false, engineNumber: false, description: 'Valid rcNumber but boolean false chassisNumber and engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: true, engineNumber: true, description: 'Valid rcNumber but boolean true chassisNumber and engineNumber' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK', engineNumber: 'abcd', description: 'Valid rcNumber but numeric string chassisNumber and non-numeric string engineNumber' },
     //   { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778123', engineNumber: '1CK1033789', description: 'Valid rcNumber but chassisNumber with numbers and engineNumber with alphabet' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01@C2033778', engineNumber: '1CK1@33789', description: 'Valid rcNumber but chassisNumber and engineNumber with special characters' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778 ', engineNumber: '1CK1033789 ', description: 'Valid rcNumber but chassisNumber and engineNumber with trailing space' },
        { rcNumber: 'UP55M7064', chassisNumber: ' ME11CK01AC2033778', engineNumber: ' 1CK1033789', description: 'Valid rcNumber but chassisNumber and engineNumber with leading space' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11\tCK01AC\t2033778', engineNumber: '1CK1033789\t', description: 'Valid rcNumber but chassisNumber and engineNumber with tab character' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778\u200B', engineNumber: '1CK1033789\u200B', description: 'Valid rcNumber but chassisNumber and engineNumber with zero-width space' },
        { rcNumber: 'UP55M7064', chassisNumber: false, engineNumber: '1CK1033789', description: 'Valid rcNumber but boolean false chassisNumber and valid engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: true, engineNumber: '1CK1033789', description: 'Valid rcNumber but boolean true chassisNumber and valid engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: false, description: 'Valid rcNumber and chassisNumber but boolean false engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: true, description: 'Valid rcNumber and chassisNumber but boolean true engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: '', engineNumber: '1CK1033789', description: 'Valid rcNumber but blank chassisNumber and valid engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '', description: 'Valid rcNumber and chassisNumber but blank engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: null, engineNumber: '1CK1033789', description: 'Valid rcNumber but null chassisNumber and valid engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: null, description: 'Valid rcNumber and chassisNumber but null engineNumber' },
       

        //2. Valid chassisNumber and invalid rcNumber and engineNumber
        { rcNumber: '', chassisNumber: 'ME11CK01AC2033778', engineNumber: '', description: 'Blank rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: undefined, chassisNumber: 'ME11CK01AC2033778', engineNumber: undefined, description: 'Undefined rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: 'MP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: 'abcd', description: 'Non-numeric string rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: 'UP55@7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1@33789', description: 'Special characters in rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: ' UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: ' 1CK1033789', description: 'Leading space in rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: 'UP55M7064 ', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789 ', description: 'Trailing space in rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: 'UP55M706\t4', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789\t', description: 'Tab character in rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: 'UP55M7064\u200B', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789\u200B', description: 'Zero-width space in rcNumber and engineNumber but valid chassisNumber' },
        { rcNumber: '', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Blank rcNumber and valid chassisNumber and engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '', description: 'Valid rcNumber and chassisNumber but blank engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: null, description: 'Valid rcNumber and chassisNumber but null engineNumber' },
        { rcNumber: 'UP55M7061', chassisNumber: 'ME11CK01AC2033778', engineNumber: '', description: 'Special characters in rcNumber and blank engineNumber but valid chassisNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: undefined, description: 'Valid rcNumber and chassisNumber but undefined engineNumber' },
        { rcNumber: 'UP55M7064\t', chassisNumber: 'ME11CK01AC2033778', engineNumber: '', description: 'Tab character in rcNumber and blank engineNumber but valid chassisNumber' },

        //3. Valid engineNumber and invalid chassisNumber and rcNumber
        { rcNumber: '', chassisNumber: '', engineNumber: '1CK1033789', description: 'Blank rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: 12345, chassisNumber: 12345, engineNumber: '1CK1033789', description: 'Numeric rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: null, chassisNumber: null, engineNumber: '1CK1033789', description: 'Null rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: undefined, chassisNumber: undefined, engineNumber: '1CK1033789', description: 'Undefined rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: false, chassisNumber: false, engineNumber: '1CK1033789', description: 'Boolean false rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: true, chassisNumber: true, engineNumber: '1CK1033789', description: 'Boolean true rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: 'abcde', chassisNumber: 'abcde', engineNumber: '1CK1033789', description: 'Non-numeric string rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: 'UP55@7064', chassisNumber: 'ME11CK01@C2033778', engineNumber: '1CK1033789', description: 'Special characters in rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: ' UP55M7064', chassisNumber: ' ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Leading space in rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: 'UP55M7064 ', chassisNumber: 'ME11CK01AC2033778 ', engineNumber: '1CK1033789', description: 'Trailing space in rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: 'UP55M706\t4', chassisNumber: 'ME11\tCK01AC2\t033778', engineNumber: '1CK1033789', description: 'Tab character in rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: 'UP55M7064\u200B', chassisNumber: 'ME11CK01AC2033778\u200B', engineNumber: '1CK1033789', description: 'Zero-width space in rcNumber and chassisNumber but valid engineNumber' },
        { rcNumber: '', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Blank rcNumber and valid chassisNumber and engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: '', engineNumber: '1CK1033789', description: 'Valid rcNumber and blank chassisNumber and valid engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: null, engineNumber: '1CK1033789', description: 'Valid rcNumber and null chassisNumber and valid engineNumber' },
        { rcNumber: 'UP55M7064@', chassisNumber: '', engineNumber: '1CK1033789', description: 'Special characters in rcNumber and blank chassisNumber but valid engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: undefined, engineNumber: '1CK1033789', description: 'Valid rcNumber and undefined chassisNumber and valid engineNumber' },
        { rcNumber: 'UP55M7\t064', chassisNumber: '', engineNumber: '1CK1033789', description: 'Tab character in rcNumber and blank chassisNumber but valid engineNumber' },

        //4. Valid rcNumber and chassisNumber and invalid engineNumber
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '', description: 'Valid rcNumber and chassisNumber but blank engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: 12345, description: 'Valid rcNumber and chassisNumber but numeric engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: null, description: 'Valid rcNumber and chassisNumber but null engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: undefined, description: 'Valid rcNumber and chassisNumber but undefined engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: false, description: 'Valid rcNumber and chassisNumber but boolean false engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: true, description: 'Valid rcNumber and chassisNumber but boolean true engineNumber' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: 'abcd', description: 'Valid rcNumber and chassisNumber but non-numeric string engineNumber' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK10337@9', description: 'Valid rcNumber and chassisNumber but special characters in engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: ' 1CK1033789', description: 'Valid rcNumber and chassisNumber but leading space in engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789 ', description: 'Valid rcNumber and chassisNumber but trailing space in engineNumber' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789\t', description: 'Valid rcNumber and chassisNumber but tab character in engineNumber' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789\u200B', description: 'Valid rcNumber and chassisNumber but zero-width space in engineNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '', description: 'Valid rcNumber and chassisNumber but blank engineNumber' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK10!33789', description: 'Valid rcNumber and chassisNumber but engineNumber with special character' },
       // { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK10ccg8j', description: 'Valid rcNumber and chassisNumber but engineNumber with alphabet' },
        { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK103378999999999', description: 'Valid rcNumber and chassisNumber but engineNumber excessively large' },
      //  { rcNumber: 'UP55M7064', chassisNumber: 'ME11CK01AC2033778', engineNumber: '12345678', description: 'Valid rcNumber and chassisNumber but engineNumber as sequential digits' },
        
        //5. Valid rcNumber and engineNumber and invalid chassisNumber
        { rcNumber: 'UP55M7064', chassisNumber: '', engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but empty chassisNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: null, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but null chassisNumber' },
        { rcNumber: 'UP55M7064', chassisNumber: 12345, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is a number' },
        { rcNumber: 'UP55M7064', chassisNumber: true, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is boolean true' },
        { rcNumber: 'UP55M7064', chassisNumber: false, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is boolean false' },
      //{ rcNumber: 'UP55M7064', chassisNumber: 'ME11CK@1AC2033778', engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber with special characters' },
        { rcNumber: 'UP55M7064', chassisNumber: '   ', engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is whitespace' },
        { rcNumber: 'UP55M7064', chassisNumber: undefined, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is undefined' },
        { rcNumber: 'UP55M7064', chassisNumber: Boolean, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is a boolean' },
        { rcNumber: 'UP55M7064', chassisNumber: false, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is boolean false' },
        { rcNumber: 'UP55M7064', chassisNumber: true, engineNumber: '1CK1033789', description: 'Valid rcNumber and engineNumber but chassisNumber is boolean true' },
       
        //7. Invalid all rcNumber, chassisNumber, and engineNumber
        { rcNumber: '', chassisNumber: '', engineNumber: '', description: 'All fields are empty' },
        { rcNumber: null, chassisNumber: null, engineNumber: null, description: 'All fields are null' },
        { rcNumber: 12345, chassisNumber: 12345, engineNumber: '1CK1033789', description: 'All fields are numeric' },
        { rcNumber: true, chassisNumber: true, engineNumber: true, description: 'All fields are boolean true' },
        { rcNumber: false, chassisNumber: false, engineNumber: false, description: 'All fields are boolean false' },
        { rcNumber: undefined, chassisNumber: undefined, engineNumber: undefined, description: 'All fields are undefined' },
        { rcNumber: Boolean, chassisNumber: Boolean, engineNumber: Boolean, description: 'All fields are boolean class' },
        { rcNumber: 'Invalid Number', chassisNumber: 'Invalid Council Name', engineNumber: 'abcd', description: 'All fields are invalid with non-numeric engineNumber' },
        { rcNumber: 'Invalid Number', chassisNumber: 'Invalid Name\tWith Tab', engineNumber: 12345, description: 'All fields are invalid with tab character and numeric engineNumber' },
        { rcNumber: false, chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Boolean false rcNumber and valid chassisNumber and engineNumber' },
        { rcNumber: true, chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Boolean true rcNumber and valid chassisNumber and engineNumber' },
        { rcNumber: null, chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Null rcNumber and valid chassisNumber and engineNumber' },
        { rcNumber: false, chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Boolean false rcNumber and valid chassisNumber and engineNumber' },
        { rcNumber: true, chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Boolean true rcNumber and valid chassisNumber and engineNumber' },
        { rcNumber: null, chassisNumber: 'ME11CK01AC2033778', engineNumber: '1CK1033789', description: 'Null rcNumber and valid chassisNumber and engineNumber' },

    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'e-Challan Verification');
    filteredTestCases.forEach((testCase) => {
        invalidMCIDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, rcNumber : ${invalidCase.rcNumber}, chassisNumber : ${invalidCase.chassisNumber}, engineNumber : ${invalidCase.engineNumber}`, () => {    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, rcNumber: invalidCase.rcNumber, chassisNumber: invalidCase.chassisNumber, engineNumber: invalidCase.engineNumber }; 

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