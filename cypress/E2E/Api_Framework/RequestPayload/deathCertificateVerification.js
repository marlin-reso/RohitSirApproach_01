/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Death certification verification API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });
    /*
    "applicationId": "",
    "certificateNumber": "MCDOLIR-0221-0811152168",
    "providerName": "MCD"
    */


    const validDeathCertificate = [
      
        {certificateNumber:'MCDOLIR-0221-0811152168',providerName:'MCD', description: 'MUNICIPAL CORPORATION OF DELHI'},      
        {certificateNumber:'WB_DR/2021/20010/1/001449',providerName:'BMC',description: 'BIDHANNAGAR MUNICIPAL CORPORATION'},
        {certificateNumber:'21UD362-0001-003244-2023',providerName:'BBSMC',description: 'BHUBANESWAR MUNICIPAL CORPORATION'},
        {certificateNumber:'21UD373-0006-002499-2022',providerName:'ROUMC', description: 'ROURKELA MUNICIPAL CORPORATION'}, 
        {certificateNumber:'21UD371-0007-006632-2024',providerName:'SBPMC', description: 'SAMBALPUR MUNICIPAL CORPORATION'},
        {certificateNumber:'D/1540/2020',providerName:'DMA',description: 'DIRECTORATE OF MUNICIPAL ADMINISTRATION (GOA)'},
        {certificateNumber:'08110014000062600942/2023',providerName:'GRDES', description: 'GOVERNMENT OF RAJASTHAN DIRECTORATE OF ECONOMICS AND STATISTICS'},
        {certificateNumber:'803162/B/D/2019/024537',providerName:'GKAR', description: 'GOVERNMENT OF KARNATAKA'},
        {certificateNumber:'5548476',providerName:'UPPCL',description: 'GOVERNMENT OF PUNJAB HEALTH AND FAMILY WELFARE DEPARTMENT'},
        {certificateNumber:'D/2022/144115',providerName:'DMC', description: 'DURGAPUR MUNICIPAL CORPORATION'},
       
        
    ];


    const errorCodeToMessage = {
        'SRC001': 'Successfully Completed.'
       
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Death certification verification');
    filteredTestCases.forEach((testCase) => {
        validDeathCertificate.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}  certificateNumber. : ${invalidCase.certificateNumber}, providerName : ${invalidCase.providerName}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, certificateNumber: invalidCase.certificateNumber, providerName: invalidCase.providerName}; 

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