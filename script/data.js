'use strict';

// Import JS
import {} from './storage.js';

// Select Elements
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
