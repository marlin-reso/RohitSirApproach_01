/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - HARYANA URBAN DEVELOPMENT AUTHORITY API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo
         { customerNo: '1922',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Too short customerNo' },
        // // { customerNo: '1122007949700',waterProvider: 'HUDA',city:'fARIDABAD_I',,city: 'faridabad_i' description: 'Too long customerNo' }, //under developement
        // { customerNo: '192233',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Alphabetic character in customerNo' },
        // { customerNo: '19223@',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Special character in customerNo' },
        // { customerNo: '19 223',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Embedded space in customerNo' },
        // { customerNo: '19223 ',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Trailing space in customerNo' },
        // { customerNo: ' 19223',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Leading space in customerNo' },
        // { customerNo: '192 23',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Space in middle of customerNo' },
        // { customerNo: '19223#',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Hash at the end of customerNo' },
        // { customerNo: '19223!',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Exclamation mark in customerNo' },
        // { customerNo: '1922.3',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Period in customerNo' },
        // { customerNo: '1922,3',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Comma in customerNo' },
        // { customerNo: '1922-3',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Hyphen in customerNo' },
        // { customerNo: '1922/3',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Slash in customerNo' },
        // { customerNo: '1922\\3',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Backslash in customerNo' },
        // { customerNo: '1922_3',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Underscore in customerNo' },
        // { customerNo: '1922?3',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Question mark in customerNo' },
        // { customerNo: ['19223'],waterProvider: 'HUDA',city: 'faridabad_i', description: 'Array in customerNO' },
        // { customerNo: null,waterProvider: 'HUDA',city: 'faridabad_i', description: 'Null customerNo' },
        // { customerNo: '',waterProvider: 'HUDA',city: 'faridabad_i', description: 'Empty string for customerNo' },
        // { customerNo: undefined,waterProvider: 'HUDA',city: 'faridabad_i', description: 'Undefined customerNo' },
        // { customerNo: true,waterProvider: 'HUDA',city: 'faridabad_i', description: 'Boolean true as customerNo' },
        // { customerNo: false,waterProvider: 'HUDA',city: 'faridabad_i', description: 'Boolean false as customerNo' },
        // { customerNo: Boolean,waterProvider: 'HUDA',city: 'faridabad_i', description: 'boolean data type' },


        // //Invalid water Provider
        // { customerNo: '19223',waterProvider: 'HUD-A',city: 'faridabad_i', description: 'Hyphen in waterProvider' },
        // { customerNo: '19223',waterProvider: 'HU@A',city: 'faridabad_i', description: 'Special character in waterProvider' },
        // { customerNo: '19223',waterProvider: 'H UDA',city: 'faridabad_i', description: 'Embedded space in waterProvider' },
        // { customerNo: '19223',waterProvider: 'HUD A',city: 'faridabad_i', description: 'Trailing space in waterProvider' },
        // { customerNo: '19223',waterProvider: 'HU',city: 'faridabad_i', description: 'Too short waterProvider' },
        // { customerNo: '19223',waterProvider: 'HUDAHUDA',city: 'faridabad_i', description: 'Too long waterProvider' },
        // { customerNo: '19223',waterProvider: 'HUDA!',city: 'faridabad_i', description: 'Exclamation mark in waterProvider' },
        // { customerNo: '19223',waterProvider: 'HUDA#',city: 'faridabad_i', description: 'Hash in waterProvider' },
        // { customerNo: '19223',waterProvider: 'HUDA*',city: 'faridabad_i', description: 'Asterisk in waterProvider' },
        // { customerNo: '19223',waterProvider: 'HUDA_',city: 'faridabad_i', description: 'Underscore in waterProvider' },
        // { customerNo: '19223',waterProvider: 'HUDA ',city: 'faridabad_i', description: 'Trailing space in waterProvider' },
        // { customerNo: '19223',waterProvider: ' HUDA',city: 'faridabad_i', description: 'Leading space in waterProvider' },
        // { customerNo: '19223',waterProvider: 'H1UDA',city: 'faridabad_i', description: 'Numeric character in waterProvider' },
        // { customerNo: '19223',waterProvider: '',city: 'faridabad_i', description: 'Empty string for waterProvider' },
        // { customerNo: '19223',waterProvider: ['HUDA'],city: 'faridabad_i', description: 'Array in waterProvider' },
        // { customerNo: '19223',waterProvider: undefined,city: 'faridabad_i', description: 'Undefined waterProvider' },
        // { customerNo: '19223',waterProvider: true,city: 'faridabad_i', description: 'Boolean true as waterProvider' },
        // { customerNo: '19223',waterProvider: false,city: 'faridabad_i', description: 'Boolean false as waterProvider' },
        // { customerNo: '19223',waterProvider: Boolean,city: 'faridabad_i', description: 'Boolean data type as waterProvider' },
        // { customerNo: '19223',waterProvider: null,city: 'faridabad_i', description: 'Null waterProvider' }, //Issue

        // //Invalid city
        // { customerNo: '19223',waterProvider: 'HUDA',city: 'faridabad__i', description: 'double underscore in city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: 'faridabad@i', description: 'Special character in city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: 'faridabad i', description: 'Embedded space in city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: 'faridabadi', description: 'Without space in city' },
         { customerNo: '19223',waterProvider: 'HUDA',city: ' faridabad_i', description: 'Leading space in city' },
         { customerNo: '19223',waterProvider: 'HUDA',city: 'faridabad_i ', description: 'Trailing space in city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: 'faridabad_*', description: 'question mark in city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: 'faridabad', description: 'short city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: 'fari', description: 'Too short city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: '12345', description: 'Numbers in city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: '----------', description: 'Only hyphen in city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: ' ', description: 'Blank city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: ['faridabad_i'], description: 'Array in City' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: undefined, description: 'Undefined city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: true, description: 'Boolean true city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: false, description: 'Boolean false city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: Boolean, description: 'Boolean city' },
        // { customerNo: '19223',waterProvider: 'HUDA',city: null, description: 'Null city' },
       

       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'HARYANA URBAN DEVELOPMENT AUTHORITY');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo : ${invalidCase.customerNo}, waterProvider : ${invalidCase.waterProvider} and city : ${invalidCase.city}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, customerNo: invalidCase.customerNo, waterProvider: invalidCase.waterProvider, city:invalidCase.city}; 

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