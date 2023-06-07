const modalContainer = document.querySelector(".modal-container");
const modalShowBtn = document.querySelector(".add-bookmark-btn");
const modalCloseBtn = document.querySelector(".close-icon");
const bookmarkForm = document.querySelector(".bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteURLEl = document.querySelector("#website-url");
const bookmarksContainer = document.querySelector(".container");

// Show modal
function showModal() {
  modalContainer.classList.add("show-modal");
  websiteNameEl.focus();
}

// Clost modal
function closeModal() {
  modalContainer.classList.remove("show-modal");
}
// Event Listeners
modalShowBtn.addEventListener("click", showModal);

modalCloseBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-container")) closeModal();
});
