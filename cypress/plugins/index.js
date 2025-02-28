module.exports = (on, config) => {
  // Import tasks from multiple files
  require('./task')(on);
  require('./folderTask')(on);

  // Return the config as usual
  return config;
};

/*
const XLSX = require('xlsx');
const path = require('path');
const task = require('./task');
const folderTask = require('./folderTask');

module.exports = (on, config) => {

  task(on)
  singleTask(on)

  on('task', {
    readExcelFile({ excelFilePath, sheetName }) {
      const workbook = XLSX.readFile(excelFilePath);
      const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      return jsonData; // Return the JSON data
    }
  });
};
*/

// /*
// // cypress/plugins/index.js

// module.exports = (on, config) => {
//   // Import the task definition from your separate task file
//   require('./tasks')(on);

//   // Return the config as usual
//   return config;
// };

// */




