const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Drag Functionality
let draggedItem;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArray = [];

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArray = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = [
    'backlogItems',
    'progressItems',
    'completeItems',
    'onHoldItems',
  ];
  arrayNames.forEach((arrayName, i) =>
    localStorage.setItem(`${arrayName}`, JSON.stringify(listArray[i]))
  );
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.classList.add('drag-item');
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, i) => {
    createItemEl(backlogList, 0, backlogItem, i);
  });
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, i) => {
    createItemEl(progressList, 0, progressItem, i);
  });
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, i) => {
    createItemEl(completeList, 0, completeItem, i);
  });
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, i) => {
    createItemEl(onHoldList, 0, onHoldItem, i);
  });
  // Run getSavedColumns only once, Update Local Storage
}

// Drag Functionality
// When item start dragging
function drag(e) {
  // console.log(e);
  draggedItem = e.target;
  // console.log(draggedItem);
}
// When the item enters a column
function dragEnter(e, column) {
  console.log(e);
  console.log(column);

  listColumns.forEach(col => col.classList.remove('over'));
  listColumns[column].classList.add('over');
}

function dragEnd(e) {
  listColumns.forEach(col => col.classList.remove('over'));
}

// Column allows item to drop
function allowDrop(e) {
  e.preventDefault();
}

// Dropping item in column
function drop(e) {
  e.preventDefault();
  // console.log(e.target);

  const col = e.target.closest('.drag-item-list');
  // console.log(col);
  if (col) {
    col.appendChild(draggedItem);
  }
}

function init() {
  listColumns.forEach((column, i) => {
    column.setAttribute('ondragover', 'allowDrop(event)');
    column.setAttribute('ondrop', 'drop(event)');
    column.setAttribute('ondragenter', `dragEnter(event, ${i})`);
    column.setAttribute('ondragend', `dragEnd(event)`);
  });
  updateDOM();
}

// Onload
init();
