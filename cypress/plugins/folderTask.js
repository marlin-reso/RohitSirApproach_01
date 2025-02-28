const fs = require('fs');
const FormData = require('form-data');

module.exports = (on) => {
  on('task', {
    async fileUploadOne({ url, headers, payload, filePaths }) {
      const { default: fetch } = await import('node-fetch');

      try {
        const formData = new FormData();
        
        // Dynamically append files with their corresponding parameter names
        for (const [paramName, filePath] of Object.entries(filePaths)) {
          const filePathWithFullPath = `cypress/fixtures/Files/${filePath}`;
          const fileStream = fs.createReadStream(filePathWithFullPath);
          formData.append(paramName, fileStream, filePath);
        }

        // Append payload (as JSON or flat key-value pairs
        if(payload){
         // formData.append('payload', payload);
        formData.append('data', JSON.stringify(payload));
        }

        // Make the request
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            ...headers,
            ...formData.getHeaders(),
          },
          body: formData,
        });

        const responseData = await response.json();
        return {
          status: response.status,
          responseBody: responseData,
        };

      } catch (err) {
        console.error('Error uploading files:', err);
        throw err;
      }
    }
  });
};

//This task is used to image along with blank payload or empty payload.