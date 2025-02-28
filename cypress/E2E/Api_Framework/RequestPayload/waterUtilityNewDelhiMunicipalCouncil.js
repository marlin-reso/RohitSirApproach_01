/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - NEW DELHI MUNICIPAL COUNCIL API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        { customerNo: '19621',waterProvider: 'NDMC', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'NDMC', description: 'Too long customerNo' }, //under developement
        { customerNo: '196218999',waterProvider: 'NDMC', description: 'Alphabetic character in customerNo' },
        { customerNo: '1962189@',waterProvider: 'NDMC', description: 'Special character in customerNo' },
        { customerNo: '19 62189',waterProvider: 'NDMC', description: 'Embedded space in customerNo' },
        { customerNo: '1962189 ',waterProvider: 'NDMC', description: 'Trailing space in customerNo' },
        { customerNo: ' 1962189',waterProvider: 'NDMC', description: 'Leading space in customerNo' },
        { customerNo: '19621 89',waterProvider: 'NDMC', description: 'Space in middle of customerNo' },
        { customerNo: '1962189#',waterProvider: 'NDMC', description: 'Hash at the end of customerNo' },
        { customerNo: '1962189!',waterProvider: 'NDMC', description: 'Exclamation mark in customerNo' },
        { customerNo: '19621.89',waterProvider: 'NDMC', description: 'Period in customerNo' },
        { customerNo: '19621,89',waterProvider: 'NDMC', description: 'Comma in customerNo' },
        { customerNo: '19621-89',waterProvider: 'NDMC', description: 'Hyphen in customerNo' },
        { customerNo: '19621/89',waterProvider: 'NDMC', description: 'Slash in customerNo' },
        { customerNo: '19621\\89',waterProvider: 'NDMC', description: 'Backslash in customerNo' },
        { customerNo: '196218_9',waterProvider: 'NDMC', description: 'Underscore in customerNo' },
        { customerNo: '19621?89',waterProvider: 'NDMC', description: 'Question mark in customerNo' },
        { customerNo: ['1962189'],waterProvider: 'NDMC', description: 'Array in waterPcustomerNo' },
        
        { customerNo: null,waterProvider: 'NDMC', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'NDMC', description: 'Empty string for customerNo' },
        { customerNo: undefined,waterProvider: 'NDMC', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'NDMC', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'NDMC', description: 'Boolean false as customerNo' },
         { customerNo: Boolean,waterProvider: 'NDMC', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: '1962189',waterProvider: 'ND-MC', description: 'Hyphen in waterProvider' },
        { customerNo: '1962189',waterProvider: 'NDMC@', description: 'Special character in waterProvider' },
        { customerNo: '1962189',waterProvider: 'ND MC', description: 'Embedded space in waterProvider' },
        { customerNo: '1962189',waterProvider: 'NDMC ', description: 'Trailing space in waterProvider' },
        { customerNo: '1962189',waterProvider: 'ND', description: 'Too short waterProvider' },
        { customerNo: '1962189',waterProvider: 'NDMCC', description: 'Too long waterProvider' },
        { customerNo: '1962189',waterProvider: 'NDMC!', description: 'Exclamation mark in waterProvider' },
        { customerNo: '1962189',waterProvider: 'NDMC_', description: 'Underscore in waterProvider' },
        { customerNo: '1962189',waterProvider: 'NDMC:', description: 'Colon in waterProvider' },
        { customerNo: '1962189',waterProvider: 'NDMC;', description: 'Semicolon in waterProvider' },
        { customerNo: '1962189',waterProvider: 'ND1MC', description: 'Numeric character in waterProvider' },
        { customerNo: '1962189',waterProvider: '', description: 'Empty string for waterProvider' },
        { customerNo: '1962189',waterProvider: ['NDMC'], description: 'Array in waterProvider' },
        { customerNo: '1962189',waterProvider: undefined, description: 'Undefined waterProvider' },
        { customerNo: '1962189',waterProvider: true, description: 'Boolean true as waterProvider' },
        { customerNo: '1962189',waterProvider: false, description: 'Boolean false as waterProvider' },
        { customerNo: '1962189',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        { customerNo: '1962189',waterProvider: null, description: 'Null waterProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'NEW DELHI MUNICIPAL COUNCIL');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} CustomerNo. : ${invalidCase.customerNo} and waterProvider : ${invalidCase.waterProvider}`, () => {
    
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