/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Fetch car dealer details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidCarDealerDetails = [
        {city: 'New York', brandName:'Honda' , description: 'Invalid city. Only Indian cities are allowed.' },
        {city: '', brandName:'Honda' ,description: 'City cannot be empty.' },
        {city: 'Gotham', brandName:'Honda' ,description: 'Invalid city' },
        {city: 1234, brandName:'Hyundai',description: 'City must be a string.'},
      //  {city: 'Varanasi',brandName:'Tata',description: 'New Name of city' },
        {city: 'Banaras', brandName:'Tata' ,description: 'Old name of city' },
        {city: 'Delhi💖', brandName:'Tata' ,description: 'City name should not contain emojis.' },
    //   {city: 'Prayagraj', brandName:'Skoda' ,description: 'New name of city' },
        {city: 'Allahabad', brandName:'Skoda' ,description: 'Old name of city' },
        {city: ['Prayagraj'], brandName:'Skoda' ,description: 'Sending the request as Array' },
        {city: {city :'Prayagraj'}, brandName:'Skoda' ,description: 'Sending the request as key-value pair' },
        {city: 'Ag', brandName:'Skoda' ,description: 'Short city name' },
      //  {city: 'Jammu', brandName:'Tata' ,description: 'Half city name' },
        {city: 'Kashmir', brandName:'Tata' ,description: 'Another half city name' },
        {city: 'Jammu & Kashmir',brandName:'Tata' ,description: 'Jammu & Kashmir as city name' },
        {city: 'Mumbai123',brandName:'Kia' ,description: 'City must be a contains only char.' },
        {city: 'AAgra',brandName:'Kia' ,description: 'Repeat charector in city name' },
        {city: 'Amr_avati',brandName:'Tata' ,description: 'underscore in city name' },
        {city: ' Surat',brandName:'Kia',description: 'Forword space in city name' },
        {city: 'Surat ',brandName:'Kia',description: 'Trailing space in city name' },
        {city: 'A'.repeat(101),brandName:'Kia' ,description: 'Repeat char in city name' },
        {city: 'Su rat',brandName:'Kia' ,description: 'White space in city name' },
        {city: 'AllahabadAllahabad',brandName:'Kia' ,description: 'Repeated city name' },
        {city: 'Del#hi@',brandName:'Toyota' ,description: 'City name cannot be with special char' },
        {city: ' Surat ',brandName:'Kia' ,description: 'White space city' },
        {city: null,brandName:'Toyota' ,description: 'Null city address' },
        {city: Boolean,brandName:'Toyota' ,description: 'Passing the boolean' },
        {city: true,brandName:'Toyota' ,description: 'Passing the boolean true' },
        {city: false,brandName:'Toyota' ,description: 'Passing the boolean false' },
        {city: undefined,brandName:'Toyota' ,description: 'Passing the boolean false' },

        {city: 'New Delhi',brandName:'',description: 'Blank brandName' },
        {city: '',brandName:'',description: 'Both city and brandName are blank' },
        {city: 'New Delhi',brandName:1234,description: 'Number as a brandName' },
        {city: 'New Delhi',brandName:'T@ta',description: 'special charector as a brandName' },
        {city: 'New Delhi',brandName:'VolvoVolvo',description: 'ONly special charector as a brandName' },
        {city: 'New Delhi',brandName:['Toyota'],description: 'Number along with username' },
        {city: 'New Delhi',brandName:'Yamaha',description: 'Invalid brand name. Must be a car brand.' },
        {city: 'New Delhi',brandName:'Volvo.',description: 'Dot in brandName' },
        {city: 'New Delhi',brandName:'V',description: 'Single charector as a brandName' },
        {city: 'New Delhi',brandName:'Nike',description: 'Invalid brand name. Must be a bike or car brand.' },
        {city: 'New Delhi',brandName:'VolvoTata',description: 'Multiple Brand name' },
        {city: 'New Delhi',brandName:'#@!$%',description: 'Invalid brand name format.' },
        {city: 'New Delhi',brandName:'',description: 'special charector with username as a brandName' },
        {city: 'New Delhi',brandName:'',description: 'ONly special charector as a brandName' },
        {city: 'New Delhi',brandName:'',description: 'Number along with username' },
        {city: 'New Delhi',brandName:'Vo_lvo',description: 'Underscore in brandName' },
        {city: 'New Delhi',brandName:'Tata🚗',description: 'Brand name should not contain emojis.' },
        {city: 'Allahabad',brandName:'Aston Martin',description: 'Brand not available' },
        {city: 'New Delhi',brandName: null,description: 'null as a brandName' },
        {city: 'New Delhi',brandName:true,description: 'Boolean true as a brandName' },
        {city: 'New Delhi',brandName: false,description: 'Boolean false as a brandName' },
        {city: 'New Delhi',brandName:Boolean,description: ' Boolean as a brandName' },
        {city: 'New Delhi',brandName:undefined,description: 'Undefined as a brandName' },
        
          
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENR029': 'No Record Found.',
        'EPI022': 'Payload is Incorrect.',
        'ENI004': 'No Information Found.' 
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Fetch car dealer details');
    filteredTestCases.forEach((testCase) => {
        invalidCarDealerDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, city : ${invalidCase.city}, brandName : ${invalidCase.brandName}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, city: invalidCase.city, brandName: invalidCase.brandName}; 

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