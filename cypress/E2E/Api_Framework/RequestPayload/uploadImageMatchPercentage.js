/// <reference types="Cypress"/>
import testCases from '../testCases';

describe('Test API with valid data', () => {
    let apiData;
  
    before(function () {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Upload image match percentage');
  
    filteredTestCases.forEach((testCase) => {
        it(`verify ${testCase.name} API with valid data`, () => {
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;
                const requestData = payLoad.requestData;
                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;
                const filePaths = {
                    file1: 'matchPercentageFront.jpg',
                    file2: 'matchPercentageBack.jpg'
                };
                
                cy.task('fileUploadOne', { 
                    url: apiUrl,
                    headers: headers,
                    payload: requestData,
                    filePaths: filePaths // Updated to include `file1` and `file2`
                }).then((response) => {
                    cy.log('Response:', JSON.stringify(response, null, 2));
                  
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