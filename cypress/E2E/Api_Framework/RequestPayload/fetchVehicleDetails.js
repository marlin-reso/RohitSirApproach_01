/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Fetch Vehicle details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidVehicleDetails = [
        //  1. vehicleManufacturerName Test Cases
        { vehicleManufacturerName: '', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Empty vehicleManufacturerName' },
        { vehicleManufacturerName: 12345, vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Numeric vehicleManufacturerName' },
        { vehicleManufacturerName: '!@#$%', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Special characters vehicleManufacturerName' },
        { vehicleManufacturerName: 'Mer123', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Alphanumeric vehicleManufacturerName' },
        { vehicleManufacturerName: '   ', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Whitespace vehicleManufacturerName' },
        { vehicleManufacturerName: null, vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Null vehicleManufacturerName' },
        { vehicleManufacturerName: undefined, vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Undefined vehicleManufacturerName' },
        { vehicleManufacturerName: true, vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Boolean true vehicleManufacturerName' },
        { vehicleManufacturerName: false, vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Boolean false vehicleManufacturerName' },
        { vehicleManufacturerName: 'Mercedes-Benz Mercedes-Benz Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Very long vehicleManufacturerName' },
    
        
        //2. vehicleModel Test Cases
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: '', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Empty vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 12345, vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Numeric vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: '!@#$%', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Special characters vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S123', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Alphanumeric vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: '   ', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Whitespace vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: null, vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Null vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: undefined, vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Undefined vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: true, vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Boolean true vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: false, vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Boolean false vehicleModel' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class S-Class S-Class S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Very long vehicleModel' },


        //3. vehicleVariant Test Cases
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: '', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Empty vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 12345, registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Numeric vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: '!@#$%', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Special characters vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S450123', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Alphanumeric vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: '   ', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Whitespace vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: null, registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Null vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: undefined, registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Undefined vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: true, registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Boolean true vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: false, registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Boolean false vehicleVariant' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S450 4Matic S450 4Matic S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi', description: 'Very long vehicleVariant' },


        //4. registrationCity Test Cases
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: '', registrationState: 'Delhi', description: 'Empty registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 12345, registrationState: 'Delhi', description: 'Numeric registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: '!@#$%', registrationState: 'Delhi', description: 'Special characters registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New123', registrationState: 'Delhi', description: 'Alphanumeric registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: '   ', registrationState: 'Delhi', description: 'Whitespace registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: null, registrationState: 'Delhi', description: 'Null registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: undefined, registrationState: 'Delhi', description: 'Undefined registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: true, registrationState: 'Delhi', description: 'Boolean true registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: false, registrationState: 'Delhi', description: 'Boolean false registrationCity' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi New Delhi New Delhi', registrationState: 'Delhi', description: 'Very long registrationCity' },
    

        //5. registrationState Test Cases
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: '', description: 'Empty registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 12345, description: 'Numeric registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: '!@#$%', description: 'Special characters registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Del123', description: 'Alphanumeric registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: '   ', description: 'Whitespace registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: null, description: 'Null registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: undefined, description: 'Undefined registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: true, description: 'Boolean true registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: false, description: 'Boolean false registrationState' },
        { vehicleManufacturerName: 'Mercedes-Benz', vehicleModel: 'S-Class', vehicleVariant: 'S-Class S450 4Matic', registrationCity: 'New Delhi', registrationState: 'Delhi Delhi Delhi', description: 'Very long registrationState' }
    
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Fetch Vehicle details');
    filteredTestCases.forEach((testCase) => {
        invalidVehicleDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Vehicle Manufacturer Name : ${invalidCase.vehicleManufacturerName}, Vehicle Model : ${invalidCase.vehicleModel}, Vehicle Variant : ${invalidCase.vehicleVariant}, Registration City : ${invalidCase.registrationCity} and Registration State : ${invalidCase.registrationState}`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, vehicleManufacturerName: invalidCase.vehicleManufacturerName, vehicleModel: invalidCase.vehicleModel, vehicleVariant: invalidCase.vehicleVariant, registrationCity: invalidCase.registrationCity, registrationState: invalidCase.registrationState }; 

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