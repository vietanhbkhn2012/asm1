'use strict';

// Import JS
import { getFromStorage } from './storage.js';

// Select elements
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
let petArr = [];
let breedArr = [];
const tableBodyEl = document.getElementById('tbody');
const findBtn = document.getElementById('find-btn');

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
    // Show breeds
    function renderBreed() {
      breedInput.innerHTML = '<option>Select Breed</option>';
      breedArr.forEach(breed => {
        const option = document.createElement('option');
        option.innerHTML = breed.breed;
        breedInput.appendChild(option);
      });
    }
    renderBreed();
  }
}

// Reload petArr
if (Array.isArray(getFromStorage('petArr'))) {
  let test = true;
  const checkArr = ['id', 'name', 'type', 'weight', 'length', 'color', 'breed', 'vaccinated', 'dewormed', 'sterilized', 'date'];
  getFromStorage('petArr').forEach(pet => {
    checkArr.forEach(check => {
      if (!pet.hasOwnProperty(`${check}`)) {
        test = false;
      }
    });
  });
  if (test) {
    petArr = getFromStorage('petArr');
    newDate(petArr);
    renderTableData(petArr);
  }
}

// Convert date string to date
function newDate(petArr) {
  petArr.forEach((pet, i, petArr) => {
    petArr[i].date = new Date(pet.date);
  });
}

// Show pet the list
function renderTableData(pets) {
  tableBodyEl.innerHTML = '';
  pets.forEach(pet => {
    const row = document.createElement('tr');
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
}
function genRow(row) {
  return `
    <th scope="row">${row.id}</th>
    <td>${row.name}</td>
    <td>${row.age}</td>
    <td>${row.type}</td>
    <td>${row.weight} kg</td>
    <td>${row.length} cm</td>
    <td>${row.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${row.color}"></i>
    </td>
    <td>
      <i class="bi ${row.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
    </td>
    <td>
      <i class="bi ${row.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} "></i>
    </td>
    <td>
      <i class="bi ${row.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} "></i>
    </td>
    <td>${row.date.getDate()}/${row.date.getMonth() + 1}/${row.date.getFullYear()}</td>   
  `;
}

// Find pets
findBtn.addEventListener('click', find);
function find() {
  //Get data from input form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  // Filter pets from the list
  const search = petArr.filter(function (pet) {
    if (data.type === 'Select Type') data.type = '';
    if (data.breed === 'Select Breed') data.breed = '';
    if (data.vaccinated === false) data.vaccinated = '';
    if (data.dewormed === false) data.dewormed = '';
    if (data.sterilized === false) data.sterilized = '';

    const checkID = pet.id.toLowerCase().includes(`${data.id}`.toLowerCase());
    const checkName = pet.name.toLowerCase().includes(`${data.name}`.toLowerCase());
    const checkType = pet.type.includes(`${data.type}`);
    const checkBreed = pet.breed.includes(`${data.breed}`);
    const checkVaccinated = `${pet.vaccinated}`.includes(`${data.vaccinated}`);
    const checkDewormed = `${pet.dewormed}`.includes(`${data.dewormed}`);
    const checkSterilized = `${pet.sterilized}`.includes(`${data.sterilized}`);

    return checkID && checkName && checkType && checkBreed && checkVaccinated && checkDewormed && checkSterilized;
  });

  // Show pets after filtering
  renderTableData(search);
}
