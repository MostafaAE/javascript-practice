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

// Filter arrays to remove empty items
function filterArray(array) {
  return array.filter(el => el !== null);
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.classList.add('drag-item');
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(event, ${index}, ${column})`);
  listEl.addEventListener('click', e => {
    e.target.contentEditable = true;
  });
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
    updatedOnLoad = true;
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, i) => {
    createItemEl(backlogList, 0, backlogItem, i);
  });
  backlogListArray = filterArray(backlogListArray);

  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, i) => {
    createItemEl(progressList, 1, progressItem, i);
  });
  progressListArray = filterArray(progressListArray);

  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, i) => {
    createItemEl(completeList, 2, completeItem, i);
  });
  completeListArray = filterArray(completeListArray);

  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, i) => {
    createItemEl(onHoldList, 3, onHoldItem, i);
  });
  onHoldListArray = filterArray(onHoldListArray);

  // Update Local Storage
  updateSavedColumns();
}

// Update Item
function updateItem(e, index, column) {
  e.target.contentEditable = false;
  const selectedArray = listArray[column];
  const selectedColumnEl = listColumns[column].children;
  if (!selectedColumnEl[index].textContent) {
    listColumns[column].removeChild(selectedColumnEl[index]);
    delete selectedArray[index];
    console.log(selectedArray);
    updateDOM();
  }
}

function rebuildArrayFromDOM(column) {
  let array = [];
  for (const child of column.children) array.push(child.textContent);

  return array;
}

function rebuildArrays() {
  backlogListArray = rebuildArrayFromDOM(backlogList);
  progressListArray = rebuildArrayFromDOM(progressList);
  completeListArray = rebuildArrayFromDOM(completeList);
  onHoldListArray = rebuildArrayFromDOM(onHoldList);
  updateDOM();

  console.log(backlogListArray);
  console.log(progressListArray);
  console.log(completeListArray);
  console.log(onHoldListArray);
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
  // console.log(e);
  // console.log(column);

  listColumns.forEach(col => col.classList.remove('over'));
  listColumns[column].classList.add('over');
}

function dragEnd() {
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
    dragEnd();
    rebuildArrays();
  }
}

// Show add item input box
function showInputBox(column) {
  console.log(column);
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

// Hide item input box
function hideInputBox(column) {
  console.log(column);
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
}

function addToColumn(column) {
  const text = addItems[column].textContent;
  if (!text) return;
  addItems[column].textContent = '';
  createItemEl(listColumns[column], column, text, 0);
  listArray[column].push(text);
  updateDOM();
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

// Event Listeners
addBtns.forEach((btn, i) =>
  btn.addEventListener('click', () => {
    showInputBox(i);
  })
);
saveItemBtns.forEach((btn, i) =>
  btn.addEventListener('click', () => {
    addToColumn(i);
    hideInputBox(i);
  })
);

// Onload
init();
