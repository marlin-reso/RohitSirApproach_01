/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - UTTARAKHAND JAL SANSTHAN API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        { customerNo: '026837',waterProvider: 'UJS',city: 'rajpur', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'UJS',city:'fARIDABAD_I',,city: 'rajpur' description: 'Too long customerNo' }, //under developement
        { customerNo: '02683799',waterProvider: 'UJS',city: 'rajpur', description: 'Alphabetic character in customerNo' },
        { customerNo: '0268379@',waterProvider: 'UJS',city: 'rajpur', description: 'Special character in customerNo' },
        { customerNo: '02 68379',waterProvider: 'UJS',city: 'rajpur', description: 'Embedded space in customerNo' },
        { customerNo: '0268379 ',waterProvider: 'UJS',city: 'rajpur', description: 'Trailing space in customerNo' },
        { customerNo: ' 0268379',waterProvider: 'UJS',city: 'rajpur', description: 'Leading space in customerNo' },
        { customerNo: '02683 79',waterProvider: 'UJS',city: 'rajpur', description: 'Space in middle of customerNo' },
        { customerNo: '0268379#',waterProvider: 'UJS',city: 'rajpur', description: 'Hash at the end of customerNo' },
        { customerNo: '0268379!',waterProvider: 'UJS',city: 'rajpur', description: 'Exclamation mark in customerNo' },
        { customerNo: '026837.9',waterProvider: 'UJS',city: 'rajpur', description: 'Period in customerNo' },
        { customerNo: '026837,9',waterProvider: 'UJS',city: 'rajpur', description: 'Comma in customerNo' },
        { customerNo: '026837-9',waterProvider: 'UJS',city: 'rajpur', description: 'Hyphen in customerNo' },
        { customerNo: '026837/9',waterProvider: 'UJS',city: 'rajpur', description: 'Slash in customerNo' },
        { customerNo: '026837\\9',waterProvider: 'UJS',city: 'rajpur', description: 'Backslash in customerNo' },
        { customerNo: '026837_9',waterProvider: 'UJS',city: 'rajpur', description: 'Underscore in customerNo' },
        { customerNo: '02683?79',waterProvider: 'UJS',city: 'rajpur', description: 'Question mark in customerNo' },
        { customerNo: null,waterProvider: 'UJS',city: 'rajpur', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'UJS',city: 'rajpur', description: 'Empty string for customerNo' },
        { customerNo: undefined,waterProvider: 'UJS',city: 'rajpur', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'UJS',city: 'rajpur', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'UJS',city: 'rajpur', description: 'Boolean false as customerNo' },
        { customerNo: Boolean,waterProvider: 'UJS',city: 'rajpur', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: '0268379',waterProvider: 'UJ-S',city: 'rajpur', description: 'Hyphen in waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJ@S',city: 'rajpur', description: 'Special character in waterProvider' },
        { customerNo: '0268379',waterProvider: 'U JS',city: 'rajpur', description: 'Embedded space in waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJ S',city: 'rajpur', description: 'Trailing space in waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJ',city: 'rajpur', description: 'Too short waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJSUJS',city: 'rajpur', description: 'Too long waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJS!',city: 'rajpur', description: 'Exclamation mark in waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJS#',city: 'rajpur', description: 'Hash in waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJS*',city: 'rajpur', description: 'Asterisk in waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJS_',city: 'rajpur', description: 'Underscore in waterProvider' },
        { customerNo: '0268379',waterProvider: 'UJS ',city: 'rajpur', description: 'Trailing space in waterProvider' },
        { customerNo: '0268379',waterProvider: ' UJS',city: 'rajpur', description: 'Leading space in waterProvider' },
        { customerNo: '0268379',waterProvider: 'U1JS',city: 'rajpur', description: 'Numeric character in waterProvider' },
        { customerNo: '0268379',waterProvider: '',city: 'rajpur', description: 'Empty string for waterProvider' },
        { customerNo: '0268379',waterProvider: undefined,city: 'rajpur', description: 'Undefined waterProvider' },
        { customerNo: '0268379',waterProvider: true,city: 'rajpur', description: 'Boolean true as waterProvider' },
        { customerNo: '0268379',waterProvider: false,city: 'rajpur', description: 'Boolean false as waterProvider' },
        { customerNo: '0268379',waterProvider: Boolean,city: 'rajpur', description: 'Boolean data type as waterProvider' },
        { customerNo: '0268379',waterProvider: null,city: 'rajpur', description: 'Null waterProvider' }, //Issue

        //Invalid city
        { customerNo: '0268379',waterProvider: 'UJS',city: 'rajpu__r', description: 'double underscore in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: 'rajpu@r', description: 'Special character in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: 'rajpu r', description: 'Embedded space in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: 'faridabadi', description: 'Without space in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: ' rajpur', description: 'Leading space in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: 'rajpur ', description: 'Trailing space in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: 'rajpur*', description: 'question mark in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: 'rajpu', description: 'short city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: 'raj', description: 'Too short city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: '12345', description: 'Numbers in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: '----------', description: 'Only hyphen in city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: ' ', description: 'Blank city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: undefined, description: 'Undefined city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: true, description: 'Boolean true city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: false, description: 'Boolean false city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: Boolean, description: 'Boolean city' },
        { customerNo: '0268379',waterProvider: 'UJS',city: null, description: 'Null city' },
       

       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'UTTARAKHAND JAL SANSTHAN');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}  customerNo. : ${invalidCase.customerNo}, waterProvider : ${invalidCase.waterProvider} and city : ${invalidCase.city}`, () => {
    
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