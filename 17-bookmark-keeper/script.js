const modalContainer = document.querySelector(".modal-container");
const modalShowBtn = document.querySelector(".add-bookmark-btn");
const modalCloseBtn = document.querySelector(".close-icon");
const bookmarkForm = document.querySelector(".bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteURLEl = document.querySelector("#website-url");
const bookmarksContainer = document.querySelector(".container");

let bookmarks = [];

// Show modal
function showModal() {
  modalContainer.classList.add("show-modal");
  websiteNameEl.focus();
}

// Close modal
function closeModal() {
  modalContainer.classList.remove("show-modal");
}

// Validate Form
function validate(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();

  const nameValue = websiteNameEl.value;
  let urlValue = websiteURLEl.value;

  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) return false;

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);

  console.log(bookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listeners
modalShowBtn.addEventListener("click", showModal);

modalCloseBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-container")) closeModal();
});

bookmarkForm.addEventListener("submit", storeBookmark);
