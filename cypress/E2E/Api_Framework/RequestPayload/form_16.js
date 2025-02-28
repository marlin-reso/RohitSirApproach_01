
/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Form 16 API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidForm_16 = [
        //pan number
        { panNumber:'DXPPS2552JAA',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' invalid pan ' },
        { panNumber:'DXPPS25',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' short pan ' },
        { panNumber:'ABCDE1234F',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: 'alphabet pan'},
        { panNumber:'@DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' special charecter pan ' },
        { PanNumber:null,tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' null pan ' },
        { PanNumber:'null',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' null string pan ' },
        { PanNumber:'',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' blank pan ' },
        { PanNumber:true,tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' boolean true pan ' },
        { PanNumber:false,tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' boolean false pan ' },
        { PanNumber:undefined,tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' undefine pan ' },
        { PanNumber:' DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' leading space pan ' },
        { PanNumber:'DXPPS2552J ',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' triling space pan ' },
        { PanNumber:'DXPP S2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' space between pan ' },
      //  { PanNumber:'\u0044\u0058\u0050\u0050\u0053\u0032\u0035\u0035\u0032\u004A',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' unicode pan ' },
        { PanNumber:'ĎẌṔṔŚ2552Ĵ',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' diacritical pan ' },
        //tan number 

        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629DD',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' invalid tanNumber ' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR1062',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' short tanNumber ' },
        { panNumber:'DXPPS2552J',tanNumber: 'ABCD12345F',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: 'alphabet tanNumber'},
        { panNumber:'DXPPS2552J',tanNumber: '@UMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' special charecter tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: null,certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' null tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'null',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' null string tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: ' ',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' blank tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: true,certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' boolean true tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: false,certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' boolean false tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: undefined,certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' undefine tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: ' MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' leading space tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D ',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' triling space tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR 10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' space between tanNumber ' },
    //    { PanNumber:'DXPPS2552J',tanNumber: '\u004D\u0055\u004D\u0052\u0031\u0030\u0036\u0032\u0039\u0044',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' unicode tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'ṀŪṀŔ10629Ḋ',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' diacritical tanNumber ' },
        //certificateNumber

        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGAAA',financialYear: '2020-21',amount:'22633', description: ' invalid tanNumber ' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVE',financialYear: '2020-21',amount:'22633', description: ' short tanNumber ' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SABCDEF',financialYear: '2020-21',amount:'22633', description: 'alphabet tanNumber'},
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'S@WVEGA',financialYear: '2020-21',amount:'22633', description: ' special charecter tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: null,financialYear: '2020-21',amount:'22633', description: ' null tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'null',financialYear: '2020-21',amount:'22633', description: ' null string tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: ' ',financialYear: '2020-21',amount:'22633', description: ' blank tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: true,financialYear: '2020-21',amount:'22633', description: ' boolean true tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: false,financialYear: '2020-21',amount:'22633', description: ' boolean false tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: undefined,financialYear: '2020-21',amount:'22633', description: ' undefine tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: ' SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' leading space tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA ',financialYear: '2020-21',amount:'22633', description: ' triling space tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUW VEGA',financialYear: '2020-21',amount:'22633', description: ' space between tanNumber ' },
    //    { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: '\u0053\u0055\u0057\u0056\u0045\u0047\u0041',financialYear: '2020-21',amount:'22633', description: ' unicode tanNumber ' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'ŚŪŴṼÉĞĀ',financialYear: '2020-21',amount:'22633', description: ' diacritical tanNumber ' },
        //financialYear

        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '20-21',amount:'22633', description: ' financial year format is too short. ' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '1999-00',amount:'22633', description: 'financial year is in the past and is not allowed.' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2025-26',amount:'22633', description: 'financial year is in the future '},
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020/21',amount:'22633', description: 'separator used is not a hyphen' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-',amount:'22633', description: 'second part of the financial year is missing.' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21abc',amount:'22633', description: ' financial year contains additional invalid characters.' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-2A',amount:'22633', description: ' The second part of the financial year contains non-numeric characters.' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: ' 2020-21 ',amount:'22633', description: 'The financial year has leading and trailing whitespace.' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-2021',amount:'22633', description: 'The financial year spans more than two digits for the second part.' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: ' ',amount:'22633', description: 'The financial year is an empty string.' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2021-20',amount:'22633', description: ' backword date' },
        { PanNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22633', description: ' triling space tanNumber ' },
        //amount test case

        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:' ', description: 'Blank amount' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'-22345 ', description: 'amount in negative' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:'22 633', description: ' space between amount ' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:null, description: 'null amount'},
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:true, description: 'boolean true amount' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:false, description: 'boolean false amount' },
        { panNumber:'DXPPS2552J',tanNumber: 'MUMR10629D',certificateNumber: 'SUWVEGA',financialYear: '2020-21',amount:undefined, description: 'boolean undefined amount' },
       
       

     
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Form-16-verification');
    filteredTestCases.forEach((testCase) => {
        invalidForm_16.forEach((invalidCase) => {                                                     
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} panNumber: ${invalidCase.panNumber},tanNumber: ${invalidCase.tanNumber},certificateNumber: ${invalidCase.certificateNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, panNumber: invalidCase.panNumber,tanNumber: invalidCase.tanNumber,certificateNumber: invalidCase.certificateNumber,financialYear: invalidCase.financialYear, amount:invalidCase.amount }; 

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