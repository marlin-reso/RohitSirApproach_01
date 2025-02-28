/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - NOIDA JAL API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        { customerNo: '030005',waterProvider: 'NJAL', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'NJAL', description: 'Too long customerNo' }, //under developement
        { customerNo: '0300O546',waterProvider: 'NJAL', description: 'Alphabetic character in customerNo' },
        { customerNo: '03000546@',waterProvider: 'NJAL', description: 'Special character in customerNo' },
        { customerNo: '030 00546',waterProvider: 'NJAL', description: 'Embedded space in customerNo' },
        { customerNo: '03000546 ',waterProvider: 'NJAL', description: 'Trailing space in customerNo' },
        { customerNo: ' 03000546',waterProvider: 'NJAL', description: 'Leading space in customerNo' },
        { customerNo: '030005 46',waterProvider: 'NJAL', description: 'Space in middle of customerNo' },
        { customerNo: '03000546#',waterProvider: 'NJAL', description: 'Hash at the end of customerNo' },
        { customerNo: '03000546!',waterProvider: 'NJAL', description: 'Exclamation mark in customerNo' },
        { customerNo: '030005.46',waterProvider: 'NJAL', description: 'Period in customerNo' },
        { customerNo: '030005,46',waterProvider: 'NJAL', description: 'Comma in customerNo' },
        { customerNo: '030005-46',waterProvider: 'NJAL', description: 'Hyphen in customerNo' },
        { customerNo: '030005/46',waterProvider: 'NJAL', description: 'Slash in customerNo' },
        { customerNo: '030005\\46',waterProvider: 'NJAL', description: 'Backslash in customerNo' },
        { customerNo: '0300054_6',waterProvider: 'NJAL', description: 'Underscore in customerNo' },
        { customerNo: '030005?46',waterProvider: 'NJAL', description: 'Question mark in customerNo' },
        { customerNo: ['03000546'],waterProvider: 'NJAL', description: 'Array in customerNo.' },
        { customerNo: null,waterProvider: 'NJAL', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'NJAL', description: 'Empty string for customerNo' },
        { customerNo: undefined,waterProvider: 'NJAL', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'NJAL', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'NJAL', description: 'Boolean false as customerNo' },
        { customerNo: Boolean,waterProvider: 'NJAL', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: '03000546',waterProvider: 'NJ-AL', description: 'Hyphen in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJAL@', description: 'Special character in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJ AL', description: 'Embedded space in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJAL ', description: 'Trailing space in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJ', description: 'Too short waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJALL', description: 'Too long waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJAL!', description: 'Exclamation mark in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJAL_', description: 'Underscore in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJAL:', description: 'Colon in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJAL;', description: 'Semicolon in waterProvider' },
        { customerNo: '03000546',waterProvider: 'NJ1AL', description: 'Numeric character in waterProvider' },
        { customerNo: '03000546',waterProvider: '', description: 'Empty string for waterProvider' },
        { customerNo: '03000546',waterProvider: ['NJAL'], description: 'Array in waterProvider' },
        { customerNo: '03000546',waterProvider: undefined, description: 'Undefined waterProvider' },
        { customerNo: '03000546',waterProvider: true, description: 'Boolean true as waterProvider' },
        { customerNo: '03000546',waterProvider: false, description: 'Boolean false as waterProvider' },
        { customerNo: '03000546',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        { customerNo: '03000546',waterProvider: null, description: 'Null waterProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'NOIDA JAL');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo.: ${invalidCase.customerNo} and waterProvider : ${invalidCase.waterProvider}`, () => {
    
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