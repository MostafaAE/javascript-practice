const modalContainer = document.querySelector(".modal-container");
const modalShowBtn = document.querySelector(".add-bookmark-btn");
const modalCloseBtn = document.querySelector(".close-icon");
const bookmarkForm = document.querySelector(".bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteURLEl = document.querySelector("#website-url");
const bookmarksContainer = document.querySelector(".bookmarks-container");

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

// function buildBookmarks() {
//   bookmarks.forEach((bookmark) => {
//     const html = `
//     <div class="item">
//         <i class="fas fa-times delete-bookmark" title="Delete Bookmark"></i>
//         <div class="name">
//           <img
//             src="https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}"
//             alt="favicon"
//           />
//           <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
//         </div>
//       </div>
//       `;

//     bookmarksContainer.insertAdjacentHTML("beforeend", html);
//   });
// }

// Build Bookmarks
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = "";
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("bookmarks"))
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  else {
    bookmarks = [
      { name: "Mostafa Ayman", url: "https://www.mostafaayman.com" },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  buildBookmarks();
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

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
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

// On load, fetch bookmarks
fetchBookmarks();
