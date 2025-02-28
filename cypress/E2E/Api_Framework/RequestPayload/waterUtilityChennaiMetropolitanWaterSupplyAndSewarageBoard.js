/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - CHENNAI METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidWaterUtilityDetails = [
        //Invalid customerNo
        // { customerNo: '0303',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Too short customerNo' },
        // // { customerNo: '1122007949700',waterProvider: 'CMWSSB',city:'fARIDABAD_I',,zoneNo: '14' wardNo:'185',description: 'Too long customerNo' }, //under developement
        // { customerNo: '030388',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Alphabetic character in customerNo' },
        // { customerNo: '03038@',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Special character in customerNo' },
        // { customerNo: '03 038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Embedded space in customerNo' },
        // { customerNo: '03038 ',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Trailing space in customerNo' },
        // { customerNo: ' 03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Leading space in customerNo' },
        // { customerNo: '0303 8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Space in middle of customerNo' },
        // { customerNo: '03038#',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Hash at the end of customerNo' },
        // { customerNo: '03038!',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Exclamation mark in customerNo' },
        // { customerNo: '0303.8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Period in customerNo' },
        // { customerNo: '0303,8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Comma in customerNo' },
        // { customerNo: '0303-8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Hyphen in customerNo' },
        // { customerNo: '0303/8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Slash in customerNo' },
        // { customerNo: '0303\\8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Backslash in customerNo' },
        // { customerNo: '0303_8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Underscore in customerNo' },
        // { customerNo: '0303?8',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Question mark in customerNo' },
        // { customerNo: ['03038'],waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'pass the array value in customerNo' },
        // { customerNo: null,waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Null customerNo' },
        // { customerNo: '',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Empty string for customerNo' },
        // { customerNo: undefined,waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Undefined customerNo' },
        // { customerNo: true,waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Boolean true as customerNo' },
        // { customerNo: false,waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'Boolean false as customerNo' },
        // { customerNo: Boolean,waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185',description: 'boolean data type' },

     
        // //Invalid water Provider
        // { customerNo: '03038',waterProvider: 'CMWS-SB',zoneNo: '14', wardNo:'185',description: 'Hyphen in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWS@B',zoneNo: '14', wardNo:'185',description: 'Special character in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CM WSSB',zoneNo: '14', wardNo:'185',description: 'Embedded space in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWSS B',zoneNo: '14', wardNo:'185',description: 'Trailing space in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMW',zoneNo: '14', wardNo:'185',description: 'Too short waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWSSBBB',zoneNo: '14', wardNo:'185',description: 'Too long waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWSSB!',zoneNo: '14', wardNo:'185',description: 'Exclamation mark in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWSSB#',zoneNo: '14', wardNo:'185',description: 'Hash in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWSSB*',zoneNo: '14', wardNo:'185',description: 'Asterisk in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWSSB_',zoneNo: '14', wardNo:'185',description: 'Underscore in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWSSB ',zoneNo: '14', wardNo:'185',description: 'Trailing space in waterProvider' },
        // { customerNo: '03038',waterProvider: ' CMWSSB',zoneNo: '14', wardNo:'185',description: 'Leading space in waterProvider' },
        // { customerNo: '03038',waterProvider: 'CMWS5B',zoneNo: '14', wardNo:'185',description: 'Numeric character in waterProvider' },
        // { customerNo: '03038',waterProvider: ['CMWSSB'],zoneNo: '14', wardNo:'185',description: 'pass the array value in waterProvider' },
        // { customerNo: '03038',waterProvider: '',zoneNo: '14', wardNo:'185',description: 'Empty string for waterProvider' },
        // { customerNo: '03038',waterProvider: undefined,zoneNo: '14', wardNo:'185',description: 'Undefined waterProvider' },
        // { customerNo: '03038',waterProvider: true,zoneNo: '14', wardNo:'185',description: 'Boolean true as waterProvider' },
        // { customerNo: '03038',waterProvider: false,zoneNo: '14', wardNo:'185',description: 'Boolean false as waterProvider' },
        // { customerNo: '03038',waterProvider: Boolean,zoneNo: '14', wardNo:'185',description: 'Boolean data type as waterProvider' },
        // { customerNo: '03038',waterProvider: null,zoneNo: '14', wardNo:'185',description: 'Null waterProvider' }, //Issue

        // //Invalid Zone no.
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '144', wardNo:'185',description: 'double underscore in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14@', wardNo:'185',description: 'Special character in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '1 4', wardNo:'185',description: 'Embedded space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14 ', wardNo:'185',description: 'Without space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: ' 14', wardNo:'185',description: 'Leading space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '014 ', wardNo:'185',description: 'Trailing space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14*', wardNo:'185',description: 'question mark in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '1', wardNo:'185',description: 'short zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '+14', wardNo:'185',description: 'Too short zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '12345', wardNo:'185',description: 'Numbers in zoneNo' },
         { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '----------', wardNo:'185',description: 'Only hyphen in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: ['14'], wardNo:'185',description: 'pass the array value in ZoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: ' ', wardNo:'185',description: 'Blank zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: undefined, wardNo:'185',description: 'Undefined zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: true, wardNo:'185',description: 'Boolean true zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: false, wardNo:'185',description: 'Boolean false zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: Boolean, wardNo:'185',description: 'Boolean zoneNo' },
         { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: null, wardNo:'185',description: 'Null zoneNo' },
       

        // //Invalid ward no.
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'1855',description: 'double underscore in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185@',description: 'Special character in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'1 85',description: 'Embedded space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185 ',description: 'Without space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:' 185',description: 'Leading space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185 ',description: 'Trailing space in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185?',description: 'question mark in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'18',description: 'short zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'1',description: 'Too short zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'185A',description: 'Numbers in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'18_5',description: 'Only hyphen in zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:['185'],description: 'pass the array value in wardNO.' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:'',description: 'Blank zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:undefined,description: 'Undefined zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:true,description: 'Boolean true zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:false,description: 'Boolean false zoneNo' },
        // { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:Boolean,description: 'Boolean zoneNo' },
         { customerNo: '03038',waterProvider: 'CMWSSB',zoneNo: '14', wardNo:null,description: 'Null zoneNo' },
       

       
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'CHENNAI METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD');
    filteredTestCases.forEach((testCase) => {
        invalidWaterUtilityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} customerNo No. : ${invalidCase.customerNo}, waterProvider : ${invalidCase.waterProvider}, zoneNo : ${invalidCase.zoneNo}, wardNo : ${invalidCase.wardNo}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, customerNo: invalidCase.customerNo, waterProvider: invalidCase.waterProvider, zoneNo:invalidCase.zoneNo, wardNo:invalidCase.wardNo}; 

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