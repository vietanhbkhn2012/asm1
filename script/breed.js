'use strict';

// Import JS
import { saveToStorage, getFromStorage } from './storage.js';

// Select elements
const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');
const submitBtn = document.getElementById('submit-btn');
let breedArr = [];
const tableBodyEl = document.getElementById('tbody');

// Reload BreedArr
if (Array.isArray(getFromStorage('breedArr'))) {
  let test = true;
  let checkArr = ['type', 'breed'];
  getFromStorage('breedArr').forEach(breed => {
    checkArr.forEach(check => {
      if (!breed.hasOwnProperty(`${check}`)) {
        test = false;
      }
    });
  });
  if (test) {
    breedArr = getFromStorage('breedArr');
    renderTableBreed(breedArr);
  }
}

// Show breed list
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = '';
  breedArr.forEach((breed, i) => {
    const row = document.createElement('tr');
    row.innerHTML = genRow(breed, i);
    tableBodyEl.appendChild(row);
  });
}
function genRow(row, i) {
  return `
    <td>${i + 1}</td>
    <td>${row.breed}</td>
    <td>${row.type}</td>
    <td>
      <button type="button" class="btn btn-danger btn-delete" id="btn-delete" data-id="${i + 1}">Delete</button>
    </td>
  `;
}

// Catch the "submit" click event
submitBtn.addEventListener('click', function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // Validate valid data
  function validatedForm() {
    if (!data.breed) {
      alert('Please input for breed!');
      breedInput.focus();
      return false;
    }
    if (data.type === 'Select Type') {
      alert('Please select type!');
      typeInput.focus();
      return false;
    }
    for (let i = 0; i < breedArr.length; i++) {
      if (breedArr[i].breed === data.breed && breedArr[i].type === data.type) {
        alert('Breed and Type already exist!');
        breedInput.focus();
        return false;
      }
    }
    return true;
  }
  const validated = validatedForm();

  // Add breed
  if (validated) {
    breedArr.push(data);
    saveToStorage('breedArr', breedArr);
    renderTableBreed(breedArr);
    resetForm();
  }

  // Delete the data just entered on the form
  function resetForm() {
    document.getElementsByTagName('form')[0].reset();
  }
});

// Delete an breed
tableBodyEl.addEventListener('click', function (e) {
  if (e.target.id != 'btn-delete') return;
  const breedId = e.target.getAttribute('data-id');
  if (!breedId) return;
  const isConfirm = confirm('Are you sure?');
  if (!isConfirm) return;
  breedArr.splice(
    breedArr.findIndex((breed, i) => breedId == i + 1),
    1
  );
  saveToStorage('breedArr', breedArr);
  renderTableBreed(breedArr);
});
