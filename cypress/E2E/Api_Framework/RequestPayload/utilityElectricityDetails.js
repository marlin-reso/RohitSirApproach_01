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
      
       
        {consumerNo:'1122300017788',electricityProvider:'APCPDCL', description: 'CENTRAL POWER DISTRIBUTION COMPANY OF ANDHRA PRADESH LTD'},
        {consumerNo:'60006851665',electricityProvider:'GED', description: 'GOA ELECTRICITY DEPARTMENT'},
        {consumerNo:'54000074211',electricityProvider:'DPN', description: 'DEPARTMENT OF POWER, NAGALAND'}, 
        {consumerNo:'900000931524',electricityProvider:'TATA_MUMBAI', description: 'TATA-POWER - MUMBAI'},
        {consumerNo:'10162289',electricityProvider:'TGNPDCL', description: 'NORTHERN POWER DISTRIBUTION COMPANY OF ANDHRA PRADESH LTD'},
        //THRISSUR CORPORATION ELECTRICITY DEPARTMENT - need payload
        //  {consumerNo:'',electricityProvider:'', description: 'THRISSUR CORPORATION ELECTRICITY DEPARTMENT'},
        {consumerNo:'1000754345',electricityProvider:'MPDCL', description: 'MEGHALAYA POWER DIST CORP LTD'},
        {consumerNo:'210727012378',electricityProvider:'KEDL', description: 'KOTA ELECTRICITY DISTRIBUTION LTD.'},
        {consumerNo:'0107040013753',electricityProvider:'jkpdd', description: 'JAMMU AND KASHMIR POWER DEVELOPMENT DEPARTMENT'},
        {consumerNo:'1014713',electricityProvider:'NDMC', description: 'NEW DELHI MUNICIPAL COUNCIL'},
        {consumerNo:'0010026014',electricityProvider:'JUSCO', description: 'JAMSHEDPUR UTILITY AND SERVICES COMPANY'},
        {consumerNo:'101008668',electricityProvider:'BSEBRPL/BSESYPL', description: 'BSES YAMUNA POWER LTD'},
        {consumerNo:'1615025000',electricityProvider:'MPEZ', description: 'MADHYA PRADESH PASCHIM KSHETRA VIDYUT VITRAN CO LTD'},
        {consumerNo:'3773494000',electricityProvider:'MPCZ', description: 'MPMADHYA KSHETRA VIDYUT VITRAN CO'},
        {consumerNo:'210122002035',electricityProvider:'JVVNL', description: 'JAIPUR VIDYUT VITRAN NIGAM LTD'},
        {consumerNo:'100130101625',electricityProvider:'TSECL', description: 'TRIPURA STATE ELECTRICITY CORPORATION LTD'},
     // {consumerNo:'228000002798',electricityProvider:'APDCL', description: 'ASSAM POWER DISTRIBUTION COMPANY LIMITED'},
        {consumerNo:'76208127696',electricityProvider:'DGVCL', description: 'DAKSHIN GUJARAT VIJ COMPANY LTD'},
        {consumerNo:'15628076120',electricityProvider:'MGVCL', description: 'MADHYA GUJARAT VIJ COMPANY LTD'},
        {consumerNo:'25401028709',electricityProvider:'PGVCL', description: 'PASCHIM GUJARAT VIJ COMPANY LTD'},
        {consumerNo:'27213017063',electricityProvider:'UGVCL', description: 'UTTAR GUJARAT VIJ COMPANY LTD'},
        {consumerNo:'2110103',electricityProvider:'MESCOM', description: 'MANGALORE ELECTRICITY SUPPLY COMPANY LTD'},
        {consumerNo:'213520007923',electricityProvider:'MAHAVITRAN', description: 'MAHARASHTRA STATE ELECTRICITY DISTRIBUTION CO LTD(ht)'},
        {consumerNo:'170003463225',electricityProvider:'MAHAVITRAN', description: 'MAHARASHTRA STATE ELECTRICITY DISTRIBUTION CO LTD(LT)'},
        {consumerNo:'80028899542',electricityProvider:'ORISSA_CENTRAL', description: 'CENTRAL ELECTRICITY SUPPLY COMPANY OF ORISSA LTD'},
        {consumerNo:'105129146',electricityProvider:'WBSEDCL', description: 'WEST BENGAL STATE ELECTRICITY DISTRIBUTION COMPANY LTD'},
        {consumerNo:'101079540',electricityProvider:'TSSPDCL', description: 'THE SOUTHERN POWER DISTRIBUTION COMPANY OF TELANGANA LIMITED'},
        {consumerNo:'3004963381',electricityProvider:'CH_ELEC', description: 'CHANDIGARH STATE POWER DISTRIBUTION COMPANY LTD'},
       
    //HIMACHAL PRADESH STATE ELECTRICITY BOARD
       // {consumerNo:'100001336128',electricityProvider:'HPSTEB', description: 'HIMACHAL PRADESH STATE ELECTRICITY BOARD'},
    //GULBARGA ELECTRICITY SUPPLY COMPANY LTD
      //  {consumerNo:'0455878082',electricityProvider:'GESCOM', description: 'GULBARGA ELECTRICITY SUPPLY COMPANY LTD'},
    //HUBLI ELECTRICITY SUPPLY COMPANY LTD
      //  {consumerNo:'6017663000',electricityProvider:'HESCOM', description: 'HUBLI ELECTRICITY SUPPLY COMPANY LTD'}, 
    //ELECTRICITY DEPARTMENT, MANIPUR
      //  {consumerNo:'6017663000',electricityProvider:'35153172', description: 'ELECTRICITY DEPARTMENT, MANIPUR'},
     
    ];


    const errorCodeToMessage = {
        'SRC001': 'Successfully Completed.'
       
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Utility electric details');
    filteredTestCases.forEach((testCase) => {
        validElectricityDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}  consumerNo. : ${invalidCase.consumerNo}, electricityProvider : ${invalidCase.electricityProvider}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, consumerNo: invalidCase.consumerNo, electricityProvider: invalidCase.electricityProvider}; 

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