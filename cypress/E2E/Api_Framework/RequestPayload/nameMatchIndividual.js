/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - NAME MATCH INDIVIDUAL API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    /*
     "name1": "Scoreme Solution P.Ltd",
    "name2": "Scoreme Solution Private Limited",
    "type": "individual",
    "applicationId":"testing"

    */

    const invalidWaterUtilityDetails = [
        //Invalid name1
        { name1: ' Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Leading space in name1' },
        { name1: 'Scoreme Solution P.Ltd  ',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Trailing space in name1' },
        { name1: ' Scoreme Solution P.Ltd  ',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Embedded space in name1' },
        { name1: 'Scoreme Solution P.Ltd!',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Exclamation mark in name1' },
        { name1: 's c o r e m e ',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Unsupported character encoding' },
        { name1: 'Scoreme Solution P.Ltd1',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Input must not contain numbers' },
        { name1: '--------',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Underscore in name1' },
        { name1: '1234567',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Input must not contain numbers' },
        { name1: ['Scoreme Solution P.Ltd'],name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Array in name1' },
        { name1: null,name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Null name1' },
        { name1: '',name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Empty string for name1' },
        { name1: undefined,name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Undefined name1' },
        { name1: true,name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Boolean true as name1' },
        { name1: false,name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'Boolean false as name1' },
        { name1: Boolean,name2: 'Scoreme Solution Private Limited',type: 'individual', description: 'boolean data type' },


        //Invalid water Provider
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited!',type: 'individual', description: 'Exclamation mark in name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited#',type: 'individual', description: 'Hash in name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited*',type: 'individual', description: 'Asterisk in name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: '1234',type: 'individual', description: 'Numbers in name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: 's c o r e m e',type: 'individual', description: 'Unsupported character encoding in name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: '',type: 'individual', description: 'Empty string for name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: ['Scoreme Solution Private Limited'],type: 'individual', description: 'Array in name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: undefined,type: 'individual', description: 'Undefined name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: true,type: 'individual', description: 'Boolean true as name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: false,type: 'individual', description: 'Boolean false as name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: Boolean,type: 'individual', description: 'Boolean data type as name2' },
        { name1: 'Scoreme Solution P.Ltd',name2: null,type: 'individual', description: 'Null name2' }, //Issue

        //Invalid type
       
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: '12345', description: 'Numbers in type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: '----------', description: 'Only hyphen in type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: ' ', description: 'Blank type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: ['individual'], description: 'Array in type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: undefined, description: 'Undefined type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: true, description: 'Boolean true type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: false, description: 'Boolean false type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: Boolean, description: 'Boolean type' },
        { name1: 'Scoreme Solution P.Ltd',name2: 'Scoreme Solution Private Limited',type: null, description: 'Null type' },
       

       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Name match individual');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} name1 : ${invalidCase.name1}, name2 : ${invalidCase.name2} and type : ${invalidCase.type}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, name1: invalidCase.name1, name2: invalidCase.name2, type:invalidCase.type}; 

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