/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Pan Aadhaar link API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidPanAadhar = [
    // Invalid aadhaarNumber and Valid pan
    { aadhaarNumber: '123456789012', pan: 'BRFPN9124H', description: 'Invalid aadhaarNumber and Valid pan' },
    { aadhaarNumber: '000000000000', pan: 'BRFPN9124H', description: 'Invalid aadhaarNumber and Valid pan' },
    { aadhaarNumber: '111111111111', pan: 'BRFPN9124H', description: 'Invalid aadhaarNumber and Valid pan' },
    { aadhaarNumber: '1234', pan: 'BRFPN9124H', description: 'Short aadhaarNumber and Valid pan' },
    { aadhaarNumber: '1234567890123456', pan: 'BRFPN9124H', description: 'Long aadhaarNumber and Valid pan' },
    { aadhaarNumber: '1234abcd5678', pan: 'BRFPN9124H', description: 'Alphanumeric aadhaarNumber and Valid pan' },
    { aadhaarNumber: '', pan: 'BRFPN9124H', description: 'Empty aadhaarNumber and Valid pan' },
    { aadhaarNumber: null, pan: 'BRFPN9124H', description: 'Null aadhaarNumber and Valid pan' },
    { aadhaarNumber: undefined, pan: 'BRFPN9124H', description: 'Undefined aadhaarNumber and Valid pan' },
    { aadhaarNumber: true, pan: 'BRFPN9124H', description: 'Boolean aadhaarNumber (true) and Valid pan' },
    { aadhaarNumber: false, pan: 'BRFPN9124H', description: 'Boolean aadhaarNumber (false) and Valid pan' },
    { aadhaarNumber: Boolean, pan: 'BRFPN9124H', description: 'Boolean aadhaarNumber and Valid pan' },
    { aadhaarNumber: '!@#$%^&*()', pan: 'BRFPN9124H', description: 'Invalid Aadhaar (Special Characters) and Valid PAN' },
    { aadhaarNumber: '      ', pan: 'BRFPN9124H', description: 'Invalid Aadhaar (Empty spaces) and Valid PAN' },
    { aadhaarNumber: ' 123456789012', pan: 'BRFPN9124H', description: 'Invalid Aadhaar (Leading space) and Valid PAN' },
    { aadhaarNumber: '123456789012 ', pan: 'BRFPN9124H', description: 'Invalid Aadhaar (Trailing space) and Valid PAN' },

    // Valid aadhaarNumber and Invalid pan
    { aadhaarNumber: '695277717061', pan: 'INVALIDPAN1', description: 'Valid aadhaarNumber and Invalid pan' },
    { aadhaarNumber: '695277717061', pan: '1234INVALID', description: 'Valid aadhaarNumber and Invalid pan' },
    { aadhaarNumber: '695277717061', pan: 'ABCDE12345', description: 'Valid aadhaarNumber and Invalid pan' },
    { aadhaarNumber: '695277717061', pan: '', description: 'Valid aadhaarNumber and Empty pan' },
    { aadhaarNumber: '695277717061', pan: null, description: 'Valid aadhaarNumber and Null pan' },
    { aadhaarNumber: '695277717061', pan: undefined, description: 'Valid aadhaarNumber and Undefined pan' },
    { aadhaarNumber: '695277717061', pan: 123456, description: 'Valid aadhaarNumber and Numeric pan' },
    { aadhaarNumber: '695277717061', pan: 'BRFPN9124HBRFPN9124H', description: 'Valid aadhaarNumber and Long pan' },
    { aadhaarNumber: '695277717061', pan: true, description: 'Valid aadhaarNumber and Boolean pan (true)' },
    { aadhaarNumber: '695277717061', pan: false, description: 'Valid aadhaarNumber and Boolean pan (false)' },
    { aadhaarNumber: '123456789012', pan: '!@#$%^&*()', description: 'Valid Aadhaar and Invalid PAN (Special Characters)' },
    { aadhaarNumber: '123456789012', pan: '      ', description: 'Valid Aadhaar and Invalid PAN (Empty spaces)' },
    { aadhaarNumber: '123456789012', pan: ' BRFPN9124H', description: 'Valid Aadhaar and Invalid PAN (Leading space)' },
    { aadhaarNumber: '123456789012', pan: 'BRFPN9124H ', description: 'Valid Aadhaar and Invalid PAN (Trailing space)' },


    // Invalid both aadhaarNumber and Pan
    { aadhaarNumber: '123456789012', pan: 'INVALIDPAN1', description: 'Invalid both aadhaarNumber and Pan' },
    { aadhaarNumber: '000000000000', pan: '1234INVALID', description: 'Invalid both aadhaarNumber and Pan' },
    { aadhaarNumber: '111111111111', pan: 'ABCDE12345', description: 'Invalid both aadhaarNumber and Pan' },
    { aadhaarNumber: '1234', pan: '', description: 'Short aadhaarNumber and Empty pan' },
    { aadhaarNumber: '1234567890123456', pan: null, description: 'Long aadhaarNumber and Null pan' },
    { aadhaarNumber: '1234abcd5678', pan: undefined, description: 'Alphanumeric aadhaarNumber and Undefined pan' },
    { aadhaarNumber: '', pan: '123456', description: 'Empty aadhaarNumber and Numeric pan' },
    { aadhaarNumber: null, pan: 'BRFPN9124HBRFPN9124H', description: 'Null aadhaarNumber and Long pan' },
    { aadhaarNumber: undefined, pan: true, description: 'Undefined aadhaarNumber and Boolean pan (true)' },
    { aadhaarNumber: true, pan: false, description: 'Boolean aadhaarNumber (true) and Boolean pan (false)' },
    { aadhaarNumber: false, pan: 'ABCDE12345', description: 'Boolean aadhaarNumber (false) and Alphanumeric pan' },
    { aadhaarNumber: '!@#$%^&*()', pan: 'ABCDE12345', description: 'Invalid Aadhaar (Special Characters) and Invalid PAN (Only letters)' },
    { aadhaarNumber: '      ', pan: '      ', description: 'Invalid Aadhaar (Empty spaces) and Invalid PAN (Empty spaces)' },
    { aadhaarNumber: ' 123456789012', pan: ' BRFPN9124H', description: 'Invalid Aadhaar (Leading space) and Invalid PAN (Leading space)' },
    { aadhaarNumber: '123456789012 ', pan: 'BRFPN9124H ', description: 'Invalid Aadhaar (Trailing space) and Invalid PAN (Trailing space)' },

    //Messages
    { aadhaarNumber: '254974767769', pan: 'CRBPP0521P', description: 'Aadhaar does not exist' },
    { aadhaarNumber: '950965042155', pan: 'ALDPP8653N', description: 'Aadhaar PAN linking failed due to DOB mismatch. Please Update your DOB' },
    { aadhaarNumber: '540601244017', pan: 'BYCPB4782K', description: 'Aadhaar PAN linking failed due to name mismatch. Please Update your name' },
    { aadhaarNumber: '', pan: 'BDDPJ5343N', description: 'Blank Input Field' },
    { aadhaarNumber: ' 111122223333 ', pan: 'BDDPJ5343N', description: 'Incorrect Input' },
    { aadhaarNumber: '', pan: 'BDDPJ5343N', description: 'Number of requests exceeds the allowed limit for a loan application' },
    { aadhaarNumber: '649912663037', pan: 'AZGPD0746B', description: 'PAN Aadhaar linking has failed due to Gender mismatch. Please update your Gender' },
    { aadhaarNumber: '348497945067', pan: 'BDDPj0043N', description: 'PAN does not exist' },
    { aadhaarNumber: '111122223333', pan: 'BDDPJ5343N', description: 'PAN is linked to some other Aadhaar' },
    { aadhaarNumber: '217595840084', pan: 'EIVPK8882D', description: 'PAN is not linked with Aadhaar Number' },
    { aadhaarNumber: '111122223333', pan: 'BDDPJ5343N', description: 'Payload is Incorrect' },
    { aadhaarNumber: '781939921334', pan: 'ABFFM5077P', description: 'Please enter valid PAN. Aadhaar-PAN linking can be done only for Individual taxpayers' },
    { aadhaarNumber: '340950344475', pan: 'DLHPR0270J', description: 'The entered PAN is currently inactive' },
];


    const errorCodeToMessage = {
        'EAE168': 'Aadhaar does not exist.',
        'EAP1227': 'Aadhaar PAN linking failed due to DOB mismatch. Please Update your DOB.',
        'EMN1228': 'Aadhaar PAN linking failed due to name mismatch. Please Update your name.',
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'EPA1253': 'PAN Aadhaar linking has failed due to Gender mismatch. Please update your Gender.',
        'EPE167': 'PAN does not exist',
        'ELO175': 'PAN is linked to some other Aadhaar',
        'EPA1044': 'PAN is not linked with Aadhaar Number.',
        'EPI022': 'Payload is Incorrect.',
        'EIP856': 'Please enter valid PAN. Aadhaar-PAN linking can be done only for Individual taxpayers.',
        'EPA1352': 'The entered PAN is currently inactive.',
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Pan Aadhaar link');
    filteredTestCases.forEach((testCase) => {
        invalidPanAadhar.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} Aadhar number : ${invalidCase.aadhaarNumber} and Pan : ${invalidCase.pan}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData, aadhaarNumber: invalidCase.aadhaarNumber,  pan: invalidCase.pan}; 

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