/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's with specific payload modifications`, () => {
    let apiData;

    const testConfigurations = {
        "Aadhaar Verifier": {
            testCaseKey: "testDataAadhaar",
            keyChanges: [
                { oldKey: "aadhaarNumber", newKey: "aadhaarNumber1", description: 'invalid aadhaarNumber' }
            ]
        },
        "Udyam Registration": {
            testCaseKey: "testDataUdyam",
            keyChanges: [
                { oldKey: "registrationnumber", newKey: "registrationnumber1", description: 'invalid registrationnumber' }
            ]
        },
        "PAN Details Info": {
            testCaseKey: "testDataPan",
            keyChanges: [
                { oldKey: "pan", newKey: "pan1", description: 'invalid pan' }
            ]
        },
        "PAN Data Fetch": {
            testCaseKey: "testDataPanDataFetch",
            keyChanges: [
                { oldKey: "pan", newKey: "pan1", description: 'invalid pan' }
            ]
        },
        "Passport": {
            testCaseKey: "testDataPassport",
            keyChanges: [
                { oldKey: "fileNumber", newKey: "fileNumber1", description: 'invalid fileNumber' },
                { oldKey: "dateOfBirth", newKey: "dateOfBirth1", description: 'invalid dateOfBirth' }
            ]
        },            
        "Voter Card Verification": {
            testCaseKey: "testDataVoterCardVerification",
            keyChanges: [
                { oldKey: "epicNumber", newKey: "epicNumber1", description: 'invalid epicNumber' }
            ]
        },
        "Shop And Establishment Data Fetch of West Bengal": {
            testCaseKey: "testDatashopAndEstablishmentDataFetch",
            keyChanges: [
                { oldKey: "certificateNumber", newKey: "certificateNumber1", description: 'invalid certificateNumber' },
                { oldKey: "state", newKey: "state1", description: 'invalid state' }
            ]
        },
        "Shop And Establishment Data Fetch of Delhi": {
            testCaseKey: "testDatashopAndEstablishmentDataFetchDL",
            keyChanges: [
                { oldKey: "certificateNumber", newKey: "certificateNumber1", description: 'invalid certificateNumber' },
                { oldKey: "state", newKey: "state1", description: 'invalid state' }
            ]
        },
        "Shop And Establishment Data Fetch of Telangana": {
            testCaseKey: "testDatashopAndEstablishmentDataFetchTL",
            keyChanges: [
                { oldKey: "certificateNumber", newKey: "certificateNumber1", description: 'invalid certificateNumber' },
                { oldKey: "state", newKey: "state1", description: 'invalid state' }
            ]
        },
        "Shop And Establishment Data Fetch of Jharkhand": {
            testCaseKey: "testDatashopAndEstablishmentDataFetchJH",
            keyChanges: [
                { oldKey: "certificateNumber", newKey: "certificateNumber1", description: 'invalid certificateNumber' },
                { oldKey: "state", newKey: "state1", description: 'invalid state' }
            ]
        },
        "Shop And Establishment Data Fetch of Rajasthan": {
            testCaseKey: "testDatashopAndEstablishmentDataFetchRJ",
            keyChanges: [
                { oldKey: "certificateNumber", newKey: "certificateNumber1", description: 'invalid certificateNumber' },
                { oldKey: "state", newKey: "state1", description: 'invalid state' }
            ]
        },
        "Shop And Establishment Data Fetch of Karnataka": {
            testCaseKey: "testDatashopAndEstablishmentDataFetchKR",
            keyChanges: [
                { oldKey: "certificateNumber", newKey: "certificateNumber1", description: 'invalid certificateNumber' },
                { oldKey: "establishmentName", newKey: "establishmentName1", description: 'invalid establishmentName' },
                { oldKey: "state", newKey: "state1", description: 'invalid state' }
            ]
        },    
        "Vehicle Registration Data Fetch": {
            testCaseKey: "testDatavehicleRegistrationDataFetch",
            keyChanges: [
                { oldKey: "rc_regn_no", newKey: "rc_regn_no1", description: 'invalid rc_regn_no' }
            ]
        },
        "Bank Account Verification": {
            testCaseKey: "testDatabankAccountVerification",
            keyChanges: [
                { oldKey: "accountNumber", newKey: "accountNumber1", description: 'invalid accountNumber' },
                { oldKey: "ifsc", newKey: "ifsc1", description: 'invalid ifsc' }
            ]
        },
        "Utility Electricity Check": {
            testCaseKey: "testDatautilityElectricityCheck",
            keyChanges: [
                { oldKey: "consumerNo", newKey: "consumerNo1", description: 'invalid consumerNo' },
                { oldKey: "electricityProvider", newKey: "electricityProvider1", description: 'invalid electricityProvider' }
            ]
        },
        "Udyog Aadhaar Verification": {
            testCaseKey: "testDataudyogAadhaarVerification",
            keyChanges: [
                { oldKey: "udyogAadhaarNumber", newKey: "udyogAadhaarNumber1", description: 'invalid udyogAadhaarNumber' }
            ]
        },
        "CA Membership Verification": {
            testCaseKey: "testDatacaMembership",
            keyChanges: [
                { oldKey: "membershipNumber", newKey: "membershipNumber1", description: 'invalid membershipNumber' }
            ]
        },
        "Import Export Verification": {
            testCaseKey: "testDataimportExport",
            keyChanges: [
                { oldKey: "firmName", newKey: "firmName1", description: 'invalid firmName' },
                { oldKey: "iecNumber", newKey: "iecNumber1", description: 'invalid iecNumber' }
            ]
        },
        "SEBI Entity Verification": {
            testCaseKey: "testDatasebiEntitySearch",
            keyChanges: [
                { oldKey: "entityName", newKey: "entityName1", description: 'invalid entityName' }
            ]
        },
        "FDA License Verification": {
            testCaseKey: "testDatafda",
            keyChanges: [
                { oldKey: "licenseNumber", newKey: "licenseNumber1", description: 'invalid licenseNumber' },
                { oldKey: "stateCode", newKey: "stateCode1", description: 'invalid stateCode' }
            ]
        },    
        "FDA License Verification": {
            testCaseKey: "testDatafda",
            keyChanges: [
                { oldKey: "licenseNumber", newKey: "licenseNumber1", description: 'invalid licenseNumber' },
                { oldKey: "stateCode", newKey: "stateCode1", description: 'invalid stateCode' }
            ]
        },    
        "EPF Enterprise Verification": {
            testCaseKey: "testDataEpfoSearch",
            keyChanges: [
                { oldKey: "establishmentName", newKey: "establishmentName1", description: 'invalid establishmentName' }
            ]
        },
        "ESIC Employee Details": {
            testCaseKey: "testDataesicEmployeeDetails",
            keyChanges: [
                { oldKey: "username", newKey: "username1", description: 'invalid username' },
                { oldKey: "password", newKey: "password1", description: 'invalid password' }
            ]
        },
        "ESIC Employer Search": {
            testCaseKey: "testDataesicEmployerSearch",
            keyChanges: [
                { oldKey: "state", newKey: "state1", description: 'invalid state' },
                { oldKey: "district", newKey: "district1", description: 'invalid district' },
                { oldKey: "employerName", newKey: "employerName1", description: 'invalid employerName' }
            ]
        },    
        "MCI Membership Verification": {
            testCaseKey: "testDataMCI",
            keyChanges: [
                { oldKey: "registrationNumber", newKey: "registrationNumber1", description: 'invalid registrationNumber' },
                { oldKey: "stateMedicalCouncil", newKey: "stateMedicalCouncil1", description: 'invalid stateMedicalCouncil' },
                { oldKey: "yearOfInfo", newKey: "yearOfInfo1", description: 'invalid yearOfInfo' }
            ]
        },        
        "PAN Verification V2": {
            testCaseKey: "testDataPANV2",
            keyChanges: [
                { oldKey: "name", newKey: "name1", description: 'invalid name' },
                { oldKey: "dateOfBirth", newKey: "dateOfBirth1", description: 'invalid dateOfBirth' },
                { oldKey: "pan", newKey: "pan1", description: 'invalid pan' }
            ]
        },    
        "ICSI Membership Verification FCS": {
            testCaseKey: "testDataicsiFCS",
            keyChanges: [
                { oldKey: "membershipNumber", newKey: "membershipNumber1", description: 'invalid membershipNumber' },
                { oldKey: "memberType", newKey: "memberType1", description: 'invalid memberType' }
            ]
        },
        "ICSI Membership Verification ACS": {
            testCaseKey: "testDataicsiACS",
            keyChanges: [
                { oldKey: "membershipNumber", newKey: "membershipNumber1", description: 'invalid membershipNumber' },
                { oldKey: "memberType", newKey: "memberType1", description: 'invalid memberType' }
            ]
        },    
        "FSSAI License Verification": {
            testCaseKey: "testDatafssai",
            keyChanges: [
                { oldKey: "licenceNumber", newKey: "licenceNumber1", description: 'invalid licenceNumber' }
            ]
        },
        "ICMAI Membership Verification": {
            testCaseKey: "testDataIcmai",
            keyChanges: [
                { oldKey: "membershipNumber", newKey: "membershipNumber1", description: 'invalid membershipNumber' }
            ]
        },
        "Pan Aadhaar link": {
            testCaseKey: "testDataPanAadharLink",
            keyChanges: [
                { oldKey: "aadhaarNumber", newKey: "aadhaarNumber1", description: 'invalid aadhaarNumber' },
                { oldKey: "pan", newKey: "pan1", description: 'invalid pan' }
            ]
        },    
        "LEI Search": {
            testCaseKey: "testDataLeiSearch",
            keyChanges: [
                { oldKey: "entityName", newKey: "entityName1", description: 'invalid entityName' }
            ]
        },
        "LEI Details Lei Number Search": {
            testCaseKey: "testDataLeiDetailsLeiNumber",
            keyChanges: [
                { oldKey: "leiNumber", newKey: "leiNumber1", description: 'invalid leiNumber' }
            ]
        },
        "LEI Details Entity Name Search": {
            testCaseKey: "testDataLeiDetailsEntityName",
            keyChanges: [
                { oldKey: "entityName", newKey: "entityName1", description: 'invalid entityName' }
            ]
        },
        "ESIC Employer Details": {
            testCaseKey: "testDataesicEmployerDetails",
            keyChanges: [
                { oldKey: "esicCode", newKey: "esicCode1", description: 'invalid esicCode' }
            ]
        },
        "EPF verifier Get All Employee Names": {
            testCaseKey: "testDatagetAllEmployeeNames",
            keyChanges: [
                { oldKey: "establishmentName", newKey: "establishmentName1", description: 'invalid establishmentName' },
                { oldKey: "establishmentId", newKey: "establishmentId1", description: 'invalid establishmentId' }
            ]
        },    
        "EPF verifier Enterprise": {
            testCaseKey: "testDataEpfverifierEnterprise",
            keyChanges: [
                { oldKey: "establishmentName", newKey: "establishmentName1", description: 'invalid establishmentName' },
                { oldKey: "establishmentId", newKey: "establishmentId1", description: 'invalid establishmentId' }
            ]
        },
        "Bullion Rates": {
            testCaseKey: "testDataBullionRates",
            keyChanges: [
                { oldKey: "commodityType", newKey: "commodityType1", description: 'invalid commodityType' }
            ]
        },
        "Driving License Details": {
            testCaseKey: "testDataDrivingLicenceDataFetch",
            keyChanges: [
                { oldKey: "drivingLicenceNumber", newKey: "drivingLicenceNumber1", description: 'invalid drivingLicenceNumber' },
                { oldKey: "dateOfBirth", newKey: "dateOfBirth1", description: 'invalid dateOfBirth' }
            ]
        },        
        "Anti Money Laundering detail- Entity": {
            testCaseKey: "testDataAMLEntity",
            keyChanges: [
                { oldKey: "matchScoreThreshold", newKey: "matchScoreThreshold1", description: 'invalid matchScoreThreshold' },
                { oldKey: "name", newKey: "name1", description: 'invalid name' },
                { oldKey: "type", newKey: "type1", description: 'invalid type' }
            ]
        },            
        "Fetch Vehicle details": {
            testCaseKey: "testDatafetchVehicleDetails",
            keyChanges: [
                { oldKey: "vehicleManufacturerName", newKey: "vehicleManufacturerName1", description: 'invalid vehicleManufacturerName' },
                { oldKey: "vehicleModel", newKey: "vehicleModel1", description: 'invalid vehicleModel' },
                { oldKey: "vehicleVariant", newKey: "vehicleVariant1", description: 'invalid vehicleVariant' },
                { oldKey: "registrationCity", newKey: "registrationCity1", description: 'invalid registrationCity' },
                { oldKey: "registrationState", newKey: "registrationState1", description: 'invalid registrationState' }
            ]
        },
       "Aadhaar OTP Verification": {
            testCaseKey: "testDataAadhaarOtp",
            keyChanges: [
                { oldKey: "aadhaar_number", newKey: "aadhaar_number1", description: 'invalid aadhaar_number key' },
            ]
        },
        "EPFO Passbook Details": {
            testCaseKey: "testDataEpfoPassbookOtp",
            keyChanges: [
                { oldKey: "uanNumber", newKey: "uanNumber1", description: 'invalid uanNumber key' },
                { oldKey: "password", newKey: "password1", description: 'invalid password key' },
            ]
        },
        "EPFO Retail Data Fetch": {
            testCaseKey: "testDataEpfoRetailOtp",
            keyChanges: [
                { oldKey: "uanNumber", newKey: "uanNumber1", description: 'invalid uanNumber key' },
                { oldKey: "password", newKey: "password1", description: 'invalid password key' },
            ]
        },
        "Utility - Phone Number Details": {
            testCaseKey: "testDataUtilityPhoneGenerateOtp",
            keyChanges: [
                { oldKey: "mobileNumber", newKey: "mobileNumber1", description: 'invalid mobileNumber key' },
                { oldKey: "countryCode", newKey: "countryCode1", description: 'invalid countryCode key' },
            ]
        },
        "UDIN OTP Verification": {
            testCaseKey: "testDataUdinOtp",
            keyChanges: [
                { oldKey: "mobileNumber", newKey: "mobileNumber1", description: 'invalid mobileNumber key' },
                { oldKey: "email", newKey: "email1", description: 'invalid email key' },
                { oldKey: "udin", newKey: "udin1", description: 'invalid udin key' },
            ]
        },
        "Udyam Registration Certificate": {
            testCaseKey: "testDataUdyamRegistrationCertificate",
            keyChanges: [
                { oldKey: "registrationnumber", newKey: "registrationnumber1", description: 'invalid registrationnumber key' },
            ]
        },
        "Fetch all car details list": {
            testCaseKey: "testDatafetchCarDetails",
            keyChanges: [] // Add key here if we have
        },
        "All city and state name list": {
            testCaseKey: "testDatafetchStateCityNames",
            keyChanges: [] // Add key here if we have
        },    
    };

    before(function() {
        cy.fixture('apiData').then((data) => {
            if (data && data.testCases) {
                Object.entries(data.testCases).forEach(([key, testCase]) => {
                    if (testCase) {
                        const config = testConfigurations[testCase.apiName];
                        if (config && Array.isArray(config.keyChanges)) {
                            const originalRequestData = { ...testCase.requestData };
                            config.keyChanges.forEach(({ oldKey, newKey }) => {
                                const modifiedRequestData = { ...originalRequestData };

                                if (modifiedRequestData[oldKey]) {
                                    modifiedRequestData[newKey] = modifiedRequestData[oldKey];
                                    delete modifiedRequestData[oldKey];

                                     testCase[`${newKey}_data`] = modifiedRequestData;
                                }
                            });
                        }
                    }
                });
                apiData = data;
            } else {
                throw new Error('Fixture data is undefined or does not contain testCases');
            }
        });
    });

    Object.entries(testConfigurations).forEach(([apiName, config]) => {
        if (Array.isArray(config.keyChanges)) {
            config.keyChanges.forEach(({ oldKey, newKey, description }) => {
  
                const updatedDescription = description.replace(oldKey, `${oldKey} changed to ${newKey}`);

                it(`Verify ${apiName} API with ${updatedDescription}`, () => {
                    const testCase = apiData.testCases[config.testCaseKey];
                    if (testCase) {
                        const modifiedRequestData = testCase[`${newKey}_data`];

                        if (modifiedRequestData) {
                            const apiUrl = `${apiData.baseUrl}${testCase.endpoint}`;
                            const headers = apiData.headers;

                            cy.log('Request Body:', JSON.stringify(modifiedRequestData));
                            cy.log(`Testing ${apiName} with ${updatedDescription}`);
                            cy.request({
                                method: 'POST',
                                url: apiUrl,
                                headers: headers,
                                body: modifiedRequestData,
                                failOnStatusCode: false
                            }).then((response) => {
                                cy.log('Response Body:', JSON.stringify(response.body));
                                expect(response.status).to.eq(200);

                                cy.log('Reference Id: ' + JSON.stringify(response.body.referenceId));
                                expect(response.body).to.have.property('responseMessage', 'Payload is Incorrect.');
                                expect(response.body).to.have.property('responseCode', 'EPI022');
                            });
                        } else {
                            cy.log(`Modified request data not found for ${apiName} with ${updatedDescription}`);
                        }
                    } else {
                        cy.log(`Payload not found for ${apiName} test case.`);
                    }
                });
            });
        }
    });
});