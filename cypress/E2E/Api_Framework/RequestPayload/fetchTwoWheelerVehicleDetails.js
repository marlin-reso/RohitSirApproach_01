/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test fetch Two Wheeler Vehicle Details API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidVehicleDetails = [
        //  1. vehicleVariant Test Cases
        { vehicleVariant: '', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Empty vehicleVariant' },
        { vehicleVariant: 12345, vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Numeric vehicleVariant' },
        { vehicleVariant: '!@#$%', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Special characters vehicleVariant' },
        { vehicleVariant: 'Mer123', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Alphanumeric vehicleVariant' },
        { vehicleVariant: '   ', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Whitespace vehicleVariant' },
        { vehicleVariant: null, vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Null vehicleVariant' },
        { vehicleVariant: undefined, vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Undefined vehicleVariant' },
        { vehicleVariant: true, vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Boolean true vehicleVariant' },
        { vehicleVariant: false, vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Boolean false vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz Mercedes-Benz Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Very long vehicleVariant' },
    
        
        //2. vehicleManufacturerName Test Cases
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: '', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Empty vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 12345, vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Numeric vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: '!@#$%', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Special characters vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S123', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Alphanumeric vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: '   ', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Whitespace vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: null, vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Null vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: undefined, vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Undefined vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: true, vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Boolean true vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: false, vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Boolean false vehicleManufacturerName' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class S-Class S-Class S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Very long vehicleManufacturerName' },


        //3. vehicleModel Test Cases
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: '', vehicleVariant: 'New Delhi',  description: 'Empty vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 12345, vehicleVariant: 'New Delhi',  description: 'Numeric vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: '!@#$%', vehicleVariant: 'New Delhi',  description: 'Special characters vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S450123', vehicleVariant: 'New Delhi',  description: 'Alphanumeric vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: '   ', vehicleVariant: 'New Delhi',  description: 'Whitespace vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: null, vehicleVariant: 'New Delhi',  description: 'Null vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: undefined, vehicleVariant: 'New Delhi',  description: 'Undefined vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: true, vehicleVariant: 'New Delhi',  description: 'Boolean true vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: false, vehicleVariant: 'New Delhi',  description: 'Boolean false vehicleModel' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S450 4Matic S450 4Matic S450 4Matic', vehicleVariant: 'New Delhi',  description: 'Very long vehicleModel' },


        //4. vehicleVariant Test Cases
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: '',  description: 'Empty vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 12345,  description: 'Numeric vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: '!@#$%',  description: 'Special characters vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New123',  description: 'Alphanumeric vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: '   ',  description: 'Whitespace vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: null,  description: 'Null vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: undefined,  description: 'Undefined vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: true,  description: 'Boolean true vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: false,  description: 'Boolean false vehicleVariant' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi New Delhi New Delhi',  description: 'Very long vehicleVariant' },
    

        //5. registrationState Test Cases
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Empty registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Numeric registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Special characters registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Alphanumeric registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Whitespace registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Null registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Undefined registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Boolean true registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Boolean false registrationState' },
        { vehicleVariant: 'Mercedes-Benz', vehicleManufacturerName: 'S-Class', vehicleModel: 'S-Class S450 4Matic', vehicleVariant: 'New Delhi', description: 'Very long registrationState' }
    
    ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPI022': 'Payload is Incorrect.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'fetch Two Wheeler Vehicle Details');
    filteredTestCases.forEach((testCase) => {
        invalidVehicleDetails.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Vehicle Manufacturer Name : ${invalidCase.vehicleVariant}, Vehicle Model : ${invalidCase.vehicleManufacturerName}, Vehicle Variant : ${invalidCase.vehicleModel}, Registration City : ${invalidCase.vehicleVariant} and Registration State : ${invalidCase.registrationState}`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, vehicleVariant: invalidCase.vehicleVariant, vehicleManufacturerName: invalidCase.vehicleManufacturerName, vehicleModel: invalidCase.vehicleModel, vehicleVariant: invalidCase.vehicleVariant, registrationState: invalidCase.registrationState }; 

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