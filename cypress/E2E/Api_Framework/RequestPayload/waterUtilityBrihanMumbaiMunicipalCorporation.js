/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - BRIHANMUMBAI MUNICIPAL CORPORATION API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        { customerNo: 'KER049100',waterProvider: 'BMC', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'BMC', description: 'Too long customerNo' }, //under developement
        { customerNo: 'KER04910022',waterProvider: 'BMC', description: 'Alphabetic character in customerNo' },
        { customerNo: 'KER0491002@',waterProvider: 'BMC', description: 'Special character in customerNo' },
        { customerNo: 'KE R0491002',waterProvider: 'BMC', description: 'Embedded space in customerNo' },
        { customerNo: 'KER0491002 ',waterProvider: 'BMC', description: 'Trailing space in customerNo' },
        { customerNo: ' KER0491002',waterProvider: 'BMC', description: 'Leading space in customerNo' },
        { customerNo: 'KER04 91002',waterProvider: 'BMC', description: 'Space in middle of customerNo' },
        { customerNo: 'KER0491002#',waterProvider: 'BMC', description: 'Hash at the end of customerNo' },
        { customerNo: 'KER0491002!',waterProvider: 'BMC', description: 'Exclamation mark in customerNo' },
        { customerNo: 'KER0491.002',waterProvider: 'BMC', description: 'Period in customerNo' },
        { customerNo: 'KER0491,002',waterProvider: 'BMC', description: 'Comma in customerNo' },
        { customerNo: 'KER0491-002',waterProvider: 'BMC', description: 'Hyphen in customerNo' },
        { customerNo: 'KER0491/002',waterProvider: 'BMC', description: 'Slash in customerNo' },
        { customerNo: 'KER04910\\02',waterProvider: 'BMC', description: 'Backslash in customerNo' },
        { customerNo: 'KER0491_002',waterProvider: 'BMC', description: 'Underscore in customerNo' },
        { customerNo: 'KER0491?002',waterProvider: 'BMC', description: 'Question mark in customerNo' },
        { customerNo: ['KER0491002'],waterProvider: 'BMC', description: 'Array customerNo' },
        { customerNo: ['KER0491002','KER0491019'],waterProvider: 'BMC', description: 'Multiple values in Array customerNo' },
        { customerNo: null,waterProvider: 'BMC', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'BMC', description: 'Empty string for customerNo' },
        { customerNo: undefined,waterProvider: 'BMC', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'BMC', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'BMC', description: 'Boolean false as customerNo' },
         { customerNo: Boolean,waterProvider: 'BMC', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: 'KER0491002',waterProvider: 'BM-C', description: 'Hyphen in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BM@C', description: 'Special character in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'B MC', description: 'Embedded space in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BMC ', description: 'Trailing space in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BM', description: 'Too short waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BMCBMC', description: 'Too long waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BMC!', description: 'Exclamation mark in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BMC_', description: 'Underscore in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BMC:', description: 'Colon in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BMC;', description: 'Semicolon in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: 'BM1C', description: 'Numeric character in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: ['BMC'], description: 'Array in waterProvider' },
        { customerNo: 'KER0491002',waterProvider: '', description: 'Empty string for waterProvider' },
        { customerNo: 'KER0491002',waterProvider: undefined, description: 'Undefined waterProvider' },
        { customerNo: 'KER0491002',waterProvider: true, description: 'Boolean true as waterProvider' },
        { customerNo: 'KER0491002',waterProvider: false, description: 'Boolean false as waterProvider' },
        { customerNo: 'KER0491002',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        { customerNo: 'KER0491002',waterProvider: null, description: 'Null waterProvider' }, //Issue
         
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'BRIHANMUMBAI MUNICIPAL CORPORATION');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Utility - BrihanMumbaiJalBoard, customerNo. : ${invalidCase.customerNo} and waterProvider : ${invalidCase.waterProvider}`, () => {
    
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