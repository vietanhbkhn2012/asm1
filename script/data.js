'use strict';

// Select Elements
const fileInput = document.getElementById('input-file');
const importBtn = document.getElementById('import-btn');
const exportBtn = document.getElementById('export-btn');

// Export Data
exportBtn.addEventListener('click', function () {
  const petArr = localStorage.getItem('petArr');
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(petArr);
  let exportFileDefaultName = 'petArrData.json';
  let linkElement = document.createElement('a');

  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
});

// Log the file to local storage
function logFile(e) {
  let str = e.target.result;
  let jsonArr = JSON.parse(str);
  if (Array.isArray(jsonArr)) {
    let test = true;
    const checkArr = ['id', 'name', 'type', 'weight', 'length', 'color', 'breed', 'vaccinated', 'dewormed', 'sterilized', 'date'];
    jsonArr.forEach(pet => {
      checkArr.forEach(check => {
        if (!pet.hasOwnProperty(`${check}`)) {
          test = false;
        }
      });
    });
    if (test) {
      localStorage.setItem('petArr', str);
      alert('The file has been imported successfully!');
    } else alert('the contents of the array in the file do not match!');
  } else alert('the content of the file must be arrays!');
}

function importFile() {
  // If there's no file, do nothing
  if (!fileInput.value.length) {
    alert('Please upload a json file!');
    return;
  }

  // Check if a file is a json file
  if (fileInput.files[0].type === 'application/json') {
    // Create a new FileReader() object
    let reader = new FileReader();

    // Read the first file
    reader.readAsText(fileInput.files[0]);

    // Setup the callback event to run when the file is read
    reader.addEventListener('load', logFile);
  } else alert('The file cannot be imported!');
}

// Catch file import event
importBtn.addEventListener('click', importFile);
