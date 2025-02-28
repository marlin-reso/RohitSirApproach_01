/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - HYDERABAD METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        { customerNo: '61699805',waterProvider: 'HMWSSB', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'HMWSSB', description: 'Too long customerNo' }, //under developement
        { customerNo: '6169980566',waterProvider: 'HMWSSB', description: 'Alphabetic character in customerNo' },
        { customerNo: '616998056@',waterProvider: 'HMWSSB', description: 'Special character in customerNo' },
        { customerNo: '61 6998056',waterProvider: 'HMWSSB', description: 'Embedded space in customerNo' },
        { customerNo: '616998056 ',waterProvider: 'HMWSSB', description: 'Trailing space in customerNo' },
        { customerNo: ' 616998056',waterProvider: 'HMWSSB', description: 'Leading space in customerNo' },
        { customerNo: '61699 8056',waterProvider: 'HMWSSB', description: 'Space in middle of customerNo' },
        { customerNo: '616998056#',waterProvider: 'HMWSSB', description: 'Hash at the end of customerNo' },
        { customerNo: '616998056!',waterProvider: 'HMWSSB', description: 'Exclamation mark in customerNo' },
        { customerNo: '616998.056',waterProvider: 'HMWSSB', description: 'Period in customerNo' },
        { customerNo: '616998,056',waterProvider: 'HMWSSB', description: 'Comma in customerNo' },
        { customerNo: '616998-056',waterProvider: 'HMWSSB', description: 'Hyphen in customerNo' },
        { customerNo: '616998/056',waterProvider: 'HMWSSB', description: 'Slash in customerNo' },
        { customerNo: '616998//056',waterProvider: 'HMWSSB', description: 'Backslash in customerNo' },
        { customerNo: '616998_056',waterProvider: 'HMWSSB', description: 'Underscore in customerNo' },
        { customerNo: '616998?056',waterProvider: 'HMWSSB', description: 'Question mark in customerNo' },
        { customerNo: ['616998056'],waterProvider: 'HMWSSB', description: 'Array in customerNO' },
        { customerNo: null,waterProvider: 'HMWSSB', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'HMWSSB', description: 'Empty string for customerNo' },
        { customerNo: undefined,waterProvider: 'HMWSSB', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'HMWSSB', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'HMWSSB', description: 'Boolean false as customerNo' },
         { customerNo: Boolean,waterProvider: 'HMWSSB', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: '616998056',waterProvider: 'HMWS-SB', description: 'Hyphen in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWS@SB', description: 'Special character in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HM WSSB', description: 'Embedded space in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWSSB ', description: 'Trailing space in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWS', description: 'Too short waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWSSBHMWSSB', description: 'Too long waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWSSB!', description: 'Exclamation mark in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWSSB_', description: 'Underscore in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWSSB:', description: 'Colon in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWSSB;', description: 'Semicolon in waterProvider' },
        { customerNo: '616998056',waterProvider: 'HMWS1B', description: 'Numeric character in waterProvider' },
        { customerNo: '616998056',waterProvider: '', description: 'Empty string for waterProvider' },
        { customerNo: '616998056',waterProvider: ['HMWSSB'], description: 'Array in WaterProvider' },
        { customerNo: '616998056',waterProvider: undefined, description: 'Undefined waterProvider' },
        { customerNo: '616998056',waterProvider: true, description: 'Boolean true as waterProvider' },
        { customerNo: '616998056',waterProvider: false, description: 'Boolean false as waterProvider' },
        { customerNo: '616998056',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        { customerNo: '616998056',waterProvider: null, description: 'Null waterProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'HYDERABAD METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customer No. : ${invalidCase.customerNo} and waterProvider : ${invalidCase.waterProvider}`, () => {
    
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