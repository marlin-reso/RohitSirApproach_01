/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - PIMPRI CHINCHWAD MUNICIPAL CORPORATION API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
     //   { customerNo: '6948',waterProvider: 'PCMC', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'PCMC', description: 'Too long customerNo' }, //under developement
    //    { customerNo: '694888',waterProvider: 'PCMC', description: 'Alphabetic character in customerNo' },
        { customerNo: '69488@',waterProvider: 'PCMC', description: 'Special character in customerNo' },
        { customerNo: '69 488',waterProvider: 'PCMC', description: 'Embedded space in customerNo' },
        { customerNo: '69488 ',waterProvider: 'PCMC', description: 'Trailing space in customerNo' },
        { customerNo: ' 69488',waterProvider: 'PCMC', description: 'Leading space in customerNo' },
        { customerNo: '694 88',waterProvider: 'PCMC', description: 'Space in middle of customerNo' },
        { customerNo: '69488#',waterProvider: 'PCMC', description: 'Hash at the end of customerNo' },
        { customerNo: '69488!',waterProvider: 'PCMC', description: 'Exclamation mark in customerNo' },
        { customerNo: '694.88',waterProvider: 'PCMC', description: 'Period in customerNo' },
        { customerNo: '694,88',waterProvider: 'PCMC', description: 'Comma in customerNo' },
        { customerNo: '694-88',waterProvider: 'PCMC', description: 'Hyphen in customerNo' },
        { customerNo: '694/88',waterProvider: 'PCMC', description: 'Slash in customerNo' },
        { customerNo: '6948\\8',waterProvider: 'PCMC', description: 'Backslash in customerNo' },
        { customerNo: '6948_8',waterProvider: 'PCMC', description: 'Underscore in customerNo' },
        { customerNo: '694?88',waterProvider: 'PCMC', description: 'Question mark in customerNo' },
        { customerNo: ['69488'],waterProvider: 'PCMC', description: 'Array in customerNO' },
        { customerNo: null,waterProvider: 'PCMC', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'PCMC', description: 'Empty string for customerNo' },
        { customerNo: undefined,waterProvider: 'PCMC', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'PCMC', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'PCMC', description: 'Boolean false as customerNo' },
         { customerNo: Boolean,waterProvider: 'PCMC', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: '69488',waterProvider: 'PC-MC', description: 'Hyphen in waterProvider' },
        { customerNo: '69488',waterProvider: 'PCMC@', description: 'Special character in waterProvider' },
        { customerNo: '69488',waterProvider: 'PC MC', description: 'Embedded space in waterProvider' },
        { customerNo: '69488',waterProvider: 'PCMC ', description: 'Trailing space in waterProvider' },
        { customerNo: '69488',waterProvider: 'PC', description: 'Too short waterProvider' },
        { customerNo: '69488',waterProvider: 'PCMCC', description: 'Too long waterProvider' },
        { customerNo: '69488',waterProvider: 'PCMC!', description: 'Exclamation mark in waterProvider' },
        { customerNo: '69488',waterProvider: 'PCMC_', description: 'Underscore in waterProvider' },
        { customerNo: '69488',waterProvider: 'PCMC:', description: 'Colon in waterProvider' },
        { customerNo: '69488',waterProvider: 'PCMC;', description: 'Semicolon in waterProvider' },
        { customerNo: '69488',waterProvider: 'PC1MC', description: 'Numeric character in waterProvider' },
        { customerNo: '69488',waterProvider: ['PCMC'], description: 'Array in waterProvider' },
        
        { customerNo: '69488',waterProvider: '', description: 'Empty string for waterProvider' },
        { customerNo: '69488',waterProvider: undefined, description: 'Undefined waterProvider' },
        { customerNo: '69488',waterProvider: true, description: 'Boolean true as waterProvider' },
        { customerNo: '69488',waterProvider: false, description: 'Boolean false as waterProvider' },
        { customerNo: '69488',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        { customerNo: '69488',waterProvider: null, description: 'Null waterProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'PIMPRI CHINCHWAD MUNICIPAL CORPORATION');
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