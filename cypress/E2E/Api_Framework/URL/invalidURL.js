/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test API's with invalid URL`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            data.testCases.testDataAadhaar.endpoint = '/aadhaarVerifier1'; 
            data.testCases.testDataUdyam.endpoint = '/udyamRegistration1';
            data.testCases.testDataPan.endpoint = '/panDetailInfo1';
            data.testCases.testDataPanDataFetch.endpoint = '/panDataFetch1';
            data.testCases.testDataPassport.endpoint = '/passport1';
            data.testCases.testDataVoterCardVerification.endpoint = '/voterCard1';
            data.testCases.testDatashopAndEstablishmentDataFetch.endpoint = '/shopAndEstablishmentDataFetch1';
            data.testCases.testDatashopAndEstablishmentDataFetchDL.endpoint = '/shopAndEstablishmentDataFetch1';
            data.testCases.testDatashopAndEstablishmentDataFetchTL.endpoint = '/shopAndEstablishmentDataFetch1';
            data.testCases.testDatashopAndEstablishmentDataFetchJH.endpoint = '/shopAndEstablishmentDataFetch1';
            data.testCases.testDatashopAndEstablishmentDataFetchRJ.endpoint = '/shopAndEstablishmentDataFetch1';
            data.testCases.testDatashopAndEstablishmentDataFetchKR.endpoint = '/shopAndEstablishmentDataFetch1';
            data.testCases.testDatavehicleRegistrationDataFetch.endpoint = '/vehicleRegistrationDataFetch1';
            data.testCases.testDatabankAccountVerification.endpoint = '/bankAccountVerification1';
            data.testCases.testDatautilityElectricityCheck.endpoint = '/utilityElectricityCheck1';
            data.testCases.testDataudyogAadhaarVerification.endpoint = '/udyogAadhaarVerification1';
            data.testCases.testDatacaMembership.endpoint = '/caMembership1';
            data.testCases.testDataimportExport.endpoint = '/importExport1';
            data.testCases.testDatasebiEntitySearch.endpoint = '/sebiEntitySearch1';
            data.testCases.testDatafda.endpoint = '/fda1';
            data.testCases.testDataEpfoSearch.endpoint = '/epfo/enterprise/search1';
            data.testCases.testDataicsiACS.endpoint = '/icsi1';
            data.testCases.testDataicsiFCS.endpoint = '/icsi1';
            data.testCases.testDatafssai.endpoint = '/fssai1';
            data.testCases.testDataIcmai.endpoint = '/icmai1';
            data.testCases.testDataPanAadharLink.endpoint = '/panAadharLink1';
            data.testCases.testDataLeiSearch.endpoint = '/leiSearch1';
            data.testCases.testDataLeiDetailsLeiNumber.endpoint = '/leiDetails1';
            data.testCases.testDataLeiDetailsEntityName.endpoint = '/leiDetails1';
            data.testCases.testDataesicEmployerDetails.endpoint = '/esicEmployerDetails1';
            data.testCases.testDatagetAllEmployeeNames.endpoint = '/epfverifier/getAllEmployeeNames1';
            data.testCases.testDataEpfverifierEnterprise.endpoint = '/epfverifier/enterprise1';
            data.testCases.testDataBullionRates.endpoint = '/bullionRates1';
            data.testCases.testDataDrivingLicenceDataFetch.endpoint = '/drivingLicenceDataFetch1';
            data.testCases.testDataPANV2.endpoint = '/V2/panDataFetch1';
            data.testCases.testDataMCI.endpoint = '/mci1';
            data.testCases.testDataAMLEntity.endpoint = '/esicEmployerSearch1';           
            data.testCases.testDataAMLIndividual.endpoint = '/esicEmployerSearch1';           
            data.testCases.testDatafetchVehicleDetails.endpoint = '/fetchVehicleDetails1';
            data.testCases.testDatafetchCarDetails.endpoint = '/fetchCarDetails1';
            data.testCases.testDatafetchStateCityNames.endpoint = '/fetchStateCityNames1';
            data.testCases.testDataesicEmployeeDetails.endpoint = '/esicEmployeeDetails1';
            data.testCases.testDataesicEmployerSearch.endpoint = '/esicEmployerSearch1';
            data.testCases.testDataAadhaarOtp.endpoint = '/aadhaarOtp1'; 
            data.testCases.testDataEpfoPassbookOtp.endpoint = '/epfoPassbookOtp1'; 
            data.testCases.testDataEpfoRetailOtp.endpoint = '/epfoRetailOtp1'; 
            data.testCases.testDataUtilityPhoneGenerateOtp.endpoint = '/utilityPhoneGenerateOtp1'; 
            data.testCases.testDataUdinOtp.endpoint = '/udinotp1'; 
            data.testCases.testDataUdyamOtp.endpoint = '/udyamotp1'; 
            data.testCases.testDataUdyamRegistrationCertificate.endpoint = '/udyamRegistration/certificate1';
            data.testCases.form_16.endpoint = '/form-16-Verification1';
            data.testCases.mgnregaCardDetail.endpoint = '/mgnregaCardDetail1';
            data.testCases.panToFatherName.endpoint = '/panToFatherName1';
            data.testCases.panToUdyamInfo.endpoint = '/panToUdyamInfo1';
            data.testCases.pngDetails.endpoint = '/pngDetails1';
            data.testCases.panToMaskedAadhaar.endpoint = '/panToMaskedAadhaar1';
            data.testCases.panBasicInfo.endpoint = '/panBasicInfo1';
            data.testCases.ifscCodeVerification.endpoint = '/ifscCodeVerification1';
            data.testCases.getPinCodeDetails.endpoint = '/getPinCodeDetails1';
            data.testCases.documentUploadRequest_Aadhaar.endpoint = '/documentuploadrequest1';
            data.testCases.documentUploadRequest_drivingLicence.endpoint = '/documentuploadrequest1';
            data.testCases.documentUploadRequest_Pan.endpoint = '/documentuploadrequest1';
            data.testCases.documentUploadRequest_Passport.endpoint = '/documentuploadrequest1';
            data.testCases.documentUploadRequest_VoterID.endpoint = '/documentuploadrequest1';
            data.testCases.visaDetailsVerification.endpoint = '/visaDetailsVerification1';
            data.testCases.visaBasicInformation.endpoint = '/visaBasicInformation1';
            data.testCases.panAdvanceInformation.endpoint = '/panAdvanceInformation1';
            data.testCases.employeeCompanyVerification.endpoint = '/employeeCompanyVerification1';
            data.testCases.panToCin.endpoint = '/panToCin1';
            data.testCases.tdsReturnVerification.endpoint = '/tdsReturnVerification1';
            data.testCases.pinCodeVerification.endpoint = '/pinCodeVerification1';
            data.testCases.utilityDthDetails.endpoint = '/utilityDthDetails1';
            data.testCases.utilityBroadbandVerification.endpoint = '/utilityBroadbandVerification1';
            data.testCases.domainVerification.endpoint = '/domainVerification1';
            data.testCases.emailVerification.endpoint = '/emailVerification1';
            data.testCases.E_ChallanVerification.endpoint = '/e-ChallanVerification1';
            data.testCases.employmentVerification.endpoint = '/employmentVerification1';
            data.testCases.panToDin.endpoint = '/panToDin1';
            data.testCases.phoneBasicInformation.endpoint = '/phoneBasicInformation1';
            data.testCases.phoneToUanVerification.endpoint = '/phoneToUanVerification1';
            data.testCases.phoneToDlVerification.endpoint = '/phoneToDlVerification1';
            data.testCases.phoneToRc.endpoint = '/phoneToRc1';
            data.testCases.reverseRc.endpoint = '/reverseRc1';
            data.testCases.tanVerification.endpoint = '/tanVerification1';
            data.testCases.upiIdBasicInformation.endpoint = '/upiIdBasicInformation1';
            data.testCases.bankAccountVerificationPennyless.endpoint = '/bankAccountVerificationPennyless1';
            data.testCases.phoneToPanVerification.endpoint = '/phoneToPanVerification1';
            data.testCases.uploadImageMatchPercentage.endpoint = '/uploadImageMatchPercentage1';
            data.testCases.socialAttributeVerification.endpoint = '/socialAttributeVerification1';
            data.testCases.waterUtilityDelhiJalBoard.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityHaryanaUrbanDevelopmentAuthority.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityHyderabadMetropolitanWaterSupplyAndSewerageBoard.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityKeralaWaterAuthority.endpoint ='/utilityWaterDetails1';
            data.testCases.waterUtilityBrihanMumbaiMunicipalCorporation.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityUttarakhandJalSansthan.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityChennaiMetropolitanWaterSupplyAndSewarageBoard.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityJammuKashmirWaterBilling.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityPimpriChinchwadMunicipalCorporation.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityNoidaJal.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityNewDelhiMunicipalCouncil.endpoint = '/utilityWaterDetails1';
            data.testCases.waterUtilityTalegaonDabhadeNagarParishad.endpoint = '/utilityWaterDetails1';
            data.testCases.utilityElectricityDetails.endpoint = '/utilityElectricityCheck1';
            data.testCases.utilityElectricityDetailsCityWise.endpoint = '/utilityElectricityCheck1';
            data.testCases.nameMatchEntity.endpoint = '/nameMatch1';
            data.testCases.nameMatchIndividual.endpoint = '/nameMatch1';
            data.testCases.utilityLpgDetailsBharatGas.endpoint = '/utilityLpgDetails1';
            data.testCases.utilityLpgDetailsIndaneGas.endpoint = '/utilityLpgDetails1';
            data.testCases.verifyMobileNumber.endpoint ='/verifyMobileNumber1';
            data.testCases.rationCardVerification.endpoint = '/rationCardVerification1';
            data.testCases.udyamAssistVerification.endpoint = '/udyamAssistVerification1';
            data.testCases.panToUANVerification.endpoint = '/panToUANVerification1';
            data.testCases.initiateLiveliness.endpoint = '/initiateLiveliness1';
            data.testCases.ipAddressVerification.endpoint = '/ipAddressVerification1';
            data.testCases.deathCertificateVerification.endpoint = '/deathCertificateVerification1';
            data.testCases.VerifyEmail.endpoint = '/verifyEmail1';
            data.testCases.fetchCarDealerDetails.endpoint = '/fetchCarDealerDetails1';
            data.testCases.fetchTwoWheelerVehicleDetails.endpoint = '/fetchTwoWheelerVehicleDetails1';
        
            //Add list of api's here
            
            apiData = data;
        });
    });

    testCases.forEach((testCase) => {
        it(`Verify ${testCase.name} API with invalid URL`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = payLoad.requestData;

                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;

                // cy.log(`Testing API: ${apiName}`);
                // cy.log(`Modified API Endpoint: ${apiUrl}`);

                cy.request({
                    method: 'POST',
                    url: apiUrl,
                    headers: headers,
                    body: requestData,
                    failOnStatusCode: false 
                }).then((response) => {
                    cy.log('Response Body:', JSON.stringify(response.body));
                    expect(response.status).to.eq(406);

                    cy.log('Timestamp ID: ' + response.body.timestamp);
                    expect(response.body).to.have.property('status', 406);
                    expect(response.body).to.have.property('error', "Not Acceptable");
                    expect(response.body).to.have.property('message', "API access denied.");
                    expect(response.body).to.have.property('path', `/kyc/external${endpoint}`);
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
});