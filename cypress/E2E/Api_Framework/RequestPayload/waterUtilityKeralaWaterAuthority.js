/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - KERALA WATER AUTHORITY API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        // { customerNo: 'VAZ/2310/',waterProvider: 'KWA',consumerId:'2114114420', description: 'Too short customerNo' },
        // // { customerNo: '1122007949700',waterProvider: 'KWA',consumerId:'fARIDABAD_I',,consumerId:'2114114420' description: 'Too long customerNo' }, //under developement
        // { customerNo: 'VAZ/2310/DD',waterProvider: 'KWA',consumerId:'2114114420', description: 'Alphabetic character in customerNo' },
        // { customerNo: 'VAZ/2310/D@',waterProvider: 'KWA',consumerId:'2114114420', description: 'Special character in customerNo' },
        // { customerNo: 'VAZ/ 2310/D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Embedded space in customerNo' },
        // { customerNo: 'VAZ/2310/D ',waterProvider: 'KWA',consumerId:'2114114420', description: 'Trailing space in customerNo' },
        // { customerNo: ' VAZ/2310/D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Leading space in customerNo' },
        // { customerNo: 'VAZ2310D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Hyphen in customerNo' },
        // { customerNo: 'VAZ-2310-D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Hash at the end of customerNo' },
        // { customerNo: 'VAZ/2310/D!',waterProvider: 'KWA',consumerId:'2114114420', description: 'Exclamation mark in customerNo' },
        // { customerNo: 'VAZ.2310.D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Period in customerNo' },
        // { customerNo: 'VAZ,2310,D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Comma in customerNo' },
        // { customerNo: 'VAZ\\2310\\D',waterProvider: 'KWA',consumerId:'2114114420', description: ' Backslash in customerNo' },
        // { customerNo: 'VAZ//2310//D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Slash in customerNo' },
        // { customerNo: 'VAZ/2310\\D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Backslash in customerNo' },
        // { customerNo: 'VAZ_2310_D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Underscore in customerNo' },
        // { customerNo: '123/2310/D',waterProvider: 'KWA',consumerId:'2114114420', description: 'Question mark in customerNo' },
        // { customerNo: ['VAZ/2310/D'],waterProvider: 'KWA',consumerId:'2114114420', description: 'Array in customerNo' },
        // { customerNo: null,waterProvider: 'KWA',consumerId:'2114114420', description: 'Null customerNo' },
        // { customerNo: '',waterProvider: 'KWA',consumerId:'2114114420', description: 'Empty string for customerNo' },
        // { customerNo: undefined,waterProvider: 'KWA',consumerId:'2114114420', description: 'Undefined customerNo' },
        // { customerNo: true,waterProvider: 'KWA',consumerId:'2114114420', description: 'Boolean true as customerNo' },
        // { customerNo: false,waterProvider: 'KWA',consumerId:'2114114420', description: 'Boolean false as customerNo' },
        // { customerNo: Boolean,waterProvider: 'KWA',consumerId:'2114114420', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KW-A',consumerId:'2114114420', description: 'Hyphen in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KW@A',consumerId:'2114114420', description: 'Special character in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'K WA',consumerId:'2114114420', description: 'Embedded space in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KW A',consumerId:'2114114420', description: 'Trailing space in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KW',consumerId:'2114114420', description: 'Too short waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KWAKWA',consumerId:'2114114420', description: 'Too long waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KWA!',consumerId:'2114114420', description: 'Exclamation mark in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KWA#',consumerId:'2114114420', description: 'Hash in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KWA*',consumerId:'2114114420', description: 'Asterisk in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KWA_',consumerId:'2114114420', description: 'Underscore in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'KWA ',consumerId:'2114114420', description: 'Trailing space in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: ' KWA',consumerId:'2114114420', description: 'Leading space in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: 'K1WA',consumerId:'2114114420', description: 'Numeric character in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: ['KWA'],consumerId:'2114114420', description: 'Array in waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: '',consumerId:'2114114420', description: 'Empty string for waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: undefined,consumerId:'2114114420', description: 'Undefined waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: true,consumerId:'2114114420', description: 'Boolean true as waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: false,consumerId:'2114114420', description: 'Boolean false as waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: Boolean,consumerId:'2114114420', description: 'Boolean data type as waterProvider' },
        // { customerNo: 'VAZ/2310/D',waterProvider: null,consumerId:'2114114420', description: 'Null waterProvider' }, //Issue

        //Invalid consumerId
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '211411442_0', description: 'double underscore in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '211411442@0', description: 'Special character in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '21141 14420', description: 'Embedded space in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '211411442000', description: 'Too long consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: ' 2114114420', description: 'Leading space in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '2114114420 ', description: 'Trailing space in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '2114114420?', description: 'question mark in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '21141144', description: 'short consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '2114', description: 'Too short consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '211411442o', description: 'Alphabet in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: 2114114420, description: 'Number consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: '----------', description: 'Only hyphen in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId:['2114114420'], description: 'Array in consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: ' ', description: 'Blank consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: undefined, description: 'Undefined consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: true, description: 'Boolean true consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: false, description: 'Boolean false consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: Boolean, description: 'Boolean consumerId' },
        { customerNo: 'VAZ/2310/D',waterProvider: 'KWA',consumerId: null, description: 'Null consumerId' },
       

       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'KERALA WATER AUTHORITY');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo. : ${invalidCase.customerNo}, waterProvider : ${invalidCase.waterProvider} and consumerId : ${invalidCase.consumerId}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, customerNo: invalidCase.customerNo, waterProvider: invalidCase.waterProvider, consumerId:invalidCase.consumerId}; 

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