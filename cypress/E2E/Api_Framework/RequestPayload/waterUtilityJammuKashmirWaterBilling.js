/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - JAMMU KASHMIR WATER BILLING API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        // { customerNo: '01010401',waterProvider: 'JKPHED', description: 'Too short customerNo' },
        // // { customerNo: '1122007949700',waterProvider: 'JKPHED', description: 'Too long customerNo' }, //under developement
         { customerNo: '01010401888',waterProvider: 'JKPHED', description: 'Too long customerNo' },
        // { customerNo: '010104018@',waterProvider: 'JKPHED', description: 'Special character in customerNo' },
        // { customerNo: '01 0104018',waterProvider: 'JKPHED', description: 'Embedded space in customerNo' },
        // { customerNo: '010104018 ',waterProvider: 'JKPHED', description: 'Trailing space in customerNo' },
        // { customerNo: ' 010104018',waterProvider: 'JKPHED', description: 'Leading space in customerNo' },
        // { customerNo: '0101 04018',waterProvider: 'JKPHED', description: 'Space in middle of customerNo' },
        // { customerNo: '010104018#',waterProvider: 'JKPHED', description: 'Hash at the end of customerNo' },
        // { customerNo: '010104018!',waterProvider: 'JKPHED', description: 'Exclamation mark in customerNo' },
        // { customerNo: '010104.018',waterProvider: 'JKPHED', description: 'Period in customerNo' },
        // { customerNo: '010104,018',waterProvider: 'JKPHED', description: 'Comma in customerNo' },
        // { customerNo: '010104-018',waterProvider: 'JKPHED', description: 'Hyphen in customerNo' },
        // { customerNo: '010104/018',waterProvider: 'JKPHED', description: 'Slash in customerNo' },
        // { customerNo: '0101040\\18',waterProvider: 'JKPHED', description: 'Backslash in customerNo' },
        // { customerNo: '0101040_18',waterProvider: 'JKPHED', description: 'Underscore in customerNo' },
        // { customerNo: '01010?018',waterProvider: 'JKPHED', description: 'Question mark in customerNo' },
        // { customerNo: ['010104018'],waterProvider: 'JKPHED', description: 'Array in customerNO' },
        // { customerNo: null,waterProvider: 'JKPHED', description: 'Null customerNo' },
        // { customerNo: '',waterProvider: 'JKPHED', description: 'Empty string for customerNo' },
        // { customerNo: undefined,waterProvider: 'JKPHED', description: 'Undefined customerNo' },
        // { customerNo: true,waterProvider: 'JKPHED', description: 'Boolean true as customerNo' },
        // { customerNo: false,waterProvider: 'JKPHED', description: 'Boolean false as customerNo' },
        //  { customerNo: Boolean,waterProvider: 'JKPHED', description: 'boolean data type' },


        // //Valid customerNo and Invalid water Provider
        // { customerNo: '010104018',waterProvider: 'JKPH-ED', description: 'Hyphen in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JKPH@D', description: 'Special character in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JK PHED', description: 'Embedded space in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JKPHED ', description: 'Trailing space in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JK', description: 'Too short waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JKPHEDD', description: 'Too long waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JKPHED!', description: 'Exclamation mark in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JKPHED_', description: 'Underscore in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JKPHED:', description: 'Colon in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JKPHED;', description: 'Semicolon in waterProvider' },
        // { customerNo: '010104018',waterProvider: 'JK6HED', description: 'Numeric character in waterProvider' },
        // { customerNo: '010104018',waterProvider: '', description: 'Empty string for waterProvider' },
        // { customerNo: '010104018',waterProvider: ['JKPHED'], description: 'Array in waterProvider' },
        // { customerNo: '010104018',waterProvider: undefined, description: 'Undefined waterProvider' },
        // { customerNo: '010104018',waterProvider: true, description: 'Boolean true as waterProvider' },
        // { customerNo: '010104018',waterProvider: false, description: 'Boolean false as waterProvider' },
        // { customerNo: '010104018',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        // { customerNo: '010104018',waterProvider: null, description: 'Null waterProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'JAMMU KASHMIR WATER BILLING');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo: ${invalidCase.customerNo} and waterProvider : ${invalidCase.waterProvider}`, () => {
    
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