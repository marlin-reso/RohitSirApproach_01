/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - TALEGAON DABHADE NAGAR PARISHAD API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo and Valid Water Provider
        { customerNo: 'W700024',waterProvider: 'TDNP', description: 'Too short customerNo' },
        // { customerNo: '1122007949700',waterProvider: 'TDNP', description: 'Too long customerNo' }, //under developement
        { customerNo: 'W700024699',waterProvider: 'TDNP', description: 'Alphabetic character in customerNo' },
        { customerNo: 'W70002469@',waterProvider: 'TDNP', description: 'Special character in customerNo' },
        { customerNo: 'W7 0002469',waterProvider: 'TDNP', description: 'Embedded space in customerNo' },
        { customerNo: 'W70002469 ',waterProvider: 'TDNP', description: 'Trailing space in customerNo' },
        { customerNo: ' W70002469',waterProvider: 'TDNP', description: 'Leading space in customerNo' },
        { customerNo: 'W700024 69',waterProvider: 'TDNP', description: 'Space in middle of customerNo' },
        { customerNo: 'W70002469#',waterProvider: 'TDNP', description: 'Hash at the end of customerNo' },
        { customerNo: 'W70002469!',waterProvider: 'TDNP', description: 'Exclamation mark in customerNo' },
        { customerNo: 'W700024.69',waterProvider: 'TDNP', description: 'Period in customerNo' },
        { customerNo: 'W700024,69',waterProvider: 'TDNP', description: 'Comma in customerNo' },
        { customerNo: 'W700024-69',waterProvider: 'TDNP', description: 'Hyphen in customerNo' },
        { customerNo: 'W700024/69',waterProvider: 'TDNP', description: 'Slash in customerNo' },
        { customerNo: 'W700024\\69',waterProvider: 'TDNP', description: 'Backslash in customerNo' },
        { customerNo: 'W700024_69',waterProvider: 'TDNP', description: 'Underscore in customerNo' },
        { customerNo: 'W700024?69',waterProvider: 'TDNP', description: 'Question mark in customerNo' },
    //   { customerNo: ['W70002469'],waterProvider: 'TDNP', description: 'Array in customerNo' },
        { customerNo: null,waterProvider: 'TDNP', description: 'Null customerNo' },
        { customerNo: '',waterProvider: 'TDNP', description: 'Empty string for customerNo' },
    //  { customerNo: undefined,waterProvider: 'TDNP', description: 'Undefined customerNo' },
        { customerNo: true,waterProvider: 'TDNP', description: 'Boolean true as customerNo' },
        { customerNo: false,waterProvider: 'TDNP', description: 'Boolean false as customerNo' },
    //{ customerNo: Boolean,waterProvider: 'TDNP', description: 'boolean data type' },


        //Valid customerNo and Invalid water Provider
        { customerNo: 'W70002469',waterProvider: 'TD-NP', description: 'Hyphen in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TDNP@', description: 'Special character in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TD NP', description: 'Embedded space in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TDNP ', description: 'Trailing space in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TD', description: 'Too short waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TDNPP', description: 'Too long waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TDNP!', description: 'Exclamation mark in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TDNP_', description: 'Underscore in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TDNP:', description: 'Colon in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TDNP;', description: 'Semicolon in waterProvider' },
        { customerNo: 'W70002469',waterProvider: 'TD1NP', description: 'Numeric character in waterProvider' },
        { customerNo: 'W70002469',waterProvider: ['TDNP'], description: 'Array in waterProvider' },
        { customerNo: 'W70002469',waterProvider: '', description: 'Empty string for waterProvider' },
        { customerNo: 'W70002469',waterProvider: undefined, description: 'Undefined waterProvider' },
        { customerNo: 'W70002469',waterProvider: true, description: 'Boolean true as waterProvider' },
        { customerNo: 'W70002469',waterProvider: false, description: 'Boolean false as waterProvider' },
        { customerNo: 'W70002469',waterProvider: Boolean, description: 'Boolean data type as waterProvider' },
        { customerNo: 'W70002469',waterProvider: null, description: 'Null waterProvider' }, //Issue


       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'TALEGAON DABHADE NAGAR PARISHAD');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo. : ${invalidCase.customerNo} and waterProvider : ${invalidCase.waterProvider}`, () => {
    
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