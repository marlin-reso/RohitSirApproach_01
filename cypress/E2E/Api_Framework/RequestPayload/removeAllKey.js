/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's with specific payload modifications`, () => {
    let apiData;

    const testConfigurations = {
		"Aadhaar Verifier": {
		    testCaseKey: "testDataAadhaar",
		    keyRemove: [
		        { keyName: "aadhaarNumber", description: 'Remove aadhaarNumber key' }
		    ]
		},
		"Udyam Registration": {
		    testCaseKey: "testDataUdyam",
		    keyRemove: [
		        { keyName: "registrationnumber", description: 'Remove registrationnumber key' }
		    ]
		},
		"PAN Details Info": {
		    testCaseKey: "testDataPan",
		    keyRemove: [
		        { keyName: "pan", description: 'Remove pan key' }
		    ]
		},
		"PAN Data Fetch": {
		    testCaseKey: "testDataPanDataFetch",
		    keyRemove: [
		        { keyName: "pan", description: 'Remove pan key' }
		    ]
		},
		"Passport": {
		    testCaseKey: "testDataPassport",
		    keyRemove: [
		        { keyName: "fileNumber", description: 'Remove fileNumber key' },
		        { keyName: "dateOfBirth", description: 'Remove dateOfBirth key' }
		    ]
		},
		"Voter Card Verification": {
		    testCaseKey: "testDataVoterCardVerification",
		    keyRemove: [
		        { keyName: "epicNumber", description: 'Remove epicNumber key' }
		    ]
		},
		"Shop And Establishment Data Fetch of West Bengal": {
		    testCaseKey: "testDatashopAndEstablishmentDataFetch",
		    keyRemove: [
		        { keyName: "certificateNumber", description: 'Remove certificateNumber key' },
		        { keyName: "state", description: 'Remove state key' }
		    ]
		},
		"Shop And Establishment Data Fetch of Delhi": {
		    testCaseKey: "testDatashopAndEstablishmentDataFetchDL",
		    keyRemove: [
		        { keyName: "certificateNumber", description: 'Remove certificateNumber key' },
		        { keyName: "state", description: 'Remove state key' }
		    ]
		},
		"Shop And Establishment Data Fetch of Telangana": {
		    testCaseKey: "testDatashopAndEstablishmentDataFetchTL",
		    keyRemove: [
		        { keyName: "certificateNumber", description: 'Remove certificateNumber key' },
		        { keyName: "state", description: 'Remove state key' }
		    ]
		},
		"Shop And Establishment Data Fetch of Jharkhand": {
		    testCaseKey: "testDatashopAndEstablishmentDataFetchJH",
		    keyRemove: [
		        { keyName: "certificateNumber", description: 'Remove certificateNumber key' },
		        { keyName: "state", description: 'Remove state key' }
		    ]
		},
		"Shop And Establishment Data Fetch of Rajasthan": {
		    testCaseKey: "testDatashopAndEstablishmentDataFetchRJ",
		    keyRemove: [
		        { keyName: "certificateNumber", description: 'Remove certificateNumber key' },
		        { keyName: "state", description: 'Remove state key' }
		    ]
		},
		"Shop And Establishment Data Fetch of Karnataka": {
		    testCaseKey: "testDatashopAndEstablishmentDataFetchKR",
		    keyRemove: [
		        { keyName: "certificateNumber", description: 'Remove certificateNumber key' },
		        { keyName: "establishmentName", description: 'Remove establishmentName key' },
		        { keyName: "state", description: 'Remove state key' }
		    ]
		},
		"Vehicle Registration Data Fetch": {
		    testCaseKey: "testDatavehicleRegistrationDataFetch",
		    keyRemove: [
		        { keyName: "rc_regn_no", description: 'Remove rc_regn_no key' }
		    ]
		},
		"Bank Account Verification": {
		    testCaseKey: "testDatabankAccountVerification",
		    keyRemove: [
		        { keyName: "accountNumber", description: 'Remove accountNumber key' },
		        { keyName: "ifsc", description: 'Remove ifsc key' }
		    ]
		},
		"Utility Electricity Check": {
		    testCaseKey: "testDatautilityElectricityCheck",
		    keyRemove: [
		        { keyName: "consumerNo", description: 'Remove consumerNo key' },
		        { keyName: "electricityProvider", description: 'Remove electricityProvider key' }
		    ]
		},
		"Udyog Aadhaar Verification": {
		    testCaseKey: "testDataudyogAadhaarVerification",
		    keyRemove: [
		        { keyName: "udyogAadhaarNumber", description: 'Remove udyogAadhaarNumber key' }
		    ]
		},
		"CA Membership Verification": {
		    testCaseKey: "testDatacaMembership",
		    keyRemove: [
		        { keyName: "membershipNumber", description: 'Remove membershipNumber key' }
		    ]
		},
		"Import Export Verification": {
		    testCaseKey: "testDataimportExport",
		    keyRemove: [
		        { keyName: "firmName", description: 'Remove firmName key' },
		        { keyName: "iecNumber", description: 'Remove iecNumber key' }
		    ]
		},
		"SEBI Entity Verification": {
		    testCaseKey: "testDatasebiEntitySearch",
		    keyRemove: [
		        { keyName: "entityName", description: 'Remove entityName key' }
		    ]
		},
		"FDA License Verification": {
		    testCaseKey: "testDatafda",
		    keyRemove: [
		        { keyName: "licenseNumber", description: 'Remove licenseNumber key' },
		        { keyName: "stateCode", description: 'Remove stateCode key' }
		    ]
		},
		"EPF Enterprise Verification": {
		    testCaseKey: "testDataEpfoSearch",
		    keyRemove: [
		        { keyName: "establishmentName", description: 'Remove establishmentName key' }
		    ]
		},
		"ICSI Membership Verification FCS": {
		    testCaseKey: "testDataicsiFCS",
		    keyRemove: [
		        { keyName: "membershipNumber", description: 'Remove membershipNumber key' },
		        { keyName: "memberType", description: 'Remove memberType key' }
		    ]
		},
		"ICSI Membership Verification ACS": {
		    testCaseKey: "testDataicsiACS",
		    keyRemove: [
		        { keyName: "membershipNumber", description: 'Remove membershipNumber key' },
		        { keyName: "memberType", description: 'Remove memberType key' }
		    ]
		},
		"FSSAI License Verification": {
		    testCaseKey: "testDatafssai",
		    keyRemove: [
		        { keyName: "licenceNumber", description: 'Remove licenceNumber key' }
		    ]
		},
		"ICMAI Membership Verification": {
		    testCaseKey: "testDataIcmai",
		    keyRemove: [
		        { keyName: "membershipNumber", description: 'Remove membershipNumber key' }
		    ]
		},
		"Pan Aadhaar link": {
		    testCaseKey: "testDataPanAadharLink",
		    keyRemove: [
		        { keyName: "aadhaarNumber", description: 'Remove aadhaarNumber key' },
		        { keyName: "pan", description: 'Remove pan key' }
		    ]
		},
		"LEI Search": {
		    testCaseKey: "testDataLeiSearch",
		    keyRemove: [
		        { keyName: "entityName", description: 'Remove entityName key' }
		    ]
		},
		"LEI Details Lei Number Search": {
		    testCaseKey: "testDataLeiDetailsLeiNumber",
		    keyRemove: [
		        { keyName: "leiNumber", description: 'Remove leiNumber key' }
		    ]
		},
		"LEI Details Entity Name Search": {
		    testCaseKey: "testDataLeiDetailsEntityName",
		    keyRemove: [
		        { keyName: "entityName", description: 'Remove entityName key' }
		    ]
		},
		"ESIC Employer Details": {
		    testCaseKey: "testDataesicEmployerDetails",
		    keyRemove: [
		        { keyName: "esicCode", description: 'Remove esicCode key' }
		    ]
		},
		"EPF verifier Get All Employee Names": {
		    testCaseKey: "testDatagetAllEmployeeNames",
		    keyRemove: [
		        { keyName: "establishmentName", description: 'Remove establishmentName key' },
		        { keyName: "establishmentId", description: 'Remove establishmentId key' }
		    ]
		},
		"EPF verifier Enterprise": {
		    testCaseKey: "testDataEpfverifierEnterprise",
		    keyRemove: [
		        { keyName: "establishmentName", description: 'Remove establishmentName key' },
		        { keyName: "establishmentId", description: 'Remove establishmentId key' }
		    ]
		},
		"Bullion Rates": {
		    testCaseKey: "testDataBullionRates",
		    keyRemove: [
		        { keyName: "commodityType", description: 'Remove commodityType key' }
		    ]
		},
		"Driving License Details": {
		    testCaseKey: "testDataDrivingLicenceDataFetch",
		    keyRemove: [
		        { keyName: "drivingLicenceNumber", description: 'Remove drivingLicenceNumber key' },
		        { keyName: "dateOfBirth", description: 'Remove dateOfBirth key' }
		    ]
		},
        "Anti Money Laundering detail- Entity": {
            testCaseKey: "testDataAMLEntity",
            keyRemove: [
                { keyName: "matchScoreThreshold", description: 'Remove matchScoreThreshold key' },
                { keyName: "name", description: 'Remove name key' },
                { keyName: "type", description: 'Remove type key' }
            ]
        },
        "Anti Money Laundering detail- Individual": {
            testCaseKey: "testDataAMLIndividual",
            keyRemove: [
                { keyName: "matchScoreThreshold", description: 'Remove matchScoreThreshold key' },
                { keyName: "name", description: 'Remove name key' },
                { keyName: "type", description: 'Remove type key' }
            ]
        },
        "PAN Verification V2": {
            testCaseKey: "testDataPANV2",
            keyRemove: [
                { keyName: "name", description: 'Remove name key' },
                { keyName: "dateOfBirth", description: 'Remove dateOfBirth key' },
                { keyName: "pan", description: 'Remove pan key' }
            ]
        },
        "MCI Membership Verification": {
            testCaseKey: "testDataMCI",
            keyRemove: [
                { keyName: "registrationNumber", description: 'Remove registrationNumber key' },
                { keyName: "stateMedicalCouncil", description: 'Remove stateMedicalCouncil key' },
                { keyName: "yearOfInfo", description: 'Remove yearOfInfo key' }
            ]
        },
        "Fetch Vehicle details": {
            testCaseKey: "testDatafetchVehicleDetails",
            keyRemove: [
                { keyName: "vehicleManufacturerName", description: 'Remove vehicleManufacturerName key' },
                { keyName: "vehicleModel", description: 'Remove vehicleModel key' },
                { keyName: "vehicleVariant", description: 'Remove vehicleVariant key' },
                { keyName: "registrationCity", description: 'Remove registrationCity key' },
                { keyName: "registrationState", description: 'Remove registrationState key' }
            ]
        },
        "Fetch all car details list": {
            testCaseKey: "testDatafetchCarDetails",
            keyRemove: [] // No keys to remove
        },
        "All city and state name list": {
            testCaseKey: "testDatafetchStateCityNames",
            keyRemove: [] // No keys to remove
        },
        "ESIC Employee Details": {
            testCaseKey: "testDataesicEmployeeDetails",
            keyRemove: [
                { keyName: "username", description: 'Remove username key' },
                { keyName: "password", description: 'Remove password key' }
            ]
        },
        "ESIC Employer Search": {
            testCaseKey: "testDataesicEmployerSearch",
            keyRemove: [
                { keyName: "state", description: 'Remove state key' },
                { keyName: "district", description: 'Remove district key' },
                { keyName: "employerName", description: 'Remove employerName key' }
            ]
        },
        "Aadhaar OTP Verification": {
            testCaseKey: "testDataAadhaarOtp",
            keyRemove: [
                { keyName: "aadhaar_number", description: 'Remove aadhaar_number key' },
            ]
        },
		"EPFO Passbook Details": {
            testCaseKey: "testDataEpfoPassbookOtp",
            keyRemove: [
                { keyName: "uanNumber", description: 'Remove uanNumber key' },
                { keyName: "password", description: 'Remove password key' },
            ]
        },
        "EPFO Retail Data Fetch": {
            testCaseKey: "testDataEpfoRetailOtp",
            keyRemove: [
                { keyName: "uanNumber", description: 'Remove uanNumber key' },
                { keyName: "password", description: 'Remove password key' },
            ]
        },
        "Utility - Phone Number Details": {
            testCaseKey: "testDataUtilityPhoneGenerateOtp",
            keyRemove: [
                { keyName: "mobileNumber", description: 'Remove mobileNumber key' },
                { keyName: "countryCode", description: 'Remove countryCode key' },
            ]
        },
        "UDIN OTP Verification": {
            testCaseKey: "testDataUdinOtp",
            keyRemove: [
                { keyName: "mobileNumber", description: 'Remove mobileNumber key' },
                { keyName: "email", description: 'Remove email key' },
                { keyName: "udin", description: 'Remove udin key' },
            ]
        },
		"Udyam Registration Certificate": {
            testCaseKey: "testDataUdyamRegistrationCertificate",
            keyRemove: [
                { keyName: "registrationnumber", description: 'Remove registrationnumber key' },
            ]
        },
    };

    before(function() {
        cy.fixture('apiData').then((data) => {
            if (data && data.testCases) {
                Object.entries(data.testCases).forEach(([key, testCase]) => {
                    if (testCase) {
                        const config = testConfigurations[testCase.apiName];
                        if (config && Array.isArray(config.keyRemove)) {
                            const originalRequestData = { ...testCase.requestData };
                            config.keyRemove.forEach(({ keyName }) => {
                                const modifiedRequestData = { ...originalRequestData };

                                if (modifiedRequestData[keyName]) {
                                    delete modifiedRequestData[keyName];

                                    testCase[`${keyName}_deleted`] = modifiedRequestData;
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
        if (Array.isArray(config.keyRemove)) {
            config.keyRemove.forEach(({ keyName, description }) => {

                it(`Verify ${apiName} API after ${description}`, () => {
                    const testCase = apiData.testCases[config.testCaseKey];
                    if (testCase) {
                        const modifiedRequestData = testCase[`${keyName}_deleted`];

                        if (modifiedRequestData) {
                            const apiUrl = `${apiData.baseUrl}${testCase.endpoint}`;
                            const headers = apiData.headers;

                            cy.log('Request Body:', JSON.stringify(modifiedRequestData));
                            cy.log(`Testing ${apiName} with ${description}`);
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
                            cy.log(`Modified request data not found for ${apiName} with ${description}`);
                        }
                    } else {
                        cy.log(`Payload not found for ${apiName} test case.`);
                    }
                });
            });
        }
    });
});