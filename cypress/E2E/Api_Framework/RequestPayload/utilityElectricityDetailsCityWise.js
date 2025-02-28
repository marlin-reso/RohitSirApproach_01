/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Utility - ELECTRIC DETAILS API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const validElectricityDetails = [
      
        {consumerNo:'1846721000',electricityProvider:'UPPCL',city: 'Varanasi', description: 'UTTAR PRADESH POWER CORPORATION LTD'},      
        //THRISSUR CORPORATION ELECTRICITY DEPARTMENT - need payload
        //{consumerNo:'',electricityProvider:'', description: 'THRISSUR CORPORATION ELECTRICITY DEPARTMENT'},
        {consumerNo:'670007460',electricityProvider:'UPPCL',city: 'Agra', description: 'TORRENT POWER LTD >> UTTAR PRADESH'},
        {consumerNo:'501044171',electricityProvider:'TPL', city:'Surat',description: 'TORRENT POWER LTD >> GUJARAT'},
        {consumerNo:'685870867',electricityProvider:'TPL',city: 'Bhiwandi', description: 'TORRENT POWER LTD >> MAHARASHTRA'}, 
        {consumerNo:'3893182392',electricityProvider:'UPPCL',city: 'agra', description: 'UTTAR PRADESH POWER CORPORATION LTD'},
        {consumerNo:'KBD21575',electricityProvider:'JBVNL',city: 'Hirapur', description: 'JHARKHAND BIJLI VITRAN NIGAM LIMITED'},
        {consumerNo:'OSB2839',electricityProvider:'JBVNL',city: 'Mango', description: 'JHARKHAND BIJLI VITRAN NIGAM LIMITED'},
        {consumerNo:'3893182392',electricityProvider:'UPPCL',city: 'varanasi', description: 'DAKSHINANCHAL VIDYUT VITRAN NIGAM LTD'},
        {consumerNo:'1846721000',electricityProvider:'UPPCL',city: 'varanasi', description: 'KANPUR ELECTRIC SUPPLY CO LTD'},
        {consumerNo:'7434423000',electricityProvider:'UPPCL',city: 'varanasi', description: 'KANPUR ELECTRIC SUPPLY CO LTD'},
        {consumerNo:'7434423000',electricityProvider:'UPPCL',city: 'varanasi', description: 'PASCHIMANCHAL VIDYUT VITRAN NIGAM LTD'},
        
    ];


    const errorCodeToMessage = {
        'SRC001': 'Successfully Completed.'
       
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Utility electric details citywise');
    filteredTestCases.forEach((testCase) => {
        validElectricityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}  consumerNo. : ${invalidCase.consumerNo}, electricityProvider : ${invalidCase.electricityProvider}, city : ${invalidCase.city}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, consumerNo: invalidCase.consumerNo, electricityProvider: invalidCase.electricityProvider, city: invalidCase.city}; 

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