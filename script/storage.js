'use strict';

// Toggle class active when click on navbar
const sidebarEl = document.getElementById('sidebar');
sidebarEl.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});

// Export JS
export { saveToStorage, getFromStorage };

// Save to localStorage
function saveToStorage(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(value));
}

// Get from localStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(`${key}`));
}
