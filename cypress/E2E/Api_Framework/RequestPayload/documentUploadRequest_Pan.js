/// <reference types="Cypress"/>
import testCases from '../testCases';

describe('Test Pan document upload request API with valid data', () => {
    let apiData;

    before(function () {
        // Load the apiData fixture
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Pan document upload');

    filteredTestCases.forEach((testCase) => {
        it(`verify ${testCase.name} API with valid data`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;

                // Define file paths and payload
                const filePaths = {
                    frontPage: 'CompanyPan_01.png',
                    backPage: 'CompanyPan_02.png',
                    
                  };
                const payload = JSON.stringify({ documentType: 'pan' }); // Adjust payload as needed

                // Log for debugging
                cy.log('API URL:', apiUrl);
                cy.log('Headers:', JSON.stringify(headers, null, 2));
                cy.log('Payload:', payload);
                cy.log('File Paths:', JSON.stringify(filePaths, null, 2));

                cy.task('fileUpload', {
                    url: apiUrl,
                    headers: headers,
                    payload: payload,
                    filePaths: filePaths
                }).then((response) => {
                    cy.log('Response:', JSON.stringify(response, null, 2));
                    // Uncomment assertions as needed
                     expect(response.status).to.eq(200);
                     expect(response.responseBody.responseCode).to.equal('SRC001');
                     expect(response.responseBody.responseMessage).to.equal('Successfully Completed.');
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
});





  