'use strict';
// Select elements
const submitBtn = document.getElementById('submit-btn');
const healthyBtn = document.getElementById('healthy-btn');
const calculateBMI = document.getElementById('calculateBMI-btn');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

const petArr = [];
const tableBodyEl = document.getElementById('tbody');
tableBodyEl.innerHTML = '';

// Show pet list
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
    <td>${row.bmi}</td>
    <td>${row.date.getDate()}/${row.date.getMonth() + 1}/${row.date.getFullYear()}</td>
    <td>
      <button type="button" class="btn btn-danger btn-delete" id="btn-delete" data-id="${row.id}">Delete</button>
    </td>
  `;
}

// Catch the "Submit" Click event
submitBtn.addEventListener('click', function () {
  //Get data from Input Forms
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: '?',
    date: new Date(),
  };
  // Validate valid data
  const validatedForm = function () {
    let sameId = false;
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        sameId = true;
      }
    }
    if (data.id === '') {
      alert('Please input for id');
      idInput.focus();
      return false;
    } else if (sameId === true) {
      alert('ID must unique!');
      idInput.focus();
      return false;
    }
    if (data.name === '') {
      alert('Please input for name');
      nameInput.focus();
      return false;
    }
    if (isNaN(data.age)) {
      alert('Please input for age');
      ageInput.focus();
      return false;
    } else if (data.age < 1 || data.age > 15) {
      alert('Age must be between 1 and 15!');
      ageInput.focus();
      return false;
    }
    if (data.type === 'Select Type') {
      alert('Please select Type!');
      typeInput.focus();
      return false;
    }
    if (isNaN(data.weight)) {
      alert('Please input for weight');
      weightInput.focus();
      return false;
    } else if (data.weight < 1 || data.weight > 15) {
      alert('Weight must be between 1 and 15!');
      weightInput.focus();
      return false;
    }
    if (isNaN(data.length)) {
      alert('Please input for length');
      lengthInput.focus();
      return false;
    } else if (data.length < 1 || data.length > 100) {
      alert('Length must be between 1 and 100!');
      lengthInput.focus();
      return false;
    }
    if (data.breed === 'Select Breed') {
      alert('Please select Breed!');
      breedInput.focus();
      return false;
    }
    return true;
  };
  const validated = validatedForm();

  // Add pets to the list
  if (validated) {
    petArr.push(data);
    renderTableData(petArr);
    resetForm();
  }

  //Delete the data just entered on the Form
  function resetForm() {
    document.getElementsByTagName('form')[0].reset();
  }
});

// Delete an pet
tableBodyEl.addEventListener('click', function (e) {
  if (e.target.id != 'btn-delete') return;
  const petId = e.target.getAttribute('data-id');
  if (!petId) return;
  const isConfirm = confirm('Are you sure?');
  if (!isConfirm) return;
  //remove
  petArr.splice(
    petArr.findIndex(pet => pet.id == petId),
    1
  );
  //reload
  renderTableData(petArr);
});

//Show all pet or healthy Pet
let healthyPetArr = [];
let healthyCheck = true;
healthyBtn.addEventListener('click', function () {
  if (!healthyCheck) {
    healthyBtn.innerHTML = 'Show Healthy Pet';
    renderTableData(petArr);
  } else {
    healthyBtn.innerHTML = 'Show All Pet';
    healthyPetArr = petArr.filter(pet => pet.vaccinated && pet.dewormed && pet.sterilized);
    renderTableData(healthyPetArr);
  }
  healthyCheck = healthyCheck === false ? true : false;
});

// Calculate BMI
calculateBMI.addEventListener('click', function () {
  let calculate;
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === 'Cat') {
      calculate = (petArr[i].weight * 886) / petArr[i].length ** 2;
      petArr[i].bmi = calculate.toFixed(2);
    } else {
      calculate = (petArr[i].weight * 703) / petArr[i].length ** 2;
      petArr[i].bmi = calculate.toFixed(2);
    }
  }
  renderTableData(petArr);
  healthyBtn.innerHTML = 'Show Healthy Pet';
  healthyCheck = true;
});
